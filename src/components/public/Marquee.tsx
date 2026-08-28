import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  className?: string;
  speed?: "fast" | "normal" | "slow";
}

export default function Marquee({
  items,
  direction = "left",
  className,
  speed = "normal",
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap flex select-none py-3 border-y border-workshop-border bg-workshop-black text-studio-white",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-8 font-mono text-xs font-bold tracking-widest uppercase",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        )}
      >
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span>{item}</span>
            <span className="w-2 h-2 bg-signal-orange inline-block"></span>
          </div>
        ))}
      </div>
    </div>
  );
}
