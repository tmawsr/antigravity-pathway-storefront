import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Required fields that must be present and non-empty.
const REQUIRED_FIELDS = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'market',
  'hasAgent',
  'purchaseIntent',
  'moveTimeframe',
  'creditScore',
  'income',
  'referralSource',
] as const;

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Validate required fields
    const missing = REQUIRED_FIELDS.filter(f => !payload[f] || String(payload[f]).trim() === '');
    if (missing.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missing },
        { status: 400 }
      );
    }

    // Validate conditional required fields
    if (payload.market === 'Other' && (!payload.otherMarket || !payload.otherMarket.trim())) {
      return NextResponse.json({ error: 'otherMarket is required when market is Other' }, { status: 400 });
    }
    if (payload.hasAgent === 'Yes' && (!payload.agentName || !payload.agentName.trim())) {
      return NextResponse.json({ error: 'agentName is required when hasAgent is Yes' }, { status: 400 });
    }
    if (payload.purchaseIntent === 'Yes' && (!payload.purchaseTimeline || !payload.purchaseTimeline.trim())) {
      return NextResponse.json({ error: 'purchaseTimeline is required when purchaseIntent is Yes' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Map camelCase form fields to snake_case database columns
    const row = {
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      market: payload.market,
      other_market: payload.otherMarket || null,
      has_agent: payload.hasAgent,
      agent_name: payload.agentName || null,
      agent_phone: payload.agentPhone || null,
      agent_email: payload.agentEmail || null,
      purchase_intent: payload.purchaseIntent,
      purchase_timeline: payload.purchaseTimeline || null,
      move_timeframe: payload.moveTimeframe,
      credit_score: payload.creditScore,
      savings: payload.savings || null,
      income: payload.income,
      referral_source: payload.referralSource,
      comments: payload.comments || null,
      // Tracking / Attribution
      lead_source: payload.lead_source || null,
      form_cta: payload.form_cta || null,
      page_url: payload.page_url || null,
      referrer_url: payload.referrer_url || null,
      device_type: payload.device_type || null,
      submission_timestamp: payload.submission_timestamp || new Date().toISOString(),
      tcpa_consent_version: payload.tcpa_consent_version || null,
      // UTM params
      utm_source: payload.utm_source || null,
      utm_medium: payload.utm_medium || null,
      utm_campaign: payload.utm_campaign || null,
      utm_term: payload.utm_term || null,
      utm_content: payload.utm_content || null,
    };

    // Insert into Supabase
    const { error } = await supabase
      .from('form_entries')
      .insert(row);

    if (error) {
      console.error('[Form Entry] Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save form entry' },
        { status: 500 }
      );
    }

    console.log('[Form Entry] Saved to Supabase:', payload.email);

    return NextResponse.json({ success: true, message: 'Form entry received' });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
