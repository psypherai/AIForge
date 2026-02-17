"""Observability setup — Langfuse + LangSmith integration."""

from __future__ import annotations

import os

from langfuse import Langfuse, observe

from app.core.config import settings

# Re-export the observe decorator for use in agents/routes
__all__ = ["observe", "get_langfuse", "setup_observability"]


def get_langfuse() -> Langfuse:
    """Get the Langfuse client instance."""
    return Langfuse(
        public_key=settings.langfuse_public_key,
        secret_key=settings.langfuse_secret_key,
        host=settings.langfuse_host,
        enabled=bool(settings.langfuse_public_key),
    )


def setup_observability() -> None:
    """Configure observability environment variables at startup."""
    if settings.langfuse_public_key:
        os.environ["LANGFUSE_PUBLIC_KEY"] = settings.langfuse_public_key
        os.environ["LANGFUSE_SECRET_KEY"] = settings.langfuse_secret_key
        os.environ["LANGFUSE_HOST"] = settings.langfuse_host

    if settings.langsmith_api_key:
        os.environ["LANGCHAIN_TRACING_V2"] = "true"
        os.environ["LANGCHAIN_API_KEY"] = settings.langsmith_api_key
        os.environ["LANGCHAIN_PROJECT"] = settings.langsmith_project


def get_callbacks() -> list:
    """Get LangChain-compatible callbacks for agent runs.

    Returns an empty list if no observability is configured,
    which is safe to pass to LangChain/LangGraph invoke calls.
    """
    callbacks: list = []
    # Langfuse v3 uses the @observe decorator and auto-instrumentation
    # rather than explicit callbacks. LangSmith uses env vars.
    # This function is kept for API compatibility.
    return callbacks
