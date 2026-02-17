/**
 * Supabase Edge Function: Webhook Handler
 *
 * Generic webhook endpoint for processing external events
 * (Stripe, GitHub, Slack, custom integrations).
 *
 * Deploy: supabase functions deploy webhook
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
    const url = new URL(req.url);
    const source = url.searchParams.get('source') || 'unknown';
    const payload = await req.json();

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Log webhook event
    const { error } = await supabase.from('webhook_events').insert({
      source,
      payload,
      headers: Object.fromEntries(req.headers.entries()),
      processed: false,
    });

    if (error) throw error;

    // Route by source
    switch (source) {
      case 'stripe':
        // Handle Stripe webhook events (payment, subscription, etc.)
        console.log('Stripe event:', payload.type);
        break;
      case 'github':
        // Handle GitHub webhook events (push, PR, issues, etc.)
        console.log('GitHub event:', payload.action);
        break;
      default:
        console.log(`Webhook from ${source}:`, JSON.stringify(payload).slice(0, 200));
    }

    return new Response(JSON.stringify({ received: true, source }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
