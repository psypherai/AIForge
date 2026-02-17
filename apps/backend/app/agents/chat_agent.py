"""LangGraph chat agent — production-grade agentic loop with tool calling."""

from __future__ import annotations

from typing import Annotated, TypedDict

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

from app.core.config import settings
from app.core.observability import get_callbacks


# ── Tools ──────────────────────────────────────────────────────────────
@tool
def search_knowledge_base(query: str) -> str:
    """Search the knowledge base for relevant information.

    Args:
        query: The search query to find relevant documents.
    """
    # TODO: Integrate with Supabase pgvector for real RAG
    return f"[Knowledge base results for: {query}] — No documents indexed yet. Set up Supabase pgvector to enable RAG."


@tool
def get_current_time() -> str:
    """Get the current UTC time."""
    from datetime import datetime, timezone

    return datetime.now(tz=timezone.utc).isoformat()


TOOLS = [search_knowledge_base, get_current_time]


# ── Agent State ────────────────────────────────────────────────────────
class AgentState(TypedDict):
    """State for the chat agent graph."""

    messages: Annotated[list[BaseMessage], add_messages]


# ── Graph Construction ─────────────────────────────────────────────────
def _should_continue(state: AgentState) -> str:
    """Determine whether to continue tool calling or finish."""
    last_message = state["messages"][-1]
    if isinstance(last_message, AIMessage) and last_message.tool_calls:
        return "tools"
    return END


def _call_model(state: AgentState) -> dict:
    """Call the LLM with current messages."""
    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.7,
        api_key=settings.openai_api_key,
        streaming=True,
    ).bind_tools(TOOLS)

    response = llm.invoke(state["messages"], config={"callbacks": get_callbacks()})
    return {"messages": [response]}


def build_chat_agent() -> StateGraph:
    """Build and compile the LangGraph chat agent.

    Returns a compiled graph with:
    - agent node: calls the LLM
    - tools node: executes tool calls
    - conditional routing between agent and tools
    """
    graph = StateGraph(AgentState)

    graph.add_node("agent", _call_model)
    graph.add_node("tools", ToolNode(TOOLS))

    graph.set_entry_point("agent")
    graph.add_conditional_edges("agent", _should_continue, {"tools": "tools", END: END})
    graph.add_edge("tools", "agent")

    return graph.compile()


# Singleton compiled graph
chat_agent = build_chat_agent()


async def run_chat_agent(
    messages: list[dict[str, str]],
    system_prompt: str = "You are a helpful AI assistant built with AIForge by Psypher AI. You have access to tools and can search a knowledge base.",
) -> str:
    """Run the chat agent and return the final response.

    Args:
        messages: List of message dicts with 'role' and 'content'.
        system_prompt: System prompt to prepend.

    Returns:
        The assistant's final text response.
    """
    langchain_messages: list[BaseMessage] = [SystemMessage(content=system_prompt)]

    for msg in messages:
        if msg["role"] == "user":
            langchain_messages.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            langchain_messages.append(AIMessage(content=msg["content"]))

    result = await chat_agent.ainvoke(
        {"messages": langchain_messages},
        config={"callbacks": get_callbacks()},
    )

    final_message = result["messages"][-1]
    return str(final_message.content)
