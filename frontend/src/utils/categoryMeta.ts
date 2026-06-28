import {
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Clapperboard,
  Wallet,
  Stethoscope,
  CircleDashed,
  type LucideIcon,
} from "lucide-react";

interface CategoryMeta {
  icon: LucideIcon;
  bg: string;
  text: string;
  chart: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  Food: { icon: UtensilsCrossed, bg: "bg-orange-50", text: "text-orange-600", chart: "#fb923c" },
  Travel: { icon: Car, bg: "bg-sky-50", text: "text-sky-600", chart: "#38bdf8" },
  Shopping: { icon: ShoppingBag, bg: "bg-violet-50", text: "text-violet-600", chart: "#a78bfa" },
  Bills: { icon: Receipt, bg: "bg-amber-50", text: "text-amber-600", chart: "#fbbf24" },
  Entertainment: { icon: Clapperboard, bg: "bg-pink-50", text: "text-pink-600", chart: "#f472b6" },
  Salary: { icon: Wallet, bg: "bg-emerald-50", text: "text-emerald-600", chart: "#34d399" },
  Medical: { icon: Stethoscope, bg: "bg-rose-50", text: "text-rose-600", chart: "#fb7185" },
  Miscellaneous: { icon: CircleDashed, bg: "bg-slate-100", text: "text-slate-500", chart: "#94a3b8" },
};

export function getCategoryMeta(category: string): CategoryMeta {
  return CATEGORY_META[category] ?? CATEGORY_META.Miscellaneous;
}
