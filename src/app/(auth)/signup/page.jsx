import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = {
  title: "অ্যাকাউন্ট তৈরি করুন — বাজার দর",
};

const SignUpPage = () => (
  <main className="bg-border">
    <div className="container mx-auto px-4 py-10 sm:py-14 flex flex-col items-center ">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-[12px] sm:text-sm text-pera mt-2">
          বিনা মূল্যে সাইন আপ করে সব বিভাগের দাম দেখুন।
        </p>
      </div>

      <SignUpForm />

      <Link
        href="/"
        className="mt-6 text-[12px] sm:text-sm text-pera hover:text-heading"
      >
        ← হোমে ফিরে যান
      </Link>
    </div>
  </main>
);

export default SignUpPage;
