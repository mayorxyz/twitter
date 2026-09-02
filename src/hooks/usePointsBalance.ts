import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

export function usePointsBalance() {
  return useQuery({
    queryKey: queryKeys.points.summary,
    queryFn: () => apiClient.getPointsSummary(),
    staleTime: 30 * 1000, // 30 seconds
  });
}
