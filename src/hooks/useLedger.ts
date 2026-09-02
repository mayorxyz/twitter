import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

export function useLedger(filters?: { page?: number; limit?: number; action?: string }) {
  return useQuery({
    queryKey: queryKeys.ledger.list(filters),
    queryFn: () => apiClient.getLedger(filters),
    staleTime: 30 * 1000,
  });
}
