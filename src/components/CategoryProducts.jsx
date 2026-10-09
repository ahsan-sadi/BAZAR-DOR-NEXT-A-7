"use client";

import { useMemo, useState } from "react";
import { CaretDown } from "@gravity-ui/icons";
import ProductGrid from "./ProductGrid";
import { toBn } from "../lib/format";

const SORTS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
  { value: "rise", label: "সবচেয়ে বেশি বেড়েছে" },
  { value: "fall", label: "সবচেয়ে বেশি কমেছে" },
  { value: "name", label: "নাম (অ–ঔ)" },
];

const sorters = {
  default: null,
  "price-asc": (a, b) => a.today - b.today,
  "price-desc": (a, b) => b.today - a.today,
  rise: (a, b) => b.change.pct - a.change.pct,
  fall: (a, b) => a.change.pct - b.change.pct,
  name: (a, b) => a.nameBn.localeCompare(b.nameBn, "bn"),
};

const CategoryProducts = ({ products }) => {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const fn = sorters[sort];
    return fn ? [...products].sort(fn) : products;
  }, [products, sort]);

  return (
    <>
      {/* sort bar */}
      <div className="flex items-center justify-end gap-2 p-3 sm:p-4 rounded-xl border border-border bg-white">
        <label
          htmlFor="sort"
          className="text-[12px] font-semibold text-gray-500"
        >
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none cursor-pointer rounded-lg border border-border bg-white py-1.5 pl-3 pr-8 text-sm font-semibold text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <CaretDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <p className="text-[12px] leading-4 text-gray-500" aria-live="polite">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {sorted.length > 0 ? (
        <ProductGrid products={sorted} />
      ) : (
        <p className="text-center text-gray-500 py-10">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </>
  );
};

export default CategoryProducts;
