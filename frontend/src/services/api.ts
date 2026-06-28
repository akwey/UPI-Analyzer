import axios from "axios";
import type {
  AnalyticsSummary,
  DashboardSummary,
  Transaction,
  TransactionFilters,
} from "@/types/transaction";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

function buildTransactionParams(filters: Partial<TransactionFilters>) {
  const params: Record<string, string> = {};
  if (filters.dateFilter) params.dateFilter = filters.dateFilter;
  if (filters.typeFilter) params.type = filters.typeFilter;
  if (filters.categoryFilter) params.category = filters.categoryFilter;
  if (filters.search) params.search = filters.search;
  if (filters.sortBy) params.sortBy = filters.sortBy;
  return params;
}

export async function fetchTransactions(
  filters: Partial<TransactionFilters> = {}
): Promise<Transaction[]> {
  const { data } = await api.get<Transaction[]>("/transactions", {
    params: buildTransactionParams(filters),
  });
  return data;
}

export async function createTransaction(message: string): Promise<Transaction> {
  const { data } = await api.post<Transaction>("/transactions", { message });
  return data;
}

export async function updateTransactionCategory(
  id: number,
  category: string
): Promise<Transaction> {
  const { data } = await api.put<Transaction>(`/transactions/${id}`, { category });
  return data;
}

export async function fetchDashboard(): Promise<DashboardSummary> {
  const { data } = await api.get<DashboardSummary>("/dashboard");
  return data;
}

export async function fetchAnalytics(): Promise<AnalyticsSummary> {
  const { data } = await api.get<AnalyticsSummary>("/analytics");
  return data;
}

export default api;
