import { CATEGORY_OPTIONS } from "@/types/transaction";

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  disabled?: boolean;
  className?: string;
}

export function CategorySelect({ value, onChange, disabled, className = "" }: CategorySelectProps) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Change category"
        className={`appearance-none rounded-lg border border-ink-300/60 bg-white pl-2.5 pr-7 py-1.5 text-[12px] font-semibold text-ink-700 cursor-pointer hover:border-brand-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <svg className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-ink-500" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M2 4L5 7L8 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
