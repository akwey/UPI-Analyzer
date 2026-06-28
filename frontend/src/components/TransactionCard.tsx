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
    <article className="group relative rounded-xl2 bg-surface p-5 shadow-card hover:shadow-cardHover hover:-translate-y-0.5 transition-all duration-200 border border-ink-300/30 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${bg} ring-2 ring-white shadow-sm`}>
            <CategoryIcon size={22} className={text} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-semibold text-ink-900 truncate text-[15px]">{transaction.merchant}</h3>
            <p className="text-xs text-ink-500 truncate mt-0.5" title={transaction.description}>
              {transaction.description}
            </p>
            <p className="text-xs text-ink-500 mt-1.5 flex items-center gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-ink-300"></span>
              {formatDate(transaction.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <span
            className={`flex items-center gap-1.5 font-display font-bold text-base ${
              isIncome ? "text-income" : "text-ink-900"
            }`}
          >
            {isIncome ? <ArrowDownLeft size={16} className="shrink-0" /> : <ArrowUpRight size={16} className="shrink-0" />}
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
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 px-3.5 py-2 text-xs font-semibold text-income border border-emerald-100/50 w-fit">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-income/10">
            <Gift size={12} className="text-income" />
          </div>
          {transaction.cashback.amount != null
            ? `Expected savings: ${formatCurrency(transaction.cashback.amount)} (${transaction.cashback.rewardType})`
            : `${transaction.cashback.rewardType} earned`}
        </div>
      )}
    </article>
  );
}
