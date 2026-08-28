import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Hammer } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-studio-white overflow-hidden border-b border-studio-border">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-workshop-grid opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Workshop Atelier Status Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-navy text-studio-white font-mono text-[11px] font-bold tracking-widest uppercase shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse"></span>
            <span>MALANG WORKSHOP ATELIER • JAWA TIMUR • OPEN FOR PRODUCTION</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-concrete font-mono text-xs">
            <span>[ DEKORASI EVENT • EVENT PROPS • PARTY SET • STAGE DECORATION ]</span>
          </div>
        </div>

        {/* Headline & Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter text-workshop-black uppercase leading-[0.88]">
              BIKINRUANG<span className="text-brand-yellow">.</span>
              <br />
              <span className="text-brand-navy block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mt-1">
                WORKSHOP ATELIER
              </span>
            </h1>
            <p className="font-display font-light italic text-2xl sm:text-4xl text-concrete mt-4 tracking-tight">
              &ldquo;From vision, built unexpected.&rdquo;
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between">
            <div className="border-l-4 border-brand-yellow pl-5 mb-8">
              <p className="font-sans text-base sm:text-lg text-workshop-black font-medium leading-relaxed">
                Creative event production partner: dekorasi event, event props, party set, hingga stage decoration.
              </p>
              <p className="font-mono text-xs text-concrete mt-2">
                Presisi eksekusi, relevan dengan tren, dan kolaborasi kreatif yang fleksibel.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-yellow text-workshop-black font-mono text-xs font-bold tracking-wider hover:bg-white hover:border-workshop-black transition-all duration-200 shadow-md group border border-brand-yellow"
              >
                <span>CONTACT US</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-navy text-studio-white font-mono text-xs font-bold tracking-wider hover:bg-brand-steel transition-all duration-200"
              >
                <span>OUR PROJECTS</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Visual Showcase — Asymmetric Grid Feature */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-8">
          {/* Main Visual */}
          <div className="md:col-span-8 relative aspect-[16/9] md:aspect-[16/10] overflow-hidden bg-workshop-card group border-2 border-workshop-black">
            <Image
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=80"
              alt="GO! GO! GLOW! by GoPay by Bikinruang"
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-workshop-black/90 via-workshop-black/20 to-transparent pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-studio-white">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-brand-yellow mb-1 uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 bg-brand-yellow inline-block"></span>
                  <span>FEATURED PROJECT • 2026</span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-3xl uppercase tracking-tight">
                  GO! GO! GLOW! BY GOPAY
                </h3>
                <p className="text-xs font-mono text-concrete mt-1">
                  Brand Activation &amp; Custom Neon Fabrication
                </p>
              </div>

              <Link
                href="/projects/go-go-glow-by-gopay"
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-yellow text-workshop-black font-mono text-xs font-bold hover:bg-white transition-colors self-start sm:self-auto shadow-sm"
              >
                <span>SEE THE BUILD</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Secondary Visual Cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Box 1 */}
            <div className="relative aspect-[16/9] md:flex-1 overflow-hidden bg-workshop-card group border-2 border-workshop-black">
              <Image
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
                alt="Fest for Music Stage Build"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-workshop-black/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-studio-white">
                <span className="font-mono text-[10px] text-brand-yellow tracking-widest uppercase font-bold">
                  STAGE DECORATION
                </span>
                <h4 className="font-display font-bold text-lg leading-tight uppercase">
                  FEST FOR MUSIC
                </h4>
              </div>
            </div>

            {/* Studio Tagline Box */}
            <div className="p-6 bg-brand-navy text-studio-white border border-brand-navy flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between border-b border-brand-steel pb-3 mb-4">
                <span className="font-mono text-xs text-brand-yellow tracking-widest uppercase font-bold">
                  [ READY TO BRING YOUR VISION TO LIFE? ]
                </span>
                <Hammer className="w-4 h-4 text-brand-yellow" />
              </div>
              <p className="font-sans text-xs text-brand-navy-light leading-relaxed mb-4">
                Menerjemahkan ide &amp; kebutuhan Anda menjadi instalasi event yang presisi dan relevan dengan tren.
              </p>
              <Link
                href="/contact"
                className="w-full py-3 bg-brand-yellow text-workshop-black font-mono text-xs font-bold text-center tracking-wider hover:bg-white transition-colors"
              >
                CONTACT US →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
