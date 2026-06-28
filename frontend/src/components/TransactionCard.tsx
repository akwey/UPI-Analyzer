import { Gift, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { formatCurrency, formatDate, getErrorMessage } from "@/utils/format";
import { getCategoryMeta } from "@/utils/categoryMeta";
import { CategorySelect } from "@/components/CategorySelect";
import { useUpdateTransactionCategory } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/useToast";

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const { mutate: updateCategory, isPending } = useUpdateTransactionCategory();
  const { showToast } = useToast();
  const { icon: CategoryIcon, bg, text } = getCategoryMeta(transaction.category);
  const isIncome = transaction.transactionType === "Income";

  function handleCategoryChange(category: string) {
    updateCategory(
      { id: transaction.id, category },
      {
        onSuccess: () => showToast(`Moved to ${category}`),
        onError: (error) => showToast(getErrorMessage(error, "Couldn't update category."), "error"),
      }
    );
  }

  return (
    <article className="group rounded-xl2 bg-surface p-4 shadow-card hover:shadow-cardHover transition-shadow border border-ink-300/30">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${bg}`}>
            <CategoryIcon size={20} className={text} strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-ink-900 truncate">{transaction.merchant}</h3>
            <p className="text-sm text-ink-500 truncate" title={transaction.description}>
              {transaction.description}
            </p>
            <p className="mt-1 text-xs text-ink-500">{formatDate(transaction.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span
            className={`flex items-center gap-1 font-display font-semibold text-base ${
              isIncome ? "text-income" : "text-ink-900"
            }`}
          >
            {isIncome ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
            {isIncome ? "+" : "-"}
            {formatCurrency(transaction.amount)}
          </span>
          <CategorySelect
            value={transaction.category}
            onChange={handleCategoryChange}
            disabled={isPending}
          />
        </div>
      </div>

      {transaction.cashback && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-cashback w-fit">
          <Gift size={14} />
          {transaction.cashback.amount != null
            ? `Expected savings: ${formatCurrency(transaction.cashback.amount)} (${transaction.cashback.rewardType})`
            : `${transaction.cashback.rewardType} earned`}
        </div>
      )}
    </article>
  );
}
