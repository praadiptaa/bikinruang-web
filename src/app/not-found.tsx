import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-workshop-black text-studio-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="font-mono text-xs text-signal-orange uppercase tracking-widest">
          [ 404 • SPACE NOT FOUND ]
        </div>
        <h1 className="font-display font-black text-6xl sm:text-7xl uppercase tracking-tight">
          EMPTY VOID.
        </h1>
        <p className="font-sans text-sm text-concrete leading-relaxed">
          The page or project space you are looking for has been moved, archived, or does not exist in our workshop directory.
        </p>
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-signal-orange text-white font-mono text-xs font-bold uppercase hover:bg-signal-hover transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO WORKSHOP HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
