"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Search, Eye, Star } from "lucide-react";
import { mockProjects } from "@/lib/data/mockData";
import { Project } from "@/types/database";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteModal from "@/components/admin/DeleteModal";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clients?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.project_categories?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = () => {
    if (deleteTarget) {
      setProjects(projects.filter((p) => p.id !== deleteTarget.id));
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
            <span>PORTFOLIO &amp; BUILDS MANAGEMENT</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            PROJECTS DIRECTORY
          </h2>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-all shadow-sm border border-brand-yellow"
        >
          <Plus className="w-4 h-4" />
          <span>+ ADD NEW PROJECT</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-studio-card border border-studio-border p-4 shadow-sm">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan judul proyek, klien, atau kategori..."
            className="w-full pl-10 pr-4 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
          />
          <Search className="w-4 h-4 text-concrete absolute left-3.5 top-3" />
        </div>

        <div className="font-mono text-xs text-workshop-black font-bold">
          TOTAL: <span className="text-brand-navy">{filteredProjects.length}</span> DARI {projects.length} PROYEK
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-studio-card border border-studio-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-navy text-studio-white font-mono uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5">THUMBNAIL</th>
                <th className="p-3.5">PROJECT TITLE</th>
                <th className="p-3.5">CATEGORY</th>
                <th className="p-3.5">CLIENT</th>
                <th className="p-3.5">YEAR</th>
                <th className="p-3.5">FEATURED</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border font-medium">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-studio-muted/60 transition-colors">
                  <td className="p-3.5 w-20">
                    <div className="relative w-16 h-12 bg-workshop-black overflow-hidden border border-studio-border">
                      <Image
                        src={project.featured_image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-bold text-workshop-black uppercase text-sm">
                      {project.title}
                    </div>
                    <div className="text-[11px] font-mono text-concrete">
                      /{project.slug}
                    </div>
                  </td>
                  <td className="p-3.5 font-mono uppercase">
                    <span className="px-2 py-0.5 bg-studio-muted border border-studio-border text-[10px] font-bold text-brand-navy">
                      {project.project_categories?.name || "-"}
                    </span>
                  </td>
                  <td className="p-3.5 font-bold text-workshop-black">
                    {project.clients?.name || "-"}
                  </td>
                  <td className="p-3.5 font-mono font-bold">{project.project_year}</td>
                  <td className="p-3.5">
                    {project.is_featured ? (
                      <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200 font-mono text-[10px] font-bold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        FEATURED
                      </span>
                    ) : (
                      <span className="font-mono text-concrete text-[10px]">-</span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={project.is_published} />
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-mono text-xs">
                      <Link
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        className="p-1.5 bg-studio-muted hover:bg-brand-navy hover:text-studio-white text-workshop-black transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-1.5 bg-brand-navy hover:bg-brand-yellow hover:text-workshop-black text-studio-white transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="p-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        title="HAPUS PROYEK"
        itemName={deleteTarget?.title || ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
