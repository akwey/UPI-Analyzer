export function TransactionCardSkeleton() {
  return (
    <div className="rounded-xl2 bg-surface p-5 shadow-card border border-ink-300/30 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      <div className="flex items-start justify-between gap-4 relative">
        <div className="flex items-start gap-3.5 w-full">
          <div className="h-12 w-12 shrink-0 rounded-full bg-ink-300/40" />
          <div className="flex-1 space-y-2.5">
            <div className="h-4 w-1/3 rounded bg-ink-300/40" />
            <div className="h-3 w-2/3 rounded bg-ink-300/30" />
            <div className="h-3 w-1/4 rounded bg-ink-300/30" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 rounded bg-ink-300/40" />
          <div className="h-6 w-20 rounded bg-ink-300/30" />
        </div>
      </div>
    </div>
  );
}

export function TransactionFeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <TransactionCardSkeleton />
        </div>
      ))}
    </div>
  );
}
