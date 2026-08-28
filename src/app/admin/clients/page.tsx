"use client";

import React, { useState } from "react";
import { Plus, Trash2, Globe, X } from "lucide-react";
import { mockClients } from "@/lib/data/mockData";
import { Client } from "@/types/database";
import { slugify } from "@/lib/utils";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteModal from "@/components/admin/DeleteModal";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newClient: Client = {
      id: `cli-${Date.now()}`,
      name,
      slug: slugify(name),
      website_url: websiteUrl || null,
      description: description || null,
      sort_order: clients.length + 1,
      is_published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setClients([...clients, newClient]);
    setName("");
    setWebsiteUrl("");
    setDescription("");
    setIsCreating(false);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setClients(clients.filter((c) => c.id !== deleteTarget.id));
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
            <span>PARTNERSHIP DIRECTORY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            CLIENTS &amp; PARTNERS
          </h2>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-all shadow-sm border border-brand-yellow"
          >
            <Plus className="w-4 h-4" />
            <span>+ ADD CLIENT</span>
          </button>
        )}
      </div>

      {/* Inline Create Form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-studio-card border-2 border-brand-navy p-6 sm:p-8 space-y-4 shadow-md animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border">
            <h3 className="font-display font-black text-lg uppercase text-workshop-black">
              TAMBAH KLIEN / PARTNER BARU
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
                NAMA BRAND / KLIEN *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. PT. Antam / Yamaha Motor"
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
                WEBSITE URL
              </label>
              <input
                type="url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1.5">
              DESKRIPSI / NAMA PROYEK
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Fest for Music / Annual Gathering PT. Cimory"
              className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none"
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
              SIMPAN KLIEN
            </button>
          </div>
        </form>
      )}

      {/* Clients Table */}
      <div className="bg-studio-card border border-studio-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-navy text-studio-white font-mono uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5">CLIENT NAME</th>
                <th className="p-3.5">PROJECT / CONTEXT</th>
                <th className="p-3.5">WEBSITE</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border font-medium">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-studio-muted/60 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-workshop-black uppercase text-sm">
                      {client.name}
                    </div>
                    <div className="text-[11px] font-mono text-concrete">
                      /{client.slug}
                    </div>
                  </td>
                  <td className="p-3.5 text-workshop-black/80 font-sans">
                    {client.description || "Brand / Event Partner"}
                  </td>
                  <td className="p-3.5 font-mono text-xs">
                    {client.website_url ? (
                      <a
                        href={client.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-navy hover:underline flex items-center gap-1 font-bold"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Link</span>
                      </a>
                    ) : (
                      <span className="text-concrete">-</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={client.is_published} />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setDeleteTarget(client)}
                      className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                      title="Delete Client"
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
        title="HAPUS KLIEN"
        itemName={deleteTarget?.name || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
