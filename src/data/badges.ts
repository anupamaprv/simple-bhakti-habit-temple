export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  achieved: boolean;
  achievedDate?: string;
  category: 'streak' | 'variety' | 'time' | 'dedication';
}

export const badgeDefinitions: Omit<Badge, 'achieved' | 'achievedDate'>[] = [
  // Streak badges
  {
    id: 'streak-3',
    name: 'Devoted Beginner',
    description: 'Complete prayers for 3 consecutive days',
    icon: '🕯️',
    requirement: '3 day streak',
    category: 'streak',
  },
  {
    id: 'streak-7',
    name: 'Weekly Warrior',
    description: 'Complete prayers for 7 consecutive days',
    icon: '🔥',
    requirement: '7 day streak',
    category: 'streak',
  },
  {
    id: 'streak-21',
    name: 'Habit Former',
    description: 'Complete prayers for 21 consecutive days',
    icon: '⭐',
    requirement: '21 day streak',
    category: 'streak',
  },
  {
    id: 'streak-30',
    name: 'Month Master',
    description: 'Complete prayers for 30 consecutive days',
    icon: '🏆',
    requirement: '30 day streak',
    category: 'streak',
  },
  {
    id: 'streak-108',
    name: 'Sacred 108',
    description: 'Complete prayers for 108 consecutive days',
    icon: '💎',
    requirement: '108 day streak',
    category: 'streak',
  },
  // Early morning badges
  {
    id: 'brahma-muhurta-1',
    name: 'Early Riser',
    description: 'Complete a prayer before 6 AM',
    icon: '🌅',
    requirement: 'Pray before 6 AM',
    category: 'time',
  },
  {
    id: 'brahma-muhurta-7',
    name: 'Dawn Devotee',
    description: 'Complete prayers before 6 AM for 7 days',
    icon: '🌄',
    requirement: 'Pray before 6 AM 7 times',
    category: 'time',
  },
  {
    id: 'brahma-muhurta-30',
    name: 'Brahma Muhurta Master',
    description: 'Complete prayers before 6 AM for 30 days',
    icon: '☀️',
    requirement: 'Pray before 6 AM 30 times',
    category: 'time',
  },
  // Variety badges
  {
    id: 'variety-3',
    name: 'Trinity Seeker',
    description: 'Pray to 3 different deities',
    icon: '🙏',
    requirement: 'Pray to 3 deities',
    category: 'variety',
  },
  {
    id: 'variety-5',
    name: 'Pancha Devotee',
    description: 'Pray to 5 different deities',
    icon: '✨',
    requirement: 'Pray to 5 deities',
    category: 'variety',
  },
  {
    id: 'variety-9',
    name: 'Navagraha Blessed',
    description: 'Pray to all 9 deities in the app',
    icon: '🌟',
    requirement: 'Pray to 9 deities',
    category: 'variety',
  },
  // Dedication badges
  {
    id: 'daily-5',
    name: 'Dedicated Soul',
    description: 'Complete 5 prayers in a single day',
    icon: '🪔',
    requirement: '5 prayers in one day',
    category: 'dedication',
  },
  {
    id: 'daily-10',
    name: 'Super Devotee',
    description: 'Complete 10 prayers in a single day',
    icon: '🛕',
    requirement: '10 prayers in one day',
    category: 'dedication',
  },
  {
    id: 'total-100',
    name: 'Centurion',
    description: 'Complete 100 total prayers',
    icon: '💯',
    requirement: '100 total prayers',
    category: 'dedication',
  },
  {
    id: 'total-500',
    name: 'Spiritual Sage',
    description: 'Complete 500 total prayers',
    icon: '🕉️',
    requirement: '500 total prayers',
    category: 'dedication',
  },
];
