import { TrendingUp, Crown, Calculator } from "lucide-react";
import type { AnalyticsSummary } from "@/types/transaction";
import { formatCurrency } from "@/utils/format";

interface AnalyticsHighlightsProps {
  analytics: AnalyticsSummary;
}

export function AnalyticsHighlights({ analytics }: AnalyticsHighlightsProps) {
  const items = [
    {
      label: "Top Spending Category",
      value: analytics.topSpendingCategory ?? "—",
      icon: Crown,
    },
    {
      label: "Highest Expense",
      value: analytics.highestExpenseTransaction
        ? `${formatCurrency(analytics.highestExpenseTransaction.amount)} · ${analytics.highestExpenseTransaction.merchant}`
        : "—",
      icon: TrendingUp,
    },
    {
      label: "Average Transaction",
      value: formatCurrency(analytics.averageTransaction),
      icon: Calculator,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item, index) => (
        <div 
          key={item.label} 
          className="group relative overflow-hidden rounded-xl2 border border-ink-300/30 bg-gradient-to-br from-white to-canvas/50 p-4 hover:shadow-cardHover hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-ink-500 uppercase tracking-wide">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-600">
              <item.icon size={12} strokeWidth={2.5} />
            </div>
            {item.label}
          </div>
          <p className="mt-2.5 truncate font-display text-sm font-bold text-ink-900 leading-tight" title={item.value}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
