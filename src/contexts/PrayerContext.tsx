import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PrayerLog {
  prayerId: string;
  deity: string;
  timestamp: string;
  completedAt: string;
}

interface PrayerStats {
  totalPrayers: number;
  currentStreak: number;
  longestStreak: number;
  prayersByDeity: Record<string, number>;
  earlyMorningPrayers: number;
  prayersToday: number;
  completedDates: string[];
}

interface PrayerContextType {
  prayerLogs: PrayerLog[];
  stats: PrayerStats;
  logPrayer: (prayerId: string, deity: string) => void;
  getPrayerLogsForDate: (date: string) => PrayerLog[];
  hasCompletedToday: () => boolean;
}

const PrayerContext = createContext<PrayerContextType | undefined>(undefined);

const getDateString = (date: Date = new Date()) => {
  return date.toISOString().split('T')[0];
};

const calculateStreak = (completedDates: string[]): { current: number; longest: number } => {
  if (completedDates.length === 0) return { current: 0, longest: 0 };

  const sortedDates = [...completedDates].sort().reverse();
  const today = getDateString();
  const yesterday = getDateString(new Date(Date.now() - 86400000));

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  // Check if streak is active (completed today or yesterday)
  if (sortedDates[0] === today || sortedDates[0] === yesterday) {
    currentStreak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const currentDate = new Date(sortedDates[i - 1]);
      const prevDate = new Date(sortedDates[i]);
      const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / 86400000);
      
      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i - 1]);
    const prevDate = new Date(sortedDates[i]);
    const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / 86400000);
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

  return { current: currentStreak, longest: longestStreak };
};

export function PrayerProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [prayerLogs, setPrayerLogs] = useState<PrayerLog[]>([]);
  const [stats, setStats] = useState<PrayerStats>({
    totalPrayers: 0,
    currentStreak: 0,
    longestStreak: 0,
    prayersByDeity: {},
    earlyMorningPrayers: 0,
    prayersToday: 0,
    completedDates: [],
  });

  // Load prayer logs when user changes
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`prayer-logs-${user.id}`);
      if (stored) {
        const logs: PrayerLog[] = JSON.parse(stored);
        setPrayerLogs(logs);
        updateStats(logs);
      } else {
        setPrayerLogs([]);
        setStats({
          totalPrayers: 0,
          currentStreak: 0,
          longestStreak: 0,
          prayersByDeity: {},
          earlyMorningPrayers: 0,
          prayersToday: 0,
          completedDates: [],
        });
      }
    }
  }, [user]);

  const updateStats = (logs: PrayerLog[]) => {
    const today = getDateString();
    const prayersByDeity: Record<string, number> = {};
    const completedDatesSet = new Set<string>();
    let earlyMorningPrayers = 0;
    let prayersToday = 0;

    logs.forEach(log => {
      // Count by deity
      prayersByDeity[log.deity] = (prayersByDeity[log.deity] || 0) + 1;

      // Track completed dates
      const logDate = log.completedAt.split('T')[0];
      completedDatesSet.add(logDate);

      // Count today's prayers
      if (logDate === today) {
        prayersToday++;
      }

      // Count early morning prayers (before 6 AM)
      const logTime = new Date(log.timestamp);
      if (logTime.getHours() < 6) {
        earlyMorningPrayers++;
      }
    });

    const completedDates = Array.from(completedDatesSet);
    const { current, longest } = calculateStreak(completedDates);

    setStats({
      totalPrayers: logs.length,
      currentStreak: current,
      longestStreak: longest,
      prayersByDeity,
      earlyMorningPrayers,
      prayersToday,
      completedDates,
    });
  };

  const logPrayer = (prayerId: string, deity: string) => {
    if (!user) return;

    const newLog: PrayerLog = {
      prayerId,
      deity,
      timestamp: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    const updatedLogs = [...prayerLogs, newLog];
    setPrayerLogs(updatedLogs);
    localStorage.setItem(`prayer-logs-${user.id}`, JSON.stringify(updatedLogs));
    updateStats(updatedLogs);
  };

  const getPrayerLogsForDate = (date: string) => {
    return prayerLogs.filter(log => log.completedAt.split('T')[0] === date);
  };

  const hasCompletedToday = () => {
    const today = getDateString();
    return stats.completedDates.includes(today);
  };

  return (
    <PrayerContext.Provider
      value={{
        prayerLogs,
        stats,
        logPrayer,
        getPrayerLogsForDate,
        hasCompletedToday,
      }}
    >
      {children}
    </PrayerContext.Provider>
  );
}

export function usePrayer() {
  const context = useContext(PrayerContext);
  if (context === undefined) {
    throw new Error('usePrayer must be used within a PrayerProvider');
  }
  return context;
}
