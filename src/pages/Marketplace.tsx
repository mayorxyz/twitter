import { useState } from 'react'
import { useMarketplaceRequests } from '@/hooks/useMarketplaceRequests'
import { useDailyLimits } from '@/hooks/useDailyLimits'
import { usePointsBalance } from '@/hooks/usePointsBalance'
import { apiClient } from '@/lib/api-client'
import { uiStore } from '@/stores/ui-store'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PointsDisplay } from '@/components/ui/points-display'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Plus, Filter, Heart, Users, MessageSquare, ExternalLink, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RequestType, RequestStatus, Request } from '@/types'

const REQUEST_TYPE_ICONS: Record<RequestType, React.ReactNode> = {
  FOLLOW: <Users className="h-4 w-4" />,
  LIKE: <Heart className="h-4 w-4" />,
  COMMENT: <MessageSquare className="h-4 w-4" />,
}

const STATUS_BADGES: Record<RequestStatus, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'outline' },
  active: { label: 'Active', variant: 'default' },
  completed: { label: 'Completed', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
  expired: { label: 'Expired', variant: 'outline' },
}

export function Marketplace() {
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'ALL'>('ALL')
  const [typeFilter, setTypeFilter] = useState<RequestType | 'ALL'>('ALL')
  const { data: requests, isLoading, error, refetch } = useMarketplaceRequests()
  const limits = useDailyLimits()
  const { available } = usePointsBalance()

  const filteredRequests = (requests || []).filter((req: Request) => {
    if (statusFilter !== 'ALL' && req.status !== statusFilter) return false
    if (typeFilter !== 'ALL' && req.type !== typeFilter) return false
    return true
  })

  const handleFulfill = async (requestId: string) => {
    try {
      await apiClient.fulfillRequest(requestId)
      refetch()
    } catch (err) {
      console.error('Failed to fulfill request:', err)
    }
  }

  const openCreateModal = () => {
    uiStore.setState({ isCreateRequestModalOpen: true })
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">Browse and fulfill engagement requests</p>
        </div>
        <Button variant="amber" onClick={openCreateModal}>
          <Plus className="h-4 w-4 mr-2" />
          Create Request
        </Button>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap gap-4 items-center">
        <PointsDisplay value={available} label="Available" className="text-sm" />
        <div className="h-4 w-px bg-border" />
        <span className="text-sm text-muted-foreground">
          Daily Limits: {limits.followsUsed}/{limits.followsLimit} follows, {limits.likesUsed}/{limits.likesLimit} likes
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex rounded-md border border-border overflow-hidden">
          {(['ALL', 'OPEN', 'IN_PROGRESS', 'COMPLETED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                statusFilter === status
                  ? "bg-amber-500 text-white"
                  : "bg-background hover:bg-accent"
              )}
            >
              {status === 'ALL' ? 'All Status' : status.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex rounded-md border border-border overflow-hidden">
          {(['ALL', 'FOLLOW', 'LIKE', 'COMMENT'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                typeFilter === type
                  ? "bg-amber-500 text-white"
                  : "bg-background hover:bg-accent"
              )}
            >
              {type === 'ALL' ? 'All Types' : type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Request Grid */}
      {error ? (
        <EmptyState
          icon={<Clock className="h-12 w-12 text-muted-foreground" />}
          title="Failed to load requests"
          description="There was an error loading the marketplace. Please try again."
          action={
            <Button onClick={() => refetch()}>Retry</Button>
          }
        />
      ) : filteredRequests.length === 0 ? (
        <EmptyState
          icon={<Filter className="h-12 w-12 text-muted-foreground" />}
          title="No requests found"
          description={
            statusFilter !== 'ALL' || typeFilter !== 'ALL'
              ? "Try adjusting your filters to see more results."
              : "There are no requests available at the moment. Check back later!"
          }
          action={
            (statusFilter !== 'ALL' || typeFilter !== 'ALL') && (
              <Button variant="outline" onClick={() => { setStatusFilter('ALL'); setTypeFilter('ALL') }}>
                Clear Filters
              </Button>
            )
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => {
            const isRequester = false // TODO: check if current user is requester
            const isFull = request.slotsFilled >= request.slotsTotal
            const canFulfill = !isRequester && !isFull && request.status === 'OPEN'
            
            // Check daily limits
            const limitReached = 
              (request.type === 'FOLLOW' && limits.followsUsed >= limits.followsLimit) ||
              (request.type === 'LIKE' && limits.likesUsed >= limits.likesLimit) ||
              (request.type === 'COMMENT' && limits.commentsUsed >= limits.commentsLimit)

            return (
              <Card key={request.id} className="overflow-hidden">
                <CardContent className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{request.requesterHandle?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">@{request.requesterHandle}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            {REQUEST_TYPE_ICONS[request.type]}
                            {request.type}
                          </span>
                          <Badge variant={STATUS_BADGES[request.status].variant} className="text-xs">
                            {STATUS_BADGES[request.status].label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <PointsDisplay value={request.pointsOffered} className="text-amber-500 font-bold" />
                  </div>

                  {/* Target URL Preview */}
                  <div className="p-3 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm font-medium truncate">{request.targetUrl}</p>
                    <a
                      href={request.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-500 hover:underline flex items-center gap-1 mt-1"
                    >
                      View on X <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Context */}
                  {request.context && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{request.context}</p>
                  )}

                  {/* Slots Progress */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Slots filled</span>
                      <span className="font-medium">{request.slotsFilled} / {request.slotsTotal}</span>
                    </div>
                    <Progress value={(request.slotsFilled / request.slotsTotal) * 100} />
                  </div>

                  {/* Timestamp */}
                  <p className="text-xs text-muted-foreground">
                    Posted {new Date(request.createdAt).toLocaleDateString()}
                  </p>

                  {/* Action Button */}
                  <Button
                    className="w-full"
                    variant={canFulfill && !limitReached ? 'amber' : 'outline'}
                    disabled={!canFulfill || limitReached}
                    onClick={() => handleFulfill(request.id)}
                  >
                    {isRequester ? "Your Request" : 
                     isFull ? "Fully Filled" :
                     limitReached ? "Daily Limit Reached" :
                     "Fulfill Request"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
