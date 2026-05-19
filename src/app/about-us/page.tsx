import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'About Pathway | Pathway',
  description: 'Pathway reimagines rent-to-own so more families can move in today and buy when ready.',
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About Pathway"
      title="Rent to own, reimagined."
      description="Pathway exists to make the path from renting to owning a home shorter, clearer, and fairer. Move in today. Buy when you’re ready."
    >
      <PlaceholderBody>
        <p>
          Our full story — the team, what we believe, and how the program works — is coming here.
        </p>
        <p>
          Pathway is operated by Resi Labs Pathway OpCo LP. We&apos;re actively serving residents across
          multiple U.S. markets and growing.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
