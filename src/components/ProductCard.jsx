import Link from "next/link";
import { ChangeBadge } from "./ChangeBadge";

const toBn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

const formatPrice = (n) => `${toBn(n)} টাকা`;
const UNIT_LABEL = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const ProductCard = ({ product }) => (
  <Link
    href={`/products/${product.slug}`}
    className="item block p-4 rounded-xl border border-border bg-white transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
  >
    <div className="info flex gap-4 items-center">
      <div
        className="img bg-border size-12 shrink-0 rounded-2xl flex items-center justify-center text-2xl"
        aria-hidden="true"
      >
        {product.image}
      </div>
      <div className="text min-w-0">
        <h2 className="text-heading font-bold text-base leading-6 truncate">
          {product.nameBn}
        </h2>
        <h3 className="text-[12px] font-semibold leading-4 mt-1 text-pera">
          {UNIT_LABEL[product.unit] ?? `প্রতি ${product.unit}`}
        </h3>
      </div>
    </div>

    <div className="priceInfo mt-3">
      <h2 className="text-[12px] font-semibold leading-4 text-pera">
        আজকের দাম
      </h2>
      <div className="price flex items-center justify-between gap-2 mt-1">
        <h3 className="text-heading font-bold text-sm leading-6">
          {formatPrice(product.today)}
        </h3>
        <ChangeBadge change={product.change} />
      </div>
    </div>
  </Link>
);
