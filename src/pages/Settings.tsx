import { useAuth } from '@/hooks/useAuth'
import { useDailyLimits } from '@/hooks/useDailyLimits'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { uiStore } from '@/stores/ui-store'
import { Sun, Moon, LogOut, User, Shield, Target } from 'lucide-react'
import { formatResetTime } from '@/lib/formatters'

export function Settings() {
  const { user, logout } = useAuth()
  const limits = useDailyLimits()
  const isDark = uiStore((state) => state.theme) === 'dark'

  const toggleTheme = () => {
    uiStore.getState().setTheme(isDark ? 'light' : 'dark')
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout()
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Account Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-amber-500" />
            Account
          </CardTitle>
          <CardDescription>Your X (Twitter) account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-2xl">
                {user?.handle?.charAt(0).toUpperCase() || '@'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.displayName || 'User'}</p>
              <p className="text-sm text-muted-foreground">@{user?.handle || 'unknown'}</p>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                <Shield className="h-3 w-3" />
                Connected via X OAuth
              </p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>

      {/* Appearance Section */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the app looks on your device</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  {isDark ? 'Currently using dark theme' : 'Currently using light theme'}
                </p>
              </div>
            </div>
            <Button
              variant={isDark ? 'default' : 'outline'}
              size="sm"
              onClick={toggleTheme}
            >
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Daily Limits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-500" />
            Daily Limits
          </CardTitle>
          <CardDescription>Your daily engagement caps (read-only)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {limits.isLoading ? (
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Follows per day</span>
                  <span className="text-muted-foreground">
                    {limits.followsUsed} / {limits.followsLimit}
                    {limits.followsResetsIn && ` • resets in ${formatResetTime(limits.followsResetsIn)}`}
                  </span>
                </div>
                <Progress value={(limits.followsUsed / limits.followsLimit) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Likes per day</span>
                  <span className="text-muted-foreground">
                    {limits.likesUsed} / {limits.likesLimit}
                    {limits.likesResetsIn && ` • resets in ${formatResetTime(limits.likesResetsIn)}`}
                  </span>
                </div>
                <Progress value={(limits.likesUsed / limits.likesLimit) * 100} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Comments per day</span>
                  <span className="text-muted-foreground">
                    {limits.commentsUsed} / {limits.commentsLimit}
                    {limits.commentsResetsIn && ` • resets in ${formatResetTime(limits.commentsResetsIn)}`}
                  </span>
                </div>
                <Progress value={(limits.commentsUsed / limits.commentsLimit) * 100} />
              </div>

              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                Limits reset automatically at midnight UTC. Contact support if you need adjustments.
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="mb-2">
            FollowExchange v1.0.0
          </p>
          <p>
            A points-based exchange platform for growing your social media presence through genuine community engagement.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
