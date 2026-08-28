import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-studio-white flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 bg-workshop-black text-signal-orange flex items-center justify-center font-display font-black text-xl mx-auto animate-pulse">
          BR
        </div>
        <div className="font-mono text-xs text-concrete uppercase tracking-widest">
          LOADING BIKINRUANG WORKSHOP...
        </div>
      </div>
    </div>
  );
}
