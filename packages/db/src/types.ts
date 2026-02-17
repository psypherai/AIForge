/**
 * Supabase Database types.
 *
 * Auto-generate with: pnpm --filter @aiforge/db db:generate
 * This is a starter template — replace with generated types.
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: string;
          content: string;
          metadata: Record<string, unknown>;
          embedding: number[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          content: string;
          metadata?: Record<string, unknown>;
          embedding?: number[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          content?: string;
          metadata?: Record<string, unknown>;
          embedding?: number[] | null;
          updated_at?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          title: string | null;
          model: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title?: string | null;
          model?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          title?: string | null;
          model?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          metadata: Record<string, unknown>;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          metadata?: Record<string, unknown>;
          created_at?: string;
        };
        Update: {
          content?: string;
          metadata?: Record<string, unknown>;
        };
      };
    };
    Functions: {
      match_documents: {
        Args: {
          query_embedding: number[];
          match_count: number;
          match_threshold: number;
          table_name?: string;
        };
        Returns: Array<{
          id: string;
          content: string;
          metadata: Record<string, unknown>;
          similarity: number;
        }>;
      };
    };
  };
}
