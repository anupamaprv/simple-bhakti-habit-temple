import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Prayer } from '@/data/prayers';
import { cn } from '@/lib/utils';

interface PrayerCardProps {
  prayer: Prayer;
  className?: string;
}

const deityColors: Record<string, string> = {
  Ganesha: 'bg-primary/10 text-primary border-primary/20',
  Shiva: 'bg-secondary/10 text-secondary border-secondary/20',
  Vishnu: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  Krishna: 'bg-blue-600/10 text-blue-700 border-blue-600/20',
  Lakshmi: 'bg-gold/10 text-gold border-gold/20',
  Saraswati: 'bg-white/50 text-foreground border-border',
  Hanuman: 'bg-primary/10 text-primary border-primary/20',
  Durga: 'bg-secondary/10 text-secondary border-secondary/20',
  Murugan: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const deityEmojis: Record<string, string> = {
  Ganesha: '🐘',
  Shiva: '🔱',
  Vishnu: '🪷',
  Krishna: '🦚',
  Lakshmi: '🪔',
  Saraswati: '🎵',
  Hanuman: '🐵',
  Durga: '🦁',
  Murugan: '🦚',
};

export function PrayerCard({ prayer, className }: PrayerCardProps) {
  const isKidFriendly = prayer.lineCount <= 20;

  return (
    <Link to={`/prayer/${prayer.id}`}>
      <Card className={cn(
        "cursor-pointer group overflow-hidden",
        "hover:shadow-glow hover:border-primary/30",
        "transition-all duration-300",
        className
      )}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{deityEmojis[prayer.deity]}</span>
                <h3 className="font-serif font-semibold text-lg truncate group-hover:text-primary transition-colors">
                  {prayer.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {prayer.meaning}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={cn("text-xs font-medium", deityColors[prayer.deity])}
                >
                  {prayer.deity}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {prayer.theme}
                </Badge>
                {isKidFriendly && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                    Kid-friendly
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground ml-auto">
                  {prayer.lineCount} lines
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
