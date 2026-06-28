import type { CategorySlice } from "@/types/transaction";
import { getCategoryMeta } from "@/utils/categoryMeta";
import { formatCurrency } from "@/utils/format";

interface CategoryProgressBarsProps {
  data: CategorySlice[];
}

export function CategoryProgressBars({ data }: CategoryProgressBarsProps) {
  return (
    <div className="space-y-4">
      {data.map((slice, index) => {
        const { chart } = getCategoryMeta(slice.category);
        return (
          <div key={slice.category} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold text-ink-700">{slice.category}</span>
              <span className="font-bold text-ink-900">{formatCurrency(slice.amount)}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-300/20 shadow-inner">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out relative"
                style={{ 
                  width: `${slice.percentage}%`, 
                  backgroundColor: chart,
                  boxShadow: `0 0 8px ${chart}40`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
