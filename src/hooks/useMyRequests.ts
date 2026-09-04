import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { queryKeys } from '@/lib/query-keys'
import type { Request } from '@/types'

export function useMyRequests() {
  return useQuery<Request[]>({
    queryKey: queryKeys.requests.mine,
    queryFn: () => apiClient.getMyRequests(),
    staleTime: 30 * 1000,
  })
}
