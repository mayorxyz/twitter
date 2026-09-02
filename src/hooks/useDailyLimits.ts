import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

export function useDailyLimits() {
  return useQuery({
    queryKey: queryKeys.limits.daily,
    queryFn: () => apiClient.getDailyLimits(),
    staleTime: 30 * 1000, // 30 seconds
  });
}
