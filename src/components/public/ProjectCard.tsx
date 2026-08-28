import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types/database";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  aspect?: "wide" | "square" | "portrait";
  className?: string;
}

export default function ProjectCard({
  project,
  aspect = "wide",
  className,
}: ProjectCardProps) {
  const aspectClasses = {
    wide: "aspect-[16/10]",
    square: "aspect-square",
    portrait: "aspect-[4/5]",
  };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden bg-workshop-card border border-workshop-black/40 transition-all duration-300",
        className
      )}
    >
      {/* Image container with zoom */}
      <div className={cn("relative w-full overflow-hidden", aspectClasses[aspect])}>
        <Image
          src={project.featured_image_url}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Dynamic Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-workshop-black via-workshop-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 bg-workshop-black/90 backdrop-blur-sm text-brand-yellow font-mono text-[10px] uppercase font-bold tracking-wider border border-brand-yellow/30">
            {project.project_categories?.name || "PROJECT"}
          </span>
          <span className="px-2 py-0.5 bg-workshop-black/70 backdrop-blur-sm text-concrete font-mono text-[11px]">
            {project.project_year}
          </span>
        </div>

        {/* Floating Action Button on Hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 pointer-events-none">
          <div className="px-4 py-2 bg-brand-yellow text-workshop-black font-mono text-xs font-bold tracking-wider flex items-center gap-2 shadow-2xl">
            <span>VIEW PROJECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Content Info */}
        <div className="absolute bottom-4 left-4 right-4 text-studio-white">
          <div className="text-[11px] font-mono text-brand-yellow mb-1 uppercase tracking-wider font-semibold">
            {project.clients?.name || "CLIENT WORK"}
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight leading-tight group-hover:text-brand-yellow transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-concrete line-clamp-2 mt-1.5 font-sans">
            {project.short_description}
          </p>
        </div>
      </div>
    </Link>
  );
}
