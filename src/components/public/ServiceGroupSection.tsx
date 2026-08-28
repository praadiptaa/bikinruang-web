import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Flame, Target, Wrench, Check } from "lucide-react";
import { ServiceGroup } from "@/types/database";

interface ServiceGroupSectionProps {
  groups: ServiceGroup[];
}

const SERVICES_LIST = [
  { title: "EVENT PROPERTY / DECORATION", group: "EVENT PROPS", desc: "Custom event props, dekorasi spasial, dan instalasi visual tematik." },
  { title: "PARTY SETS", group: "PARTY SETS", desc: "Party photospot, party decoration, dan party typographic signage." },
  { title: "CORPORATE EVENT", group: "EVENT PROPS", desc: "Produksi visual gathering tahunan, summit, gala dinner, dan konferensi." },
  { title: "STAGE DECORATION", group: "EVENT PROPS", desc: "Panggung festival, konser musik, dan backdrop panggung megah." },
  { title: "CUSTOM BACKDROP", group: "EVENT PROPS", desc: "Backdrop foto kustom, photo booth, dan framing videotron presisi." },
  { title: "RENTAL DECORATION ITEMS", group: "EVENT DESK", desc: "Item dekorasi sewa berkualitas dan properti pendukung event." },
  { title: "EVENT DESK / BOOTH", group: "EVENT DESK", desc: "Foldable event desk cepat rakit dan commercial display booth pameran." },
];

export default function ServiceGroupSection({ groups }: ServiceGroupSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-workshop-black text-studio-white border-b border-workshop-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-workshop-border mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-brand-yellow tracking-widest uppercase mb-2 font-bold">
              <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
              <span>LAYANAN KAMI</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-studio-white tracking-tight uppercase">
              OUR SERVICES<span className="text-brand-yellow">.</span>
            </h2>
            <p className="text-xs font-mono text-concrete uppercase mt-1">
              EVENT PROPS • PARTY SETS • EVENT DESK
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-brand-yellow hover:text-white transition-colors pb-1 border-b border-brand-yellow hover:border-white"
          >
            <span>LIHAT DETAIL SEMUA LAYANAN</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.map((srv, idx) => (
            <div
              key={srv.title}
              className="bg-workshop-card border border-workshop-border p-6 hover:border-brand-yellow transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-concrete mb-3">
                  <span>0{idx + 1}</span>
                  <span className="px-2 py-0.5 bg-workshop-muted text-brand-yellow uppercase font-bold tracking-wider">
                    {srv.group}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl uppercase tracking-tight text-studio-white mb-2 group-hover:text-brand-yellow transition-colors">
                  {srv.title}
                </h3>

                <p className="text-xs text-concrete font-sans leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-workshop-border flex items-center justify-between">
                <span className="font-mono text-[10px] text-concrete uppercase">
                  BIKINRUANG ATELIER
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-brand-yellow hover:underline"
                >
                  <span>INQUIRE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
