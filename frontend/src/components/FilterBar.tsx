import { ArrowDownUp } from "lucide-react";
import type { DateFilter, SortOption, TypeFilter } from "@/types/transaction";
import { CATEGORY_OPTIONS } from "@/types/transaction";

interface FilterBarProps {
  dateFilter: DateFilter;
  onDateFilterChange: (value: DateFilter) => void;
  typeFilter: TypeFilter;
  onTypeFilterChange: (value: TypeFilter) => void;
  categoryFilter: string | null;
  onCategoryFilterChange: (value: string | null) => void;
  sortBy: SortOption;
  onSortByChange: (value: SortOption) => void;
}

const DATE_OPTIONS: { label: string; value: DateFilter }[] = [
  { label: "All Time", value: null },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
];

const TYPE_OPTIONS: { label: string; value: TypeFilter }[] = [
  { label: "All", value: null },
  { label: "Income", value: "Income" },
  { label: "Expense", value: "Expense" },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Highest Amount", value: "highest" },
  { label: "Lowest Amount", value: "lowest" },
  { label: "Merchant Name", value: "merchant" },
];

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
          : "bg-white text-ink-700 border border-ink-300/60 hover:border-brand-400 hover:shadow-sm hover:scale-105"
      }`}
    >
      {label}
    </button>
  );
}

export function FilterBar({
  dateFilter,
  onDateFilterChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortByChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {DATE_OPTIONS.map((option) => (
          <Chip
            key={option.label}
            label={option.label}
            active={dateFilter === option.value}
            onClick={() => onDateFilterChange(option.value)}
          />
        ))}
        <span className="mx-1 h-4 w-px bg-ink-300/50" />
        {TYPE_OPTIONS.map((option) => (
          <Chip
            key={option.label}
            label={option.label}
            active={typeFilter === option.value}
            onClick={() => onTypeFilterChange(option.value)}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={categoryFilter ?? ""}
          onChange={(event) => onCategoryFilterChange(event.target.value || null)}
          aria-label="Filter by category"
          className="rounded-lg border border-ink-300/60 bg-white px-3 py-2 text-xs font-semibold text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 focus:shadow-sm transition-all duration-200 cursor-pointer hover:border-ink-300"
        >
          <option value="">All Categories</option>
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-1.5">
          <ArrowDownUp size={14} className="text-ink-500" />
          <select
            value={sortBy}
            onChange={(event) => onSortByChange(event.target.value as SortOption)}
            aria-label="Sort transactions"
            className="rounded-lg border border-ink-300/60 bg-white px-3 py-2 text-xs font-semibold text-ink-700 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 focus:shadow-sm transition-all duration-200 cursor-pointer hover:border-ink-300"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
