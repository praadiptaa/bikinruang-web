"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit2, Newspaper, X } from "lucide-react";
import { mockNews } from "@/lib/data/mockData";
import { News } from "@/types/database";
import { slugify, formatDate } from "@/lib/utils";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteModal from "@/components/admin/DeleteModal";

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<News[]>(mockNews);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80");
  const [deleteTarget, setDeleteTarget] = useState<News | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newArticle: News = {
      id: `news-${Date.now()}`,
      title,
      slug: slugify(title),
      excerpt,
      content,
      featured_image_url: imageUrl,
      status: "published",
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setNewsList([newArticle, ...newsList]);
    setTitle("");
    setExcerpt("");
    setContent("");
    setIsCreating(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setNewsList(newsList.filter((n) => n.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-brand-navy">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>EDITORIAL &amp; INSIGHTS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            STORIES &amp; NEWS JOURNAL
          </h2>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-all shadow-sm border border-brand-yellow"
          >
            <Plus className="w-4 h-4" />
            <span>+ WRITE STORY</span>
          </button>
        )}
      </div>

      {/* Inline Create Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-studio-card border-2 border-brand-navy p-6 sm:p-8 space-y-4 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border">
            <h3 className="font-display font-black text-lg uppercase text-workshop-black">
              TULIS ARTIKEL / CERITA BARU
            </h3>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-concrete hover:text-workshop-black p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              JUDUL ARTIKEL *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Menutup Gap Antara Render 3D dan Realitas Lapangan"
              className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              RINGKASAN EXCERPT *
            </label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Ringkasan singkat artikel dalam 1-2 kalimat..."
              className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              KONTEN ARTIKEL LENGKAP
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis artikel editorial..."
              className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              FEATURED IMAGE URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-studio-border">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2.5 bg-studio-muted text-workshop-black font-mono text-xs font-bold uppercase hover:bg-stone-200"
            >
              BATAL
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-colors border border-brand-yellow shadow-sm"
            >
              PUBLIKASIKAN ARTIKEL
            </button>
          </div>
        </form>
      )}

      {/* Stories Table */}
      <div className="bg-studio-card border border-studio-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-navy text-studio-white font-mono uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5">THUMBNAIL</th>
                <th className="p-3.5">ARTICLE TITLE</th>
                <th className="p-3.5">EXCERPT</th>
                <th className="p-3.5">DATE</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border font-medium">
              {newsList.map((news) => (
                <tr key={news.id} className="hover:bg-studio-muted/60 transition-colors">
                  <td className="p-3.5 w-20">
                    {news.featured_image_url ? (
                      <div className="relative w-16 h-12 bg-workshop-black overflow-hidden border border-studio-border">
                        <Image
                          src={news.featured_image_url}
                          alt={news.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-12 bg-studio-muted border border-studio-border" />
                    )}
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-workshop-black text-sm">
                      {news.title}
                    </div>
                    <div className="text-[11px] font-mono text-concrete">
                      /{news.slug}
                    </div>
                  </td>
                  <td className="p-3.5 text-workshop-black/80 font-sans max-w-sm">
                    {news.excerpt}
                  </td>
                  <td className="p-3.5 font-mono text-concrete">
                    {formatDate(news.published_at || news.created_at)}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={news.status} />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setDeleteTarget(news)}
                      className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteTarget}
        title="HAPUS ARTIKEL"
        itemName={deleteTarget?.title || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
