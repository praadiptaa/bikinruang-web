import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getClients } from "@/lib/data/api";
import { allProjectsRoster } from "@/lib/data/mockData";
import CTASection from "@/components/public/CTASection";

export const metadata = {
  title: "Clients & Partners — Bikinruang. Workshop Atelier",
  description: "Brand, institusi, dan agensi yang mempercayakan produksi event, stage decoration, dan custom props kepada Bikinruang.",
};

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b-2 border-brand-navy">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold tracking-widest uppercase mb-4">
          <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
          <span>KOLABORASI &amp; KEPERCAYAAN</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-workshop-black uppercase leading-[0.9] max-w-5xl mb-6">
          TRUSTED TO BUILD<span className="text-brand-yellow">.</span>
        </h1>
        <p className="max-w-2xl font-sans text-lg text-workshop-black/80 leading-relaxed font-medium">
          Kami bangga berkolaborasi dengan berbagai brand, institusi, dan event organizer terkemuka dalam mewujudkan instalasi event yang presisi dan berstandar kualitas tinggi.
        </p>
      </section>

      {/* Grid of Clients */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, idx) => (
            <div
              key={client.id}
              className="p-8 bg-studio-card border border-studio-border hover:border-brand-navy hover:bg-brand-navy hover:text-studio-white transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-concrete group-hover:text-brand-yellow mb-6">
                  <span>[ PARTNER 0{idx + 1} ]</span>
                  <span className="text-brand-yellow font-bold">★ VERIFIED</span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-2 group-hover:text-studio-white transition-colors">
                  {client.name}
                </h3>
                <p className="text-xs text-concrete group-hover:text-brand-navy-light font-sans leading-relaxed mb-6">
                  {client.description || "Partner dalam fabrikasi event, custom props, dan instalasi spasial."}
                </p>
              </div>

              <div className="pt-4 border-t border-studio-border group-hover:border-brand-steel flex items-center justify-between">
                <span className="text-[11px] font-mono text-concrete group-hover:text-brand-navy-light">
                  EVENT PRODUCTION
                </span>
                <span className="text-xs font-mono font-bold text-brand-yellow">
                  BIKINRUANG ATELIER
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Roster Wall */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-brand-navy">
        <div className="mb-10">
          <div className="font-mono text-xs text-brand-navy font-bold uppercase tracking-widest mb-2">
            [ TRACK RECORD PROJECTS ]
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            PROJECT LIST HIGHLIGHTS
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
