"use client";

import { useMemo, useState } from "react";
import { CaretUp, CaretDown } from "@gravity-ui/icons";
import { formatTaka } from "@/lib/market";

const COLUMNS = [
  { key: "market", label: "বাজার", align: "left" },
  { key: "division", label: "বিভাগ", align: "left" },
  { key: "min", label: "সর্বনিম্ন", align: "right" },
  { key: "max", label: "সর্বোচ্চ", align: "right" },
  { key: "avg", label: "গড়", align: "right" },
];

const MarketTable = ({ rows }) => {
  const [sort, setSort] = useState({ key: "avg", dir: "asc" });

  const sorted = useMemo(() => {
    const { key, dir } = sort;
    const factor = dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) =>
      typeof a[key] === "string"
        ? a[key].localeCompare(b[key], "bn") * factor
        : (a[key] - b[key]) * factor,
    );
  }, [rows, sort]);

  const toggle = (key) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-160 border-collapse text-sm">
        <thead>
          <tr className="bg-white text-[12px] text-gray-500">
            {COLUMNS.map((c) => {
              const active = sort.key === c.key;
              const Icon = sort.dir === "asc" ? CaretUp : CaretDown;
              return (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={
                    active
                      ? sort.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`font-semibold px-4 py-3 ${
                    c.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(c.key)}
                    className={`inline-flex items-center gap-1 font-semibold hover:text-heading focus-visible:outline-2 focus-visible:outline-gray-400 ${
                      active ? "text-heading" : ""
                    }`}
                  >
                    {c.label}
                    {active && <Icon className="size-3" />}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr
              key={`${r.market}-${r.division}`}
              className={`border-t border-border ${i % 2 ? "bg-border/40" : "bg-white"}`}
            >
              <td className="px-4 py-3 font-semibold text-heading">
                {r.market}
              </td>
              <td className="px-4 py-3 text-gray-500">{r.division}</td>
              <td className="px-4 py-3 text-right">{formatTaka(r.min)}</td>
              <td className="px-4 py-3 text-right">{formatTaka(r.max)}</td>
              <td className="px-4 py-3 text-right font-bold text-heading">
                {formatTaka(r.avg)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
