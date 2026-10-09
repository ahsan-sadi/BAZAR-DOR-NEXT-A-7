import Image from "next/image";
import React from "react";
import HeroImg from "@/assets/bazar-hero.png";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="container mx-auto my-7.5">
      <div className="banner flex justify-between border bg-white  border-border rounded-xl p-3">
        <div className="text">
          <h3 className="font-medium text-brand leading-5">
            মঙ্গলবার, ৬ অক্টোবর, ২০২৬
          </h3>
          <h1 className="text-4xl font-bold leading-11 mt-2">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className=" text-base leading-6 mt-5 w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button className="text-sm font-semibold text-white bg-brand rounded-xl py-2.5 px-5.5 mt-7 ">
            <Link href="#">সব পণ্য দেখুন</Link>
          </button>
        </div>
        <div className="img">
          <Image src={HeroImg} alt="Hero.png"></Image>
        </div>
      </div>
    </div>
  );
};

export default Hero;
