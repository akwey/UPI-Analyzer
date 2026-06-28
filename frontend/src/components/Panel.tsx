import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, children, className = "" }: PanelProps) {
  return (
    <section className={`rounded-xl2 bg-surface p-5 shadow-card border border-ink-300/30 ${className}`}>
      <header className="mb-4">
        <h2 className="font-display text-base font-semibold text-ink-900">{title}</h2>
        {subtitle && <p className="text-sm text-ink-500">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
