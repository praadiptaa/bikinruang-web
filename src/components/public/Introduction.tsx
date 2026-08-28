import React from "react";
import { Sparkles, Users2, Cpu, CheckCircle2 } from "lucide-react";

export default function Introduction() {
  return (
    <section className="py-20 md:py-28 bg-workshop-black text-studio-white relative overflow-hidden border-b border-workshop-border">
      {/* Texture grid */}
      <div className="absolute inset-0 bg-dark-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Label */}
        <div className="flex items-center justify-between border-b border-workshop-border pb-4 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-brand-yellow tracking-widest uppercase font-bold">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>VISI PERUSAHAAN &amp; NILAI UTAMA</span>
          </div>
          <div className="text-concrete font-mono text-xs hidden sm:block">
            &ldquo;FROM VISION, BUILT UNEXPECTED.&rdquo;
          </div>
        </div>

        {/* Big Statement - Visi Perusahaan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          <div className="lg:col-span-8">
            <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight uppercase leading-[1.1] mb-6">
              MENJADI <span className="text-brand-yellow">CREATIVE EVENT PRODUCTION PARTNER</span> YANG INOVATIF &amp; ADAPTIF.
            </h2>
            <p className="font-sans text-base sm:text-lg text-studio-white/90 leading-relaxed">
              Menerjemahkan ide serta kebutuhan klien menjadi elemen visual dan instalasi event yang presisi, relevan dengan tren, serta dieksekusi dengan standar kualitas tinggi melalui proses kerja yang efektif, fleksibel, dan berkelanjutan.
            </p>
          </div>
          <div className="lg:col-span-4 text-concrete font-sans text-xs sm:text-sm leading-relaxed border-l-2 border-brand-yellow pl-5 space-y-3">
            <div className="font-mono text-xs font-bold text-brand-yellow uppercase">
              [ MENUTUP GAP EKSPEKTASI &amp; REALITAS ]
            </div>
            <p>
              Di industri event dan produksi visual, ekspektasi klien sering kali berbenturan dengan realitas — desain konsep atau render 3D yang memukau di atas kertas, namun berakhir mengecewakan saat dieksekusi di lapangan.
            </p>
            <p className="text-studio-white font-medium">
              Bikinruang hadir untuk menutup gap itu: presisi eksekusi, produksi visual yang relevan dengan tren, dan kolaborasi kreatif yang fleksibel.
            </p>
          </div>
        </div>

        {/* 3 Pilar Keunggulan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-8 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-colors group">
            <div className="w-12 h-12 bg-workshop-muted flex items-center justify-center text-brand-yellow mb-5 group-hover:bg-brand-yellow group-hover:text-workshop-black transition-colors">
              <Users2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-concrete mb-1">PILAR 01</div>
            <h3 className="font-display font-black text-xl text-studio-white uppercase mb-3 group-hover:text-brand-yellow transition-colors">
              FLEXIBLE CREATIVE COLLABORATION
            </h3>
            <p className="text-xs text-concrete font-sans leading-relaxed">
              Proses kerja yang komunikatif, adaptif, dan responsif terhadap perubahan kebutuhan konsep maupun teknis di setiap tahap produksi.
            </p>
          </div>

          <div className="p-8 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-colors group">
            <div className="w-12 h-12 bg-workshop-muted flex items-center justify-center text-brand-yellow mb-5 group-hover:bg-brand-yellow group-hover:text-workshop-black transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-concrete mb-1">PILAR 02</div>
            <h3 className="font-display font-black text-xl text-studio-white uppercase mb-3 group-hover:text-brand-yellow transition-colors">
              TREND-RELEVANT VISUAL PRODUCTION
            </h3>
            <p className="text-xs text-concrete font-sans leading-relaxed">
              Mengikuti dan memadukan material modern, tata pencahayaan kekinian, dan estetika visual yang relevan dengan tren audiens terkini.
            </p>
          </div>

          <div className="p-8 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-colors group">
            <div className="w-12 h-12 bg-workshop-muted flex items-center justify-center text-brand-yellow mb-5 group-hover:bg-brand-yellow group-hover:text-workshop-black transition-colors">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-mono text-concrete mb-1">PILAR 03</div>
            <h3 className="font-display font-black text-xl text-studio-white uppercase mb-3 group-hover:text-brand-yellow transition-colors">
              PRECISION EXECUTION
            </h3>
            <p className="text-xs text-concrete font-sans leading-relaxed">
              Standar fabrikasi workshop berkualitas tinggi, ukuran presisi sesuai render 3D, dan instalasi lapangan yang tepat waktu dan aman.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
