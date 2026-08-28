import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "published" | "draft" | "archived" | boolean;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  let isPublished = false;
  let label = "DRAFT";

  if (typeof status === "boolean") {
    isPublished = status;
    label = status ? "PUBLISHED" : "DRAFT";
  } else if (status === "published") {
    isPublished = true;
    label = "PUBLISHED";
  } else if (status === "archived") {
    label = "ARCHIVED";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider rounded-none shadow-xs",
        isPublished
          ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
          : label === "ARCHIVED"
          ? "bg-stone-200 text-stone-700 border border-stone-300"
          : "bg-amber-100 text-amber-900 border border-amber-300",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          isPublished ? "bg-emerald-600" : label === "ARCHIVED" ? "bg-stone-500" : "bg-amber-600"
        )}
      />
      <span>{label}</span>
    </span>
  );
}
