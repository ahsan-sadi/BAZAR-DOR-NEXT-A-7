import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { toBn } from "@/lib/format";
import { getCategories, getProducts } from "@/lib/api";

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

const CategoryPage = async ({ params }) => {
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
      <section className="flex items-center gap-4 p-4 sm:p-5 rounded-xl border border-border bg-white">
        <div
          className="bg-border size-12 sm:size-14 shrink-0 rounded-full flex items-center justify-center text-2xl sm:text-3xl"
          aria-hidden="true"
        >
          {category.icon}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-heading leading-8">
            {category.nameBn}
          </h1>
          <p className="text-[12px] sm:text-sm leading-5 text-gray-500">
            এই {toBn(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </section>

      <CategoryProducts products={items} />
    </div>
  );
};

export default CategoryPage;
