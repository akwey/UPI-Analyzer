export type TransactionType = "Income" | "Expense" | "Unknown";

export type Category =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Salary"
  | "Medical"
  | "Miscellaneous";

export const CATEGORY_OPTIONS: Category[] = [
  "Food",
  "Travel",
  "Shopping",
  "Entertainment",
  "Salary",
  "Medical",
  "Bills",
  "Miscellaneous",
];

export interface Cashback {
  rewardType: string;
  amount: number | null;
}

export interface Transaction {
  id: number;
  description: string;
  merchant: string;
  amount: number;
  transactionType: TransactionType;
  category: Category;
  isManualCategory: boolean;
  cashback: Cashback | null;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  totalCashback: number;
  categoryTotals: Record<string, number>;
}

export interface CategorySlice {
  category: string;
  amount: number;
  percentage: number;
}

export interface AnalyticsSummary {
  pieChartData: CategorySlice[];
  progressBarData: CategorySlice[];
  topSpendingCategory: string | null;
  highestExpenseTransaction: Transaction | null;
  averageTransaction: number;
}

export type DateFilter = "today" | "7days" | "30days" | null;
export type TypeFilter = "Income" | "Expense" | null;
export type SortOption = "newest" | "oldest" | "highest" | "lowest" | "merchant";

export interface TransactionFilters {
  dateFilter: DateFilter;
  typeFilter: TypeFilter;
  categoryFilter: string | null;
  search: string;
  sortBy: SortOption;
}
