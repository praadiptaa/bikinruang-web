"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PublicTrafficTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track public routes (ignore /admin routes completely)
    if (pathname && !pathname.startsWith("/admin")) {
      try {
        if (typeof window !== "undefined") {
          const currentPv = Number(localStorage.getItem("bikinruang_public_pv") || "0");
          const updatedPv = currentPv + 1;
          localStorage.setItem("bikinruang_public_pv", String(updatedPv));

          // Dispatch event for any open dashboard tabs
          window.dispatchEvent(new CustomEvent("bikinruang-pageview", { detail: { path: pathname, count: updatedPv } }));
        }
      } catch (e) {
        console.warn("Public traffic tracker note:", e);
      }
    }
  }, [pathname]);

  return null;
}
