// Centralized React Query key factory

export const queryKeys = {
  // Auth
  auth: {
    me: ['auth', 'me'] as const,
  },
  
  // Points & Ledger
  points: {
    summary: ['points', 'summary'] as const,
  },
  ledger: {
    all: ['ledger'] as const,
    list: (filters?: { page?: number; limit?: number; action?: string }) => 
      [...queryKeys.ledger.all, 'list', filters] as const,
  },
  
  // Marketplace requests
  requests: {
    all: ['requests'] as const,
    list: (filters?: { status?: string; type?: string; category?: string; page?: number; limit?: number }) =>
      [...queryKeys.requests.all, 'list', filters] as const,
    byId: (id: string) => [...queryKeys.requests.all, 'byId', id] as const,
    myRequests: (status?: string) => [...queryKeys.requests.all, 'my', status] as const,
  },
  
  // Daily limits
  limits: {
    daily: ['limits', 'daily'] as const,
  },
  
  // Leaderboard
  leaderboard: {
    all: ['leaderboard'] as const,
    byPeriod: (period: 'day' | 'week' | 'all') => [...queryKeys.leaderboard.all, period] as const,
  },
  
  // Profile
  profile: {
    me: ['profile', 'me'] as const,
    byHandle: (handle: string) => ['profile', handle] as const,
  },
};
