interface LoreTooltipProps {
  lookupKey: string;
  lore: string;
}

export function LoreTooltip({ lookupKey, lore }: LoreTooltipProps) {
  return (
    <div className="group relative">
      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-600 text-gray-400 text-xs font-serif hover:bg-emerald-900 hover:text-white hover:border-emerald-500 transition-colors cursor-help">
        !
      </div>
      
      {/* The Hidden Tooltip */}
      <div className="absolute top-8 right-0 w-64 bg-black border border-gray-700 text-gray-200 text-sm rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-2xl pointer-events-none">
        <div className="flex items-center gap-2 mb-2 border-b border-gray-800 pb-2">
          <span className="text-emerald-500 font-bold text-xs uppercase">{lookupKey}</span>
        </div>
        <p className="leading-snug text-gray-300 italic">&quot;{lore}&quot;</p>
      </div>
    </div>
  );
}
