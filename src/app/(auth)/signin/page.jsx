import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";

export const metadata = {
  title: "সাইন ইন — বাজার দর",
};

const SignInPage = () => (
  <main className="bg-border">
    <div className="container mx-auto px-4 py-10 sm:py-14 flex flex-col items-center">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-heading">সাইন ইন</h1>
        <p className="text-[12px] sm:text-sm text-pera mt-2">
          রিয়েলটাইম দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <SignInForm />

      <Link
        href="/"
        className="mt-6 text-[12px] sm:text-sm text-pera hover:text-heading"
      >
        ← হোমে ফিরে যান
      </Link>
    </div>
  </main>
);

export default SignInPage;
