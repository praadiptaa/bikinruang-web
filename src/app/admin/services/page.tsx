"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, X } from "lucide-react";
import { mockServices, mockServiceGroups } from "@/lib/data/mockData";
import { Service } from "@/types/database";
import { slugify } from "@/lib/utils";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteModal from "@/components/admin/DeleteModal";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [groupId, setGroupId] = useState(mockServiceGroups[0]?.id || "");
  const [shortDescription, setShortDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80");
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newSrv: Service = {
      id: `srv-${Date.now()}`,
      group_id: groupId,
      title: title.toUpperCase(),
      slug: slugify(title),
      short_description: shortDescription,
      image_url: imageUrl,
      sort_order: services.length + 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setServices([...services, newSrv]);
    setTitle("");
    setShortDescription("");
    setIsCreating(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setServices(services.filter((s) => s.id !== deleteTarget.id));
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
            <span>CAPABILITY &amp; SCOPE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            SERVICES &amp; DISCIPLINES
          </h2>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-all shadow-sm border border-brand-yellow"
          >
            <Plus className="w-4 h-4" />
            <span>+ ADD SERVICE</span>
          </button>
        )}
      </div>

      {/* Inline Create Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-studio-card border-2 border-brand-navy p-6 sm:p-8 space-y-4 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border">
            <h3 className="font-display font-black text-lg uppercase text-workshop-black">
              TAMBAH LAYANAN BARU
            </h3>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-concrete hover:text-workshop-black p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
                NAMA LAYANAN *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. EVENT PROPERTY / DECORATION"
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
                KATEGORI GROUP
              </label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
              >
                {mockServiceGroups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              RINGKASAN DESKRIPSI *
            </label>
            <textarea
              required
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Deskripsi cakupan fabrikasi dan produksi layanan..."
              className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              URL GAMBAR PREVIEW
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
              SIMPAN LAYANAN
            </button>
          </div>
        </form>
      )}

      {/* Services Table */}
      <div className="bg-studio-card border border-studio-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-navy text-studio-white font-mono uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5">THUMBNAIL</th>
                <th className="p-3.5">SERVICE TITLE</th>
                <th className="p-3.5">GROUP</th>
                <th className="p-3.5">SUMMARY</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border font-medium">
              {services.map((srv) => {
                const group = mockServiceGroups.find((g) => g.id === srv.group_id);
                return (
                  <tr key={srv.id} className="hover:bg-studio-muted/60 transition-colors">
                    <td className="p-3.5 w-20">
                      {srv.image_url ? (
                        <div className="relative w-16 h-12 bg-workshop-black overflow-hidden border border-studio-border">
                          <Image
                            src={srv.image_url}
                            alt={srv.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-12 bg-studio-muted border border-studio-border" />
                      )}
                    </td>
                    <td className="p-3.5 font-bold text-workshop-black uppercase text-sm">
                      {srv.title}
                    </td>
                    <td className="p-3.5 font-mono text-brand-navy font-bold uppercase">
                      <span className="px-2 py-0.5 bg-brand-navy/10 border border-brand-navy/20 text-[10px]">
                        {group?.name || "EVENT PROPS"}
                      </span>
                    </td>
                    <td className="p-3.5 text-workshop-black/80 font-sans max-w-sm">
                      {srv.short_description}
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={srv.is_published} />
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setDeleteTarget(srv)}
                        className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteTarget}
        title="HAPUS LAYANAN"
        itemName={deleteTarget?.title || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
