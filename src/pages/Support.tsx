import { Mail, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Support() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-gradient-temple text-center mb-8">
          Support
        </h1>
        
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-muted-foreground mb-1">For app support and feedback please contact</p>
                <a 
                  href="mailto:ann_leaderzi@gmail.com" 
                  className="text-primary hover:underline font-medium"
                >
                  ann_leaderzi@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <Building className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground">
                App built by <span className="font-medium text-foreground">Leaderzi LLC</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
