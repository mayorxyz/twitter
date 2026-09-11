import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';
import type { Request } from '@/types';

export function useMarketplaceRequests(filters?: {
  status?: string;
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery<Request[]>({
    queryKey: queryKeys.requests.list(filters),
    queryFn: () => apiClient.getRequests(filters) as Promise<Request[]>,
    staleTime: 10 * 1000, // 10 seconds - refresh frequently for slot availability
  });
}

export function useMyRequests(status?: string) {
  return useQuery<Request[]>({
    queryKey: queryKeys.requests.myRequests(status),
    queryFn: () => apiClient.getMyRequests(status) as Promise<Request[]>,
    staleTime: 15 * 1000,
  });
}

export function useRequestById(id: string) {
  return useQuery<Request>({
    queryKey: queryKeys.requests.byId(id),
    queryFn: () => apiClient.getRequestById(id) as Promise<Request>,
    enabled: !!id,
  });
}
