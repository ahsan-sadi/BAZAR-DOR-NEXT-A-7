"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

// shared by the header dropdown and the profile page
export const useSignOut = () => {
  const router = useRouter();
  const [isPending, setPending] = useState(false);

  const signOut = async () => {
    if (isPending) return;
    setPending(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh(); // re-render server components without the session
        },
        onError: () => setPending(false),
      },
    });
  };

  return { signOut, isPending };
};
