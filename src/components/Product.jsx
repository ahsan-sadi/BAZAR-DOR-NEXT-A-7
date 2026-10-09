import React from "react";
import Link from "next/link";
import { CaretUp, CaretDown, Minus } from "@gravity-ui/icons";

const UNIT_LABEL = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const toBn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

const formatPrice = (n) => `${toBn(n)} টাকা`;

// 12.5 -> ১২.৫%   |  -3 -> ৩.০%   |  0 -> ০.০%
const formatPct = (pct) =>
  `${toBn(Math.abs(pct), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}%`;

const getProducts = async () => {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      { next: { revalidate: 300 } }, // refresh every 5 min
    );
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    return Array.isArray(json) ? json : (json.data ?? []);
  } catch (e) {
    console.error(e);
    return null;
  }
};

const ChangeBadge = ({ change }) => {
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

const ProductCard = ({ product }) => (
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

const ProductGrid = ({ products }) => (
  <div className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
);

const SectionHeading = ({ icon, title, subtitle }) => (
  <div className="heading mb-4">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-lg sm:text-xl font-bold text-heading">{title}</h2>
    </div>
    {subtitle && (
      <p className="text-[12px] leading-4 text-gray-500 mt-1">{subtitle}</p>
    )}
  </div>
);

/* ---------- page ---------- */

const Product = async () => {
  const products = await getProducts();

  if (!products) {
    return (
      <div className="container mx-auto px-4 my-7.5 text-center text-error font-semibold">
        তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </div>
    );
  }

  // biggest movers first, top 6 each
  const increased = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const decreased = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 my-7.5 space-y-8">
      {increased.length > 0 && (
        <section className="priceIncrease">
          <SectionHeading
            icon={<CaretUp className="text-error size-6" />}
            title="আজ দাম বেড়েছে"
          />
          <ProductGrid products={increased} />
        </section>
      )}

      {decreased.length > 0 && (
        <section className="priceDecrease">
          <SectionHeading
            icon={<CaretDown className="text-base size-6" />}
            title="আজ দাম কমেছে"
          />
          <ProductGrid products={decreased} />
        </section>
      )}

      <section className="allProducts">
        <SectionHeading
          title="সব পণ্য"
          subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
        />
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default Product;
