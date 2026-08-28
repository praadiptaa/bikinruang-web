import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "dark" | "light"; // "dark" = dark text on light bg, "light" = white text on dark bg
  size?: "sm" | "md" | "lg" | "xl";
}

export default function BrandLogo({
  className,
  variant = "dark",
  size = "md",
}: BrandLogoProps) {
  const sizeClasses = {
    sm: "h-9 sm:h-10 w-auto",
    md: "h-12 sm:h-14 md:h-16 w-auto",
    lg: "h-16 sm:h-20 md:h-24 w-auto",
    xl: "h-24 sm:h-28 md:h-32 w-auto",
  };

  const logoSrc = variant === "light" ? "/images/logo-light.png" : "/images/logo-dark.png";

  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={logoSrc}
        alt="Bikinruang. Workshop Atelier"
        width={380}
        height={100}
        priority
        className={cn("object-contain transition-all duration-200", sizeClasses[size])}
      />
    </div>
  );
}
