// src/app/category/[slug]/page.jsx  (category listing)
import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategories, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";

// known slugs at build time
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const category = categories.find((c) => c.slug === slug);

  return {
    title: category ? `${category.nameBn} — আজকের বাজার দর` : "বাজার দর",
  };
}

const PageSkeleton = () => (
  <div className="container mx-auto px-4 my-7.5 space-y-4" aria-hidden="true">
    <div className="h-20 rounded-xl bg-border animate-pulse" />
    <div className="h-14 rounded-xl bg-border animate-pulse" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-28 rounded-xl bg-border animate-pulse" />
      ))}
    </div>
  </div>
);

// params is read here, inside <Suspense>
const CategoryContent = async ({ params }) => {
  const { slug } = await params;

  let categories, products;
  try {
    [categories, products] = await Promise.all([
      getCategories(),
      getProducts(),
    ]);
  } catch {
    return (
      <div className="container mx-auto px-4 my-7.5 text-center text-error font-semibold">
        তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </div>
    );
  }

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const items = products.filter((p) => p.category === category.id);

  return (
    <div className="container mx-auto px-4 my-7.5 space-y-4">
      {/* title card */}
      <section className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-border bg-white">
        <div
          className="img bg-border size-12 sm:size-14 shrink-0 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
          aria-hidden="true"
        >
          {category.icon}
        </div>
        <div className="text min-w-0">
          <h1 className="text-heading font-bold text-xl sm:text-2xl leading-8">
            {category.nameBn}
          </h1>
          <p className="text-[12px] sm:text-sm font-semibold leading-5 text-gray-500">
            এই {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      {/* sort bar + count + grid */}
      <CategoryProducts products={items} />
    </div>
  );
};

// the page itself never touches params
const ProductsSlugPage = ({ params }) => (
  <Suspense fallback={<PageSkeleton />}>
    <CategoryContent params={params} />
  </Suspense>
);

export default ProductsSlugPage;
