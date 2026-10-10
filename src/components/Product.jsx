import React from "react";
import { CaretUp, CaretDown } from "@gravity-ui/icons";
import { ProductCard } from "./ProductCard";
import { getProducts } from "@/lib/api";

const toBn = (n, opts) => Number(n).toLocaleString("bn-BD", opts);

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

const Product = async () => {
  let products;
  try {
    products = await getProducts();
  } catch {
    return (
      <div className="container mx-auto px-4 my-7.5 text-center text-error font-semibold">
        তথ্য লোড করা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
      </div>
    );
  }

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
            icon={<CaretDown className="size-6 text-brand" />}
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
