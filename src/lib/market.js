import { toBn } from "./format";

export const UNIT_SHORT = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// 62 -> ৬২   |   67.5 -> ৬৭.৫০
export const formatNum = (n) =>
  toBn(n, {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  });

export const formatTaka = (n) => `${formatNum(n)} টাকা`;

// add average to every market row + overall summary
export const buildMarketStats = (markets = []) => {
  const rows = markets.map((m) => ({ ...m, avg: (m.min + m.max) / 2 }));
  if (rows.length === 0)
    return { rows, lowest: null, highest: null, average: 0 };

  const lowest = rows.reduce((a, b) => (b.min < a.min ? b : a));
  const highest = rows.reduce((a, b) => (b.max > a.max ? b : a));
  const average = rows.reduce((sum, r) => sum + r.avg, 0) / rows.length;

  return { rows, lowest, highest, average: Math.round(average) };
};
