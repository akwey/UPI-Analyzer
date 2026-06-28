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
      {items.map((item) => (
        <div key={item.label} className="rounded-xl2 border border-ink-300/30 bg-canvas/60 p-3.5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <item.icon size={14} />
            {item.label}
          </div>
          <p className="mt-1.5 truncate font-display text-sm font-semibold text-ink-900" title={item.value}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
