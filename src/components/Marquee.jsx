import React from "react";
import Link from "next/link";
import { getProducts } from "@/lib/api"; // cached fetch ("use cache")
import { toBn, formatPct } from "@/lib/format";
import { UNIT_SHORT } from "@/lib/market";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const TREND = {
  up: { sign: "▲", cls: "text-error" },
  down: { sign: "▼", cls: "text-success" },
  flat: { sign: "—", cls: "text-gray-500" },
};

const Row = ({ data, hidden = false }) => (
  <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
    {data.map((each) => {
      const { sign, cls } = TREND[each.change.dir] ?? TREND.flat;
      return (
        <div
          key={each.id}
          tabIndex={hidden ? -1 : undefined}
          className="flex border-r border-border shrink-0 items-center gap-1.5 whitespace-nowrap px-4 sm:px-6 text-[12px] sm:text-sm text-heading hover:underline"
        >
          <span
            className="bg-border size-5 sm:size-6 rounded-full flex items-center justify-center text-[11px] sm:text-sm"
            aria-hidden="true"
          >
            {each.image}
          </span>
          <h3 className="font-semibold">{each.nameBn}</h3>
          <span>
            {toBn(each.today)} টাকা/{UNIT_SHORT[each.unit] ?? each.unit}
          </span>
          <span className={`font-semibold ${cls}`}>
            {sign} {formatPct(each.change.pct)}
          </span>
        </div>
      );
    })}
  </div>
);

const Marquee = async () => {
  let data = [];
  try {
    data = await getProducts();
  } catch {
    return null;
  }
  if (data.length === 0) return null;

  return (
    <MarqueeText direction="right" duration={10}>
      <div
        className="marquee py-1.5 sm:py-2 border-y border-border overflow-hidden ]"
        role="region"
        aria-label="আজকের দামের সারসংক্ষেপ"
      >
        <div
          className="marquee-track flex w-max"
          style={{ "--marquee-duration": `${data.length * 3}s` }}
        >
          <Row data={data} />
          <Row data={data} hidden />
        </div>
      </div>
    </MarqueeText>
  );
};

export default Marquee;
