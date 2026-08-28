"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/ui/BrandLogo";

const NAV_LINKS = [
  { name: "PROJECTS", href: "/projects" },
  { name: "SERVICES", href: "/services" },
  { name: "ABOUT", href: "/about" },
  { name: "CLIENTS", href: "/clients" },
  { name: "STORIES", href: "/stories" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-studio-white/95 backdrop-blur-md border-b border-studio-border shadow-sm py-2 sm:py-3"
            : "bg-transparent py-4 sm:py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Big Prominent Brand Logo */}
            <Link href="/" className="group flex items-center py-1">
              <BrandLogo size="md" variant="dark" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-xs font-mono tracking-wider transition-colors duration-150 relative py-1",
                      isActive
                        ? "text-brand-navy font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-brand-yellow"
                        : "text-workshop-black/80 hover:text-brand-navy"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action CTA with Atelier Colors */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-navy text-studio-white font-mono text-xs font-bold tracking-wider hover:bg-brand-yellow hover:text-workshop-black transition-all duration-200 shadow-sm border border-brand-navy hover:border-brand-yellow"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-workshop-black hover:text-brand-yellow transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-workshop-black text-studio-white md:hidden pt-24 px-6 flex flex-col justify-between pb-10 animate-fadeIn">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-workshop-border pb-4">
              <BrandLogo size="md" variant="light" />
              <span className="text-[10px] font-mono text-brand-yellow font-bold uppercase tracking-widest">
                [ ATELIER MENU ]
              </span>
            </div>
            {NAV_LINKS.map((link, idx) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-display text-2xl sm:text-3xl font-black tracking-tight flex items-center justify-between py-2 border-b border-workshop-border/50",
                    isActive ? "text-brand-yellow" : "text-studio-white hover:text-brand-yellow"
                  )}
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-concrete">0{idx + 1}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 mt-8">
            <Link
              href="/contact"
              className="w-full py-4 bg-brand-yellow text-workshop-black text-center font-mono text-sm font-bold tracking-wider hover:bg-brand-yellow-hover transition-colors flex items-center justify-center gap-2"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex justify-center items-center text-xs font-mono text-concrete pt-4 border-t border-workshop-border">
              <span>MALANG WORKSHOP ATELIER • JAWA TIMUR</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
