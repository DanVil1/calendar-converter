'use client';

import React, { useState, useEffect } from 'react';

// --- DATA: Cultural Lore Database (English) ---
const CALENDAR_LORE: Record<string, Record<string, string>> = {
  hebrew: {
    Nisan: "Month of Spring. The Israelites left Egypt (Passover).",
    Iyar: "Month of 'Radiance'. Natural healing and light.",
    Sivan: "The month when the Torah was given (Shavuot).",
    Tamuz: "A month of mourning (Breach of Jerusalem's walls).",
    Av: "Tisha B'Av (Destruction of Temples) occurs here.",
    Elul: "Month of repentance and mercy before the New Year.",
    Tishrei: "Holiest month: Rosh Hashanah & Yom Kippur.",
    Cheshvan: "'Bitter' month (Mar-Cheshvan) due to lack of holidays.",
    Kislev: "Month of dreams and Hanukkah (Lights).",
    Tevet: "Siege of Jerusalem. A winter month.",
    Shevat: "New Year for Trees (Tu B'Shvat). Nature wakes up.",
    Adar: "Month of joy and luck (Purim).",
    "Adar I": "Leap month (Preliminary joy).",
    "Adar II": "Main Adar in leap years (Purim).",
  },
  'islamic-umalqura': {
    Muharram: "Sacred Month. Islamic New Year. War is forbidden.",
    Safar: "The 'Void' month. Historically houses were empty.",
    "Rabiʻ I": "Month of Spring. Birth of the Prophet.",
    "Rabiʻ II": "Second month of spring.",
    "Jumada I": "First month of parched land/heat.",
    "Jumada II": "Second month of parched land.",
    Rajab: "The 'Respectful' month. Sacred, no fighting.",
    "Shaʻban": "Month of 'separation'. Precedes Ramadan.",
    Ramadan: "Month of fasting, prayer and Quran.",
    Shawwal: "Month of 'carrying'. Marks Eid al-Fitr.",
    "Dhuʻl-Qiʻdah": "Month of 'truce/sitting'.",
    "Dhuʻl-Hijjah": "Month of Hajj (Pilgrimage).",
  },
  persian: {
    Farvardin: "Nowruz (New Year). Guardian Spirits.",
    Ordibehesht: "Best Truth/Righteousness.",
    Khordad: "Wholeness and Perfection.",
    Tir: "The Dog Star (Sirius). Rain bringing.",
    Mordad: "Immortality.",
    Shahrivar: "Desirable Dominion/Power.",
    Mehr: "Dedicated to Mithra (Covenant/Light).",
    Aban: "Waters (Anahita).",
    Azar: "Fire. Warmth and Hearth.",
    Dey: "The Creator. First winter month.",
    Bahman: "Good Purpose/Mind. Animal protection.",
    Esfand: "Holy Devotion. Cleaning for rebirth.",
  },
  indian: {
    Chaitra: "First month (Spring). Creation of Universe.",
    Vaisakha: "Harvest. Buddha Purnima.",
    Jyeshtha: "Hottest month. Star Antares.",
    Ashadha: "Monsoon begins.",
    Shravana: "Holy month of Shiva and learning.",
    Bhadra: "Festivals (Ganesh Chaturthi).",
    Ashvina: "Navaratri and Dussehra.",
    Kartika: "Holiest month (Diwali).",
    Agrahayana: "Ancient 'Beginning of Year'.",
    Pausha: "Peak Winter.",
    Magha: "Royal splendor. Ritual bathing.",
    Phalguna: "Last month. Holi (Colors).",
  },
  japanese: {
    Reiwa: "Current Era (2019-Present). 'Beautiful Harmony'.",
    Heisei: "Era (1989-2019). 'Achieving Peace'.",
    Show: "Era (1926-1989). 'Enlightened Harmony'.",
    Shōwa: "Era (1926-1989). 'Enlightened Harmony'.",
    Taisho: "Era (1912-1926). 'Great Righteousness'.",
    Meiji: "Era (1868-1912). 'Enlightened Rule'.",
  },
  ethiopic: {
    Meskerem: "New Year (Enkutatash). End of rainy season.",
    Tikimt: "Flowers bloom.",
    Hidar: "Month of harvest.",
    Tahsas: "Christmas (Genna) usually falls near end.",
    Tir: "Epiphany (Timkat).",
    Yakatit: "Second harvest season.",
    Megabit: "Fasting period (Lent).",
    Miazia: "Easter usually falls here.",
    Genbot: "Month of Mary.",
    Sene: "Beginning of rainy season.",
    Hamle: "Heavy rains.",
    Nehasa: "Final rainy month.",
    Pagume: "The 13th month. 'Days added'.",
  },
  buddhist: {
    January: "Pre-Magha Puja preparation.",
    February: "Magha Puja (Sangha Day). Full moon.",
    March: "Transition to New Year.",
    April: "Songkran (New Year). Water festival.",
    May: "Visakha Bucha (Vesak). Holiest month.",
    June: "Poson Poya (Sri Lanka).",
    July: "Asalha Puja (Dhamma Day). Rains Retreat starts.",
    August: "Mid-Vassa meditation period.",
    September: "Monastic giving season.",
    October: "End of Vassa (Pavaranā).",
    November: "Loy Krathong (Festival of Lights).",
    December: "Bodhi Day (Enlightenment).",
  },
  mayan: {
    longCount: "The Long Count tracks days since creation (Aug 11, 3114 BCE).",
  }
};

