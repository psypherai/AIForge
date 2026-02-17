"""AIForge Backend — FastAPI + LangGraph by Psypher AI.

Production-grade AI backend with:
- /api/v1/chat — LangGraph agent with tool calling
- /api/v1/chat/stream — SSE streaming chat
- /api/v1/rag — Retrieval-augmented generation with Supabase pgvector
- /health — Health check
- /openapi.json — Auto-generated OpenAPI spec
"""

from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import chat


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None]:
    """Application lifespan — startup and shutdown hooks."""
    # Startup
    print(f"🚀 {settings.app_name} starting...")
    print(f"   CORS origins: {settings.cors_origins}")
    print(f"   Langfuse: {'enabled' if settings.langfuse_public_key else 'disabled'}")
    print(f"   LangSmith: {'enabled' if settings.langsmith_api_key else 'disabled'}")
    yield
    # Shutdown
    print(f"👋 {settings.app_name} shutting down...")


app = FastAPI(
    title="AIForge API",
    description="AI-native backend by Psypher AI — FastAPI + LangGraph",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(chat.router)


@app.get("/health")
async def health() -> dict:
    """Health check endpoint."""
    return {
        "status": "ok",
        "service": "aiforge-backend",
        "version": "1.0.0",
    }
