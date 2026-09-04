import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Users, TrendingUp } from 'lucide-react'
import heroImage from '@/assets/hero.png'

export function Landing() {
  const { user, getLoginUrl } = useAuth()
  const navigate = useNavigate()

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="text-muted-foreground">You're already signed in.</p>
            <Button variant="amber" size="lg" onClick={() => navigate('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container max-w-7xl px-4 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Grow Your{' '}
                <span className="text-amber-500">Social Presence</span>{' '}
                Through Community Exchange
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Earn points by engaging with others' content, then spend them to get 
                follows, likes, and comments on your own posts. A fair exchange ecosystem 
                powered by real engagement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="amber" 
                size="lg" 
                onClick={() => window.location.href = getLoginUrl()}
                className="text-base px-8"
              >
                Sign in with X
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-base px-8"
              >
                See how it works
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Free to start</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-transparent blur-3xl rounded-full" />
            <img 
              src={heroImage} 
              alt="FollowExchange Dashboard Preview" 
              className="relative z-10 w-full h-auto rounded-xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="border-t border-border bg-muted/30">
        <div className="container max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to boost your social media presence through genuine engagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold">1. Post a Request</h3>
                <p className="text-muted-foreground">
                  Create a request for follows, likes, or comments on your content. 
                  Set the points you're willing to offer.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold">2. Earn Points</h3>
                <p className="text-muted-foreground">
                  Complete tasks from other users' requests. Engage genuinely and 
                  earn points for your account balance.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <Users className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold">3. Fulfill & Grow</h3>
                <p className="text-muted-foreground">
                  Spend your earned points to get others to engage with your content. 
                  Watch your presence grow organically.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container max-w-7xl px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FollowExchange. Built for the community.</p>
        </div>
      </footer>
    </div>
  )
}
