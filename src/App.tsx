import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { PrayerProvider } from "@/contexts/PrayerContext";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PrayerDetail from "./pages/PrayerDetail";
import Tracker from "./pages/Tracker";
import Badges from "./pages/Badges";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user && <Navigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/prayer/:id" element={<PrayerDetail />} />
        <Route path="/tracker" element={<Tracker />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PrayerProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </PrayerProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
