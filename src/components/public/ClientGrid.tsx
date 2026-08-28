import React from "react";
import Link from "next/link";
import { Client } from "@/types/database";
import { ArrowUpRight } from "lucide-react";

interface ClientGridProps {
  clients: Client[];
}

export default function ClientGrid({ clients }: ClientGridProps) {
  return (
    <section className="py-20 md:py-28 bg-studio-white border-b border-studio-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-2 border-brand-navy mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold tracking-widest uppercase mb-2">
              <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
              <span>KLIEN &amp; KOLABORASI</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-workshop-black tracking-tight uppercase">
              OUR CLIENTS &amp; PARTNERS<span className="text-brand-yellow">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-workshop-black/80 font-sans leading-relaxed font-medium">
            Dipercaya oleh berbagai brand nasional, korporasi, institusi universitas, dan entitas kreatif untuk menghadirkan produksi event berkualitas tinggi.
          </p>
        </div>

        {/* Client Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {clients.map((client, idx) => (
            <div
              key={client.id}
              className="p-6 bg-studio-card border border-studio-border hover:border-brand-navy hover:bg-brand-navy hover:text-studio-white transition-all duration-200 flex flex-col justify-between aspect-[16/11] group"
            >
              <div className="flex items-center justify-between font-mono text-[10px] text-concrete group-hover:text-brand-yellow">
                <span>0{idx + 1}</span>
                <span className="text-brand-yellow font-bold">★ VERIFIED</span>
              </div>

              <div className="my-auto text-center">
                <span className="font-display font-black text-base sm:text-lg uppercase tracking-tight group-hover:text-studio-white transition-colors block mb-1">
                  {client.name}
                </span>
                {client.description && (
                  <span className="text-[11px] font-mono text-concrete group-hover:text-brand-navy-light block line-clamp-1">
                    {client.description}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-concrete group-hover:text-brand-navy-light pt-2 border-t border-studio-border group-hover:border-brand-steel">
                <span>COLLABORATION</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-yellow" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
