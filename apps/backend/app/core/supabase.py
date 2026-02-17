"""Supabase client singleton for the backend."""

from functools import lru_cache

from supabase import Client, create_client

from app.core.config import settings


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    """Create and cache a Supabase client instance."""
    return create_client(settings.supabase_url, settings.supabase_service_role_key)
