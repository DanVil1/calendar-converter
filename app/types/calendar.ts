export interface CalendarConfig {
  id: string;
  name: string;
  desc: string;
}

export interface DateInfo {
  fullDate: string;
  lookupKey: string;
  monthName: string;
  eraName: string;
}

export type CalendarLore = Record<string, Record<string, string>>;
