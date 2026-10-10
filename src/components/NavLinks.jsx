import NavLinkItem from "./NavLinkItem";
import { getCategories } from "@/lib/api"; // cached fetch ("use cache")

const NavLinks = async () => {
  let categories = [];
  try {
    categories = await getCategories();
  } catch {
    return null; // header still works if the API is down
  }

  if (categories.length === 0) return null;

  return (
    <div className="py-2.5 sm:py-4 border-t border-border">
      <nav aria-label="ক্যাটাগরি" className="navLink container mx-auto">
        {/* padding lives on the <ul> so the row scrolls edge-to-edge on phones */}
        <ul className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto px-4 sm:px-6 lg:px-8 scroll-px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => (
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
