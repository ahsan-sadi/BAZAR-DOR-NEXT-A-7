import { CaretUp, CaretDown, Minus } from "@gravity-ui/icons";

const toBn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

const formatPct = (pct) =>
  `${toBn(Math.abs(pct), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

export const ChangeBadge = ({ change }) => {
  const styles = {
    up: {
      cls: "text-error bg-border border-border",
      Icon: CaretUp,
    },
    down: {
      cls: "text-success bg-border border-border",
      Icon: CaretDown,
    },
    flat: {
      cls: "text-black bg-border border-border",
      Icon: Minus,
    },
  };
  const { cls, Icon } = styles[change.dir] ?? styles.flat;

  return (
    <span
      className={`inline-flex items-center gap-0.5 shrink-0 py-1 px-2 font-semibold text-[12px] leading-4 border rounded-2xl ${cls}`}
    >
      <Icon className="size-3" />
      {formatPct(change.pct)}
    </span>
  );
};
