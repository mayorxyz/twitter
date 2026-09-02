// API client for backend communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options?.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // for httpOnly cookie session
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    // Handle no-content responses
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth endpoints
  async getAuthUrl(): Promise<{ authUrl: string }> {
    return this.request('/api/auth/x/login');
  }

  async logout(): Promise<void> {
    return this.request('/api/auth/logout', { method: 'POST' });
  }

  async me() {
    return this.request('/api/users/me');
  }

  // Points & Ledger
  async getPointsSummary() {
    return this.request('/api/points/summary');
  }

  async getLedger(params?: { page?: number; limit?: number; action?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.action) searchParams.set('action', params.action);
    
    const query = searchParams.toString();
    return this.request(`/api/ledger${query ? `?${query}` : ''}`);
  }

  // Marketplace requests
  async getRequests(params?: { 
    status?: string; 
    type?: string; 
    category?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.type) searchParams.set('type', params.type);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return this.request(`/api/requests${query ? `?${query}` : ''}`);
  }

  async getRequestById(id: string) {
    return this.request(`/api/requests/${id}`);
  }

  async createRequest(data: {
    type: string;
    targetUrl: string;
    pointsOffered: number;
    slotsTotal: number;
    context?: string;
    category?: string;
  }) {
    return this.request('/api/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async fulfillRequest(requestId: string, proof?: File) {
    const formData = new FormData();
    if (proof) {
      formData.append('proof', proof);
    }
    
    // Don't set Content-Type header for FormData - browser sets it with boundary
    const response = await fetch(`${this.baseUrl}/api/requests/${requestId}/fulfill`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getMyRequests(status?: string) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/api/requests/my${query}`);
  }

  // Daily limits
  async getDailyLimits() {
    return this.request('/api/limits/daily');
  }

  // Leaderboard
  async getLeaderboard(period: 'day' | 'week' | 'all' = 'week') {
    return this.request(`/api/leaderboard?period=${period}`);
  }

  // Profile
  async getProfile(handle?: string) {
    const endpoint = handle ? `/api/profile/${handle}` : '/api/profile/me';
    return this.request(endpoint);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
