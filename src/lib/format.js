export const UNIT_LABEL = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

// 1290 -> ১,২৯০
export const toBn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

export const formatPrice = (n) => `${toBn(n)} টাকা`;

// 12.5 -> ১২.৫%
export const formatPct = (pct) =>
  `${toBn(Math.abs(pct), { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
