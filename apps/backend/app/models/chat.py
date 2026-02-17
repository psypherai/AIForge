"""Chat request/response models shared via OpenAPI."""

from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """A single chat message."""

    role: str = Field(..., description="Message role: 'user', 'assistant', or 'system'")
    content: str = Field(..., description="Message content")


class ChatRequest(BaseModel):
    """Incoming chat request."""

    messages: list[ChatMessage] = Field(..., description="Conversation history")
    model: str = Field(default="gpt-4o", description="Model identifier")
    stream: bool = Field(default=False, description="Enable streaming response")
    temperature: float = Field(default=0.7, ge=0, le=2)
    max_tokens: int = Field(default=4096, ge=1, le=128000)


class ChatResponse(BaseModel):
    """Chat completion response."""

    content: str = Field(..., description="Assistant response content")
    model: str = Field(..., description="Model used")
    usage: dict[str, int] | None = Field(default=None, description="Token usage")


class RAGRequest(BaseModel):
    """RAG (Retrieval-Augmented Generation) request."""

    query: str = Field(..., description="User query for RAG")
    collection: str = Field(default="documents", description="Vector collection name")
    top_k: int = Field(default=5, ge=1, le=20, description="Number of results to retrieve")
    model: str = Field(default="gpt-4o", description="Model for generation")


class RAGResponse(BaseModel):
    """RAG response with sources."""

    content: str = Field(..., description="Generated answer")
    sources: list[dict] = Field(default_factory=list, description="Retrieved source documents")
