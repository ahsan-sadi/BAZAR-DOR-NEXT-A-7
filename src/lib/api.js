import { cacheLife } from "next/cache";

const API = "https://openapi.programming-hero.com/api/bazardor";

const unwrap = (json) => (Array.isArray(json) ? json : (json.data ?? []));

// "use cache" makes the result prerenderable (needed with cacheComponents)
// and refreshes it on the schedule set by cacheLife.
export async function getProducts() {
  "use cache";
  cacheLife("minutes");

  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return unwrap(await res.json());
}

export async function getCategories() {
  "use cache";
  cacheLife("hours");

  const res = await fetch(`${API}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return unwrap(await res.json());
}
