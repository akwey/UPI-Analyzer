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
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
      <div className="h-56 w-56 shrink-0 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent rounded-full blur-2xl"></div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              stroke="none"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((slice) => (
                <Cell key={slice.category} fill={getCategoryMeta(slice.category).chart} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ 
                borderRadius: 12, 
                border: "1px solid #e2e8f0", 
                fontSize: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "8px 12px"
              }}
              cursor={{ fill: "rgba(0,0,0,0.05)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <ul className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-1">
        {data.map((slice, index) => (
          <li 
            key={slice.category} 
            className="flex items-center gap-2.5 text-sm p-2 rounded-lg hover:bg-ink-50/50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span
              className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white shadow-sm"
              style={{ backgroundColor: getCategoryMeta(slice.category).chart }}
            />
            <span className="text-ink-700 truncate font-medium text-xs">{slice.category}</span>
            <span className="ml-auto shrink-0 font-bold text-ink-900 text-xs">{slice.percentage}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
