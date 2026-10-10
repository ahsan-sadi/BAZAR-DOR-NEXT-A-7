import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Logo from "@/assets/logo.png";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import HeaderAuth from "./HeaderAuth";

const NavSkeleton = () => (
  <div className="container mx-auto px-4 py-4 flex gap-2" aria-hidden="true">
    {Array.from({ length: 8 }).map((_, i) => (
      <span key={i} className="h-7 w-16 rounded-full bg-border animate-pulse" />
    ))}
  </div>
);

// Cache the date evaluation so Next.js treats it as static during prerender
async function getFormattedDate() {
  "use cache";
  return new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
}

const Navbar = async () => {
  const today = await getFormattedDate();

  return (
    <header>
      <div className="container mx-auto px-4 header flex justify-between items-center gap-3 py-3">
        <Link href="/" className="logo flex items-center gap-2 min-w-0">
          <div className="img bg-primary py-1.5 px-3 rounded-lg flex items-center shrink-0">
            <Image src={Logo} alt="বাজার দর" priority />
          </div>
          <div className="logo-text min-w-0">
            <h3 className="text-heading font-bold text-lg sm:text-xl leading-6">
              বাজার দর
            </h3>
            <h3 className="text-pera font-normal text-[12px] leading-4 truncate hidden sm:block">
              {today}
            </h3>
          </div>
        </Link>

        <HeaderAuth />
      </div>

      <Suspense fallback={<NavSkeleton />}>
        <NavLinks />
      </Suspense>

      <Marquee />
    </header>
  );
};

export default Navbar;
