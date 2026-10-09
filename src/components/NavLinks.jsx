import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavLinks = async () => {
  let res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  let data = await res.json();
  console.log(data);

  return (
    <div className="py-4 border-t border-border">
      <div className="navLink container mx-auto">
        <ul className="flex items-center gap-6">
          {data.map((item) => (
            <li
              key={item.id}
              className="text-[12px] mr-2 font-semibold text-heading"
            >
              <Link href={item.slug}>
                {item.icon} {item.nameBn}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavLinks;
