import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { AudioPlayer } from '@/components/AudioPlayer';
import { prayers } from '@/data/prayers';
import { usePrayer } from '@/contexts/PrayerContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Language = 'english' | 'sanskrit' | 'tamil' | 'telugu';

const languageLabels: Record<Language, string> = {
  english: 'English',
  sanskrit: 'Sanskrit',
  tamil: 'Tamil',
  telugu: 'Telugu',
};

export default function PrayerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { logPrayer } = usePrayer();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [isCompleted, setIsCompleted] = useState(false);

  const prayer = prayers.find(p => p.id === id);

  if (!prayer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-xl font-semibold mb-2">Prayer not found</h2>
          <Button variant="outline" onClick={() => navigate('/')}>
            Go back
          </Button>
        </div>
      </div>
    );
  }

  const handleComplete = () => {
    if (isCompleted) return;
    
    logPrayer(prayer.id, prayer.deity);
    setIsCompleted(true);
    toast({
      title: "Prayer completed! 🙏",
      description: "Your streak has been updated.",
    });
  };

  const isKidFriendly = prayer.lineCount <= 20;

  return (
    <div className="min-h-screen pb-24 md:pb-8 md:pt-24">
      {/* Header */}
      <div className="sticky top-0 md:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-xl font-semibold truncate">
                {prayer.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Meaning */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-serif font-semibold text-sm text-muted-foreground mb-2">
              Meaning
            </h3>
            <p className="text-foreground leading-relaxed">
              {prayer.meaning}
            </p>
          </CardContent>
        </Card>

        {/* Audio Player */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-serif font-semibold text-sm text-muted-foreground mb-4">
              Audio
            </h3>
            <AudioPlayer audioUrl={prayer.audioUrl} onComplete={handleComplete} />
          </CardContent>
        </Card>

        {/* Language Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(Object.keys(languageLabels) as Language[]).map(lang => (
            <Button
              key={lang}
              variant={selectedLanguage === lang ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage(lang)}
              className={cn(
                "flex-shrink-0",
                selectedLanguage === lang && "gradient-saffron border-0"
              )}
            >
              {languageLabels[lang]}
            </Button>
          ))}
        </div>

        {/* Lyrics */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="gradient-temple p-4">
              <h3 className="font-serif font-semibold text-primary-foreground">
                {languageLabels[selectedLanguage]} Lyrics
              </h3>
            </div>
            <div className="p-6">
              <pre className={cn(
                "whitespace-pre-wrap font-sans text-lg leading-loose",
                selectedLanguage !== 'english' && "text-xl"
              )}>
                {prayer.lyrics[selectedLanguage]}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Complete Button */}
        <div className="fixed bottom-20 md:bottom-8 left-0 right-0 px-4">
          <div className="container mx-auto max-w-2xl">
            <Button
              variant={isCompleted ? 'outline' : 'temple'}
              size="xl"
              className={cn(
                "w-full",
                isCompleted && "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
              )}
              onClick={handleComplete}
              disabled={isCompleted}
            >
              {isCompleted ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Completed Today
                </>
              ) : (
                'Mark as Complete'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
