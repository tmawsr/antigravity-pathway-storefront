import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Application Policy | Pathway',
  description: 'How Pathway evaluates applications, what we look for, and what we don’t.',
};

export default function ApplicationPolicyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Application Policy."
      description="Our application criteria, the information we ask for, and the protections we follow."
    >
      <PlaceholderBody>
        <p>
          The full Application Policy is being migrated here. It covers application criteria, the
          information we collect, what factors do and don’t influence approval, and the protections
          we follow under fair housing and consumer-credit law.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
