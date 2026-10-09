"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import ProfileDropdown from "./ProfileDropDown";

const HeaderAuth = () => {
  const { data: session, isPending } = authClient.useSession();

  // avoids flashing the sign-in buttons while the session is loading
  if (isPending) {
    return (
      <div className="flex items-center gap-3" aria-hidden="true">
        <span className="size-10 rounded-xl bg-border animate-pulse" />
        <span className="hidden sm:block h-4 w-16 rounded bg-border animate-pulse" />
      </div>
    );
  }

  if (session?.user) {
    return <ProfileDropdown user={session.user} />;
  }

  return (
    <div className="profile flex items-center gap-2">
      <Link
        href="/signin"
        className="text-sm text-black hover:text-white px-4.5 py-2.5 font-semibold bg-transparent border border-transparent hover:bg-brand hover:border-brand rounded-xl transition-colors"
      >
        সাইন ইন
      </Link>
      <Link
        href="/signup"
        className="text-sm text-white font-semibold bg-brand py-2.5 px-4.5 rounded-xl border border-brand"
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default HeaderAuth;
