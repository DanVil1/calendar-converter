interface LoreTooltipProps {
  lookupKey: string;
  lore: string;
}

export function LoreTooltip({ lookupKey, lore }: LoreTooltipProps) {
  return (
    <div className="group relative">
      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-neutral-700 text-neutral-400 text-xs font-serif hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-colors cursor-help">
        !
      </div>
      
      {/* The Hidden Tooltip */}
      <div className="absolute top-8 right-0 w-64 bg-neutral-900 border border-neutral-800 text-neutral-400 text-sm rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 shadow-sm pointer-events-none">
        <div className="flex items-center gap-2 mb-2 border-b border-neutral-800 pb-2">
          <span className="text-white font-bold text-xs uppercase">{lookupKey}</span>
        </div>
        <p className="leading-snug text-neutral-400 italic">&quot;{lore}&quot;</p>
      </div>
    </div>
  );
}
