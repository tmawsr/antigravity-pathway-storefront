import { NextResponse } from 'next/server';

// Required fields that must be present and non-empty.
// Note: 'income' is a free-text currency field (e.g. "$75,000"), not a dropdown.
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

    // Log the full payload for development
    console.log('[Form Entry] Lead submission received:', JSON.stringify(payload, null, 2));

    // TODO: Wire to Salesforce Form Entry custom object

    return NextResponse.json({ success: true, message: 'Form entry received' });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
