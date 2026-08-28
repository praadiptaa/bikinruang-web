import React from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, Mail, Instagram } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-workshop-black text-studio-white relative overflow-hidden border-b border-workshop-border">
      {/* Dynamic Grid Glow Background with Atelier Colors */}
      <div className="absolute inset-0 bg-dark-grid opacity-40 pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-96 h-96 bg-brand-navy/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-workshop-card border border-brand-yellow/40 font-mono text-[11px] font-bold text-brand-yellow tracking-widest uppercase mb-6 shadow-sm">
          <span className="w-2 h-2 bg-brand-yellow"></span>
          <span>CREATIVE EVENT PRODUCTION PARTNER</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.95] max-w-5xl mx-auto mb-6">
          READY TO BRING YOUR VISION EVENT TO LIFE?<br />
          <span className="text-brand-yellow">CONTACT US!</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-concrete font-sans leading-relaxed mb-10">
          Dekorasi event, event props, party sets, stage decoration, custom backdrop, hingga event desk. Diskusikan konsep dan kebutuhan event Anda bersama kami.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-10">
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-brand-yellow text-workshop-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-3 shadow-xl"
          >
            <span>SUBMIT INQUIRY FORM</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <a
            href="https://wa.me/6282225658357?text=Halo%20Bikinruang,%20saya%20ingin%20konsultasi%20project%20event%20fabrication"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-brand-navy border border-brand-steel text-studio-white font-mono text-xs font-bold tracking-wider hover:bg-brand-steel hover:text-white transition-colors flex items-center justify-center gap-3"
          >
            <Phone className="w-4 h-4 text-brand-yellow" />
            <span>WHATSAPP (0822 2565 8357)</span>
          </a>
        </div>

        {/* Quick Contact Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-concrete border-t border-workshop-border/60 pt-8 max-w-2xl mx-auto">
          <a href="mailto:bikinruangworkshop@gmail.com" className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
            <Mail className="w-4 h-4 text-brand-yellow" />
            <span>bikinruangworkshop@gmail.com</span>
          </a>
          <a href="https://wa.me/6282225658357" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
            <Phone className="w-4 h-4 text-brand-yellow" />
            <span>0822 2565 8357 (Adnan)</span>
          </a>
          <a href="https://instagram.com/bikinruang.co" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-brand-yellow transition-colors">
            <Instagram className="w-4 h-4 text-brand-yellow" />
            <span>@bikinruang.co</span>
          </a>
        </div>
      </div>
    </section>
  );
}
