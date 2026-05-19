const PHONE_DISPLAY = "(877) 958-1888";
const PHONE_HREF = "tel:+18779581888";
const APPLY_URL = "https://www.yourpathway.com/apply";

export default function StickyMobileBar() {
  return (
    <div
      aria-label="Quick actions"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 md:hidden"
    >
      <div className="pointer-events-auto flex items-center gap-2 rounded-[14px] bg-dark-teal p-3 shadow-[0_8px_24px_rgba(0,57,74,0.24)]">
        <a
          href={PHONE_HREF}
          className="flex flex-1 items-center gap-1.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 opacity-70"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {PHONE_DISPLAY}
        </a>
        <a
          href={APPLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-[10px] bg-white px-5 py-2.5 text-[13px] font-bold text-dark-teal transition-colors hover:bg-light-slate"
        >
          Apply
        </a>
      </div>
    </div>
  );
}
