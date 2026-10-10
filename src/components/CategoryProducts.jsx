"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CaretUp, CaretDown, Minus } from "@gravity-ui/icons";
import { toBn, formatPrice, formatPct, UNIT_LABEL } from "@/lib/format";

const SORTS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
  { value: "rise", label: "সবচেয়ে বেশি বেড়েছে" },
  { value: "fall", label: "সবচেয়ে বেশি কমেছে" },
];

const SORT_FN = {
  "price-asc": (a, b) => a.today - b.today,
  "price-desc": (a, b) => b.today - a.today,
  rise: (a, b) => b.change.pct - a.change.pct,
  fall: (a, b) => a.change.pct - b.change.pct,
};

const BADGE = {
  up: { cls: "text-error bg-error/10 border-error/20", Icon: CaretUp },
  down: {
    cls: "text-success bg-success/10 border-success/20",
    Icon: CaretDown,
  },
  flat: { cls: "text-gray-500 bg-gray-100 border-gray-200", Icon: Minus },
};

const CategoryProducts = ({ products }) => {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const fn = SORT_FN[sort];
    return fn ? [...products].sort(fn) : products;
  }, [products, sort]);

  return (
    <>
      {/* sort bar */}
      <section className="flex items-center justify-end gap-2 p-3 sm:p-4 rounded-xl border border-border bg-white">
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
      </section>

      <p
        className="text-[12px] font-semibold leading-4 text-gray-500"
        aria-live="polite"
      >
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* products */}
      {sorted.length > 0 ? (
        <div className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((p) => {
            const { cls, Icon } = BADGE[p.change.dir] ?? BADGE.flat;
            return (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="item block p-4 rounded-xl border border-border bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
              >
                <div className="info flex gap-4 items-center">
                  <div
                    className="img bg-border size-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl"
                    aria-hidden="true"
                  >
                    {p.image}
                  </div>
                  <div className="text min-w-0">
                    <h2 className="text-heading font-bold text-base leading-6 truncate">
                      {p.nameBn}
                    </h2>
                    <h3 className="text-[12px] font-semibold leading-4 mt-1 text-gray-500">
                      {UNIT_LABEL[p.unit] ?? `প্রতি ${p.unit}`}
                    </h3>
                  </div>
                </div>

                <div className="priceInfo mt-3">
                  <h2 className="text-[12px] font-semibold leading-4 text-gray-500">
                    আজকের দাম
                  </h2>
                  <div className="price flex items-center justify-between gap-2 mt-1">
                    <h3 className="text-heading font-bold text-sm leading-6">
                      {formatPrice(p.today)}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-0.5 py-1 px-2 font-semibold text-[12px] leading-4 border rounded-2xl ${cls}`}
                    >
                      <Icon className="size-3" />
                      {formatPct(p.change.pct)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </>
  );
};

export default CategoryProducts;
