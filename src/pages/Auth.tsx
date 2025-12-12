import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import sbLogo from '@/assets/sb-logo.jpg';

type AuthMode = 'login' | 'signup' | 'forgot' | 'reset';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const isReset = searchParams.get('reset') === 'true';
  
  const [mode, setMode] = useState<AuthMode>(isReset ? 'reset' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, signup, resetPassword, updatePassword, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user && mode !== 'reset') {
      navigate('/');
    }
  }, [user, mode, navigate]);

  useEffect(() => {
    if (isReset) {
      setMode('reset');
    }
  }, [isReset]);

  const handleLogin = async () => {
    await login(email, password);
    toast({
      title: "Welcome back! 🙏",
      description: "You've successfully logged in.",
    });
    navigate('/');
  };

  const handleSignup = async () => {
    if (!name.trim()) {
      throw new Error('Please enter your name');
    }
    await signup(email, password, name);
    toast({
      title: "Account created! 🎉",
      description: "Welcome to Simple Bhakti.",
    });
    navigate('/');
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      throw new Error('Please enter your email address');
    }
    await resetPassword(email);
    toast({
      title: "Check your email",
      description: "If an account exists with this email, you'll receive a password reset link.",
    });
    setMode('login');
  };

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    await updatePassword(password);
    toast({
      title: "Password updated! ✓",
      description: "Your password has been successfully changed.",
    });
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      switch (mode) {
        case 'login':
          await handleLogin();
          break;
        case 'signup':
          await handleSignup();
          break;
        case 'forgot':
          await handleForgotPassword();
          break;
        case 'reset':
          await handleResetPassword();
          break;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Forgot Password';
      case 'reset': return 'Set New Password';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'login': return 'Enter your credentials to continue';
      case 'signup': return 'Start your spiritual journey today';
      case 'forgot': return "Enter your email and we'll send you a reset link";
      case 'reset': return 'Choose a new password for your account';
    }
  };

  const getButtonText = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Send Reset Link';
      case 'reset': return 'Update Password';
    }
  };

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={sbLogo} 
            alt="Simple Bhakti" 
            className="w-20 h-20 rounded-full object-cover mx-auto mb-4 shadow-glow"
          />
          <h1 className="font-serif text-3xl font-bold text-gradient-temple">
            Simple Bhakti
          </h1>
          <p className="text-muted-foreground mt-2">
            Your daily spiritual companion
          </p>
        </div>

        <Card className="border-0 shadow-soft">
          <CardHeader className="text-center pb-2">
            {(mode === 'forgot' || mode === 'reset') && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-4"
                onClick={() => setMode('login')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <CardTitle className="text-xl">{getTitle()}</CardTitle>
            <CardDescription>{getDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}

              {(mode === 'login' || mode === 'signup' || mode === 'reset') && (
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {mode === 'reset' ? 'New Password' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {mode === 'reset' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="text-right">
                  <Button
                    type="button"
                    variant="link"
                    className="px-0 text-sm text-muted-foreground hover:text-primary"
                    onClick={() => setMode('forgot')}
                  >
                    Forgot password?
                  </Button>
                </div>
              )}

              <Button
                type="submit"
                variant="saffron"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  getButtonText()
                )}
              </Button>
            </form>

            {(mode === 'login' || mode === 'signup') && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                  <Button
                    variant="link"
                    className="px-2 text-primary"
                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  >
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                  </Button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Temple decoration */}
        <div className="flex justify-center mt-8 gap-4 text-2xl opacity-60">
          <span>🕉️</span>
          <span>🪔</span>
          <span>🌺</span>
          <span>🔔</span>
          <span>🕉️</span>
        </div>
      </div>
    </div>
  );
}
