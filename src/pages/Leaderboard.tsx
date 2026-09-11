import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/ui/empty-state'
import { Trophy, Medal, Crown } from 'lucide-react'
import { cn } from '@/lib/utils'

type Period = 'day' | 'week' | 'all'

// Mock leaderboard data - replace with actual API call when available
const MOCK_LEADERBOARD = [
  { rank: 1, handle: 'cryptoking', points: 15420, avatar: 'C' },
  { rank: 2, handle: 'socialqueen', points: 12890, avatar: 'S' },
  { rank: 3, handle: 'growthmaster', points: 11250, avatar: 'G' },
  { rank: 4, handle: 'engagementpro', points: 9870, avatar: 'E' },
  { rank: 5, handle: 'viralhunter', points: 8640, avatar: 'V' },
  { rank: 6, handle: 'contentking', points: 7520, avatar: 'C' },
  { rank: 7, handle: 'influencerx', points: 6890, avatar: 'I' },
  { rank: 8, handle: 'brandbuilder', points: 5760, avatar: 'B' },
  { rank: 9, handle: 'audiencegrow', points: 4920, avatar: 'A' },
  { rank: 10, handle: 'socialboost', points: 4150, avatar: 'S' },
]

const RANK_COLORS = {
  1: 'from-yellow-400 to-amber-500 border-amber-600',
  2: 'from-slate-300 to-slate-400 border-slate-500',
  3: 'from-amber-600 to-amber-700 border-amber-800',
}

export function Leaderboard() {
  const [period, setPeriod] = useState<Period>('week')
  const [isLoading, setIsLoading] = useState(false)

  const handlePeriodChange = (newPeriod: Period) => {
    setIsLoading(true)
    setPeriod(newPeriod)
    // Simulate loading - replace with actual API call
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">Top performers in the community</p>
      </div>

      {/* Period Toggle */}
      <div className="flex gap-2">
        {(['day', 'week', 'all'] as Period[]).map((p) => (
          <Button
            key={p}
            variant={period === p ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePeriodChange(p)}
            disabled={isLoading}
          >
            {p === 'day' ? 'Today' : p === 'week' ? 'This Week' : 'All Time'}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : MOCK_LEADERBOARD.length === 0 ? (
        <EmptyState
          icon={<Trophy className="h-12 w-12 text-muted-foreground" />}
          title="No rankings yet"
          description="Be the first to climb the leaderboard by earning points!"
        />
      ) : (
        <div className="space-y-4">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 items-end">
            {/* 2nd Place */}
            <Card className={cn("relative overflow-hidden bg-gradient-to-b", RANK_COLORS[2])}>
              <CardContent className="pt-6 pb-4 text-center">
                <div className="absolute top-2 left-1/2 -translate-x-1/2">
                  <Medal className="h-6 w-6 text-white" />
                </div>
                <Avatar className="h-12 w-12 mx-auto mb-2 border-2 border-white">
                  <AvatarFallback>{MOCK_LEADERBOARD[1].avatar}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-sm truncate">@{MOCK_LEADERBOARD[1].handle}</p>
                <p className="text-xs opacity-80">{MOCK_LEADERBOARD[1].points.toLocaleString()} pts</p>
              </CardContent>
            </Card>

            {/* 1st Place */}
            <Card className={cn("relative overflow-hidden bg-gradient-to-b transform scale-105 shadow-lg", RANK_COLORS[1])}>
              <CardContent className="pt-6 pb-4 text-center">
                <div className="absolute top-2 left-1/2 -translate-x-1/2">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                <Avatar className="h-16 w-16 mx-auto mb-2 border-2 border-white">
                  <AvatarFallback>{MOCK_LEADERBOARD[0].avatar}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-sm truncate">@{MOCK_LEADERBOARD[0].handle}</p>
                <p className="text-xs opacity-80">{MOCK_LEADERBOARD[0].points.toLocaleString()} pts</p>
              </CardContent>
            </Card>

            {/* 3rd Place */}
            <Card className={cn("relative overflow-hidden bg-gradient-to-b", RANK_COLORS[3])}>
              <CardContent className="pt-6 pb-4 text-center">
                <div className="absolute top-2 left-1/2 -translate-x-1/2">
                  <Medal className="h-6 w-6 text-white" />
                </div>
                <Avatar className="h-12 w-12 mx-auto mb-2 border-2 border-white">
                  <AvatarFallback>{MOCK_LEADERBOARD[2].avatar}</AvatarFallback>
                </Avatar>
                <p className="font-bold text-sm truncate">@{MOCK_LEADERBOARD[2].handle}</p>
                <p className="text-xs opacity-80">{MOCK_LEADERBOARD[2].points.toLocaleString()} pts</p>
              </CardContent>
            </Card>
          </div>

          {/* Rest of Rankings */}
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {MOCK_LEADERBOARD.slice(3).map((entry, index) => {
                  const rank = index + 4
                  const isCurrentUser = false // TODO: check if current user

                  return (
                    <div
                      key={entry.rank}
                      className={cn(
                        "flex items-center justify-between p-4 hover:bg-accent/50 transition-colors",
                        isCurrentUser && "bg-amber-500/10 border-amber-500 border rounded-md my-2"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                            rank <= 3
                              ? "bg-amber-500 text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{entry.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className={cn("font-medium", isCurrentUser && "text-amber-500")}>
                            @{entry.handle}
                            {isCurrentUser && " (You)"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.points.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                      {rank <= 10 && (
                        <Trophy
                          className={cn(
                            "h-5 w-5",
                            rank === 1
                              ? "text-amber-500"
                              : rank === 2
                              ? "text-slate-400"
                              : rank === 3
                              ? "text-amber-700"
                              : "text-muted-foreground"
                          )}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
