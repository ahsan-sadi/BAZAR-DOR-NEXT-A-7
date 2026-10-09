import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <div className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
);

export default ProductGrid;
