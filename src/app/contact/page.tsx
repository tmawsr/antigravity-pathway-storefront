import type { Metadata } from 'next';
import PageShell, { PlaceholderBody } from '@/components/PageShell';

export const metadata: Metadata = {
  title: 'Contact us | Pathway',
  description: 'Get in touch with the Pathway team by phone or email.',
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Talk to a human at Pathway."
      description="Real people, weekday business hours. Call us with any questions about the program, your application, or your home."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="rounded-2xl border border-medium-teal/12 bg-white p-6 md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-text-muted">Phone</p>
          <a
            href="tel:+18779581888"
            className="block font-serif text-3xl text-dark-teal hover:text-pathway-blue md:text-4xl"
          >
            (877) 958-1888
          </a>
          <p className="mt-2 text-sm text-text-muted">Mon&ndash;Fri, 9am&ndash;6pm CT.</p>
        </div>
        <div className="rounded-2xl border border-medium-teal/12 bg-white p-6 md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[1.5px] text-text-muted">Email</p>
          <a
            href="mailto:hello@yourpathway.com"
            className="block font-serif text-3xl text-dark-teal hover:text-pathway-blue md:text-4xl"
          >
            hello@yourpathway.com
          </a>
          <p className="mt-2 text-sm text-text-muted">Usually within one business day.</p>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <PlaceholderBody>
          <p>
            A contact form and a map of our markets will live below. For now, calling or emailing is the
            fastest way to reach us.
          </p>
        </PlaceholderBody>
      </div>
    </PageShell>
  );
}
