import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Careers | Pathway',
  description: 'Help us build a better path to homeownership.',
};

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Build the path to homeownership."
      description="We’re a small, multidisciplinary team rebuilding what rent-to-own can be. Open roles will be listed here."
    >
      <PlaceholderBody>
        <p>
          Open roles and information about working at Pathway will live on this page.
        </p>
        <p>
          Interested before there&apos;s a formal posting? Email your background to{' '}
          <a href="mailto:hello@yourpathway.com" className="font-semibold text-pathway-blue hover:underline">
            hello@yourpathway.com
          </a>
          .
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
