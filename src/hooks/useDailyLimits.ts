import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { queryKeys } from '@/lib/query-keys'
import type { DailyLimit } from '@/types'

export function useDailyLimits() {
  const { data, isLoading, error } = useQuery<DailyLimit>({
    queryKey: queryKeys.limits.daily,
    queryFn: () => apiClient.getDailyLimits(),
    staleTime: 30 * 1000, // 30 seconds
  })

  // Return typed data with safe defaults
  return {
    followsUsed: data?.follows.used ?? 0,
    followsLimit: data?.follows.max ?? 0,
    followsResetsIn: data?.follows.resetsAt,
    likesUsed: data?.likes.used ?? 0,
    likesLimit: data?.likes.max ?? 0,
    likesResetsIn: data?.likes.resetsAt,
    commentsUsed: data?.comments.used ?? 0,
    commentsLimit: data?.comments.max ?? 0,
    commentsResetsIn: data?.comments.resetsAt,
    isLoading,
    error,
  }
}