const CALENDARS = [
  { id: 'gregory', name: 'Gregorian', desc: 'Civil Standard' },
  { id: 'hebrew', name: 'Hebrew', desc: 'Jewish Lunisolar' },
  { id: 'islamic-umalqura', name: 'Islamic', desc: 'Muslim Lunar' },
  { id: 'buddhist', name: 'Buddhist', desc: 'Theravada Era (BE)' }, // NOW INCLUDED
  { id: 'mayan', name: 'Mayan', desc: 'Long Count (Custom)' },
  { id: 'ethiopic', name: 'Ethiopian', desc: '7 years behind' },
  { id: 'persian', name: 'Persian', desc: 'Solar (Iran)' },
  { id: 'indian', name: 'Indian', desc: 'Saka Era' },
  { id: 'japanese', name: 'Japanese', desc: 'Imperial Eras' },
  { id: 'chinese', name: 'Chinese', desc: 'Lunisolar' },
];

export default function CalendarGrid() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // State to handle tooltip visibility manually per card
  // This helps avoiding issues with hover on mobile or complex CSS
  const [tooltipOpen, setTooltipOpen] = useState<string | null>(null);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const [year, month, day] = e.target.value.split('-').map(Number);
      setSelectedDate(new Date(year, month - 1, day));
    }
  };

  // --- MAYAN LOGIC (Custom) ---
  const getMayanDate = (date: Date) => {
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
  };

  const getDateInfo = (date: Date, calendarId: string) => {
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
      
      let monthName = parts.find(p => p.type === 'month')?.value || '';
      let eraName = parts.find(p => p.type === 'era')?.value || '';
      let lookupKey = calendarId === 'japanese' ? eraName : monthName;
      
      lookupKey = lookupKey.trim();

      return { fullDate, lookupKey, monthName, eraName };
    } catch (e) {
      return { fullDate: 'Not Supported', lookupKey: '', monthName: '', eraName: '' };
    }
  };

  if (!selectedDate) return <div className="text-white p-10 font-mono">Loading Temporal Systems...</div>;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 font-sans">
      {/* Date Picker */}
      <div className="mb-8 bg-gray-900/80 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className='w-full'>
          <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
            Reference Date
          </label>
          <input
            type="date"
            className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
        </div>
        <div className="text-right hidden md:block">
           <p className="text-gray-500 text-sm">Targeting {CALENDARS.length} distinct timelines.</p>
        </div>
      </div>

      {/* Grid - Adjusted for 10 items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CALENDARS.map((cal) => {
          const { fullDate, lookupKey } = getDateInfo(selectedDate, cal.id);
          const lore = CALENDAR_LORE[cal.id]?.[lookupKey];
          const hasLore = !!lore;

          return (
            <div 
              key={cal.id}
              className={`relative flex flex-col p-5 rounded-xl border transition-all duration-300 ${
                cal.id === 'gregory' 
                  ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/40 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-10' 
                  : 'bg-gray-900 border-gray-800 hover:border-gray-600'
              }`}
            >
              {/* Header */}
              <div className={`flex items-start ${cal.id === 'gregory' ? 'justify-center mb-6' : 'justify-between mb-2'}`}>
                <div className='text-left'>
                  <h3 className={`font-bold ${cal.id === 'gregory' ? 'text-blue-300 text-3xl' : 'text-emerald-400 text-lg'}`}>
                    {cal.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{cal.desc}</p>
                </div>
                
                {/* TOOLTIP ICON (The "!" Button) */}
                {cal.id !== 'gregory' && hasLore && (
                  <div className="group relative">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-600 text-gray-400 text-xs font-serif hover:bg-emerald-900 hover:text-white hover:border-emerald-500 transition-colors cursor-help">
                      !
                    </div>
                    
                    {/* The Hidden Tooltip */}
                    <div className="absolute top-8 right-0 w-64 bg-black border border-gray-700 text-gray-200 text-sm rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-2xl pointer-events-none">
                      <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-2">
                        <span className="text-emerald-500 font-bold text-xs uppercase">{lookupKey}</span>
                      </div>
                      <p className='leading-snug text-gray-300 italic'>"{lore}"</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Date Display */}
              <p className={`font-mono text-gray-100 ${cal.id === 'gregory' ? 'text-6xl font-bold tracking-tighter' : 'text-base md:text-lg'}`}>
                {fullDate}
              </p>

              {/* Mayan Extra Info */}
              {cal.id === 'mayan' && (
                 <p className="text-[10px] text-gray-500 mt-1 font-mono opacity-60">
                   Baktun . Katun . Tun . Uinal . Kin
                 </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}