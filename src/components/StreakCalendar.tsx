import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlameIcon } from '@/components/FlameIcon';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  completedDates: string[];
  className?: string;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function StreakCalendar({ completedDates, className }: StreakCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get days from previous month to fill the first row
  const prevMonthDays = [];
  const prevMonth = new Date(year, month, 0);
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    prevMonthDays.push({
      day: prevMonth.getDate() - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonth.getDate() - i).toISOString().split('T')[0],
    });
  }
  
  // Current month days
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i).toISOString().split('T')[0],
    });
  }
  
  // Next month days to fill remaining cells
  const totalCells = 42; // 6 rows x 7 days
  const remainingCells = totalCells - prevMonthDays.length - currentMonthDays.length;
  const nextMonthDays = [];
  for (let i = 1; i <= remainingCells; i++) {
    nextMonthDays.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i).toISOString().split('T')[0],
    });
  }
  
  const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  
  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  
  const today = new Date().toISOString().split('T')[0];
  const completedSet = new Set(completedDates);

  return (
    <div className={cn("bg-card rounded-xl p-4 shadow-card", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" onClick={goToPrevMonth}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="font-serif font-semibold text-lg">
          {MONTHS[month]} {year}
        </h3>
        <Button variant="ghost" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((dayInfo, index) => {
          const isCompleted = completedSet.has(dayInfo.date);
          const isToday = dayInfo.date === today;
          
          return (
            <div
              key={index}
              className={cn(
                "relative aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200",
                !dayInfo.isCurrentMonth && "text-muted-foreground/40",
                isToday && dayInfo.isCurrentMonth && "ring-2 ring-primary/50",
                dayInfo.isCurrentMonth && !isCompleted && "hover:bg-muted"
              )}
            >
              {isCompleted && dayInfo.isCurrentMonth ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FlameIcon className="w-8 h-8" animated={isToday} />
                  <span className="absolute text-[10px] font-bold text-primary-foreground mt-1">
                    {dayInfo.day}
                  </span>
                </div>
              ) : (
                <span>{dayInfo.day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
