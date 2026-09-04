import { useState } from 'react'
import { useLedger } from '@/hooks/useLedger'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PointsDisplay } from '@/components/ui/points-display'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { ArrowUpRight, ArrowDownRight, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LedgerAction } from '@/types'

const ACTION_FILTERS: (LedgerAction | 'ALL')[] = ['ALL', 'EARN', 'SPEND', 'REFUND']

export function PointsHistory() {
  const [actionFilter, setActionFilter] = useState<LedgerAction | 'ALL'>('ALL')
  const [page, setPage] = useState(1)
  const limit = 20

  const { data: ledger, isLoading } = useLedger({ action: actionFilter === 'ALL' ? undefined : actionFilter, page, limit })

  const totalPages = Math.ceil((ledger?.length || 0) / limit)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-20 w-full" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  const filteredLedger = ledger || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Points History</h1>
        <p className="text-muted-foreground">View all your point transactions</p>
      </div>

      {/* Action Filters */}
      <div className="flex flex-wrap gap-2">
        {ACTION_FILTERS.map((action) => (
          <Button
            key={action}
            variant={actionFilter === action ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setActionFilter(action); setPage(1) }}
          >
            {action === 'ALL' ? 'All' : action}
          </Button>
        ))}
      </div>

      {/* Ledger Table */}
      {filteredLedger.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-12 w-12 text-muted-foreground" />}
          title="No transactions found"
          description={
            actionFilter !== 'ALL'
              ? "Try adjusting your filter to see more results."
              : "You haven't made any transactions yet. Start engaging to earn points!"
          }
          action={
            actionFilter !== 'ALL' && (
              <Button variant="outline" onClick={() => setActionFilter('ALL')}>
                Clear Filter
              </Button>
            )
          }
        />
      ) : (
        <>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredLedger.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          entry.action === 'EARN'
                            ? "bg-green-500/10"
                            : entry.action === 'SPEND'
                            ? "bg-red-500/10"
                            : "bg-amber-500/10"
                        )}
                      >
                        {entry.action === 'EARN' ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : entry.action === 'SPEND' ? (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        ) : (
                          <Clock className="h-5 w-5 text-amber-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{entry.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <PointsDisplay
                      value={Math.abs(entry.amount)}
                      className={cn(
                        "text-lg font-bold tabular-nums",
                        entry.action === 'EARN'
                          ? "text-green-500"
                          : entry.action === 'SPEND'
                          ? "text-red-500"
                          : "text-amber-500"
                      )}
                      prefix={entry.action === 'EARN' ? '+' : entry.action === 'SPEND' ? '-' : ''}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
