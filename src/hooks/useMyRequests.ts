import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { queryKeys } from '@/lib/query-keys'
import type { Request } from '@/types'

export function useMyRequests(status?: string) {
  return useQuery<Request[]>({
    queryKey: queryKeys.requests.myRequests(status),
    queryFn: () => apiClient.getMyRequests(status),
    staleTime: 30 * 1000,
  })
}
