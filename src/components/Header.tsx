"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const PHONE_DISPLAY = "(877) 958-1888";
const PHONE_HREF = "tel:+18779581888";
const BROWSE_URL = "https://www.yourpathway.com/listing-search";
const APPLY_URL = "https://www.yourpathway.com/apply";

function LogoMark() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-teal">
      <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M12 3L3 10V21H9V15H15V21H21V10L12 3Z" fill="white" />
      </svg>
    </span>
  );
}

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

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6 md:pt-6">
      {/* Desktop header */}
      <nav
        aria-label="Primary"
        className="hidden h-[72px] items-center rounded-2xl bg-white/75 px-8 shadow-[0_1px_3px_rgba(0,57,74,0.08),0_0_0_1px_rgba(0,57,74,0.06)] backdrop-blur-md md:flex"
      >
        <Link href="/" aria-label="Pathway home" className="mr-12 flex items-center gap-2.5 text-dark-teal">
          <LogoMark />
          <span className="font-serif text-[20px] tracking-tight">Pathway</span>
        </Link>
        <div className="flex items-center gap-1">
          <a
            href={BROWSE_URL}
            className="rounded-[10px] px-4 py-2 text-[15px] font-medium text-medium-teal transition-colors hover:bg-light-slate hover:text-dark-teal"
          >
            Browse Homes
          </a>
          <Link
            href="/reviews"
            className="rounded-[10px] px-4 py-2 text-[15px] font-medium text-medium-teal transition-colors hover:bg-light-slate hover:text-dark-teal"
          >
            Reviews
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="flex items-center gap-1.5 rounded-[10px] px-4 py-2 text-sm font-semibold text-medium-teal transition-colors hover:bg-light-slate hover:text-dark-teal"
          >
            <PhoneIcon className="h-[15px] w-[15px] opacity-60" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={APPLY_URL}
            className="rounded-xl bg-dark-teal px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-medium-teal"
          >
            Apply
          </a>
        </div>
      </nav>

      {/* Mobile header */}
      <nav aria-label="Primary" className="relative md:hidden">
        <div className="flex h-16 items-center rounded-[14px] bg-white/75 px-4 shadow-[0_1px_3px_rgba(0,57,74,0.08),0_0_0_1px_rgba(0,57,74,0.06)] backdrop-blur-md">
          <Link
            href="/"
            aria-label="Pathway home"
            className="mr-auto flex items-center gap-2.5 text-dark-teal"
            onClick={closeMenu}
          >
            <LogoMark />
            <span className="font-serif text-[18px] tracking-tight">Pathway</span>
          </Link>
          <a
            href={APPLY_URL}
            className="mr-2 rounded-[10px] bg-dark-teal px-3.5 py-2 text-[13px] font-bold text-white"
          >
            Apply
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[10px]"
          >
            <span
              className={`block h-[1.5px] w-[18px] rounded-sm bg-dark-teal transition-transform ${
                open ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] rounded-sm bg-dark-teal transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-[18px] rounded-sm bg-dark-teal transition-transform ${
                open ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {open && (
          <div
            id="mobile-nav-panel"
            className="absolute inset-x-0 top-[72px] flex flex-col gap-1 rounded-[14px] bg-white p-3 shadow-[0_8px_24px_rgba(0,57,74,0.16),0_0_0_1px_rgba(0,57,74,0.04)]"
          >
            <a
              href={BROWSE_URL}
              onClick={closeMenu}
              className="rounded-[10px] px-4 py-3 text-[15px] font-medium text-medium-teal transition-colors hover:bg-light-slate hover:text-dark-teal"
            >
              Browse Homes
            </a>
            <Link
              href="/reviews"
              onClick={closeMenu}
              className="rounded-[10px] px-4 py-3 text-[15px] font-medium text-medium-teal transition-colors hover:bg-light-slate hover:text-dark-teal"
            >
              Reviews
            </Link>
            <a
              href={PHONE_HREF}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded-[10px] px-4 py-3 text-[15px] font-semibold text-medium-teal transition-colors hover:bg-light-slate hover:text-dark-teal"
            >
              <PhoneIcon className="h-4 w-4 opacity-60" />
              {PHONE_DISPLAY}
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
