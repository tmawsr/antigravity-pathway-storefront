import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Brokerage & Licensing | Pathway',
  description: 'Pathway brokerage information, state licensing, and compliance disclosures.',
};

export default function BrokerageLicensingPage() {
  return (
    <PageShell
      eyebrow="Legal & compliance"
      title="Brokerage & licensing."
      description="State-by-state licensing, brokerage information, and required compliance disclosures."
    >
      <PlaceholderBody>
        <p>
          The full brokerage and licensing detail page is being migrated here from yourpathway.com.
          It will include entity names, license numbers, broker-of-record information, and required
          disclosures for each market we operate in.
        </p>
        <p>
          For licensing questions in the interim, contact{' '}
          <a href="mailto:legal@yourpathway.com" className="font-semibold text-pathway-blue hover:underline">
            legal@yourpathway.com
          </a>
          .
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
