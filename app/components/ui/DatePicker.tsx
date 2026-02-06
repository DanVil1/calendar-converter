interface DatePickerProps {
  value: Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calendarCount: number;
}

export function DatePicker({ value, onChange, calendarCount }: DatePickerProps) {
  return (
    <div className="mb-8 bg-gray-900/80 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm shadow-xl flex flex-col md:flex-row items-center gap-6 justify-between">
      <div className="w-full">
        <label className="block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
          Reference Date
        </label>
        <input
          type="date"
          className="w-full p-3 bg-gray-950 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
          value={value.toISOString().split('T')[0]}
          onChange={onChange}
        />
      </div>
      <div className="text-right hidden md:block">
        <p className="text-gray-500 text-sm">Targeting {calendarCount} distinct timelines.</p>
      </div>
    </div>
  );
}
