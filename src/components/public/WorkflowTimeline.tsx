import React from "react";
import { Lightbulb, Palette, Calculator, Eye, CheckCircle2, Hammer, Truck, Sparkles } from "lucide-react";

const WORKFLOW_STEPS = [
  { step: "01", title: "CONCEPT & MOOD BOARD", desc: "Menerjemahkan ide awal dan merumuskan arah visual.", icon: Palette },
  { step: "02", title: "QUOTATION", desc: "Penyusunan rincian ruang lingkup produksi dan estimasi biaya.", icon: Calculator },
  { step: "03", title: "DESIGN PREVIEW", desc: "Visualisasi 3D render agar Anda melihatnya sebelum dibangun.", icon: Eye },
  { step: "04", title: "APPROVAL", desc: "Persetujuan final desain, material, dan jadwal produksi.", icon: CheckCircle2 },
  { step: "05", title: "PRODUCTION", desc: "Eksekusi fabrikasi presisi di workshop atelier.", icon: Hammer },
  { step: "06", title: "INSTALLATION", desc: "Pengiriman dan perakitan cepat di lokasi venue.", icon: Truck },
  { step: "07", title: "EVENT DAY", desc: "Instalasi siap pakai menyempurnakan pengalaman event Anda.", icon: Sparkles },
];

export default function WorkflowTimeline() {
  return (
    <section className="py-20 md:py-28 bg-workshop-black text-studio-white border-b border-workshop-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-workshop-border mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-brand-yellow tracking-widest uppercase mb-2 font-bold">
              <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
              <span>CARA KERJA KAMI</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-studio-white tracking-tight uppercase">
              WORKFLOW PROJECTS<span className="text-brand-yellow">.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-concrete font-sans leading-relaxed">
            Proses kerja yang efektif, fleksibel, dan terstruktur dari awal konsep hingga hari pelaksanaan event.
          </p>
        </div>

        {/* 7 Step Visual Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKFLOW_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-all duration-200 group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-black text-concrete/30 group-hover:text-brand-yellow transition-colors">
                      {item.step}
                    </span>
                    <div className="p-2.5 bg-workshop-muted rounded-none text-brand-yellow">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-lg uppercase text-studio-white mb-2 group-hover:text-brand-yellow transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-concrete leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-workshop-border/50 flex items-center justify-between font-mono text-[10px] text-concrete/60">
                  <span>STEP 0{idx + 1} / 07</span>
                  <span className="text-brand-yellow opacity-0 group-hover:opacity-100 transition-opacity font-bold">● ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
