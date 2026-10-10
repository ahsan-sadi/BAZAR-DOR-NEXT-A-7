import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-4 sm:py-5 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 sm:gap-4 text-center sm:text-left">
        <p className="text-[12px] sm:text-sm font-normal text-heading">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-[12px] sm:text-sm font-normal text-pera sm:text-right sm:max-w-md">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
