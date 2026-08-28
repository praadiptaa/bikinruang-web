"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Upload, Sparkles, Plus, Trash2 } from "lucide-react";
import { mockCategories, mockClients } from "@/lib/data/mockData";
import { slugify } from "@/lib/utils";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [clientId, setClientId] = useState(mockClients[0]?.id || "");
  const [categoryId, setCategoryId] = useState(mockCategories[0]?.id || "");
  const [projectYear, setProjectYear] = useState("2026");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [brief, setBrief] = useState("");
  const [vision, setVision] = useState("");
  const [buildProcess, setBuildProcess] = useState("");
  const [result, setResult] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(slugify(val));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate save or write to Supabase
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
            ADD NEW PROJECT BUILD
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
            <span>{isSaving ? "SAVING..." : "PUBLISH PROJECT"}</span>
          </button>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core Fields & Case Study */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Info */}
          <div className="bg-studio-card border border-studio-border p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-workshop-black pb-2 border-b border-studio-border">
              PROJECT IDENTITY
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                PROJECT TITLE *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g. MONOLITH ANNUAL SUMMIT GALA"
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
                SHORT DESCRIPTION / SUMMARY *
              </label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief 1-2 sentences summarizing the physical build..."
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>
          </div>

          {/* Case Study Section (CLAUDE.md guidelines) */}
          <div className="bg-studio-card border border-studio-border p-6 space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-studio-border text-signal-orange">
              <Sparkles className="w-4 h-4" />
              <h3 className="font-display font-bold text-base uppercase text-workshop-black">
                CASE STUDY DEEP DIVE (THE 4 PILLARS)
              </h3>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-signal-orange mb-1">
                01. THE BRIEF (WHAT NEEDED TO BE CREATED?)
              </label>
              <textarea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Client requirements, venue challenges, scale, and functional objectives..."
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-acid-lime-dark text-lime-600 mb-1">
                02. THE VISION (WHAT WAS THE VISUAL & SPATIAL DIRECTION?)
              </label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Aesthetic concept, materials palette, mood board translation..."
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-electric-blue mb-1">
                03. THE BUILD (HOW WAS IT TRANSFORMED IN THE WORKSHOP?)
              </label>
              <textarea
                rows={3}
                value={buildProcess}
                onChange={(e) => setBuildProcess(e.target.value)}
                placeholder="Fabrication techniques, CNC milling, welding, paint finish, rigging, and load-in execution..."
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                04. THE RESULT (WHAT WAS THE OUTCOME?)
              </label>
              <textarea
                rows={3}
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="Audience feedback, visitor numbers, social engagement, and client satisfaction..."
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-sm font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Taxonomy, Media & Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publish Options */}
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

          {/* Taxonomy Select */}
          <div className="bg-studio-card border border-studio-border p-6 space-y-4">
            <h3 className="font-display font-bold text-base uppercase text-workshop-black pb-2 border-b border-studio-border">
              RELATIONS
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                PROJECT CATEGORY
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                  YEAR
                </label>
                <input
                  type="number"
                  value={projectYear}
                  onChange={(e) => setProjectYear(e.target.value)}
                  className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono focus:border-signal-orange focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                  DATE
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono focus:border-signal-orange focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-1">
                LOCATION / VENUE
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Ritz-Carlton Jakarta"
                className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-sans focus:border-signal-orange focus:outline-none"
              />
            </div>
          </div>

          {/* Featured Image */}
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
