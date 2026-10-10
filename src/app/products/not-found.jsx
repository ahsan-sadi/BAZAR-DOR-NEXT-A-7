import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 my-16 text-center">
      <h1 className="text-xl font-bold text-heading">পণ্যটি পাওয়া যায়নি</h1>
      <p className="text-sm text-gray-500 mt-2">
        আপনি যে পণ্যটি খুঁজছেন তা নেই বা সরিয়ে ফেলা হয়েছে।
      </p>
      <Link
        href="/"
        className="inline-block mt-4 text-sm font-semibold text-heading underline"
      >
        হোমে ফিরে যান
      </Link>
    </div>
  );
}
