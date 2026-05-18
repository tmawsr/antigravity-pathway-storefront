import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Blog | Pathway',
  description: 'Guides, market notes, and homeowner stories from the Pathway team.',
};

export default function BlogPage() {
  return (
    <PageShell
      eyebrow="Blog"
      title="Notes from the Pathway team."
      description="Guides on credit and mortgages, market updates, and stories from our residents — coming soon."
    >
      <PlaceholderBody>
        <p>
          We&apos;re putting together a small library of practical articles on rent-to-own, credit-building,
          and the path to a first mortgage. Check back here, or sign up for updates by reaching out to our team.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
