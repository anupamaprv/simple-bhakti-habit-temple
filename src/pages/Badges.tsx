import { useMemo } from 'react';
import { usePrayer } from '@/contexts/PrayerContext';
import { badgeDefinitions, Badge as BadgeType } from '@/data/badges';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function Badges() {
  const { stats } = usePrayer();

  const badges = useMemo(() => {
    return badgeDefinitions.map(badge => {
      let achieved = false;
      let progress = 0;
      let total = 1;

      switch (badge.id) {
        case 'streak-3':
          total = 3;
          progress = Math.min(stats.currentStreak, 3);
          achieved = stats.longestStreak >= 3;
          break;
        case 'streak-7':
          total = 7;
          progress = Math.min(stats.currentStreak, 7);
          achieved = stats.longestStreak >= 7;
          break;
        case 'streak-21':
          total = 21;
          progress = Math.min(stats.currentStreak, 21);
          achieved = stats.longestStreak >= 21;
          break;
        case 'streak-30':
          total = 30;
          progress = Math.min(stats.currentStreak, 30);
          achieved = stats.longestStreak >= 30;
          break;
        case 'streak-108':
          total = 108;
          progress = Math.min(stats.currentStreak, 108);
          achieved = stats.longestStreak >= 108;
          break;
        case 'brahma-muhurta-1':
          total = 1;
          progress = Math.min(stats.earlyMorningPrayers, 1);
          achieved = stats.earlyMorningPrayers >= 1;
          break;
        case 'brahma-muhurta-7':
          total = 7;
          progress = Math.min(stats.earlyMorningPrayers, 7);
          achieved = stats.earlyMorningPrayers >= 7;
          break;
        case 'brahma-muhurta-30':
          total = 30;
          progress = Math.min(stats.earlyMorningPrayers, 30);
          achieved = stats.earlyMorningPrayers >= 30;
          break;
        case 'variety-3':
          total = 3;
          progress = Math.min(Object.keys(stats.prayersByDeity).length, 3);
          achieved = Object.keys(stats.prayersByDeity).length >= 3;
          break;
        case 'variety-5':
          total = 5;
          progress = Math.min(Object.keys(stats.prayersByDeity).length, 5);
          achieved = Object.keys(stats.prayersByDeity).length >= 5;
          break;
        case 'variety-9':
          total = 9;
          progress = Math.min(Object.keys(stats.prayersByDeity).length, 9);
          achieved = Object.keys(stats.prayersByDeity).length >= 9;
          break;
        case 'daily-5':
          total = 5;
          progress = Math.min(stats.prayersToday, 5);
          achieved = stats.prayersToday >= 5;
          break;
        case 'daily-10':
          total = 10;
          progress = Math.min(stats.prayersToday, 10);
          achieved = stats.prayersToday >= 10;
          break;
        case 'total-100':
          total = 100;
          progress = Math.min(stats.totalPrayers, 100);
          achieved = stats.totalPrayers >= 100;
          break;
        case 'total-500':
          total = 500;
          progress = Math.min(stats.totalPrayers, 500);
          achieved = stats.totalPrayers >= 500;
          break;
      }

      return {
        ...badge,
        achieved,
        progress,
        total,
        percentage: Math.round((progress / total) * 100),
      };
    });
  }, [stats]);

  const achievedBadges = badges.filter(b => b.achieved);
  const inProgressBadges = badges.filter(b => !b.achieved);

  const categoryLabels = {
    streak: '🔥 Streak Badges',
    variety: '🌈 Variety Badges',
    time: '🌅 Early Bird Badges',
    dedication: '🙏 Dedication Badges',
  };

  const groupedInProgress = inProgressBadges.reduce((acc, badge) => {
    if (!acc[badge.category]) acc[badge.category] = [];
    acc[badge.category].push(badge);
    return acc;
  }, {} as Record<string, typeof inProgressBadges>);

  return (
    <div className="min-h-screen pb-20 md:pb-8 md:pt-24">
      {/* Header */}
      <div className="gradient-temple text-primary-foreground">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h1 className="font-serif text-3xl font-bold mb-2">Your Badges</h1>
            <p className="text-lg opacity-90">
              {achievedBadges.length} of {badges.length} earned
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8 -mt-4">
        {/* Achieved badges */}
        {achievedBadges.length > 0 && (
          <section>
            <h2 className="font-serif text-xl font-semibold mb-4 flex items-center gap-2">
              <span>✨</span> Earned Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {achievedBadges.map((badge, index) => (
                <Card
                  key={badge.id}
                  className="text-center animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="gradient-gold p-3">
                    <span className="text-4xl">{badge.icon}</span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif font-semibold text-sm mb-1">
                      {badge.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {badge.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* In progress badges by category */}
        {Object.entries(groupedInProgress).map(([category, categoryBadges]) => (
          <section key={category}>
            <h2 className="font-serif text-xl font-semibold mb-4">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h2>
            <div className="space-y-3">
              {categoryBadges.map((badge, index) => (
                <Card
                  key={badge.id}
                  className={cn(
                    "animate-fade-in-up",
                    badge.percentage > 0 && "border-primary/20"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                        badge.percentage > 0 ? "bg-primary/10" : "bg-muted"
                      )}>
                        {badge.percentage > 0 ? badge.icon : '🔒'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-sm mb-0.5">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {badge.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Progress value={badge.percentage} className="h-2 flex-1" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {badge.progress}/{badge.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* Empty state */}
        {achievedBadges.length === 0 && (
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="font-serif text-lg font-semibold mb-2">
                Begin Your Journey
              </h3>
              <p className="text-muted-foreground">
                Start praying daily to earn badges and track your spiritual progress.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
