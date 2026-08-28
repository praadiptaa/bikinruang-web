import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, MapPin, Tag, Building2, Hammer, CheckCircle2 } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/data/api";
import ProjectCard from "@/components/public/ProjectCard";
import CTASection from "@/components/public/CTASection";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Bikinruang Case Study`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} — Bikinruang Case Study`,
      description: project.short_description,
      images: [{ url: project.featured_image_url }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = (await getProjects({ limit: 4 }))
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Back Button & Top Meta */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-concrete hover:text-workshop-black transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL PROJECTS</span>
        </Link>
      </div>

      {/* Project Title & Summary */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b-2 border-workshop-black">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-signal-orange uppercase tracking-wider mb-4">
          <span className="px-2.5 py-1 bg-workshop-black text-studio-white font-bold">
            {project.project_categories?.name || "PROJECT"}
          </span>
          <span>•</span>
          <span>{project.project_year}</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-workshop-black uppercase leading-[0.92] mb-8">
          {project.title}
        </h1>

        <p className="max-w-3xl font-sans text-lg sm:text-xl text-workshop-black/90 leading-relaxed font-medium">
          {project.short_description}
        </p>

        {/* Project Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-studio-border text-xs font-mono">
          <div>
            <div className="text-concrete uppercase tracking-wider mb-1">[ CLIENT ]</div>
            <div className="font-bold text-workshop-black uppercase">
              {project.clients?.name || "CONFIDENTIAL"}
            </div>
          </div>
          <div>
            <div className="text-concrete uppercase tracking-wider mb-1">[ LOCATION ]</div>
            <div className="font-bold text-workshop-black uppercase">
              {project.location || "MALANG, JAWA TIMUR"}
            </div>
          </div>
          <div>
            <div className="text-concrete uppercase tracking-wider mb-1">[ YEAR / DATE ]</div>
            <div className="font-bold text-workshop-black uppercase">
              {project.event_date || project.project_year}
            </div>
          </div>
          <div>
            <div className="text-concrete uppercase tracking-wider mb-1">[ ROLE ]</div>
            <div className="font-bold text-signal-orange uppercase">
              FABRICATION &amp; BUILD
            </div>
          </div>
        </div>
      </section>

      {/* Hero Featured Photography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-workshop-card border border-workshop-black shadow-lg">
          <Image
            src={project.featured_image_url}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      {/* 4-Step Case Study Deep Dive (The Brief, The Vision, The Build, The Result) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Case Study Text */}
          <div className="lg:col-span-8 space-y-12">
            {project.description && (
              <div className="p-8 bg-studio-card border border-studio-border">
                <div className="font-mono text-xs text-signal-orange uppercase tracking-widest mb-3">
                  [ OVERVIEW ]
                </div>
                <p className="font-sans text-base sm:text-lg text-workshop-black/90 leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {/* 01 THE BRIEF */}
            <div className="border-t-2 border-workshop-black pt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xl font-black text-signal-orange">01</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-workshop-black uppercase tracking-tight">
                  THE BRIEF
                </h2>
              </div>
              <p className="font-sans text-base text-workshop-black/80 leading-relaxed pl-8 border-l-2 border-signal-orange">
                {project.brief || "Deliver a high-impact spatial environment that translates the brand identity into an engaging physical presence with strict adherence to venue safety standards."}
              </p>
            </div>

            {/* 02 THE VISION */}
            <div className="border-t-2 border-workshop-black pt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xl font-black text-acid-lime">02</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-workshop-black uppercase tracking-tight">
                  THE VISION
                </h2>
              </div>
              <p className="font-sans text-base text-workshop-black/80 leading-relaxed pl-8 border-l-2 border-acid-lime">
                {project.vision || "A creative juxtaposition of raw industrial workshop elements, tactile materials, and precision lighting design to inspire human connection."}
              </p>
            </div>

            {/* 03 THE BUILD */}
            <div className="border-t-2 border-workshop-black pt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xl font-black text-electric-blue">03</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-workshop-black uppercase tracking-tight">
                  THE BUILD
                </h2>
              </div>
              <p className="font-sans text-base text-workshop-black/80 leading-relaxed pl-8 border-l-2 border-electric-blue">
                {project.build_process || "Engineered inside our Malang workshop atelier through precision CNC milling, certified steel welding, multi-stage paint finishing, and rapid modular overnight load-in."}
              </p>
            </div>

            {/* 04 THE RESULT */}
            <div className="border-t-2 border-workshop-black pt-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xl font-black text-workshop-black">04</span>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-workshop-black uppercase tracking-tight">
                  THE RESULT
                </h2>
              </div>
              <p className="font-sans text-base text-workshop-black/80 leading-relaxed pl-8 border-l-2 border-workshop-black">
                {project.result || "Seamless execution with high audience engagement, memorable photo opportunities, and 100% on-time delivery."}
              </p>
            </div>
          </div>

          {/* Sidebar Info & Inquire CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-workshop-black text-studio-white border border-workshop-black sticky top-28">
              <div className="font-mono text-xs text-acid-lime uppercase tracking-widest mb-4">
                [ START A SIMILAR BUILD ]
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight mb-4">
                NEED A SIMILAR INSTALLATION?
              </h3>
              <p className="text-xs text-concrete font-sans leading-relaxed mb-6">
                Our workshop can adapt concepts, materials, and scales to suit your exact venue and timeline.
              </p>

              <Link
                href="/contact"
                className="w-full py-3.5 bg-signal-orange text-white font-mono text-xs font-bold tracking-wider hover:bg-signal-hover transition-colors flex items-center justify-center gap-2 mb-3"
              >
                <span>REQUEST QUOTATION</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-workshop-card border border-workshop-border text-studio-white font-mono text-xs font-bold tracking-wider hover:border-acid-lime hover:text-acid-lime transition-colors flex items-center justify-center gap-2"
              >
                <span>WHATSAPP CONSULTATION</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.project_images && project.project_images.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-workshop-black">
          <div className="mb-8">
            <div className="font-mono text-xs text-signal-orange uppercase tracking-widest mb-2">
              [ VISUAL DOCUMENTATION ]
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-workshop-black uppercase tracking-tight">
              PROJECT GALLERY
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.project_images.map((img) => (
              <div
                key={img.id}
                className="relative aspect-[16/10] overflow-hidden bg-workshop-card border border-workshop-black group"
              >
                <Image
                  src={img.image_url}
                  alt={img.alt_text || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-workshop-black/80 backdrop-blur-sm p-3 text-studio-white font-mono text-xs">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-workshop-black">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="font-mono text-xs text-signal-orange uppercase tracking-widest mb-2">
                [ MORE BUILDS ]
              </div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
                RELATED PROJECTS
              </h2>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs font-bold text-workshop-black hover:text-signal-orange underline"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((rel) => (
              <ProjectCard key={rel.id} project={rel} aspect="portrait" />
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
