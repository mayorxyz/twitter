import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type { PointsSummary } from '@/types';

export function usePointsBalance() {
  return useQuery<PointsSummary>({
    queryKey: queryKeys.points.summary,
    queryFn: () => apiClient.getPointsSummary() as Promise<PointsSummary>,
    staleTime: 30 * 1000, // 30 seconds
  });
}
