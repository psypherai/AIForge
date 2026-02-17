"""RAG agent with Supabase pgvector retrieval + LangGraph orchestration."""

from __future__ import annotations

from typing import Annotated, TypedDict

from langchain_core.documents import Document
from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langgraph.graph import END, StateGraph
from langgraph.graph.message import add_messages

from app.core.config import settings
from app.core.observability import get_callbacks
from app.services.vector_store import search_vectors


# ── State ──────────────────────────────────────────────────────────────
class RAGState(TypedDict):
    """State for the RAG agent."""

    messages: Annotated[list[BaseMessage], add_messages]
    query: str
    documents: list[Document]
    collection: str
    top_k: int


# ── Nodes ──────────────────────────────────────────────────────────────
async def retrieve_documents(state: RAGState) -> dict:
    """Retrieve relevant documents from Supabase pgvector."""
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        api_key=settings.openai_api_key,
    )
    query_embedding = await embeddings.aembed_query(state["query"])

    docs = await search_vectors(
        embedding=query_embedding,
        collection=state["collection"],
        top_k=state["top_k"],
    )

    return {"documents": docs}


async def generate_answer(state: RAGState) -> dict:
    """Generate answer using retrieved context."""
    context = "\n\n---\n\n".join(
        [f"Source: {doc.metadata.get('source', 'unknown')}\n{doc.page_content}" for doc in state["documents"]]
    )

    system_prompt = f"""You are a helpful AI assistant with access to a knowledge base.
Use the following retrieved context to answer the user's question.
If the context doesn't contain relevant information, say so honestly.

Retrieved Context:
{context}"""

    llm = ChatOpenAI(
        model="gpt-4o",
        temperature=0.3,
        api_key=settings.openai_api_key,
    )

    messages = [SystemMessage(content=system_prompt), HumanMessage(content=state["query"])]
    response = await llm.ainvoke(messages, config={"callbacks": get_callbacks()})

    return {"messages": [response]}


# ── Graph ──────────────────────────────────────────────────────────────
def build_rag_agent() -> StateGraph:
    """Build the RAG agent graph: retrieve -> generate."""
    graph = StateGraph(RAGState)

    graph.add_node("retrieve", retrieve_documents)
    graph.add_node("generate", generate_answer)

    graph.set_entry_point("retrieve")
    graph.add_edge("retrieve", "generate")
    graph.add_edge("generate", END)

    return graph.compile()


rag_agent = build_rag_agent()


async def run_rag_query(
    query: str,
    collection: str = "documents",
    top_k: int = 5,
) -> dict:
    """Run RAG query and return answer + sources.

    Args:
        query: User's question.
        collection: pgvector collection name.
        top_k: Number of documents to retrieve.

    Returns:
        Dict with 'content' and 'sources'.
    """
    result = await rag_agent.ainvoke(
        {
            "messages": [],
            "query": query,
            "documents": [],
            "collection": collection,
            "top_k": top_k,
        },
        config={"callbacks": get_callbacks()},
    )

    sources = [
        {
            "content": doc.page_content[:200],
            "metadata": doc.metadata,
        }
        for doc in result.get("documents", [])
    ]

    final_message = result["messages"][-1]
    return {
        "content": str(final_message.content),
        "sources": sources,
    }
