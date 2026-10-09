import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaretUp, CaretDown, Minus, ChevronRight } from "@gravity-ui/icons";

import MarketTable from "@/components/MarketTable";
import { toBn, formatPct } from "@/lib/format";
import { UNIT_SHORT, formatTaka, buildMarketStats } from "@/lib/market";

const API = "https://api.api-store.workers.dev/api/bazardor/products";

// Fetch and cache products for 5 minutes
const getProducts = async () => {
  const res = await fetch(API, {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  return Array.isArray(json) ? json : (json.data ?? []);
};

// Generate routes for known products
export async function generateStaticParams() {
  try {
    const products = await getProducts();

    return products
      .filter((product) => product.slug)
      .map((product) => ({
        slug: product.slug,
      }));
  } catch (error) {
    console.error("Failed to generate product routes:", error);
    return [];
  }
}

// Generate page metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    const products = await getProducts();

    const product = products.find((item) => item.slug === slug);

    return {
      title: product ? `${product.nameBn} — আজকের বাজার দর` : "বাজার দর",
    };
  } catch {
    return {
      title: "বাজার দর",
    };
  }
}

// Price trend styles
const TREND = {
  up: {
    text: "text-error",
    bg: "bg-error/10",
    Icon: CaretUp,
    word: "বেড়েছে",
  },
  down: {
    text: "text-success",
    bg: "bg-success/10",
    Icon: CaretDown,
    word: "কমেছে",
  },
  flat: {
    text: "text-gray-500",
    bg: "bg-gray-100",
    Icon: Minus,
    word: "",
  },
};

// Summary card
const SummaryCard = ({ label, value, valueClass, note }) => (
  <div className="rounded-xl border border-border bg-white p-4">
    <p className="text-[12px] font-semibold text-gray-500">{label}</p>

    <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>

    <p className="mt-1 text-[12px] text-gray-500">{note}</p>
  </div>
);

// Product data and details
async function ProductContent({ params }) {
  const { slug } = await params;

  let products;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to load product:", error);

    return (
      <div className="container mx-auto px-4 my-7.5 text-center text-error font-semibold">
        তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </div>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const unit = UNIT_SHORT[product.unit] ?? product.unit;

  const trend = TREND[product.change?.dir] ?? TREND.flat;

  const TrendIcon = trend.Icon;

  const diff = Math.abs(product.today - product.yesterday);

  const { rows, lowest, highest, average } = buildMarketStats(
    product.markets ?? [],
  );

  return (
    <div className="container mx-auto px-4 my-7.5 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[12px] sm:text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-heading">
              হোম
            </Link>
          </li>

          <li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </li>

          <li>
            <Link
              href={`/category/${product.category}`}
              className="hover:text-heading"
            >
              {product.categoryNameBn}
            </Link>
          </li>

          <li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
          </li>

          <li aria-current="page" className="font-semibold text-heading">
            {product.nameBn}
          </li>
        </ol>
      </nav>

      {/* Product header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-4 sm:p-6 rounded-xl border border-border bg-white">
        <div className="flex items-center gap-4 sm:gap-5 min-w-0">
          <div
            className="bg-border size-16 sm:size-20 shrink-0 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl"
            aria-hidden="true"
          >
            {product.image}
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-heading leading-tight">
              {product.nameBn}
            </h1>

            <p className="text-[12px] sm:text-sm text-gray-500 mt-1">
              প্রতি {unit} · {product.categoryNameBn}
            </p>

            <p className="text-[12px] sm:text-sm text-gray-500 mt-2">
              {diff === 0 ? (
                "গতকালের তুলনায় আজ দাম অপরিবর্তিত"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className={`font-bold ${trend.text}`}>
                    {trend.word}
                  </span>
                  {" · "}
                  {toBn(diff)} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        {/* Today's price */}
        <div className="shrink-0 rounded-xl bg-border/60 px-6 py-4 text-center">
          <p className="text-[12px] text-gray-500">আজকের দাম</p>

          <p className="text-4xl font-bold text-heading leading-tight">
            {toBn(product.today)}
          </p>

          <p className="text-[12px] text-gray-500">টাকা / {unit}</p>

          <span
            className={`mt-2 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[12px] font-semibold ${trend.text} ${trend.bg}`}
          >
            <TrendIcon className="size-3" />
            {formatPct(product.change?.pct ?? 0)}
          </span>
        </div>
      </section>

      {/* Price summary */}
      {rows.length > 0 && (
        <section className="p-4 sm:p-6 rounded-xl border border-border bg-white">
          <h2 className="text-base sm:text-lg font-bold text-heading mb-4">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SummaryCard
              label="সর্বনিম্ন দাম"
              value={formatTaka(lowest.min)}
              valueClass="text-success"
              note={`সবচেয়ে কম দামের বাজার: ${lowest.market}`}
            />

            <SummaryCard
              label="সর্বোচ্চ দাম"
              value={formatTaka(highest.max)}
              valueClass="text-error"
              note={`সবচেয়ে বেশি দামের বাজার: ${highest.market}`}
            />

            <SummaryCard
              label="গড় দাম"
              value={formatTaka(average)}
              valueClass="text-heading"
              note={`প্রতি ${unit} এর হিসাবে`}
            />
          </div>
        </section>
      )}

      {/* Market table */}
      <section className="p-4 sm:p-6 rounded-xl border border-border bg-white">
        <h2 className="text-base sm:text-lg font-bold text-heading mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {rows.length > 0 ? (
          <MarketTable rows={rows} />
        ) : (
          <p className="text-center text-gray-500 py-10">
            এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}

// Loading fallback
function ProductLoading() {
  return (
    <div className="container mx-auto px-4 my-7.5 space-y-6 animate-pulse">
      <div className="h-5 w-40 rounded bg-gray-200" />
      <div className="h-40 rounded-xl bg-gray-200" />
      <div className="h-48 rounded-xl bg-gray-200" />
      <div className="h-64 rounded-xl bg-gray-200" />
    </div>
  );
}
