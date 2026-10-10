import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import Logo from "@/assets/logo.png";
import NavLinks from "./NavLinks";
import Marquee from "./Marquee";
import HeaderAuth from "./HeaderAuth";

const NavSkeleton = () => (
  <div
    className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex gap-2 overflow-hidden"
    aria-hidden="true"
  >
    {Array.from({ length: 8 }).map((_, i) => (
      <span
        key={i}
        className="h-7 w-16 shrink-0 rounded-full bg-border animate-pulse"
      />
    ))}
  </div>
);

// Cached so Next.js can prerender it; timeZone keeps the day correct for Bangladesh
async function getFormattedDate() {
  "use cache";
  cacheLife("hours");
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

const Navbar = async () => {
  const today = await getFormattedDate();

  return (
    <header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 header flex items-center justify-between gap-2 sm:gap-3 py-2.5 sm:py-3">
        {/* logo + title */}
        <Link
          href="/"
          aria-label="বাজার দর — হোম"
          className="logo flex items-center gap-2 min-w-0"
        >
          <div className="img bg-primary p-1.5 sm:py-1.5 sm:px-3 rounded-lg flex items-center shrink-0">
            <Image src={Logo} alt="" priority className="h-5 sm:h-6 w-auto" />
          </div>
          <div className="logo-text min-w-0">
            <h3 className="text-heading font-bold text-base sm:text-xl leading-5 sm:leading-6 truncate">
              বাজার দর
            </h3>
            <h3 className="text-pera font-normal text-[11px] sm:text-[12px] leading-4 truncate hidden sm:block">
              {today}
            </h3>
          </div>
        </Link>

        {/* sign in / sign up or profile */}
        <div className="shrink-0">
          <HeaderAuth />
        </div>
      </div>

      {/* categories: scrolls sideways on small screens */}
      <Suspense fallback={<NavSkeleton />}>
        <NavLinks />
      </Suspense>

      <Marquee />
    </header>
  );
};

export default Navbar;
