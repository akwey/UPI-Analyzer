import type { CategorySlice } from "@/types/transaction";
import { getCategoryMeta } from "@/utils/categoryMeta";
import { formatCurrency } from "@/utils/format";

interface CategoryProgressBarsProps {
  data: CategorySlice[];
}

export function CategoryProgressBars({ data }: CategoryProgressBarsProps) {
  return (
    <div className="space-y-4">
      {data.map((slice) => {
        const { chart } = getCategoryMeta(slice.category);
        return (
          <div key={slice.category}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium text-ink-700">{slice.category}</span>
              <span className="text-ink-500">{formatCurrency(slice.amount)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink-300/20">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${slice.percentage}%`, backgroundColor: chart }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
