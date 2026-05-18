import type { ReactNode } from 'react';

interface PageShellProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function PageShell({ eyebrow, title, description, children }: PageShellProps) {
  return (
    <article className="flex flex-1 flex-col bg-light-beige px-4 md:px-6">
      <header className="mx-auto w-full max-w-5xl pt-10 pb-8 md:pt-20 md:pb-12">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-pathway-blue md:mb-4 md:text-sm">
            {eyebrow}
          </p>
        )}
        <h1 className="mb-4 font-serif text-4xl tracking-tight text-dark-teal sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-base leading-relaxed text-text-muted md:text-xl">
            {description}
          </p>
        )}
      </header>
      <div className="mx-auto w-full max-w-5xl pb-16 md:pb-24">{children}</div>
    </article>
  );
}

export function PlaceholderBody({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-medium-teal/12 bg-white p-6 md:p-10">
      <p className="mb-3 text-xs font-bold uppercase tracking-[1.5px] text-text-muted">
        Coming soon
      </p>
      <div className="space-y-4 text-base leading-relaxed text-dark-teal/80 md:text-lg">
        {children}
      </div>
    </div>
  );
}
