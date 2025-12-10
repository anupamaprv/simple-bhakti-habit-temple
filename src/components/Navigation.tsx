import { Link, useLocation } from 'react-router-dom';
import { Book, Flame, Award, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import sbLogo from '@/assets/sb-logo.jpg';

export function Navigation() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Prayers', icon: Book },
    { path: '/tracker', label: 'Tracker', icon: Flame },
    { path: '/badges', label: 'Badges', icon: Award },
  ];

  if (!user) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - visible on desktop */}
          <Link to="/" className="hidden md:flex items-center gap-2">
            <img src={sbLogo} alt="Simple Bhakti" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-serif text-xl font-bold text-gradient-temple">
              Simple Bhakti
            </span>
          </Link>

          {/* Nav items */}
          <div className="flex items-center justify-around w-full md:w-auto md:gap-8">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "animate-pulse-glow")} />
                  <span className="text-xs md:text-sm font-medium">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* User section - visible on desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{user.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
