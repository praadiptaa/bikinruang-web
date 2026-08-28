import React from "react";
import Link from "next/link";
import { getProjects, getCategories } from "@/lib/data/api";
import { allProjectsRoster } from "@/lib/data/mockData";
import ProjectCard from "@/components/public/ProjectCard";
import CTASection from "@/components/public/CTASection";

export const metadata = {
  title: "Our Projects — Bikinruang. Workshop Atelier",
  description: "Portofolio proyek Bikinruang: Fest for Music PT. Antam, Fazzio Youth Project, Annual Gathering PT. Cimory, Go! Go! Glow! by GoPay, Yamaha Filano, dan lainnya.",
};

interface ProjectsPageProps {
  searchParams?: {
    category?: string;
  };
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const selectedCategory = searchParams?.category || "all";

  const [categories, projects] = await Promise.all([
    getCategories(),
    getProjects({ categorySlug: selectedCategory }),
  ]);

  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b-2 border-brand-navy">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold tracking-widest uppercase mb-4">
          <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
          <span>PORTFOLIO &amp; SHOWCASE</span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-workshop-black uppercase leading-[0.9] max-w-5xl mb-6">
          OUR PROJECTS<span className="text-brand-yellow">.</span>
        </h1>
        <p className="max-w-2xl font-sans text-lg text-workshop-black/80 leading-relaxed font-medium">
          Menerjemahkan ide dan kebutuhan klien menjadi instalasi event yang presisi, relevan dengan tren, serta dieksekusi dengan standar kualitas tinggi.
        </p>

        {/* Category Filters */}
        <div className="mt-12 pt-6 border-t border-studio-border flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/projects"
            className={`px-4 py-2 text-xs font-mono font-bold uppercase whitespace-nowrap transition-colors ${
              selectedCategory === "all"
                ? "bg-brand-navy text-studio-white"
                : "bg-studio-card border border-studio-border text-workshop-black hover:border-brand-navy"
            }`}
          >
            ALL PROJECTS
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/projects?category=${cat.slug}`}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? "bg-brand-navy text-studio-white"
                  : "bg-studio-card border border-studio-border text-workshop-black hover:border-brand-navy"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} aspect="portrait" />
          ))}
        </div>
      </section>

      {/* Complete Project Archive Roster */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-brand-navy">
        <div className="mb-10">
          <div className="font-mono text-xs text-brand-navy font-bold uppercase tracking-widest mb-2">
            [ ALL PROJECT DELIVERIES ]
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            TRACK RECORD &amp; CLIENT BUILDS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProjectsRoster.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-studio-card border border-studio-border hover:border-brand-navy transition-colors flex items-center gap-3 group"
            >
              <span className="font-mono text-xs font-bold text-brand-yellow">
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </span>
              <span className="font-sans text-xs font-bold uppercase text-workshop-black group-hover:text-brand-navy transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
