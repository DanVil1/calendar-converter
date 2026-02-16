interface DatePickerProps {
  value: Date;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  calendarCount: number;
}

export function DatePicker({ value, onChange, calendarCount }: DatePickerProps) {
  return (
    <div className="mb-8 bg-neutral-900 p-6 rounded-lg border border-neutral-800 shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between">
      <div className="w-full">
        <label className="block text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">
          Reference Date
        </label>
        <input
          type="date"
          className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 focus:ring-neutral-600 transition-all font-mono [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100"
          value={value.toISOString().split('T')[0]}
          onChange={onChange}
        />
      </div>
      <div className="text-right hidden md:block">
        <p className="text-neutral-500 text-sm">Targeting {calendarCount} distinct timelines.</p>
      </div>
    </div>
  );
}
