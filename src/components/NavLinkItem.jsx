"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// highlights the link for the category page currently open
const NavLinkItem = ({ item }) => {
  const href = `/category/${item.slug}`;
  const active = usePathname() === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-colors ${
        active ? "bg-green-700 text-white" : "text-heading hover:bg-border"
      }`}
    >
      <span aria-hidden="true">{item.icon}</span>
      {item.nameBn}
    </Link>
  );
};

export default NavLinkItem;
