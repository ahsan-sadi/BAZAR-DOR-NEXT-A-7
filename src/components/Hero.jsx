import Image from "next/image";
import Link from "next/link";
import HeroImg from "@/assets/bazar-hero.png";
import { cacheLife } from "next/cache";

async function getFormattedDate() {
  "use cache";
  cacheLife("hours");
  return new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });
}

const Hero = async () => {
  const TodayDate = await getFormattedDate();
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-4 my-5 sm:my-7.5">
      <div className="banner flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 border bg-white border-border rounded-xl p-4 sm:p-6 lg:p-8">
        <div className="text lg:max-w-xl">
          <div className="font-medium text-brand text-sm sm:text-base leading-5 mb-2">
            {TodayDate}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug lg:leading-tight text-heading mt-2">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-sm sm:text-base leading-6 text-pera mt-3 sm:mt-5">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#all-products"
            className="inline-block text-sm font-semibold text-white bg-brand rounded-xl py-2.5 px-5.5 mt-5 sm:mt-7 w-full sm:w-auto text-center"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="img shrink-0 w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <Image
            src={HeroImg}
            alt=""
            priority
            sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 20rem"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
