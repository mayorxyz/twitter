import { usePointsBalance } from '@/hooks/usePointsBalance'
import { useDailyLimits } from '@/hooks/useDailyLimits'
import { useLedger } from '@/hooks/useLedger'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PointsDisplay } from '@/components/ui/points-display'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowUpRight, ArrowDownRight, Hourglass, TrendingUp, Zap, Target } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatResetTime } from '@/lib/formatters'
import { NavLink } from 'react-router-dom'

export function Dashboard() {
  const { available, pending, spent, totalEarned, isLoading: balanceLoading } = usePointsBalance()
  const limits = useDailyLimits()
  const { data: ledger, isLoading: ledgerLoading } = useLedger({ limit: 5 })

  // Prepare chart data from ledger
  const chartData = (ledger || []).map(entry => ({
    date: new Date(entry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    points: entry.amount,
    type: entry.action === 'EARN' ? 'earned' : 'spent'
  })).reverse()

  const earnedData = chartData.filter(d => d.type === 'earned')
  const spentData = chartData.filter(d => d.type === 'spent')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Your daily engagement overview</p>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            {balanceLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <PointsDisplay value={available} className="text-2xl font-bold text-green-500" />
            )}
            <p className="text-xs text-muted-foreground mt-1">Ready to spend</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
            <Hourglass className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            {balanceLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <PointsDisplay value={pending} className="text-2xl font-bold text-amber-500" />
            )}
            <p className="text-xs text-muted-foreground mt-1">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Spent Today</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            {balanceLoading ? (
              <Skeleton className="h-8 w-32" />
            ) : (
              <PointsDisplay value={spent} className="text-2xl font-bold text-red-500" />
            )}
            <p className="text-xs text-muted-foreground mt-1">Total spent today</p>
          </CardContent>
        </Card>
      </div>

      {/* Limits & Chart Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Daily Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              Daily Limits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {limits.isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Follows</span>
                    <span className="text-muted-foreground">
                      {limits.followsUsed} / {limits.followsLimit} 
                      {limits.followsResetsIn && ` • resets in ${formatResetTime(limits.followsResetsIn)}`}
                    </span>
                  </div>
                  <Progress 
                    value={(limits.followsUsed / limits.followsLimit) * 100} 
                    className={limits.followsUsed / limits.followsLimit > 0.9 ? 'bg-red-500/20' : limits.followsUsed / limits.followsLimit > 0.75 ? 'bg-amber-500/20' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Likes</span>
                    <span className="text-muted-foreground">
                      {limits.likesUsed} / {limits.likesLimit}
                      {limits.likesResetsIn && ` • resets in ${formatResetTime(limits.likesResetsIn)}`}
                    </span>
                  </div>
                  <Progress 
                    value={(limits.likesUsed / limits.likesLimit) * 100}
                    className={limits.likesUsed / limits.likesLimit > 0.9 ? 'bg-red-500/20' : limits.likesUsed / limits.likesLimit > 0.75 ? 'bg-amber-500/20' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Comments</span>
                    <span className="text-muted-foreground">
                      {limits.commentsUsed} / {limits.commentsLimit}
                      {limits.commentsResetsIn && ` • resets in ${formatResetTime(limits.commentsResetsIn)}`}
                    </span>
                  </div>
                  <Progress 
                    value={(limits.commentsUsed / limits.commentsLimit) * 100}
                    className={limits.commentsUsed / limits.commentsLimit > 0.9 ? 'bg-red-500/20' : limits.commentsUsed / limits.commentsLimit > 0.75 ? 'bg-amber-500/20' : ''}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Points Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-amber-500" />
              Points Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ledgerLoading ? (
              <Skeleton className="h-[200px] w-full" />
            ) : chartData.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground text-sm">
                No activity yet. Start engaging to see your progress!
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorEarned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                  />
                  <Area type="monotone" dataKey="points" stroke="#22c55e" fillOpacity={1} fill="url(#colorEarned)" name="Earned" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            Recent Activity
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <NavLink to="/points-history">View all</NavLink>
          </Button>
        </CardHeader>
        <CardContent>
          {ledgerLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : ledger && ledger.length > 0 ? (
            <div className="space-y-3">
              {ledger.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      entry.action === 'EARN' ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}>
                      {entry.action === 'EARN' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{entry.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <PointsDisplay 
                    value={Math.abs(entry.amount)} 
                    className={`text-sm font-semibold ${
                      entry.action === 'EARN' ? 'text-green-500' : 'text-red-500'
                    }`}
                    prefix={entry.action === 'EARN' ? '+' : '-'}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No recent activity. Start earning points by completing tasks!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
