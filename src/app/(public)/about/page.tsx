import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Users2, Sparkles, CheckCircle2 } from "lucide-react";
import CTASection from "@/components/public/CTASection";

export const metadata = {
  title: "About Us — Bikinruang. Workshop Atelier",
  description: "Menjadi creative event production partner yang inovatif dan adaptif dalam menerjemahkan ide serta kebutuhan klien menjadi elemen visual dan instalasi event yang presisi.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b-2 border-brand-navy">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold tracking-widest uppercase mb-4">
          <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
          <span>TENTANG KAMI • BIKINRUANG. WORKSHOP ATELIER</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-workshop-black uppercase leading-[0.9] max-w-5xl mb-6">
          FROM VISION, <br />
          <span className="text-brand-navy">BUILT UNEXPECTED.</span>
        </h1>
        <p className="max-w-3xl font-sans text-lg text-workshop-black/80 leading-relaxed font-medium">
          Bikinruang adalah creative event production partner (dekorasi event, event props, party set, stage decoration) yang berfokus menutup gap antara ekspektasi konsep desain dan realitas eksekusi lapangan.
        </p>
      </section>

      {/* Visi Perusahaan & Problem Solving Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 relative aspect-[16/10] overflow-hidden bg-workshop-card border-2 border-brand-navy">
            <Image
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
              alt="Bikinruang Fabrication Workshop"
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-brand-navy text-studio-white font-mono text-[10px] uppercase font-bold tracking-wider">
              MALANG WORKSHOP ATELIER • JAWA TIMUR
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="font-mono text-xs text-brand-navy font-bold uppercase tracking-widest">
              [ VISI PERUSAHAAN ]
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-workshop-black uppercase tracking-tight leading-snug">
              MENJADI CREATIVE EVENT PRODUCTION PARTNER YANG INOVATIF &amp; ADAPTIF
            </h2>
            <p className="font-sans text-sm text-workshop-black/90 leading-relaxed border-l-4 border-brand-yellow pl-4 font-medium">
              &ldquo;Menjadi creative event production partner yang inovatif dan adaptif dalam menerjemahkan ide serta kebutuhan klien menjadi elemen visual dan instalasi event yang presisi, relevan dengan tren, serta dieksekusi dengan standar kualitas tinggi melalui proses kerja yang efektif, fleksibel, dan berkelanjutan.&rdquo;
            </p>
            <div className="pt-2">
              <h3 className="font-mono text-xs font-bold text-brand-navy uppercase mb-2">
                [ LATAR BELAKANG &amp; MASALAH YANG KAMI JAWAB ]
              </h3>
              <p className="font-sans text-xs text-concrete leading-relaxed">
                Di industri event dan produksi visual, ekspektasi klien sering kali berbenturan dengan realitas — desain konsep atau render 3D yang memukau di atas kertas, namun berakhir mengecewakan saat dieksekusi di lapangan. Bikinruang hadir untuk menutup gap itu: presisi eksekusi, produksi visual yang relevan dengan tren, dan kolaborasi kreatif yang fleksibel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pilar Keunggulan */}
      <section className="bg-workshop-black text-studio-white py-20 border-y border-workshop-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="font-mono text-xs text-brand-yellow tracking-widest uppercase mb-2 font-bold">
              [ 3 PILAR KEUNGGULAN ]
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight">
              STANDAR PRODUKSI BIKINRUANG
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-colors group">
              <div className="w-12 h-12 bg-workshop-muted flex items-center justify-center text-brand-yellow mb-5 group-hover:bg-brand-yellow group-hover:text-workshop-black transition-colors">
                <Users2 className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-brand-yellow mb-2 block font-bold">01 / PILAR</span>
              <h3 className="font-display font-black text-xl uppercase text-studio-white mb-3 group-hover:text-brand-yellow transition-colors">
                FLEXIBLE CREATIVE COLLABORATION
              </h3>
              <p className="text-xs text-concrete leading-relaxed font-sans">
                Kolaborasi yang adaptif dan komunikatif, siap mendampingi kebutuhan klien dari tahap brainstorming hingga eksekusi akhir.
              </p>
            </div>

            <div className="p-8 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-colors group">
              <div className="w-12 h-12 bg-workshop-muted flex items-center justify-center text-brand-yellow mb-5 group-hover:bg-brand-yellow group-hover:text-workshop-black transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-brand-yellow mb-2 block font-bold">02 / PILAR</span>
              <h3 className="font-display font-black text-xl uppercase text-studio-white mb-3 group-hover:text-brand-yellow transition-colors">
                TREND-RELEVANT VISUAL PRODUCTION
              </h3>
              <p className="text-xs text-concrete leading-relaxed font-sans">
                Eksplorasi material modern dan tata pencahayaan yang relevan dengan tren visual terkini untuk hasil yang estetik dan memukau.
              </p>
            </div>

            <div className="p-8 bg-workshop-card border border-workshop-border hover:border-brand-yellow transition-colors group">
              <div className="w-12 h-12 bg-workshop-muted flex items-center justify-center text-brand-yellow mb-5 group-hover:bg-brand-yellow group-hover:text-workshop-black transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-brand-yellow mb-2 block font-bold">03 / PILAR</span>
              <h3 className="font-display font-black text-xl uppercase text-studio-white mb-3 group-hover:text-brand-yellow transition-colors">
                PRECISION EXECUTION
              </h3>
              <p className="text-xs text-concrete leading-relaxed font-sans">
                Standar fabrikasi presisi tinggi, memastikan hasil di lapangan sama persis dengan rancangan render 3D yang disetujui.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
