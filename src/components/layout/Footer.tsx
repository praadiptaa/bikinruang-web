import React from "react";
import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, Phone, MapPin } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export default function Footer() {
  return (
    <footer className="bg-workshop-black text-studio-white border-t border-workshop-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Statement Banner */}
        <div className="border-b border-workshop-border pb-14 mb-14">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <div className="text-brand-yellow font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2 font-bold">
                <span className="w-2 h-2 bg-brand-yellow inline-block"></span>
                <span>BIKINRUANG. WORKSHOP ATELIER</span>
              </div>
              <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[0.95] uppercase">
                FROM VISION, <br />
                <span className="text-brand-yellow">BUILT UNEXPECTED.</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p className="text-concrete text-sm font-sans mb-6 leading-relaxed">
                Creative event production partner: dekorasi event, event props, party set, stage decoration, custom backdrop, hingga event desk.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold tracking-wider hover:bg-white transition-colors"
              >
                <span>READY TO BRING YOUR VISION TO LIFE?</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-14 border-b border-workshop-border text-sm">
          {/* Col 1: Brand & Visi */}
          <div>
            <div className="mb-6">
              <BrandLogo variant="light" size="lg" />
            </div>
            <p className="text-concrete text-xs leading-relaxed font-sans mb-4">
              Creative event production partner yang inovatif dan adaptif dalam menerjemahkan ide menjadi elemen visual dan instalasi event yang presisi.
            </p>
            <div className="text-[11px] font-mono text-brand-yellow font-bold">
              MALANG WORKSHOP ATELIER • JAWA TIMUR
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <div className="text-xs font-mono text-brand-yellow tracking-widest uppercase mb-4 font-bold">
              [ OUR SERVICES ]
            </div>
            <ul className="space-y-2 text-xs font-mono text-studio-white/80">
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → EVENT PROPERTY / DECORATION
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → PARTY SETS
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → CORPORATE EVENT
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → STAGE DECORATION
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → CUSTOM BACKDROP
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → RENTAL DECORATION ITEMS
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → EVENT DESK / BOOTH
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <div className="text-xs font-mono text-brand-yellow tracking-widest uppercase mb-4 font-bold">
              [ NAVIGATION ]
            </div>
            <ul className="space-y-2 text-xs font-mono text-studio-white/80">
              <li>
                <Link href="/" className="hover:text-brand-yellow transition-colors">
                  → HOME
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-yellow transition-colors">
                  → ABOUT US (VISI PERUSAHAAN)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-yellow transition-colors">
                  → OUR SERVICES
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-yellow transition-colors">
                  → OUR PROJECTS
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-brand-yellow transition-colors">
                  → CLIENTS &amp; PARTNERS
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-yellow transition-colors">
                  → CONTACT US
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <div className="text-xs font-mono text-brand-yellow tracking-widest uppercase mb-4 font-bold">
              [ CONTACT US ]
            </div>
            <div className="space-y-3 text-xs">
              <a
                href="mailto:bikinruangworkshop@gmail.com"
                className="flex items-center gap-2 text-studio-white/90 hover:text-brand-yellow transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span className="break-all font-mono text-[11px]">bikinruangworkshop@gmail.com</span>
              </a>
              <a
                href="https://wa.me/6282225658357"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-studio-white/90 hover:text-brand-yellow transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span className="font-mono text-[11px]">0822 2565 8357 (Adnan)</span>
              </a>
              <a
                href="https://instagram.com/bikinruang.co"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-studio-white/90 hover:text-brand-yellow transition-colors"
              >
                <Instagram className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                <span className="font-mono text-[11px]">@bikinruang.co</span>
              </a>
              <div className="flex items-start gap-2 text-concrete text-[11px] pt-2">
                <MapPin className="w-4 h-4 text-concrete flex-shrink-0 mt-0.5" />
                <span>Kota Malang, Jawa Timur, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-concrete">
          <div>
            © {new Date().getFullYear()} BIKINRUANG. WORKSHOP ATELIER • KOTA MALANG, JAWA TIMUR. ALL RIGHTS RESERVED.
          </div>
          <div>
            <span>&ldquo;FROM VISION, BUILT UNEXPECTED.&rdquo;</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
