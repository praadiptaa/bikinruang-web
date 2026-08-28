"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { mockProjects, mockCategories, mockClients } from "@/lib/data/mockData";
import { slugify } from "@/lib/utils";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const project = mockProjects.find((p) => p.id === projectId) || mockProjects[0];

  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [clientId, setClientId] = useState(project?.client_id || mockClients[0]?.id || "");
  const [categoryId, setCategoryId] = useState(project?.category_id || mockCategories[0]?.id || "");
  const [projectYear, setProjectYear] = useState(String(project?.project_year || 2026));
  const [location, setLocation] = useState(project?.location || "");
  const [featuredImageUrl, setFeaturedImageUrl] = useState(project?.featured_image_url || "");
  const [shortDescription, setShortDescription] = useState(project?.short_description || "");
  const [brief, setBrief] = useState(project?.brief || "");
  const [vision, setVision] = useState(project?.vision || "");
  const [buildProcess, setBuildProcess] = useState(project?.build_process || "");
  const [result, setResult] = useState(project?.result || "");
  const [isFeatured, setIsFeatured] = useState(project?.is_featured || false);
  const [isPublished, setIsPublished] = useState(project?.is_published ?? true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    router.push("/admin/projects");
  };

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-studio-border">
        <div>
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-concrete hover:text-workshop-black uppercase mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO PROJECTS LIST</span>
          </Link>
          <h2 className="font-display font-black text-3xl text-workshop-black uppercase tracking-tight">
            EDIT PROJECT: {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2 bg-studio-muted text-workshop-black font-mono text-xs font-bold hover:bg-studio-border transition-colors"
          >
            CANCEL
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2 bg-signal-orange text-white font-mono text-xs font-bold hover:bg-signal-hover transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "UPDATING..." : "UPDATE PROJECT"}</span>
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-studio-card border border-studio-border p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-workshop-black pb-2 border-b border-studio-border">
              PROJECT IDENTITY
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                PROJECT TITLE
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-concrete mb-1">
                URL SLUG
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 bg-studio-muted border border-studio-border text-xs font-mono text-concrete focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                SHORT DESCRIPTION
              </label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>
          </div>

          {/* Case Study Section */}
          <div className="bg-studio-card border border-studio-border p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-studio-border text-signal-orange">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-display font-bold text-base uppercase text-workshop-black">
                CASE STUDY SECTIONS
              </h3>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-signal-orange mb-1">
                01. THE BRIEF
              </label>
              <textarea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-lime-600 mb-1">
                02. THE VISION
              </label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-electric-blue mb-1">
                03. THE BUILD
              </label>
              <textarea
                rows={3}
                value={buildProcess}
                onChange={(e) => setBuildProcess(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                04. THE RESULT
              </label>
              <textarea
                rows={3}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-studio-card border border-studio-border p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-workshop-black pb-2 border-b border-studio-border">
              PUBLISH SETTINGS
            </h3>

            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-workshop-black">
                PUBLISH STATUS
              </label>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 accent-signal-orange cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-xs font-mono uppercase text-workshop-black">
                MARK AS FEATURED
              </label>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 accent-signal-orange cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-studio-card border border-studio-border p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-workshop-black pb-2 border-b border-studio-border">
              TAXONOMY
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                CATEGORY
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono focus:border-signal-orange focus:outline-none"
              >
                {mockCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                CLIENT
              </label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono focus:border-signal-orange focus:outline-none"
              >
                {mockClients.map((cl) => (
                  <option key={cl.id} value={cl.id}>
                    {cl.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                LOCATION
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-studio-card border border-studio-border p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-workshop-black pb-2 border-b border-studio-border">
              FEATURED IMAGE URL
            </h3>
            <input
              type="text"
              value={featuredImageUrl}
              onChange={(e) => setFeaturedImageUrl(e.target.value)}
              className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono focus:border-signal-orange focus:outline-none"
            />
            {featuredImageUrl && (
              <div className="relative aspect-[16/10] overflow-hidden border border-studio-border bg-workshop-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
