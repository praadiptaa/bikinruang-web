import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Project } from "@/types/database";

interface ProjectGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
}

export default function ProjectGrid({
  projects,
  title = "OUR WORK",
  subtitle = "SELECTED BUILDS IN REAL LIFE",
  showViewAll = true,
}: ProjectGridProps) {
  if (projects.length === 0) {
    return null;
  }

  const featured = projects[0];
  const secondary1 = projects[1];
  const secondary2 = projects[2];
  const remaining = projects.slice(3);

  return (
    <section className="py-20 md:py-28 bg-studio-white border-b border-studio-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b-2 border-workshop-black mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-signal-orange tracking-widest uppercase mb-2">
              <span className="w-2 h-2 bg-signal-orange"></span>
              <span>05 // PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-workshop-black tracking-tight uppercase">
              {title}<span className="text-signal-orange">.</span>
            </h2>
            <p className="text-xs font-mono text-concrete uppercase mt-1">
              {subtitle}
            </p>
          </div>

          {showViewAll && (
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-workshop-black hover:text-signal-orange transition-colors pb-1 border-b-2 border-workshop-black hover:border-signal-orange"
            >
              <span>EXPLORE ALL PROJECTS ({projects.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Asymmetrical Grid Showcase */}
        <div className="space-y-6">
          {/* Main Hero Project */}
          {featured && (
            <div className="w-full">
              <ProjectCard project={featured} aspect="wide" />
            </div>
          )}

          {/* 2-Column Split */}
          {(secondary1 || secondary2) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {secondary1 && <ProjectCard project={secondary1} aspect="square" />}
              {secondary2 && <ProjectCard project={secondary2} aspect="square" />}
            </div>
          )}

          {/* 3-Column Split for Remaining */}
          {remaining.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {remaining.map((p) => (
                <ProjectCard key={p.id} project={p} aspect="portrait" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
