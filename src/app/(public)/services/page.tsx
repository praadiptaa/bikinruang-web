import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServiceGroups, getServices } from "@/lib/data/api";
import CTASection from "@/components/public/CTASection";

export const metadata = {
  title: "Our Services — Bikinruang. Workshop Atelier",
  description: "Creative event production partner: Event Property / Decoration, Party Sets, Corporate Event, Stage Decoration, Custom Backdrop, Rental Decoration Items, Event Desk / Booth.",
};

export default async function ServicesPage() {
  const [groups, services] = await Promise.all([
    getServiceGroups(),
    getServices(),
  ]);

  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b-2 border-brand-navy">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold tracking-widest uppercase mb-4">
          <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
          <span>LAYANAN PRODUKSI &amp; FABRIKASI</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-workshop-black uppercase leading-[0.9] max-w-5xl mb-6">
          OUR SERVICES<span className="text-brand-yellow">.</span>
        </h1>
        <p className="max-w-2xl font-sans text-lg text-workshop-black/80 leading-relaxed font-medium">
          Kami menyediakan solusi produksi event terpadu yang presisi, relevan dengan tren, dan siap dieksekusi dengan standar kualitas tinggi.
        </p>
      </section>

      {/* Services Breakdown by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {groups.map((group, groupIdx) => {
          const groupServices = services.filter((s) => s.group_id === group.id);

          return (
            <section
              key={group.id}
              id={group.slug}
              className="border-t-2 border-brand-navy pt-12"
            >
              {/* Group Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <span className="font-mono text-xs text-brand-navy font-bold uppercase tracking-widest block mb-2">
                    KATEGORI 0{groupIdx + 1}
                  </span>
                  <h2 className="font-display font-black text-3xl sm:text-5xl text-workshop-black uppercase tracking-tight">
                    {group.name}
                  </h2>
                </div>
                <p className="max-w-md text-xs sm:text-sm text-concrete font-sans leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* Services List / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {groupServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-studio-card border border-studio-border hover:border-brand-navy transition-all duration-300 p-8 flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      {service.image_url && (
                        <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-workshop-card border border-studio-border">
                          <Image
                            src={service.image_url}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-workshop-black mb-3 group-hover:text-brand-navy transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-workshop-black/80 font-sans leading-relaxed mb-6 font-medium">
                        {service.short_description}
                      </p>
                      {service.description && (
                        <p className="text-xs text-concrete font-sans leading-relaxed border-l-2 border-brand-yellow pl-4 mb-6">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-studio-border flex items-center justify-between">
                      <span className="font-mono text-[11px] text-concrete">
                        STANDAR KUALITAS TINGGI
                      </span>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy text-studio-white font-mono text-xs font-bold hover:bg-brand-yellow hover:text-workshop-black transition-colors"
                      >
                        <span>INQUIRE THIS SERVICE</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <CTASection />
    </div>
  );
}
