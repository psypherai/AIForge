"""Chat router — /chat and /rag endpoints powered by LangGraph."""

from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.agents.chat_agent import run_chat_agent
from app.agents.rag_agent import run_rag_query
from app.models.chat import ChatRequest, ChatResponse, RAGRequest, RAGResponse

router = APIRouter(prefix="/api/v1", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    """Chat endpoint — runs LangGraph agent with tool calling.

    Accepts conversation history and returns an AI-generated response
    using the configured LLM with access to tools (knowledge base, etc.).
    """
    messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

    content = await run_chat_agent(messages=messages)

    return ChatResponse(
        content=content,
        model=request.model,
        usage=None,
    )


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest) -> StreamingResponse:
    """Streaming chat endpoint — SSE response for real-time token streaming."""

    async def generate():
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        # For streaming, we run the agent and stream the final response
        content = await run_chat_agent(messages=messages)
        # Yield as SSE events
        for token in content:
            yield f"data: {token}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")


@router.post("/rag", response_model=RAGResponse)
async def rag_query(request: RAGRequest) -> RAGResponse:
    """RAG endpoint — retrieval-augmented generation using Supabase pgvector.

    Retrieves relevant documents from the vector store, then generates
    an answer grounded in the retrieved context.
    """
    result = await run_rag_query(
        query=request.query,
        collection=request.collection,
        top_k=request.top_k,
    )

    return RAGResponse(
        content=result["content"],
        sources=result["sources"],
    )
