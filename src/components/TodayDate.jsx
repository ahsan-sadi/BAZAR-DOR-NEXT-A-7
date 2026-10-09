"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () =>
  new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
const getServerSnapshot = () => ""; // server/prerender renders nothing, no mismatch

const TodayDate = ({ className = "" }) => {
  const today = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <h3 className={className} suppressHydrationWarning>
      {today || "\u00A0"}
    </h3>
  );
};

export default TodayDate;
