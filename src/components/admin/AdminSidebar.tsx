"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  Tag,
  Hammer,
  Users,
  Newspaper,
  Image as ImageIcon,
  ExternalLink,
  MapPin,
  Instagram,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import BrandLogo from "@/components/ui/BrandLogo";

const ADMIN_NAV = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Client Inquiries", href: "/admin/inquiries", icon: Inbox },
  { name: "Social Media", href: "/admin/social", icon: Instagram },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Services", href: "/admin/services", icon: Hammer },
  { name: "Clients", href: "/admin/clients", icon: Users },
  { name: "Stories & News", href: "/admin/news", icon: Newspaper },
  { name: "Media Assets", href: "/admin/media", icon: ImageIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <aside className="w-64 bg-workshop-black text-studio-white border-r border-workshop-border flex flex-col justify-between min-h-screen fixed top-0 left-0 bottom-0 z-30 font-sans shadow-xl">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-workshop-border">
          <Link href="/admin/dashboard" className="block">
            <BrandLogo variant="light" size="md" />
          </Link>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-brand-yellow font-bold uppercase tracking-wider mt-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
            <span>ATELIER CONTROL ROOM</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-mono text-concrete uppercase tracking-widest font-bold">
            [ CONTENT MANAGEMENT ]
          </div>
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2.5 text-xs font-mono font-bold tracking-wide transition-all rounded-none",
                  isActive
                    ? "bg-brand-navy text-studio-white border-l-4 border-brand-yellow shadow-md"
                    : "text-studio-white/80 hover:bg-workshop-card hover:text-brand-yellow"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("w-4 h-4", isActive ? "text-brand-yellow" : "text-concrete")} />
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Public Site Link */}
      <div className="p-4 border-t border-workshop-border space-y-3 bg-workshop-card/50">
        <div className="flex items-center gap-2 text-[11px] font-mono text-concrete px-2">
          <MapPin className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
          <span>Malang, Jawa Timur</span>
        </div>

        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-workshop-card border border-workshop-border text-studio-white hover:border-brand-yellow hover:text-brand-yellow text-xs font-mono font-bold uppercase transition-colors"
        >
          <span>VIEW LIVE SITE</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}
