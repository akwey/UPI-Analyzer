import { useMemo, useState } from "react";
import { Wallet2, BarChart3 } from "lucide-react";
import { useAnalytics, useDashboard, useTransactions } from "@/hooks/useTransactions";
import { SummaryCards } from "@/components/SummaryCards";
import { AddTransactionForm } from "@/components/AddTransactionForm";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { TransactionFeed } from "@/components/TransactionFeed";
import { CategoryPieChart } from "@/components/CategoryPieChart";
import { CategoryProgressBars } from "@/components/CategoryProgressBars";
import { AnalyticsHighlights } from "@/components/AnalyticsHighlights";
import { Panel } from "@/components/Panel";
import { EmptyState } from "@/components/EmptyState";
import type { DateFilter, SortOption, TypeFilter } from "@/types/transaction";

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>(null);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filters = useMemo(
    () => ({ search, dateFilter, typeFilter, categoryFilter, sortBy }),
    [search, dateFilter, typeFilter, categoryFilter, sortBy]
  );

  const transactionsQuery = useTransactions(filters);
  const dashboardQuery = useDashboard();
  const analyticsQuery = useAnalytics();

  const hasActiveFilters = Boolean(search || dateFilter || typeFilter || categoryFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-canvas via-canvas to-brand-50/30 pb-16">
      <header className="sticky top-0 z-10 border-b border-ink-300/30 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/30 ring-2 ring-white">
            <Wallet2 size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-ink-900 leading-tight tracking-tight">
              Smart UPI Analyzer
            </h1>
            <p className="text-xs text-ink-500 leading-tight mt-0.5">Your spending, automatically organized</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 space-y-6 pt-4">
        <SummaryCards dashboard={dashboardQuery.data} isLoading={dashboardQuery.isLoading} />

        <Panel title="Add a Transaction" subtitle="Paste a raw UPI or bank SMS to parse it automatically">
          <AddTransactionForm />
        </Panel>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <FilterBar
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
            <TransactionFeed
              transactions={transactionsQuery.data}
              isLoading={transactionsQuery.isLoading}
              isError={transactionsQuery.isError}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          <div className="space-y-6">
            <Panel title="Category Spending" subtitle="Where your money went">
              {analyticsQuery.isLoading ? (
                <div className="h-56 animate-pulse rounded-xl2 bg-ink-300/10" />
              ) : analyticsQuery.data ? (
                <CategoryPieChart data={analyticsQuery.data.pieChartData} />
              ) : null}
            </Panel>

            <Panel title="Category Breakdown">
              {analyticsQuery.isLoading ? (
                <div className="h-40 animate-pulse rounded-xl2 bg-ink-300/10" />
              ) : analyticsQuery.data && analyticsQuery.data.progressBarData.length > 0 ? (
                <CategoryProgressBars data={analyticsQuery.data.progressBarData} />
              ) : (
                <EmptyState
                  icon={BarChart3}
                  title="Nothing to break down yet"
                  description="Categorized expenses will appear here as progress bars."
                />
              )}
            </Panel>

            {analyticsQuery.data && <AnalyticsHighlights analytics={analyticsQuery.data} />}
          </div>
        </div>
      </main>
    </div>
  );
}
