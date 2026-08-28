"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-studio-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-studio-card border-2 border-workshop-black p-8 shadow-2xl space-y-6">
        <div className="font-mono text-xs text-signal-orange uppercase tracking-widest">
          [ SYSTEM ERROR ]
        </div>
        <h2 className="font-display font-black text-3xl uppercase tracking-tight text-workshop-black">
          SOMETHING WENT WRONG
        </h2>
        <p className="font-sans text-sm text-workshop-black/80">
          An unexpected error occurred during rendering. Please try reloading or return to the main workshop page.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-signal-orange text-white font-mono text-xs font-bold uppercase hover:bg-signal-hover transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>TRY AGAIN</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-workshop-black text-studio-white font-mono text-xs font-bold uppercase hover:bg-workshop-card transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>HOMEPAGE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
