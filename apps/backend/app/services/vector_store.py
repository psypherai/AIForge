"""Supabase pgvector service for RAG retrieval."""

from __future__ import annotations

import psycopg
from langchain_core.documents import Document

from app.core.config import settings


async def search_vectors(
    embedding: list[float],
    collection: str = "documents",
    top_k: int = 5,
) -> list[Document]:
    """Search for similar vectors in Supabase pgvector.

    Uses cosine similarity search against the specified collection table.
    Expects a table with columns: id, content, metadata, embedding (vector).

    Args:
        embedding: Query embedding vector.
        collection: Table name in Supabase.
        top_k: Number of results to return.

    Returns:
        List of LangChain Document objects.
    """
    query = f"""
        SELECT content, metadata, 1 - (embedding <=> %s::vector) AS similarity
        FROM {collection}
        ORDER BY embedding <=> %s::vector
        LIMIT %s
    """

    documents: list[Document] = []

    try:
        async with await psycopg.AsyncConnection.connect(settings.supabase_db_url) as conn:
            async with conn.cursor() as cur:
                embedding_str = f"[{','.join(str(x) for x in embedding)}]"
                await cur.execute(query, (embedding_str, embedding_str, top_k))
                rows = await cur.fetchall()

                for row in rows:
                    content, metadata, similarity = row
                    doc_metadata = metadata if isinstance(metadata, dict) else {}
                    doc_metadata["similarity"] = float(similarity)
                    documents.append(Document(page_content=content, metadata=doc_metadata))
    except Exception as e:
        # Return empty results if vector store is not set up yet
        print(f"Vector search error (pgvector may not be configured): {e}")

    return documents


async def upsert_vectors(
    texts: list[str],
    embeddings: list[list[float]],
    metadatas: list[dict] | None = None,
    collection: str = "documents",
) -> int:
    """Insert or update vectors in Supabase pgvector.

    Args:
        texts: Document texts.
        embeddings: Corresponding embedding vectors.
        metadatas: Optional metadata for each document.
        collection: Table name in Supabase.

    Returns:
        Number of rows upserted.
    """
    if metadatas is None:
        metadatas = [{} for _ in texts]

    query = f"""
        INSERT INTO {collection} (content, metadata, embedding)
        VALUES (%s, %s, %s::vector)
        ON CONFLICT (id) DO UPDATE SET
            content = EXCLUDED.content,
            metadata = EXCLUDED.metadata,
            embedding = EXCLUDED.embedding
    """

    count = 0
    async with await psycopg.AsyncConnection.connect(settings.supabase_db_url) as conn:
        async with conn.cursor() as cur:
            for text, embedding, metadata in zip(texts, embeddings, metadatas):
                embedding_str = f"[{','.join(str(x) for x in embedding)}]"
                await cur.execute(query, (text, metadata, embedding_str))
                count += 1
        await conn.commit()

    return count
