import { useState } from 'react'
import { useMyRequests } from '@/hooks/useMyRequests'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PointsDisplay } from '@/components/ui/points-display'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Heart, Users, MessageSquare, ExternalLink, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RequestStatus } from '@/types'

export function Profile() {
  const [activeTab, setActiveTab] = useState<'posts' | 'activity'>('posts')
  const { data: myRequests, isLoading } = useMyRequests()

  const postedRequests = myRequests?.filter(r => r.isRequester) || []
  const fulfilledRequests = myRequests?.filter(r => !r.isRequester) || []

  const REQUEST_TYPE_ICONS: Record<string, React.ReactNode> = {
    FOLLOW: <Users className="h-4 w-4" />,
    LIKE: <Heart className="h-4 w-4" />,
    COMMENT: <MessageSquare className="h-4 w-4" />,
  }

  const STATUS_COLORS: Record<RequestStatus, string> = {
    OPEN: 'bg-green-500',
    IN_PROGRESS: 'bg-amber-500',
    COMPLETED: 'bg-blue-500',
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    )
  }

  const currentRequests = activeTab === 'posts' ? postedRequests : fulfilledRequests

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">@</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <p className="text-muted-foreground">@yourhandle</p>
              <div className="flex flex-wrap gap-4 mt-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <PointsDisplay value={0} className="text-lg font-bold text-green-500" prefix="+" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <PointsDisplay value={0} className="text-lg font-bold text-red-500" prefix="-" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Requests Posted</p>
                  <p className="text-lg font-bold">{postedRequests.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-lg font-bold">{fulfilledRequests.length}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('posts')}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === 'posts'
              ? "text-amber-500"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          My Posts
          {activeTab === 'posts' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === 'activity'
              ? "text-amber-500"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          My Activity
          {activeTab === 'activity' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
          )}
        </button>
      </div>

      {/* Requests List */}
      {currentRequests.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-12 w-12 text-muted-foreground" />}
          title={
            activeTab === 'posts'
              ? "No posts yet"
              : "No activity yet"
          }
          description={
            activeTab === 'posts'
              ? "Create your first request to start getting engagement on your content."
              : "Complete tasks from the marketplace to see your activity here."
          }
          action={
            activeTab === 'posts' ? (
              <Button variant="amber">Create Request</Button>
            ) : (
              <Button>Browse Marketplace</Button>
            )
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {currentRequests.map((request) => (
            <Card key={request.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {REQUEST_TYPE_ICONS[request.type]}
                    </span>
                    <p className="font-semibold">{request.type}</p>
                    <Badge variant="outline" className="text-xs">
                      {request.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                </div>

                <div className="p-2 rounded bg-muted/50 text-sm truncate">
                  {request.targetUrl}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Points</span>
                  <PointsDisplay value={request.pointsOffered} className="text-amber-500 font-bold" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{request.slotsFilled} / {request.slotsTotal}</span>
                  </div>
                  <Progress value={(request.slotsFilled / request.slotsTotal) * 100} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <a
                    href={request.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-amber-500 hover:underline flex items-center gap-1"
                  >
                    View on X <ExternalLink className="h-3 w-3" />
                  </a>
                  <span className="text-xs text-muted-foreground">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
