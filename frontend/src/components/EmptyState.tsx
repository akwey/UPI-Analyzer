import { Inbox, type LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl2 border border-dashed border-ink-300/60 bg-white/60 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50">
        <Icon size={22} className="text-brand-500" />
      </div>
      <h3 className="font-display font-semibold text-ink-900">{title}</h3>
      <p className="max-w-sm text-sm text-ink-500">{description}</p>
    </div>
  );
}
