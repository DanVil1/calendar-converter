'use client';

import { useState } from 'react';
import { CALENDARS, CALENDAR_LORE } from '@/app/data/calendars';
import { getDateInfo } from '@/app/lib/calendar-utils';
import { DatePicker } from '@/app/components/ui/DatePicker';
import { CalendarCard } from '@/app/components/calendar/CalendarCard';

export function CalendarGrid() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const [year, month, day] = e.target.value.split('-').map(Number);
      setSelectedDate(new Date(year, month - 1, day));
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 font-sans">
      <DatePicker 
        value={selectedDate} 
        onChange={handleDateChange} 
        calendarCount={CALENDARS.length} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CALENDARS.map((cal) => {
          const { fullDate, lookupKey } = getDateInfo(selectedDate, cal.id);
          const lore = CALENDAR_LORE[cal.id]?.[lookupKey];

          return (
            <CalendarCard
              key={cal.id}
              calendar={cal}
              fullDate={fullDate}
              lookupKey={lookupKey}
              lore={lore}
            />
          );
        })}
      </div>
    </div>
  );
}
