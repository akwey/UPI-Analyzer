import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, subtitle, children, className = "" }: PanelProps) {
  return (
    <section className={`rounded-xl2 bg-surface p-5 shadow-card border border-ink-300/30 hover:border-ink-300/50 transition-all duration-200 ${className}`}>
      <header className="mb-4">
        <h2 className="font-display text-base font-semibold text-ink-900 tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
