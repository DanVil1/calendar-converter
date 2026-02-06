import { CalendarConfig } from '@/app/types/calendar';
import { LoreTooltip } from '@/app/components/ui/LoreTooltip';

interface CalendarCardProps {
  calendar: CalendarConfig;
  fullDate: string;
  lookupKey: string;
  lore?: string;
}

export function CalendarCard({ calendar, fullDate, lookupKey, lore }: CalendarCardProps) {
  const isGregorian = calendar.id === 'gregory';
  const isMayan = calendar.id === 'mayan';
  const hasLore = !!lore;

  return (
    <div 
      className={`relative flex flex-col p-5 rounded-xl border transition-all duration-300 ${
        isGregorian 
          ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/40 col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-10' 
          : 'bg-gray-900 border-gray-800 hover:border-gray-600'
      }`}
    >
      {/* Header */}
      <div className={`flex items-start ${isGregorian ? 'justify-center mb-6' : 'justify-between mb-2'}`}>
        <div className="text-left">
          <h3 className={`font-bold ${isGregorian ? 'text-blue-300 text-3xl' : 'text-emerald-400 text-lg'}`}>
            {calendar.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{calendar.desc}</p>
        </div>
        
        {/* Lore Tooltip */}
        {!isGregorian && hasLore && (
          <LoreTooltip lookupKey={lookupKey} lore={lore} />
        )}
      </div>
      
      {/* Date Display */}
      <p className={`font-mono text-gray-100 ${isGregorian ? 'text-6xl font-bold tracking-tighter' : 'text-base md:text-lg'}`}>
        {fullDate}
      </p>

      {/* Mayan Extra Info */}
      {isMayan && (
        <p className="text-[10px] text-gray-500 mt-1 font-mono opacity-60">
          Baktun . Katun . Tun . Uinal . Kin
        </p>
      )}
    </div>
  );
}
