// src/app/(auth)/layout.jsx
import { Suspense } from "react";

export default function AuthLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 my-7.5 h-48 rounded-xl bg-border animate-pulse" />
      }
    >
      {children}
    </Suspense>
  );
}
