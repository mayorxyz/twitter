import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { queryKeys } from '@/lib/query-keys';

export function useMarketplaceRequests(filters?: {
  status?: string;
  type?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: queryKeys.requests.list(filters),
    queryFn: () => apiClient.getRequests(filters),
    staleTime: 10 * 1000, // 10 seconds - refresh frequently for slot availability
  });
}

export function useMyRequests(status?: string) {
  return useQuery({
    queryKey: queryKeys.requests.myRequests(status),
    queryFn: () => apiClient.getMyRequests(status),
    staleTime: 15 * 1000,
  });
}

export function useRequestById(id: string) {
  return useQuery({
    queryKey: queryKeys.requests.byId(id),
    queryFn: () => apiClient.getRequestById(id),
    enabled: !!id,
  });
}
