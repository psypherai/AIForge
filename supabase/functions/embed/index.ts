/**
 * Supabase Edge Function: Embed
 *
 * Generate embeddings for text and store them in pgvector.
 * Runs at the edge for low-latency document ingestion.
 *
 * Deploy: supabase functions deploy embed
 */

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { texts, metadata = {} } = await req.json();

    if (!Array.isArray(texts) || texts.length === 0) {
      return new Response(JSON.stringify({ error: 'texts array is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Generate embeddings via OpenAI
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: texts,
      }),
    });

    const { data: embeddings } = await embeddingResponse.json();

    // Store in Supabase pgvector
    const supabase = createClient(supabaseUrl, supabaseKey);

    const documents = texts.map((text: string, i: number) => ({
      content: text,
      embedding: embeddings[i].embedding,
      metadata,
    }));

    const { data, error } = await supabase.from('documents').insert(documents).select('id');

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, count: data.length, ids: data.map((d: { id: string }) => d.id) }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
