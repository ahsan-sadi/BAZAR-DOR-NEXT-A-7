import Hero from "@/components/Hero";
import Product from "@/components/Product";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-border">
      <Hero />
      <Product />
    </div>
  );
}
