import Link from 'next/link';

const PHONE_DISPLAY = "(877) 958-1888";
const PHONE_HREF = "tel:+18779581888";
const BROWSE_URL = "https://www.yourpathway.com/listing-search";
const APPLY_URL = "https://www.yourpathway.com/apply";
const AGENTS_URL = "https://www.yourpathway.com/agents";

const MARKETS = [
  { label: 'Dallas-Fort Worth, TX', slug: 'dallas' },
  { label: 'Denver, CO', slug: 'denver' },
  { label: 'Charlotte, NC', slug: 'charlotte' },
  { label: 'Nashville, TN', slug: 'nashville' },
  { label: 'Atlanta, GA', slug: 'atlanta' },
];

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/PathwayHomesUS',
    path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/pathway.homes/',
    path: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm2 12a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2v8zm-6-7a3 3 0 100 6 3 3 0 000-6zm4.5-.5a1 1 0 100-2 1 1 0 000 2z',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCBvQNCo8X8tlvlSJybuOCJg',
    path: 'M23 6.5a3 3 0 00-2.1-2.1C19.1 4 12 4 12 4s-7.1 0-8.9.4A3 3 0 001 6.5S.8 8.5.8 10.5v1.8c0 2 .2 4 .2 4a3 3 0 002.1 2.1c1.8.5 8.9.5 8.9.5s7.1 0 8.9-.4a3 3 0 002.1-2.1s.2-2 .2-4v-1.8c0-2-.2-4-.2-4zM10 15V9l5.2 3L10 15z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pathwayhomes/',
    path: 'M20.4 2H3.6A1.6 1.6 0 002 3.6v16.8A1.6 1.6 0 003.6 22h16.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0020.4 2zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.6a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.3 9.7h-2.6v-4.2c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2v4.3h-2.6V9.7h2.5v1.2h.03c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4v4.76z',
  },
];

export default function Footer() {
  return (
    <footer className="mx-4 mb-4 rounded-2xl bg-dark-teal px-6 py-10 text-white md:mx-6 md:mb-6 md:px-10 md:py-12">
      <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="mb-3 inline-block font-serif text-[22px] text-white">
            Pathway
          </Link>
          <p className="mb-5 max-w-[260px] text-sm leading-relaxed text-white/55">
            Rent to own, reimagined. Move in today, buy when you&apos;re ready.
          </p>
          <a href={PHONE_HREF} className="flex items-center gap-2 text-base font-semibold text-white">
            <PhoneIcon className="h-4 w-4 opacity-60" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <FooterColumn title="Markets">
          {MARKETS.map((m) => (
            <a
              key={m.slug}
              href={`${BROWSE_URL}?market=${m.slug}`}
              className="block py-1 text-sm text-white/75 transition-colors hover:text-white"
            >
              {m.label}
            </a>
          ))}
        </FooterColumn>

        <FooterColumn title="Get started">
          <a href={BROWSE_URL} className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Browse homes
          </a>
          <a href={APPLY_URL} className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Start or continue application
          </a>
          <Link href="/reviews" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Reviews
          </Link>
          <a href={PHONE_HREF} className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Call us
          </a>
          <Link href="/partners" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Partners
          </Link>
        </FooterColumn>

        <FooterColumn title="Company">
          <Link href="/about-us" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            About Pathway
          </Link>
          <a href={AGENTS_URL} className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Agents
          </a>
          <Link href="/blog" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Blog
          </Link>
          <Link href="/careers" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Careers
          </Link>
          <Link href="/contact" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Contact us
          </Link>
          <Link href="/brokerage-licensing" className="block py-1 text-sm text-white/75 transition-colors hover:text-white">
            Legal &amp; compliance
          </Link>
        </FooterColumn>
      </div>

      <div className="flex flex-col flex-wrap items-start justify-between gap-4 pt-6 md:flex-row md:items-center">
        <div>
          <p className="text-xs leading-relaxed text-white/35">
            &copy; 2026 Resi Labs Pathway OpCo LP &middot;{' '}
            <Link href="/terms-conditions" className="text-white/45 transition-colors hover:text-white/70">
              Terms
            </Link>{' '}
            &middot;{' '}
            <Link href="/privacy-policy" className="text-white/45 transition-colors hover:text-white/70">
              Privacy
            </Link>{' '}
            &middot;{' '}
            <Link href="/application-policy" className="text-white/45 transition-colors hover:text-white/70">
              Application policy
            </Link>{' '}
            &middot;{' '}
            <Link href="/brokerage-licensing" className="text-white/45 transition-colors hover:text-white/70">
              Brokerage &amp; licensing
            </Link>
          </p>
          <div className="mt-2 flex items-center gap-2 text-white/30">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 2L1 12h3v10h16V12h3L12 2zm0 2.8L19 12v8H5v-8l7-7.2zM8 14h8v2H8v-2zm0-3h8v2H8v-2z" />
            </svg>
            <span className="text-[11px]">Equal Housing Opportunity</span>
          </div>
        </div>

        <ul className="flex gap-2" aria-label="Social media">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 transition-colors hover:bg-white/15"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white/60" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[1.2px] text-white/40">
        {title}
      </h4>
      {children}
    </div>
  );
}
