import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { CategorySlice } from "@/types/transaction";
import { getCategoryMeta } from "@/utils/categoryMeta";
import { formatCurrency } from "@/utils/format";
import { EmptyState } from "@/components/EmptyState";
import { PieChart as PieChartIcon } from "lucide-react";

interface CategoryPieChartProps {
  data: CategorySlice[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  if (data.length === 0) {
    return (
      <EmptyState
        icon={PieChartIcon}
        title="No spending yet"
        description="Add an expense to see how your spending breaks down by category."
      />
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
      <div className="h-56 w-56 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((slice) => (
                <Cell key={slice.category} fill={getCategoryMeta(slice.category).chart} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
        {data.map((slice) => (
          <li key={slice.category} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: getCategoryMeta(slice.category).chart }}
            />
            <span className="text-ink-700 truncate">{slice.category}</span>
            <span className="ml-auto shrink-0 font-medium text-ink-900">{slice.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
