import { useState, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PrayerCard } from '@/components/PrayerCard';
import { prayers, deities, themes, Deity, Theme } from '@/data/prayers';
import { cn } from '@/lib/utils';

export default function PrayerLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [kidFriendlyOnly, setKidFriendlyOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPrayers = useMemo(() => {
    return prayers.filter(prayer => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          prayer.title.toLowerCase().includes(query) ||
          prayer.deity.toLowerCase().includes(query) ||
          prayer.theme.toLowerCase().includes(query) ||
          prayer.meaning.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Deity filter
      if (selectedDeity && prayer.deity !== selectedDeity) return false;

      // Theme filter
      if (selectedTheme && prayer.theme !== selectedTheme) return false;

      // Kid-friendly filter
      if (kidFriendlyOnly && prayer.lineCount > 20) return false;

      return true;
    });
  }, [searchQuery, selectedDeity, selectedTheme, kidFriendlyOnly]);

  const hasActiveFilters = selectedDeity || selectedTheme || kidFriendlyOnly;

  const clearFilters = () => {
    setSelectedDeity(null);
    setSelectedTheme(null);
    setKidFriendlyOnly(false);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-24">
      {/* Header */}
      <div className="sticky top-0 md:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          {/* Title for mobile */}
          <div className="flex items-center justify-center gap-2 mb-4 md:hidden">
            <div className="w-8 h-8 rounded-full gradient-temple flex items-center justify-center">
              <span className="text-primary-foreground text-sm">🙏</span>
            </div>
            <h1 className="font-serif text-xl font-bold text-gradient-temple">
              Simple Bhakti
            </h1>
          </div>

          {/* Search bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prayers, deities, themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(hasActiveFilters && !showFilters && "border-primary text-primary")}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 space-y-4 animate-fade-in-up">
              {/* Deity filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Deity
                </label>
                <div className="flex flex-wrap gap-2">
                  {deities.map(deity => (
                    <Badge
                      key={deity}
                      variant={selectedDeity === deity ? 'default' : 'outline'}
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        selectedDeity === deity
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10"
                      )}
                      onClick={() => setSelectedDeity(selectedDeity === deity ? null : deity)}
                    >
                      {deity}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Theme filter */}
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {themes.map(theme => (
                    <Badge
                      key={theme}
                      variant={selectedTheme === theme ? 'default' : 'outline'}
                      className={cn(
                        "cursor-pointer transition-all duration-200",
                        selectedTheme === theme
                          ? "bg-secondary text-secondary-foreground"
                          : "hover:bg-secondary/10"
                      )}
                      onClick={() => setSelectedTheme(selectedTheme === theme ? null : theme)}
                    >
                      {theme}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Kid-friendly toggle */}
              <div className="flex items-center gap-2">
                <Badge
                  variant={kidFriendlyOnly ? 'default' : 'outline'}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    kidFriendlyOnly
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : "hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                  )}
                  onClick={() => setKidFriendlyOnly(!kidFriendlyOnly)}
                >
                  👶 Kid-friendly only (≤20 lines)
                </Badge>
                
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Prayer list */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredPrayers.length} prayer{filteredPrayers.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {filteredPrayers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPrayers.map((prayer, index) => (
              <div
                key={prayer.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PrayerCard prayer={prayer} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🙏</div>
            <h3 className="font-serif text-lg font-semibold mb-2">No prayers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
