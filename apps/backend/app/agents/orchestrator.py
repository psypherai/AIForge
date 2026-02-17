"""Multi-Agent Orchestration Patterns — Python (LangGraph)

Production patterns for orchestrating multiple AI agents:
1. Supervisor: A boss agent delegates to specialist workers
2. Pipeline: Sequential chain of agents
3. Parallel Fan-Out: Multiple agents process in parallel

Usage:
    from app.agents.orchestrator import create_supervisor, create_pipeline

    graph = create_supervisor(
        workers=[research_agent, writer_agent],
        task="Write a market analysis report"
    )
    result = await graph.ainvoke({"task": "Analyze the AI market"})
"""

from __future__ import annotations

import operator
from typing import Annotated, Literal, TypedDict

from langchain_core.messages import AIMessage, BaseMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, StateGraph


# ── Types ────────────────────────────────────────────────────────────


class AgentWorker(TypedDict):
    name: str
    description: str
    system_prompt: str
    model: str
    temperature: float


class SupervisorState(TypedDict):
    task: str
    messages: Annotated[list[BaseMessage], operator.add]
    current_worker: str
    round: int


class PipelineState(TypedDict):
    input: str
    messages: Annotated[list[BaseMessage], operator.add]
    current_stage: int


# ── Pattern 1: Supervisor ────────────────────────────────────────────


def create_supervisor(
    workers: list[AgentWorker],
    supervisor_prompt: str = "You are a supervisor. Delegate tasks to the right worker.",
    model: str = "gpt-4o",
    max_rounds: int = 5,
) -> StateGraph:
    """Create a supervisor graph that delegates to specialist workers.

    The supervisor analyzes the task, picks the right worker, reviews output,
    and can re-delegate until satisfied.
    """
    worker_names = [w["name"] for w in workers]
    worker_list = "\n".join(f"- {w['name']}: {w['description']}" for w in workers)

    def supervisor_node(state: SupervisorState) -> dict:
        llm = ChatOpenAI(model=model, temperature=0.3)
        response = llm.invoke(
            [
                SystemMessage(
                    content=f"{supervisor_prompt}\n\nAvailable workers:\n{worker_list}\n\n"
                    f"Respond with EXACTLY one of: {', '.join(worker_names)} OR 'FINISH' if done."
                ),
                *state["messages"],
                HumanMessage(content=f"Task: {state['task']}\nRound: {state['round']}/{max_rounds}"),
            ]
        )
        next_worker = response.content.strip()
        return {"current_worker": next_worker, "messages": [response]}

    def make_worker_node(worker: AgentWorker):
        def worker_node(state: SupervisorState) -> dict:
            llm = ChatOpenAI(
                model=worker.get("model", model),
                temperature=worker.get("temperature", 0.7),
            )
            response = llm.invoke(
                [SystemMessage(content=worker["system_prompt"]), *state["messages"]]
            )
            return {"messages": [response], "round": state["round"] + 1}

        return worker_node

    def route(state: SupervisorState) -> str:
        if state["round"] >= max_rounds:
            return END
        current = state["current_worker"].upper()
        if "FINISH" in current:
            return END
        for w in workers:
            if w["name"].lower() in state["current_worker"].lower():
                return w["name"]
        return END

    graph = StateGraph(SupervisorState)
    graph.add_node("supervisor", supervisor_node)

    for worker in workers:
        graph.add_node(worker["name"], make_worker_node(worker))
        graph.add_edge(worker["name"], "supervisor")

    graph.set_entry_point("supervisor")
    graph.add_conditional_edges("supervisor", route)

    return graph.compile()


# ── Pattern 2: Pipeline ──────────────────────────────────────────────


def create_pipeline(
    stages: list[AgentWorker],
    model: str = "gpt-4o",
) -> StateGraph:
    """Create a pipeline graph — sequential chain of agents, each refining output."""

    graph = StateGraph(PipelineState)

    for i, stage in enumerate(stages):

        def make_stage_node(s: AgentWorker, idx: int):
            def stage_node(state: PipelineState) -> dict:
                llm = ChatOpenAI(
                    model=s.get("model", model),
                    temperature=s.get("temperature", 0.7),
                )
                prompt = state["input"] if idx == 0 else "Continue refining based on the previous output."
                response = llm.invoke(
                    [SystemMessage(content=s["system_prompt"]), *state["messages"], HumanMessage(content=prompt)]
                )
                return {"messages": [response], "current_stage": idx + 1}

            return stage_node

        graph.add_node(stage["name"], make_stage_node(stage, i))

        if i == 0:
            graph.set_entry_point(stage["name"])
        else:
            graph.add_edge(stages[i - 1]["name"], stage["name"])

    graph.add_edge(stages[-1]["name"], END)
    return graph.compile()


# ── Pattern 3: Parallel Fan-Out ──────────────────────────────────────


class ParallelState(TypedDict):
    input: str
    agent_outputs: dict[str, str]
    messages: Annotated[list[BaseMessage], operator.add]


def create_parallel(
    agents: list[AgentWorker],
    merge_prompt: str = "Synthesize the following agent outputs into a comprehensive response.",
    model: str = "gpt-4o",
) -> StateGraph:
    """Create a parallel graph — multiple agents process simultaneously, results merged."""

    graph = StateGraph(ParallelState)

    for agent in agents:

        def make_agent_node(a: AgentWorker):
            def agent_node(state: ParallelState) -> dict:
                llm = ChatOpenAI(
                    model=a.get("model", model),
                    temperature=a.get("temperature", 0.7),
                )
                response = llm.invoke(
                    [SystemMessage(content=a["system_prompt"]), HumanMessage(content=state["input"])]
                )
                return {"agent_outputs": {a["name"]: response.content}}

            return agent_node

        graph.add_node(agent["name"], make_agent_node(agent))
        graph.set_entry_point(agent["name"])

    def merge_node(state: ParallelState) -> dict:
        llm = ChatOpenAI(model=model, temperature=0.3)
        outputs = "\n\n".join(
            f"### {name}:\n{output}" for name, output in state["agent_outputs"].items()
        )
        response = llm.invoke(
            [SystemMessage(content=merge_prompt), HumanMessage(content=outputs)]
        )
        return {"messages": [response]}

    graph.add_node("merge", merge_node)
    for agent in agents:
        graph.add_edge(agent["name"], "merge")
    graph.add_edge("merge", END)

    return graph.compile()
