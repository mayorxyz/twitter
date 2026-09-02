// User types

export type ReputationLevel = 'new' | 'verified' | 'trusted' | 'flagged';

export interface User {
  id: string;
  handle: string;
  displayName?: string;
  avatarUrl?: string;
  xUserId?: string;
  reputation: ReputationLevel;
  pointsAvailable: number;
  pointsPending: number;
  totalEarned: number;
  totalSpent: number;
  requestsCreated: number;
  requestsCompleted: number;
  createdAt: string;
  isConnected: boolean;
}

export interface DailyLimit {
  follows: {
    used: number;
    max: number;
    resetsAt: string;
  };
  likes: {
    used: number;
    max: number;
    resetsAt: string;
  };
  comments: {
    used: number;
    max: number;
    resetsAt: string;
  };
}
