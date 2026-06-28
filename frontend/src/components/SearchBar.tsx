import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex-1 min-w-[200px] group">
      <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500 group-focus-within:text-brand-500 transition-colors" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search merchant, category, amount..."
        aria-label="Search transactions"
        className="w-full rounded-xl border border-ink-300/60 bg-white py-2.5 pl-10 pr-10 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 focus:shadow-md transition-all duration-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-expense hover:bg-expense/10 rounded-full p-0.5 transition-all duration-200"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
