"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload, Copy, Check, Trash2, Image as ImageIcon } from "lucide-react";

interface MediaItem {
  id: string;
  name: string;
  category: "projects" | "services" | "clients" | "news" | "general";
  url: string;
  size: string;
  created_at: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  { id: "m-1", name: "neon_playground_tunnel.webp", category: "projects", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80", size: "480 KB", created_at: "2026-02-14" },
  { id: "m-2", name: "festival_stage_soundscape.webp", category: "projects", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80", size: "720 KB", created_at: "2025-10-20" },
  { id: "m-3", name: "monolith_summit_backdrop.webp", category: "projects", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80", size: "610 KB", created_at: "2026-01-28" },
  { id: "m-4", name: "workshop_cnc_cutting.webp", category: "news", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80", size: "540 KB", created_at: "2026-02-10" },
  { id: "m-5", name: "party_set_botanical.webp", category: "services", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80", size: "390 KB", created_at: "2026-01-10" },
  { id: "m-6", name: "foldable_event_desk_detail.webp", category: "services", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", size: "410 KB", created_at: "2026-01-05" },
];

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredMedia =
    selectedCategory === "all"
      ? mediaList
      : mediaList.filter((m) => m.category === selectedCategory);

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setMediaList(mediaList.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-brand-navy">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>ASSETS &amp; CLOUD STORAGE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            MEDIA ASSETS MANAGER
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-all shadow-sm border border-brand-yellow">
            <Upload className="w-4 h-4" />
            <span>UPLOAD ASSET</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 bg-studio-card border border-studio-border p-3 overflow-x-auto shadow-sm">
        {["all", "projects", "services", "news", "clients"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-mono font-bold uppercase transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-brand-navy text-studio-white"
                : "bg-studio-white border border-studio-border text-workshop-black hover:border-brand-navy"
            }`}
          >
            {cat} ({cat === "all" ? mediaList.length : mediaList.filter((m) => m.category === cat).length})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="bg-studio-card border border-studio-border hover:border-brand-navy transition-all duration-200 group flex flex-col justify-between overflow-hidden shadow-sm"
          >
            <div className="relative aspect-[16/11] bg-workshop-black overflow-hidden">
              <Image
                src={item.url}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 px-2 py-0.5 bg-brand-navy/90 text-brand-yellow font-mono text-[9px] font-bold uppercase">
                {item.category}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <div className="font-mono text-xs font-bold text-workshop-black truncate">
                  {item.name}
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-concrete mt-1">
                  <span>{item.size}</span>
                  <span>{item.created_at}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-studio-border flex items-center justify-between gap-2">
                <button
                  onClick={() => handleCopyUrl(item)}
                  className={`flex-1 py-1.5 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    copiedId === item.id
                      ? "bg-emerald-600 text-white"
                      : "bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black"
                  }`}
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                  title="Delete Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
