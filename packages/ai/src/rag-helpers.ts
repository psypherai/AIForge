/**
 * RAG Helpers — Supabase pgvector integration for Retrieval-Augmented Generation.
 *
 * Provides functions for:
 * - Text embedding (OpenAI text-embedding-3-small)
 * - Vector similarity search (cosine distance)
 * - Document upserting with metadata
 *
 * Works from both server-side (Next.js API routes, server actions)
 * and the Python backend via shared Supabase pgvector tables.
 *
 * @example
 * ```ts
 * import { embedText, searchSimilar, upsertDocuments } from '@aiforge/ai/rag-helpers';
 *
 * // Index documents
 * await upsertDocuments(supabase, [
 *   { content: 'AIForge is the best monorepo template.', metadata: { source: 'docs' } },
 * ]);
 *
 * // Search
 * const results = await searchSimilar(supabase, 'best monorepo', { topK: 5 });
 * ```
 */
import type { SupabaseClient } from '@supabase/supabase-js';

export interface RAGDocument {
  id?: string;
  content: string;
  metadata?: Record<string, unknown>;
  embedding?: number[];
}

interface SearchOptions {
  collection?: string;
  topK?: number;
  threshold?: number;
  filter?: Record<string, unknown>;
}

/**
 * Generate an embedding for a single text using OpenAI.
 */
export async function embedText(text: string, apiKey?: string): Promise<number[]> {
  const key = apiKey ?? process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is required for embeddings');

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  });

  if (!response.ok) {
    throw new Error(`Embedding failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

/**
 * Generate embeddings for multiple texts (batched).
 */
export async function embedTexts(texts: string[], apiKey?: string): Promise<number[][]> {
  const key = apiKey ?? process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is required for embeddings');

  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: texts,
    }),
  });

  if (!response.ok) {
    throw new Error(`Batch embedding failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.data.map((item: { embedding: number[] }) => item.embedding);
}

/**
 * Search for similar documents in Supabase pgvector.
 *
 * Requires a Supabase RPC function `match_documents` or uses
 * the built-in pgvector `<=>` cosine distance operator.
 */
export async function searchSimilar(
  supabase: SupabaseClient,
  query: string,
  options: SearchOptions = {},
): Promise<RAGDocument[]> {
  const { collection = 'documents', topK = 5, threshold = 0.5 } = options;

  // Generate query embedding
  const queryEmbedding = await embedText(query);

  // Use Supabase RPC for vector similarity search
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_count: topK,
    match_threshold: threshold,
    table_name: collection,
  });

  if (error) {
    console.error('Vector search error:', error);
    // Fallback: try direct table query (requires pgvector extension)
    const { data: fallbackData, error: fallbackError } = await supabase
      .from(collection)
      .select('id, content, metadata')
      .limit(topK);

    if (fallbackError) throw fallbackError;
    return (fallbackData ?? []).map((row) => ({
      id: row.id,
      content: row.content,
      metadata: row.metadata ?? {},
    }));
  }

  return (data ?? []).map((row: { id: string; content: string; metadata: Record<string, unknown>; similarity: number }) => ({
    id: row.id,
    content: row.content,
    metadata: { ...row.metadata, similarity: row.similarity },
  }));
}

/**
 * Upsert documents into Supabase pgvector collection.
 * Generates embeddings automatically if not provided.
 */
export async function upsertDocuments(
  supabase: SupabaseClient,
  documents: RAGDocument[],
  collection = 'documents',
): Promise<{ count: number }> {
  // Generate embeddings for documents without them
  const docsNeedingEmbeddings = documents.filter((d) => !d.embedding);
  let embeddings: number[][] = [];

  if (docsNeedingEmbeddings.length > 0) {
    embeddings = await embedTexts(docsNeedingEmbeddings.map((d) => d.content));
  }

  let embeddingIndex = 0;
  const rows = documents.map((doc) => ({
    content: doc.content,
    metadata: doc.metadata ?? {},
    embedding: doc.embedding ?? embeddings[embeddingIndex++],
  }));

  const { error, count } = await supabase.from(collection).upsert(rows);

  if (error) throw error;

  return { count: count ?? rows.length };
}

/**
 * SQL to create the pgvector documents table and match function.
 * Run this in your Supabase SQL editor to set up RAG.
 */
export const SETUP_SQL = `
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for fast similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Create match function for RPC
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_count INT DEFAULT 5,
  match_threshold FLOAT DEFAULT 0.5,
  table_name TEXT DEFAULT 'documents'
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    d.id,
    d.content,
    d.metadata,
    1 - (d.embedding <=> query_embedding) AS similarity
  FROM documents d
  WHERE 1 - (d.embedding <=> query_embedding) > match_threshold
  ORDER BY d.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
`;
