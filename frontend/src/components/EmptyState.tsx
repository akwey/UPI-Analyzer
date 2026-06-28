import { Inbox, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl2 border-2 border-dashed border-ink-300/60 bg-gradient-to-br from-white/80 to-ink-50/30 px-6 py-16 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 ring-4 ring-white shadow-lg">
        <Icon size={28} className="text-brand-500" strokeWidth={1.5} />
      </div>
      <div className="space-y-1">
        <h3 className="font-display font-bold text-ink-900 text-base">{title}</h3>
        <p className="max-w-sm text-sm text-ink-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
