"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Tag, Check } from "lucide-react";
import { mockCategories } from "@/lib/data/mockData";
import { ProjectCategory } from "@/types/database";
import DeleteModal from "@/components/admin/DeleteModal";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<ProjectCategory[]>(mockCategories);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ProjectCategory | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newCat: ProjectCategory = {
      id: `cat-${Date.now()}`,
      name: name.toUpperCase(),
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      description,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setCategories([...categories, newCat]);
    setName("");
    setSlug("");
    setDescription("");
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setCategories(categories.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b-2 border-brand-navy">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>TAXONOMY &amp; FILTERS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            PROJECT CATEGORIES
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Create Category Form */}
        <div className="lg:col-span-4 bg-studio-card border border-studio-border p-6 shadow-sm">
          <h3 className="font-display font-black text-lg uppercase tracking-tight text-workshop-black pb-3 border-b border-studio-border mb-4">
            TAMBAH KATEGORI BARU
          </h3>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
                NAMA KATEGORI *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                }}
                placeholder="e.g. EVENT PROPS"
                required
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono focus:border-brand-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
                SLUG URL
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. event-props"
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono focus:border-brand-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
                DESKRIPSI / SCOPE ITEMS
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="e.g. Stage Backdrop, Welcoming Signage, Gate-In, Photobooth"
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans focus:border-brand-navy focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-colors flex items-center justify-center gap-2 shadow-sm border border-brand-yellow"
            >
              <Plus className="w-4 h-4" />
              <span>SIMPAN KATEGORI</span>
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-8 bg-studio-card border border-studio-border overflow-hidden shadow-sm">
          <div className="bg-brand-navy text-studio-white px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center justify-between">
            <span>DAFTAR KATEGORI AKTIF ({categories.length})</span>
            <Tag className="w-4 h-4 text-brand-yellow" />
          </div>

          <div className="divide-y divide-studio-border">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-studio-muted/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-black text-lg text-workshop-black uppercase tracking-tight">
                      {cat.name}
                    </h4>
                    <span className="font-mono text-xs text-brand-navy bg-brand-navy/10 px-2 py-0.5 font-bold">
                      /{cat.slug}
                    </span>
                  </div>
                  {cat.description && (
                    <p className="text-xs text-concrete mt-1 font-sans">
                      {cat.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 font-mono text-xs self-end sm:self-auto">
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteTarget}
        title="HAPUS KATEGORI"
        itemName={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
