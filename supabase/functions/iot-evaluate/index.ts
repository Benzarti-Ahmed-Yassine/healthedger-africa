import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Edge Function: Evaluates cold-chain readings and returns a status message
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { lotId, temperature, humidity, location } = body || {};

    if (typeof temperature !== 'number' || typeof humidity !== 'number' || !lotId) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const inTempRange = temperature >= -80 && temperature <= -60;
    const inHumidityRange = humidity >= 30 && humidity <= 65;

    const status = inTempRange && inHumidityRange ? 'OK' : 'ALERTE';
    const message = `Lot ${lotId} @ ${location || 'N/A'} — T=${temperature}°C, H=${humidity}%`;

    return new Response(JSON.stringify({ status, message }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Bad Request' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
