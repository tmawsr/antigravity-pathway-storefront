import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Pathway',
  description: 'Pathway website Terms & Conditions.',
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms & Conditions."
      description="The terms that govern your use of this website and Pathway’s services."
    >
      <PlaceholderBody>
        <p>
          The full Terms & Conditions document is being migrated here. Until then, the active terms
          remain those published at yourpathway.com.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
