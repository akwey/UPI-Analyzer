import { ArrowDownLeft, ArrowUpRight, Wallet, Gift, type LucideIcon } from "lucide-react";
import type { DashboardSummary } from "@/types/transaction";
import { formatCurrency } from "@/utils/format";

interface SummaryCardsProps {
  dashboard?: DashboardSummary;
  isLoading: boolean;
}

interface CardSpec {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconText: string;
  valueColor?: string;
}

export function SummaryCards({ dashboard, isLoading }: SummaryCardsProps) {
  if (isLoading || !dashboard) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 rounded-xl2 bg-white/60 border border-ink-300/30 animate-pulse" />
        ))}
      </div>
    );
  }

  const cards: CardSpec[] = [
    {
      label: "Total Income",
      value: formatCurrency(dashboard.totalIncome),
      icon: ArrowDownLeft,
      iconBg: "bg-emerald-50",
      iconText: "text-income",
      valueColor: "text-income",
    },
    {
      label: "Total Expense",
      value: formatCurrency(dashboard.totalExpense),
      icon: ArrowUpRight,
      iconBg: "bg-rose-50",
      iconText: "text-expense",
      valueColor: "text-expense",
    },
    {
      label: "Current Balance",
      value: formatCurrency(dashboard.balance),
      icon: Wallet,
      iconBg: "bg-brand-50",
      iconText: "text-brand-600",
      valueColor: dashboard.balance < 0 ? "text-expense" : "text-ink-900",
    },
    {
      label: "Total Cashback",
      value: formatCurrency(dashboard.totalCashback),
      icon: Gift,
      iconBg: "bg-amber-50",
      iconText: "text-amber-600",
      valueColor: "text-ink-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl2 bg-surface p-4 shadow-card border border-ink-300/30 hover:shadow-cardHover transition-shadow"
        >
          <div className={`flex h-9 w-9 items-center justify-center rounded-full ${card.iconBg}`}>
            <card.icon size={18} className={card.iconText} />
          </div>
          <p className="mt-3 text-xs font-medium text-ink-500">{card.label}</p>
          <p className={`font-display text-lg font-semibold ${card.valueColor ?? "text-ink-900"}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
