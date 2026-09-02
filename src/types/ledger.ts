// Ledger types for transaction tracking

export type LedgerAction = 'earn' | 'spend' | 'refund' | 'adjustment';

export type LedgerStatus = 'pending' | 'confirmed' | 'reversed';

export interface LedgerEntry {
  id: string;
  userId: string;
  action: LedgerAction;
  amount: number;
  balanceAfter: number;
  status: LedgerStatus;
  requestId?: string;
  relatedUserId?: string;
  relatedUserHandle?: string;
  description: string;
  createdAt: string;
  confirmedAt?: string;
}

export interface PointsSummary {
  available: number;
  pending: number;
  spent: number;
  totalEarned: number;
  totalSpent: number;
}
