import { CATEGORY_OPTIONS } from "@/types/transaction";

interface CategorySelectProps {
  value: string;
  onChange: (category: string) => void;
  disabled?: boolean;
  className?: string;
}

export function CategorySelect({ value, onChange, disabled, className = "" }: CategorySelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Change category"
      className={`appearance-none rounded-lg border border-ink-300/60 bg-white px-2.5 py-1.5 text-xs font-medium text-ink-700 cursor-pointer hover:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {CATEGORY_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
