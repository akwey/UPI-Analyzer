import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  fetchAnalytics,
  fetchDashboard,
  fetchTransactions,
  updateTransactionCategory,
} from "@/services/api";
import type { TransactionFilters } from "@/types/transaction";

export const QUERY_KEYS = {
  transactions: (filters: Partial<TransactionFilters>) => ["transactions", filters] as const,
  dashboard: ["dashboard"] as const,
  analytics: ["analytics"] as const,
};

export function useTransactions(filters: Partial<TransactionFilters>) {
  return useQuery({
    queryKey: QUERY_KEYS.transactions(filters),
    queryFn: () => fetchTransactions(filters),
  });
}

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: fetchDashboard,
  });
}

export function useAnalytics() {
  return useQuery({
    queryKey: QUERY_KEYS.analytics,
    queryFn: fetchAnalytics,
  });
}

function useInvalidateAllTransactionData() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analytics });
  };
}

export function useCreateTransaction() {
  const invalidateAll = useInvalidateAllTransactionData();

  return useMutation({
    mutationFn: (message: string) => createTransaction(message),
    onSuccess: invalidateAll,
  });
}

export function useUpdateTransactionCategory() {
  const invalidateAll = useInvalidateAllTransactionData();

  return useMutation({
    mutationFn: ({ id, category }: { id: number; category: string }) =>
      updateTransactionCategory(id, category),
    onSuccess: invalidateAll,
  });
}
