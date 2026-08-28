import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const BUILD_ITEMS = [
  { title: "EVENT PROPS", desc: "Bespoke 3D sculptures, thematic physical objects, and interactive centerpieces.", tag: "FABRICATION", colSpan: "col-span-1 md:col-span-2" },
  { title: "STAGES", desc: "Monumental festival mainstages, concert sets, and multi-tier platforms.", tag: "STRUCTURE", colSpan: "col-span-1 md:col-span-2" },
  { title: "BACKDROPS", desc: "Layered textured acoustic panels, 3D curved surfaces, and branded backplates.", tag: "DECORATION", colSpan: "col-span-1" },
  { title: "WELCOME SIGNAGE", desc: "Monolithic entrance signs, laser-cut metallic typography, and illuminated directories.", tag: "IDENTITY", colSpan: "col-span-1" },
  { title: "BRAND ACTIVATION", desc: "Experiential pop-up rooms, tactile gamification booths, and multi-sensory chambers.", tag: "EXPERIENCE", colSpan: "col-span-1 md:col-span-2" },
  { title: "GATE-IN PORTALS", desc: "Grand arrival archways, neon tunnels, and themed entrance security gates.", tag: "SPATIAL", colSpan: "col-span-1" },
  { title: "PHOTOBOOTHS", desc: "Viral shareable photo spots with custom lighting, props, and backdrops.", tag: "INTERACTIVE", colSpan: "col-span-1" },
  { title: "VIDEOTRON FRAMES", desc: "Flush-mount LED screen enclosures, custom curved bezels, and seamless casing.", tag: "INTEGRATION", colSpan: "col-span-1" },
  { title: "EVENT BOOTHS", desc: "Commercial trade-show pavilions, expo displays, and sponsor zones.", tag: "COMMERCIAL", colSpan: "col-span-1 md:col-span-2" },
  { title: "PARTY SETS", desc: "Curated celebration decors, birthday backdrops, and milestone installations.", tag: "CELEBRATE", colSpan: "col-span-1" },
  { title: "DISPLAY BOOTHS", desc: "Retail showcases, product launch pedestals, and gallery vitrines.", tag: "RETAIL", colSpan: "col-span-1" },
  { title: "EVENT DESKS", desc: "Signature quick-fold registration counters and branded reception stations.", tag: "MODULAR", colSpan: "col-span-1" },
];

export default function WhatWeBuild() {
  return (
    <section className="py-20 md:py-28 bg-studio-white border-b border-studio-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-brand-navy mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-brand-navy tracking-widest uppercase mb-2 font-bold">
              <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
              <span>03 // ATELIER FABRICATION SCOPE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-workshop-black tracking-tight uppercase">
              WHAT WE BUILD<span className="text-brand-yellow">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-workshop-black/80 font-sans leading-relaxed">
            From single custom props to massive festival stages, explore the broad spectrum of physical production engineered inside our Malang workshop atelier.
          </p>
        </div>

        {/* Modular Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {BUILD_ITEMS.map((item, idx) => (
            <div
              key={item.title}
              className={`p-6 bg-studio-card border border-studio-border hover:border-brand-navy hover:bg-brand-navy hover:text-studio-white transition-all duration-200 group flex flex-col justify-between min-h-[160px] ${item.colSpan}`}
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-concrete mb-3 group-hover:text-brand-yellow">
                  <span>[ 0{idx + 1 < 10 ? `0${idx + 1}` : idx + 1} ]</span>
                  <span className="px-2 py-0.5 bg-studio-muted group-hover:bg-brand-steel text-workshop-black group-hover:text-brand-yellow uppercase font-bold tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight mb-2 group-hover:text-studio-white">
                  {item.title}
                </h3>
                <p className="text-xs text-concrete group-hover:text-brand-navy-light font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <Link
                  href="/services"
                  className="w-8 h-8 border border-studio-border group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-workshop-black flex items-center justify-center text-concrete transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-6 bg-brand-navy text-studio-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-steel shadow-sm">
          <div className="font-mono text-xs text-brand-navy-light uppercase tracking-wider">
            HAVE A UNIQUE CONCEPT NOT LISTED HERE? WE LOVE BESPOKE CHALLENGES.
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold hover:bg-white transition-colors flex items-center gap-2 shrink-0 shadow-sm"
          >
            <span>CONSULT YOUR IDEA</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
