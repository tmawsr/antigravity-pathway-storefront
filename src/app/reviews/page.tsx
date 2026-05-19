import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Reviews | Pathway',
  description: 'Hear from Pathway residents about the journey from renter to homeowner.',
};

export default function ReviewsPage() {
  return (
    <PageShell
      eyebrow="Reviews"
      title="Real stories from Pathway residents."
      description="Hundreds of families have used Pathway to move into the home they wanted, then bought it on their timeline. Their stories are coming here."
    >
      <PlaceholderBody>
        <p>
          A curated set of resident reviews, video stories, and case studies will live on this page.
          For now, you can hear directly from our team or read existing reviews on yourpathway.com.
        </p>
        <p>
          Call us at <a href="tel:+18779581888" className="font-semibold text-pathway-blue hover:underline">(877) 958-1888</a> to talk through how Pathway works.
        </p>
      </PlaceholderBody>
    </PageShell>
  );
}
