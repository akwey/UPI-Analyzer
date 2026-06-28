import { Receipt } from "lucide-react";
import type { Transaction } from "@/types/transaction";
import { TransactionCard } from "@/components/TransactionCard";
import { TransactionFeedSkeleton } from "@/components/TransactionFeedSkeleton";
import { EmptyState } from "@/components/EmptyState";

interface TransactionFeedProps {
  transactions?: Transaction[];
  isLoading: boolean;
  isError: boolean;
  hasActiveFilters: boolean;
}

export function TransactionFeed({
  transactions,
  isLoading,
  isError,
  hasActiveFilters,
}: TransactionFeedProps) {
  if (isLoading) {
    return <TransactionFeedSkeleton />;
  }

  if (isError) {
    return (
      <EmptyState
        icon={Receipt}
        title="Couldn't load transactions"
        description="Something went wrong while fetching your transactions. Please try again in a moment."
      />
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon={Receipt}
        title={hasActiveFilters ? "No matching transactions" : "No transactions yet"}
        description={
          hasActiveFilters
            ? "Try adjusting your search or filters."
            : "Add your first UPI message above to start tracking your spending."
        }
      />
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div key={transaction.id} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
          <TransactionCard transaction={transaction} />
        </div>
      ))}
    </div>
  );
}
