import { DateInfo } from '@/app/types/calendar';

/**
 * Calculate Mayan Long Count date from a given date
 * Based on the correlation with the end of the 13th Baktun (Dec 21, 2012)
 */
export function getMayanDate(date: Date): string {
  const baseDate = new Date(2012, 11, 21);
  const diffTime = date.getTime() - baseDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  let totalDays = 1872000 + diffDays;

  if (totalDays < 0) return "Pre-Creation";

  const baktun = Math.floor(totalDays / 144000);
  totalDays %= 144000;
  const katun = Math.floor(totalDays / 7200);
  totalDays %= 7200;
  const tun = Math.floor(totalDays / 360);
  totalDays %= 360;
  const uinal = Math.floor(totalDays / 20);
  const kin = totalDays % 20;

  return `${baktun}.${katun}.${tun}.${uinal}.${kin}`;
}

/**
 * Get formatted date info for a specific calendar system
 */
export function getDateInfo(date: Date, calendarId: string): DateInfo {
  if (calendarId === 'mayan') {
    return { 
      fullDate: getMayanDate(date), 
      lookupKey: 'longCount', 
      monthName: '', 
      eraName: '' 
    };
  }

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      calendar: calendarId,
      dateStyle: 'full',
    });
    
    const fullDate = formatter.format(date);
    const parts = formatter.formatToParts(date);
    
    const monthName = parts.find(p => p.type === 'month')?.value || '';
    const eraName = parts.find(p => p.type === 'era')?.value || '';
    const lookupKey = (calendarId === 'japanese' ? eraName : monthName).trim();

    return { fullDate, lookupKey, monthName, eraName };
  } catch {
    return { fullDate: 'Not Supported', lookupKey: '', monthName: '', eraName: '' };
  }
}
