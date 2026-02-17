"""AIForge Backend — FastAPI + LangGraph by Psypher AI.

Production-grade AI backend with:
- /api/v1/chat — LangGraph agent with tool calling
- /api/v1/chat/stream — SSE streaming chat
- /api/v1/rag — Retrieval-augmented generation with Supabase pgvector
- /health — Health check
- /docs — Scalar API reference (modern alternative to Swagger UI)
- /openapi.json — Auto-generated OpenAPI spec
"""

from contextlib import asynccontextmanager
from collections.abc import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

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
    docs_url=None,  # Disable default Swagger UI
    redoc_url=None,  # Disable default ReDoc
)


@app.get("/docs", include_in_schema=False)
async def scalar_docs() -> HTMLResponse:
    """Scalar API Reference — modern, beautiful API documentation."""
    return HTMLResponse(
        """
<!doctype html>
<html>
  <head>
    <title>AIForge API — Psypher AI</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      data-url="/openapi.json"
      data-configuration='{
        "theme": "kepler",
        "layout": "modern",
        "darkMode": true,
        "hiddenClients": [],
        "metadata": {
          "title": "AIForge API — Psypher AI"
        }
      }'
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
</html>
        """
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
