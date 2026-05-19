import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Partners | Pathway',
  description: 'Partner with Pathway to expand homeownership pathways in your market.',
};

export default function PartnersPage() {
  return (
    <PageShell
      eyebrow="Partners"
      title="Build with Pathway."
      description="Lenders, brokerages, builders, and community organizations partner with Pathway to help more families move into the home they want — and own it on their timeline."
    >
      <PlaceholderBody>
        <p>
          A dedicated partners overview is coming soon. We&apos;ll cover how Pathway works with lending,
          referral, and listing partners, and what onboarding looks like.
        </p>
        <p>
          In the meantime, reach out to{' '}
          <a href="tel:+18779581888" className="font-semibold text-pathway-blue hover:underline">(877) 958-1888</a>{' '}
          to talk to our partnerships team.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
