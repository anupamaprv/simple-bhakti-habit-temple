import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import PrayerLibrary from './PrayerLibrary';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-warm">
        <div className="text-center animate-pulse">
          <div className="w-16 h-16 rounded-full gradient-temple mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🙏</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <PrayerLibrary />;
};

export default Index;
