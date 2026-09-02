// Request types matching backend models

export type RequestType = 'follow' | 'like' | 'comment';

export type RequestStatus = 'pending' | 'active' | 'completed' | 'cancelled' | 'expired';

export interface Request {
  id: string;
  requesterId: string;
  requesterHandle: string;
  requesterAvatarUrl?: string;
  type: RequestType;
  targetUrl: string;
  targetTitle?: string;
  targetImageUrl?: string;
  pointsOffered: number;
  slotsTotal: number;
  slotsFilled: number;
  status: RequestStatus;
  context?: string;
  category?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface CreateRequestInput {
  type: RequestType;
  targetUrl: string;
  pointsOffered: number;
  slotsTotal: number;
  context?: string;
  category?: string;
}
