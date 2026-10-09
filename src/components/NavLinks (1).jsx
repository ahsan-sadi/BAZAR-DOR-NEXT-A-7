import NavLinkItem from "./NavLinkItem";

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    { next: { revalidate: 3600 } },
  );
  const json = await res.json();
  const data = Array.isArray(json) ? json : (json.data ?? []);

  return (
    <div className="py-4 border-t border-border">
      <nav aria-label="ক্যাটাগরি" className="navLink container mx-auto px-4">
        <ul className="flex items-center gap-2 overflow-x-auto">
          {data.map((item) => (
            <li key={item.id} className="shrink-0">
              <NavLinkItem item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default NavLinks;
