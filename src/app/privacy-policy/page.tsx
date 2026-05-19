import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy | Pathway',
  description: 'How Pathway collects, uses, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy."
      description="How Pathway collects, uses, and protects information you share with us."
    >
      <PlaceholderBody>
        <p>
          The full Privacy Policy is being migrated here. Until then, the active policy remains the one
          published at yourpathway.com.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
