import { usePrayer } from '@/contexts/PrayerContext';
import { useAuth } from '@/contexts/AuthContext';
import { FlameIcon } from '@/components/FlameIcon';
import { StreakCalendar } from '@/components/StreakCalendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function Tracker() {
  const { stats } = usePrayer();
  const { profile, logout } = useAuth();

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24">
      {/* Header */}
      <div className="gradient-temple text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Mobile user section */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <span className="text-sm opacity-90">Hi, {profile?.name || 'there'}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-primary-foreground hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Streak display */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <FlameIcon className="w-16 h-16 text-gold" animated />
            </div>
            <div className="text-7xl md:text-8xl font-serif font-bold mb-2">
              {stats.currentStreak}
            </div>
            <p className="text-xl opacity-90">
              {stats.currentStreak === 1 ? 'Day' : 'Days'} in a row
            </p>
            {stats.completedDates.length > 0 && (
              <p className="text-sm opacity-70 mt-2">
                You last prayed on {new Date(stats.completedDates[stats.completedDates.length - 1]).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6 -mt-4">
        {/* Calendar */}
        <StreakCalendar completedDates={stats.completedDates} />

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Longest Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-bold text-primary">
                  {stats.longestStreak}
                </span>
                <span className="text-sm text-muted-foreground">days</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Prayers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-bold text-secondary">
                  {stats.totalPrayers}
                </span>
                <span className="text-2xl">🙏</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Early Morning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-bold text-gold">
                  {stats.earlyMorningPrayers}
                </span>
                <span className="text-2xl">🌅</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Today's Count
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-serif font-bold text-primary">
                  {stats.prayersToday}
                </span>
                <span className="text-2xl">🪔</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Deities prayed to */}
        {Object.keys(stats.prayersByDeity).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deities You've Prayed To</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(stats.prayersByDeity).map(([deity, count]) => (
                  <div
                    key={deity}
                    className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg"
                  >
                    <span className="font-medium">{deity}</span>
                    <span className="text-sm text-muted-foreground">×{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Motivation */}
        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="font-serif text-lg italic text-foreground">
              "The goal of life is to make your heartbeat match the beat of the universe, to match your nature with Nature."
            </p>
            <p className="text-sm text-muted-foreground mt-2">— Joseph Campbell</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
