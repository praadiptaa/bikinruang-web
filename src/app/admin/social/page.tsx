"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Plus,
  Trash2,
  Image as ImageIcon,
  Video,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  Layers,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Music,
  MapPin,
  Share2,
  Radio,
  Calendar,
  Clock,
  FileText,
  Edit3,
  CalendarCheck,
  History,
  FolderOpen,
  ExternalLink,
  BarChart2,
  Copy,
  TrendingUp,
  Eye,
} from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

type PostFormat = "feed" | "reels" | "stories";
type MediaType = "photo" | "video";
type PostStatus = "draft" | "scheduled" | "published";

interface MediaSlide {
  id: string;
  type: MediaType;
  url: string;
  duration?: string;
}

interface SocialPostItem {
  id: string;
  title: string;
  format: PostFormat;
  aspectRatio: "1:1" | "4:5";
  slides: MediaSlide[];
  caption: string;
  location: string;
  collaborators: string;
  audioTrack?: string;
  status: PostStatus;
  scheduledFor?: string;
  publishedAt?: string;
  metrics?: {
    likes: number;
    comments: number;
    reach: string;
  };
  mirroredTo?: "stories" | "projects";
  createdAt: string;
}

const PRESET_HASHTAGS = [
  "#Bikinruang",
  "#WorkshopAtelier",
  "#EventFabricationMalang",
  "#StageDecoration",
  "#EventProps",
  "#BrandActivation",
  "#CustomBackdrop",
  "#EventDesk",
  "#FromVisionBuiltUnexpected",
];

const INITIAL_POSTS: SocialPostItem[] = [
  // Drafts
  {
    id: "post-draft-1",
    title: "Behind The Scenes: CNC Stage Fabrication",
    format: "feed",
    aspectRatio: "4:5",
    slides: [
      { id: "s-d1", type: "photo", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" },
      { id: "s-d2", type: "video", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80", duration: "0:30" }
    ],
    caption: "Inside our Malang Atelier: Proses presisi fabrikasi struktur panggung 3D menggunakan mesin CNC dan finishing material premium. 🛠️📐\n\n#Bikinruang #WorkshopAtelier #EventFabricationMalang",
    location: "Bikinruang Workshop, Kota Malang",
    collaborators: "@adnanbikinruang",
    status: "draft",
    createdAt: "2026-02-26 14:30",
  },
  {
    id: "post-draft-2",
    title: "Party Set Botanical Visual Setup",
    format: "stories",
    aspectRatio: "4:5",
    slides: [
      { id: "s-d3", type: "photo", url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80" }
    ],
    caption: "New customized party signage & botanical photospot ready for weekend private party in Batu Malang! 🌿✨",
    location: "Batu, Jawa Timur",
    collaborators: "@partyplanner.id",
    status: "draft",
    createdAt: "2026-02-27 10:15",
  },

  // Scheduled
  {
    id: "post-sched-1",
    title: "Fest for Music Main Stage Reveal",
    format: "reels",
    aspectRatio: "4:5",
    slides: [
      { id: "s-s1", type: "video", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80", duration: "0:45" }
    ],
    caption: "Soundcheck & lighting test at Fest for Music main stage! Megah, dinamis, dan dibangun tanpa kompromi oleh tim Bikinruang Atelier. 🎶🔥\n\n#FestForMusic #StageDecoration #Bikinruang",
    location: "Fest for Music Festival Ground, Malang",
    collaborators: "@festformusic",
    audioTrack: "Fest for Music Live Sound • Official Track",
    status: "scheduled",
    scheduledFor: "2026-03-01 19:00 WIB",
    createdAt: "2026-02-27 11:00",
  },
  {
    id: "post-sched-2",
    title: "Monolith Summit Corporate Backdrop",
    format: "feed",
    aspectRatio: "4:5",
    slides: [
      { id: "s-s2", type: "photo", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
      { id: "s-s3", type: "photo", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" }
    ],
    caption: "Corporate brand activation & backdrop showcase for PT. Antam Summit. Clean lines, geometric lighting, and elegant corporate aesthetic.",
    location: "Grand Ballroom, Surabaya",
    collaborators: "@pt.antam",
    status: "scheduled",
    scheduledFor: "2026-03-02 09:30 WIB",
    createdAt: "2026-02-27 12:40",
  },

  // Published / History
  {
    id: "post-pub-1",
    title: "Go Go Glow Neon Playground Stage",
    format: "feed",
    aspectRatio: "4:5",
    slides: [
      { id: "s-p1", type: "photo", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80" },
      { id: "s-p2", type: "video", url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80", duration: "0:25" },
      { id: "s-p3", type: "photo", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" },
    ],
    caption: "Menembus batas visual: Instalasi panggung neon interaktif untuk Go Go Glow Festival! 💥 Rangka kokoh, pencahayaan dynamic LED, dan visual photobooth berkesan mendalam.\n\nFrom vision, built unexpected. #Bikinruang #GoGoGlow",
    location: "Malang Outdoor Arena, Jawa Timur",
    collaborators: "@gogoglow.fest @gopayindonesia",
    status: "published",
    publishedAt: "2026-02-24 18:30 WIB",
    metrics: { likes: 1420, comments: 64, reach: "18.5K" },
    mirroredTo: "projects",
    createdAt: "2026-02-24 18:30",
  },
  {
    id: "post-pub-2",
    title: "Annual Gathering PT. Antam Stage & Welcoming Gate",
    format: "feed",
    aspectRatio: "4:5",
    slides: [
      { id: "s-p4", type: "photo", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80" }
    ],
    caption: "Visual megah dan presisi untuk Annual Gathering PT. Antam. Pengerjaan stage backdrop, welcoming signage, dan frame videotron berstandar korporasi nasional.",
    location: "Surabaya Grand Hall",
    collaborators: "@pt.antam",
    status: "published",
    publishedAt: "2026-02-20 12:00 WIB",
    metrics: { likes: 890, comments: 32, reach: "9.8K" },
    mirroredTo: "projects",
    createdAt: "2026-02-20 12:00",
  },
  {
    id: "post-pub-3",
    title: "Inside Workshop: Precision 3D CAD to On-Site Reality",
    format: "reels",
    aspectRatio: "4:5",
    slides: [
      { id: "s-p5", type: "video", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80", duration: "0:50" }
    ],
    caption: "Bagaimana kami mengeksekusi ide dari blueprint 3D CAD hingga instalasi panggung nyata tanpa kompromi detail. 🛠️✨\n\n#WorkshopAtelier #BikinruangMalang",
    location: "Bikinruang Atelier, Malang",
    collaborators: "@bikinruang.co",
    audioTrack: "Atelier Ambience • Original Audio",
    status: "published",
    publishedAt: "2026-02-18 20:00 WIB",
    metrics: { likes: 2150, comments: 118, reach: "34.2K" },
    mirroredTo: "stories",
    createdAt: "2026-02-18 20:00",
  },
];

export default function AdminSocialMirroringPage() {
  const [activeTab, setActiveTab] = useState<"studio" | "drafts" | "scheduled" | "history">("studio");
  const [postList, setPostList] = useState<SocialPostItem[]>(INITIAL_POSTS);

  // Active Editor State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState("Go Go Glow Neon Playground Showcase");
  const [format, setFormat] = useState<PostFormat>("feed");
  const [aspectRatio, setAspectRatio] = useState<"1:1" | "4:5">("4:5");
  const [slides, setSlides] = useState<MediaSlide[]>([
    {
      id: "s-1",
      type: "photo",
      url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "s-2",
      type: "video",
      url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
      duration: "0:24",
    },
    {
      id: "s-3",
      type: "photo",
      url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  
  // Post Details
  const [caption, setCaption] = useState(
    "Transforming event concepts into physical, visual, and spatial experiences. 🛠️✨\n\nEksekusi panggung & custom visual props oleh Bikinruang Workshop Atelier Malang. Presisi eksekusi, relevan dengan tren visual terkini.\n\nFrom vision, built unexpected."
  );
  const [location, setLocation] = useState("Bikinruang Workshop Atelier, Malang");
  const [collaborators, setCollaborators] = useState("@gopayindonesia @pt.antam");
  const [audioTrack, setAudioTrack] = useState("Bikinruang Workshop • Original Audio");
  
  // Schedule Picker State
  const [scheduleDate, setScheduleDate] = useState("2026-03-05");
  const [scheduleTime, setScheduleTime] = useState("19:00");
  
  // Media Input Form State
  const [newMediaType, setNewMediaType] = useState<MediaType>("photo");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  
  // Video player simulation & Interaction
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(412);

  // Sync Options
  const [syncToWebsite, setSyncToWebsite] = useState(true);
  const [syncTarget, setSyncTarget] = useState<"projects" | "stories">("stories");
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const handleAddSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;

    const newSlide: MediaSlide = {
      id: `slide-${Date.now()}`,
      type: newMediaType,
      url: newMediaUrl,
      duration: newMediaType === "video" ? "0:15" : undefined,
    };

    setSlides([...slides, newSlide]);
    setNewMediaUrl("");
  };

  const handleRemoveSlide = (id: string) => {
    if (slides.length <= 1) return;
    const newSlides = slides.filter((s) => s.id !== id);
    setSlides(newSlides);
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1);
    }
  };

  const handleAddHashtag = (tag: string) => {
    if (!caption.includes(tag)) {
      setCaption(caption + " " + tag);
    }
  };

  // Save as Draft Action
  const handleSaveDraft = () => {
    const draftItem: SocialPostItem = {
      id: editingPostId || `draft-${Date.now()}`,
      title: postTitle || "Untitled Draft",
      format,
      aspectRatio,
      slides,
      caption,
      location,
      collaborators,
      audioTrack: format === "reels" ? audioTrack : undefined,
      status: "draft",
      createdAt: new Date().toLocaleString("id-ID"),
    };

    if (editingPostId) {
      setPostList(postList.map((p) => (p.id === editingPostId ? draftItem : p)));
    } else {
      setPostList([draftItem, ...postList]);
    }

    setNotificationMsg("Draft berhasil disimpan ke arsip!");
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // Schedule Post Action
  const handleSchedulePost = () => {
    const scheduledItem: SocialPostItem = {
      id: editingPostId || `sched-${Date.now()}`,
      title: postTitle || "Scheduled Campaign",
      format,
      aspectRatio,
      slides,
      caption,
      location,
      collaborators,
      audioTrack: format === "reels" ? audioTrack : undefined,
      status: "scheduled",
      scheduledFor: `${scheduleDate} ${scheduleTime} WIB`,
      createdAt: new Date().toLocaleString("id-ID"),
    };

    if (editingPostId) {
      setPostList(postList.map((p) => (p.id === editingPostId ? scheduledItem : p)));
    } else {
      setPostList([scheduledItem, ...postList]);
    }

    setNotificationMsg(`Postingan berhasil dijadwalkan untuk ${scheduleDate} pukul ${scheduleTime} WIB!`);
    setTimeout(() => setNotificationMsg(null), 4000);
  };

  // Publish Now Action
  const handlePublishNow = () => {
    const nowString = `${new Date().toLocaleDateString("id-ID")} ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB`;
    
    const publishedItem: SocialPostItem = {
      id: `pub-${Date.now()}`,
      title: postTitle,
      format,
      aspectRatio,
      slides,
      caption,
      location,
      collaborators,
      audioTrack: format === "reels" ? audioTrack : undefined,
      status: "published",
      publishedAt: nowString,
      metrics: { likes: 1, comments: 0, reach: "100" },
      mirroredTo: syncTarget,
      createdAt: nowString,
    };

    setPostList([publishedItem, ...postList.filter((p) => p.id !== editingPostId)]);
    setNotificationMsg("Postingan berhasil dimirror dan dipublikasikan langsung ke Instagram & Website!");
    setTimeout(() => setNotificationMsg(null), 5000);
  };

  // Load a Draft, Scheduled, or Published Post into the Live Studio
  const handleLoadPostToStudio = (item: SocialPostItem) => {
    setEditingPostId(item.id);
    setPostTitle(item.title);
    setFormat(item.format);
    setAspectRatio(item.aspectRatio);
    setSlides(item.slides);
    setCurrentSlideIndex(0);
    setCaption(item.caption);
    setLocation(item.location);
    setCollaborators(item.collaborators);
    if (item.audioTrack) setAudioTrack(item.audioTrack);
    setActiveTab("studio");
    setNotificationMsg(`Post "${item.title}" dimuat ke Studio & Live Preview!`);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  // Delete from List
  const handleDeletePost = (id: string) => {
    setPostList(postList.filter((p) => p.id !== id));
  };

  const draftsCount = postList.filter((p) => p.status === "draft").length;
  const scheduledCount = postList.filter((p) => p.status === "scheduled").length;
  const publishedCount = postList.filter((p) => p.status === "published").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-brand-navy">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>SOCIAL MEDIA MIRRORING &amp; CREATOR STUDIO</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            INSTAGRAM CREATOR STUDIO
          </h2>
        </div>

        {/* Studio Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-studio-card border border-studio-border p-1.5 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className={`px-3.5 py-2 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "studio"
                ? "bg-brand-navy text-studio-white shadow-sm"
                : "text-workshop-black hover:bg-studio-muted"
            }`}
          >
            <Edit3 className="w-4 h-4 text-brand-yellow" />
            <span>LIVE STUDIO</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("drafts")}
            className={`px-3.5 py-2 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "drafts"
                ? "bg-brand-navy text-studio-white shadow-sm"
                : "text-workshop-black hover:bg-studio-muted"
            }`}
          >
            <FileText className="w-4 h-4 text-amber-500" />
            <span>DRAFTS ({draftsCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("scheduled")}
            className={`px-3.5 py-2 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "scheduled"
                ? "bg-brand-navy text-studio-white shadow-sm"
                : "text-workshop-black hover:bg-studio-muted"
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-brand-yellow" />
            <span>SCHEDULED ({scheduledCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-3.5 py-2 font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === "history"
                ? "bg-brand-navy text-studio-white shadow-sm"
                : "text-workshop-black hover:bg-studio-muted"
            }`}
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span>RIWAYAT ({publishedCount})</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notificationMsg && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-mono text-xs flex items-center justify-between shadow-sm animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            <span>{notificationMsg}</span>
          </div>
          <span className="text-[10px] bg-emerald-200 px-2 py-0.5 font-bold uppercase">SUCCESS</span>
        </div>
      )}

      {/* === TAB 1: LIVE STUDIO & CREATOR === */}
      {activeTab === "studio" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Controls, Scheduler & Content Editor */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Post Title & Quick Action Bar */}
            <div className="bg-studio-card border border-studio-border p-5 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-brand-navy mb-1.5">
                  JUDUL KAMPANYE / POSTINGAN
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Go Go Glow Neon Stage Reveal"
                  className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-sm font-sans font-bold text-workshop-black focus:border-brand-navy focus:outline-none"
                />
              </div>

              {/* Action Buttons: Draft, Schedule, Publish */}
              <div className="pt-2 flex flex-wrap gap-2.5 border-t border-studio-border">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2.5 bg-studio-muted text-workshop-black font-mono text-xs font-bold uppercase hover:bg-stone-200 transition-colors flex items-center gap-2 border border-studio-border"
                >
                  <FileText className="w-4 h-4 text-concrete" />
                  <span>SIMPAN KE DRAFT</span>
                </button>

                <button
                  type="button"
                  onClick={handleSchedulePost}
                  className="px-4 py-2.5 bg-brand-navy text-studio-white font-mono text-xs font-bold uppercase hover:bg-brand-steel transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-brand-yellow" />
                  <span>JADWALKAN POST</span>
                </button>

                <button
                  type="button"
                  onClick={handlePublishNow}
                  className="px-5 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-white hover:text-workshop-black transition-all flex items-center gap-2 shadow-sm border border-brand-yellow"
                >
                  <Share2 className="w-4 h-4" />
                  <span>PUBLISH SEKARANG</span>
                </button>
              </div>
            </div>

            {/* Schedule Date & Time Picker */}
            <div className="bg-brand-navy text-studio-white p-5 border border-brand-navy shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-brand-navy-light/40">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-yellow" />
                  <span className="font-mono text-xs font-bold uppercase text-brand-yellow">
                    PENGATURAN JADWAL TAYANG (SCHEDULE TIME)
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-brand-yellow text-workshop-black px-2 py-0.5 font-bold uppercase">
                  WIB (GMT+7)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] font-mono text-concrete uppercase mb-1">
                    TANGGAL PUBLIKASI
                  </label>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 bg-workshop-black border border-brand-navy-light text-studio-white text-xs font-mono focus:border-brand-yellow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-concrete uppercase mb-1">
                    JAM TAYANG
                  </label>
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3 py-2 bg-workshop-black border border-brand-navy-light text-studio-white text-xs font-mono focus:border-brand-yellow focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Format Selector: Feed, Reels, Stories */}
            <div className="bg-studio-card border border-studio-border p-5 shadow-sm space-y-4">
              <label className="block text-xs font-mono font-bold uppercase text-brand-navy">
                1. FORMAT INSTAGRAM
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setFormat("feed")}
                  className={`p-4 border text-center transition-all flex flex-col items-center gap-2 ${
                    format === "feed"
                      ? "border-brand-navy bg-brand-navy text-studio-white shadow-sm"
                      : "border-studio-border bg-studio-white text-workshop-black hover:border-brand-navy"
                  }`}
                >
                  <Layers className="w-5 h-5 text-brand-yellow" />
                  <span className="font-mono text-xs font-bold uppercase">FEED / CAROUSEL</span>
                  <span className="text-[10px] opacity-70">Multi Foto &amp; Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("reels")}
                  className={`p-4 border text-center transition-all flex flex-col items-center gap-2 ${
                    format === "reels"
                      ? "border-brand-navy bg-brand-navy text-studio-white shadow-sm"
                      : "border-studio-border bg-studio-white text-workshop-black hover:border-brand-navy"
                  }`}
                >
                  <Video className="w-5 h-5 text-brand-yellow" />
                  <span className="font-mono text-xs font-bold uppercase">REELS (9:16)</span>
                  <span className="text-[10px] opacity-70">Vertical Video</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormat("stories")}
                  className={`p-4 border text-center transition-all flex flex-col items-center gap-2 ${
                    format === "stories"
                      ? "border-brand-navy bg-brand-navy text-studio-white shadow-sm"
                      : "border-studio-border bg-studio-white text-workshop-black hover:border-brand-navy"
                  }`}
                >
                  <Radio className="w-5 h-5 text-brand-yellow" />
                  <span className="font-mono text-xs font-bold uppercase">STORIES</span>
                  <span className="text-[10px] opacity-70">24h Spatial Update</span>
                </button>
              </div>

              {format === "feed" && (
                <div className="pt-3 border-t border-studio-border flex items-center justify-between">
                  <span className="text-xs font-mono text-concrete font-bold">ASPECT RATIO FEED:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setAspectRatio("4:5")}
                      className={`px-3 py-1 text-xs font-mono font-bold ${
                        aspectRatio === "4:5"
                          ? "bg-brand-navy text-studio-white"
                          : "bg-studio-muted text-workshop-black"
                      }`}
                    >
                      4:5 Portrait
                    </button>
                    <button
                      type="button"
                      onClick={() => setAspectRatio("1:1")}
                      className={`px-3 py-1 text-xs font-mono font-bold ${
                        aspectRatio === "1:1"
                          ? "bg-brand-navy text-studio-white"
                          : "bg-studio-muted text-workshop-black"
                      }`}
                    >
                      1:1 Square
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Media Combiner & Slide Management */}
            <div className="bg-studio-card border border-studio-border p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-studio-border">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono font-bold uppercase text-brand-navy">
                    2. MEDIA SLIDES (GABUNGAN FOTO &amp; VIDEO)
                  </label>
                  <span className="px-2 py-0.5 bg-brand-yellow text-workshop-black font-mono text-[10px] font-bold">
                    {slides.length} ITEM
                  </span>
                </div>
                <span className="text-[11px] font-mono text-concrete">Klik thumbnail untuk pratinjau</span>
              </div>

              {/* Existing Slides Thumbnail Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {slides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`relative aspect-square border-2 cursor-pointer transition-all overflow-hidden group ${
                      currentSlideIndex === idx
                        ? "border-brand-yellow ring-2 ring-brand-navy shadow-md"
                        : "border-studio-border hover:border-brand-navy"
                    }`}
                  >
                    <Image
                      src={slide.url}
                      alt={`Slide ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-workshop-black/80 text-studio-white font-mono text-[9px] font-bold flex items-center gap-1">
                      {slide.type === "video" ? <Video className="w-2.5 h-2.5 text-brand-yellow" /> : <ImageIcon className="w-2.5 h-2.5 text-brand-yellow" />}
                      <span>0{idx + 1}</span>
                    </div>

                    {slides.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlide(slide.id);
                        }}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Hapus Slide"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Slide Form */}
              <form onSubmit={handleAddSlide} className="pt-3 border-t border-studio-border space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={newMediaType}
                    onChange={(e) => setNewMediaType(e.target.value as MediaType)}
                    className="px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono font-bold text-workshop-black focus:border-brand-navy"
                  >
                    <option value="photo">📸 Foto / Gambar</option>
                    <option value="video">🎬 Video Clip</option>
                  </select>

                  <input
                    type="url"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    placeholder="URL Foto / Video..."
                    className="flex-1 px-3.5 py-2 bg-studio-white border border-studio-border text-xs font-mono focus:border-brand-navy focus:outline-none"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-navy text-studio-white font-mono text-xs font-bold uppercase hover:bg-brand-yellow hover:text-workshop-black transition-colors flex items-center justify-center gap-1 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>TAMBAH</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Caption & Metadata Editor */}
            <div className="bg-studio-card border border-studio-border p-5 shadow-sm space-y-4">
              <label className="block text-xs font-mono font-bold uppercase text-brand-navy">
                3. CAPTION &amp; METADATA POSTINGAN
              </label>

              <div>
                <textarea
                  rows={5}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Tulis caption Instagram..."
                  className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none leading-relaxed"
                />
              </div>

              {/* Preset Hashtag Injector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-concrete font-bold uppercase">
                    QUICK HASHTAGS:
                  </span>
                  <span className="text-[10px] font-mono text-brand-navy font-bold">KLIK UNTUK MENAMBAH</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_HASHTAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddHashtag(tag)}
                      className="px-2 py-1 bg-studio-muted hover:bg-brand-navy hover:text-studio-white text-[10px] font-mono text-workshop-black border border-studio-border transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-workshop-black mb-1">
                    LOKASI
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Malang, Jawa Timur"
                    className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-workshop-black mb-1">
                    TAG KOLABORASI
                  </label>
                  <input
                    type="text"
                    value={collaborators}
                    onChange={(e) => setCollaborators(e.target.value)}
                    placeholder="e.g. @pt.antam @gopay"
                    className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy"
                  />
                </div>
              </div>

              {format === "reels" && (
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-workshop-black mb-1">
                    AUDIO TRACK / SOUND
                  </label>
                  <input
                    type="text"
                    value={audioTrack}
                    onChange={(e) => setAudioTrack(e.target.value)}
                    placeholder="Nama audio track..."
                    className="w-full px-3 py-2 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy"
                  />
                </div>
              )}
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Smartphone Live Preview */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase">
                <Smartphone className="w-4 h-4" />
                <span>LIVE SMARTPHONE PREVIEW</span>
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 bg-brand-yellow text-workshop-black font-bold uppercase">
                {format.toUpperCase()} MODE
              </span>
            </div>

            {/* Smartphone Frame */}
            <div className="w-full max-w-[360px] mx-auto bg-black rounded-[40px] p-3.5 shadow-2xl border-4 border-stone-800 relative">
              
              {/* Dynamic Island / Notch */}
              <div className="w-28 h-4 bg-stone-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-950"></div>
              </div>

              {/* Screen Container */}
              <div className="bg-black text-white rounded-[28px] overflow-hidden flex flex-col justify-between select-none">
                
                {/* === MODE 1: FEED / CAROUSEL POST === */}
                {format === "feed" && (
                  <div className="flex flex-col bg-black">
                    {/* Header */}
                    <div className="p-3 flex items-center justify-between border-b border-stone-900">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                          <div className="w-full h-full bg-black rounded-full p-[1px] flex items-center justify-center overflow-hidden">
                            <Image
                              src="/images/logo-light.png"
                              alt="Bikinruang"
                              width={30}
                              height={30}
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="leading-tight">
                          <div className="text-xs font-bold flex items-center gap-1">
                            <span>bikinruang.co</span>
                            <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                          </div>
                          <div className="text-[10px] text-stone-400 truncate max-w-[170px]">
                            {location || "Malang, Jawa Timur"}
                          </div>
                        </div>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-stone-400" />
                    </div>

                    {/* Media Viewport */}
                    <div
                      className={`relative w-full bg-stone-900 overflow-hidden ${
                        aspectRatio === "4:5" ? "aspect-[4/5]" : "aspect-square"
                      }`}
                    >
                      {activeSlide && (
                        <Image
                          src={activeSlide.url}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      )}

                      {activeSlide?.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform"
                          >
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                          </div>
                          <div
                            onClick={() => setIsMuted(!isMuted)}
                            className="absolute bottom-3 right-3 p-1.5 bg-black/70 rounded-full text-white cursor-pointer"
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      )}

                      {slides.length > 1 && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/70 backdrop-blur-sm rounded-full text-[10px] font-mono font-bold">
                          {currentSlideIndex + 1}/{slides.length}
                        </div>
                      )}

                      {slides.length > 1 && (
                        <>
                          {currentSlideIndex > 0 && (
                            <button
                              type="button"
                              onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                          )}
                          {currentSlideIndex < slides.length - 1 && (
                            <button
                              type="button"
                              onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}

                      {slides.length > 1 && (
                        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
                          {slides.map((_, i) => (
                            <span
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full transition-all ${
                                currentSlideIndex === i ? "bg-blue-500 w-3" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions Row */}
                    <div className="p-3 pb-1 flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsLiked(!isLiked);
                            setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
                          }}
                        >
                          <Heart
                            className={`w-5 h-5 transition-colors ${
                              isLiked ? "text-rose-500 fill-rose-500" : "text-white hover:text-stone-400"
                            }`}
                          />
                        </button>
                        <MessageCircle className="w-5 h-5 text-white hover:text-stone-400" />
                        <Send className="w-5 h-5 text-white hover:text-stone-400" />
                      </div>
                      <Bookmark className="w-5 h-5 text-white hover:text-stone-400" />
                    </div>

                    {/* Likes & Caption Preview */}
                    <div className="px-3 pb-4 space-y-1 text-xs">
                      <div className="font-bold">{likeCount.toLocaleString()} likes</div>
                      <div className="leading-snug">
                        <span className="font-bold mr-1.5">bikinruang.co</span>
                        <span className="text-stone-200 whitespace-pre-line line-clamp-3">
                          {caption}
                        </span>
                      </div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider pt-1">
                        SCHEDULED FOR INSTAGRAM • BIKINRUANG
                      </div>
                    </div>
                  </div>
                )}

                {/* === MODE 2: REELS (9:16) === */}
                {format === "reels" && (
                  <div className="relative aspect-[9/16] w-full bg-stone-950 overflow-hidden flex flex-col justify-between p-3.5">
                    <Image
                      src={activeSlide?.url || slides[0].url}
                      alt="Reels Background"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />

                    <div className="relative z-10 flex items-center justify-between text-white">
                      <span className="font-bold text-sm tracking-wide">Reels</span>
                      <div className="p-1 bg-black/40 backdrop-blur-md rounded-full">
                        <Volume2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="relative z-10 flex items-end justify-between gap-3">
                      <div className="space-y-2 max-w-[210px] text-left">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white p-[1px] overflow-hidden">
                            <Image
                              src="/images/logo-light.png"
                              alt="Avatar"
                              width={28}
                              height={28}
                              className="object-contain"
                            />
                          </div>
                          <span className="text-xs font-bold">bikinruang.co</span>
                          <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold">
                            Follow
                          </span>
                        </div>

                        <p className="text-xs text-stone-200 line-clamp-2 leading-tight">
                          {caption}
                        </p>

                        <div className="flex items-center gap-1.5 text-[10px] text-stone-300">
                          <Music className="w-3 h-3 animate-bounce" />
                          <span className="truncate">{audioTrack}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-4 text-white text-xs">
                        <div className="flex flex-col items-center gap-0.5">
                          <Heart className="w-6 h-6 fill-white/20" />
                          <span className="text-[10px] font-bold">1.4K</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5">
                          <MessageCircle className="w-6 h-6" />
                          <span className="text-[10px] font-bold">62</span>
                        </div>
                        <Send className="w-6 h-6" />
                        <MoreHorizontal className="w-5 h-5" />
                        <div className="w-6 h-6 rounded-md border border-white/50 overflow-hidden relative">
                          <Image src="/images/logo-light.png" alt="audio" fill className="object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* === MODE 3: STORIES (9:16) === */}
                {format === "stories" && (
                  <div className="relative aspect-[9/16] w-full bg-stone-950 overflow-hidden flex flex-col justify-between p-3.5">
                    <Image
                      src={activeSlide?.url || slides[0].url}
                      alt="Story Background"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center gap-1">
                        {slides.map((_, i) => (
                          <div
                            key={i}
                            className={`h-0.5 flex-1 rounded-full ${
                              i <= currentSlideIndex ? "bg-white" : "bg-white/30"
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white p-[1px] overflow-hidden">
                            <Image src="/images/logo-light.png" alt="Avatar" width={28} height={28} className="object-contain" />
                          </div>
                          <span className="text-xs font-bold">bikinruang.co</span>
                          <span className="text-[10px] text-stone-400">2h</span>
                        </div>
                        <MoreHorizontal className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="relative z-10 my-auto text-center">
                      <div className="inline-block px-3 py-1.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase rounded-lg shadow-lg border border-white">
                        📍 {location || "Malang Workshop Atelier"}
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center gap-2">
                      <div className="flex-1 py-2 px-3.5 rounded-full border border-white/40 bg-black/30 backdrop-blur-md text-[11px] text-stone-300">
                        Send message to bikinruang.co...
                      </div>
                      <Heart className="w-5 h-5 text-white" />
                      <Send className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

              </div>

              <div className="w-32 h-1 bg-stone-700 rounded-full mx-auto mt-2"></div>
            </div>
          </div>

        </div>
      )}

      {/* === TAB 2: DRAFTS ARCHIVE === */}
      {activeTab === "drafts" && (
        <div className="space-y-4">
          <div className="bg-studio-card border border-studio-border p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" />
              <h3 className="font-display font-black text-xl text-workshop-black uppercase tracking-tight">
                DRAFTS POSTINGAN ({draftsCount})
              </h3>
            </div>
            <button
              onClick={() => setActiveTab("studio")}
              className="px-4 py-2 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-colors"
            >
              + BUAT DRAFT BARU
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postList.filter((p) => p.status === "draft").map((draft) => (
              <div
                key={draft.id}
                className="bg-studio-card border border-studio-border hover:border-brand-navy transition-all duration-200 shadow-sm flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-video bg-workshop-black">
                    {draft.slides[0] && (
                      <Image
                        src={draft.slides[0].url}
                        alt={draft.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-brand-navy text-brand-yellow font-mono text-[10px] font-bold uppercase">
                      {draft.format} • {draft.slides.length} SLIDES
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-display font-black text-lg text-workshop-black uppercase tracking-tight">
                      {draft.title}
                    </h4>
                    <p className="text-xs text-concrete line-clamp-3 font-sans leading-relaxed">
                      {draft.caption}
                    </p>
                    <div className="pt-2 text-[10px] font-mono text-concrete flex items-center justify-between border-t border-studio-border">
                      <span>DIBUAT: {draft.createdAt}</span>
                      <span className="text-brand-navy font-bold">📍 {draft.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-studio-muted border-t border-studio-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleLoadPostToStudio(draft)}
                    className="flex-1 py-2 bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>BUKA DI STUDIO</span>
                  </button>

                  <button
                    onClick={() => handleDeletePost(draft.id)}
                    className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                    title="Hapus Draft"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === TAB 3: SCHEDULED QUEUE === */}
      {activeTab === "scheduled" && (
        <div className="space-y-4">
          <div className="bg-studio-card border border-studio-border p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-brand-navy" />
              <h3 className="font-display font-black text-xl text-workshop-black uppercase tracking-tight">
                ANTREAN JADWAL POSTINGAN ({scheduledCount})
              </h3>
            </div>
            <button
              onClick={() => setActiveTab("studio")}
              className="px-4 py-2 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-studio-white transition-colors"
            >
              + JADWALKAN KONTEN BARU
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postList.filter((p) => p.status === "scheduled").map((sched) => (
              <div
                key={sched.id}
                className="bg-studio-card border-2 border-brand-navy hover:border-brand-yellow transition-all duration-200 shadow-sm flex flex-col justify-between overflow-hidden"
              >
                <div>
                  <div className="relative aspect-video bg-workshop-black">
                    {sched.slides[0] && (
                      <Image
                        src={sched.slides[0].url}
                        alt={sched.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2 px-2.5 py-1 bg-brand-yellow text-workshop-black font-mono text-[10px] font-black uppercase shadow-md">
                      ⏱️ {sched.scheduledFor}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-display font-black text-lg text-workshop-black uppercase tracking-tight">
                      {sched.title}
                    </h4>
                    <p className="text-xs text-concrete line-clamp-3 font-sans leading-relaxed">
                      {sched.caption}
                    </p>
                    <div className="pt-2 text-[10px] font-mono text-concrete flex items-center justify-between border-t border-studio-border">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                        STATUS: QUEUED
                      </span>
                      <span>{sched.format.toUpperCase()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-studio-muted border-t border-studio-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleLoadPostToStudio(sched)}
                    className="flex-1 py-2 bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>EDIT JADWAL</span>
                  </button>

                  <button
                    onClick={() => handleDeletePost(sched.id)}
                    className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                    title="Batalkan Jadwal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === TAB 4: RIWAYAT POSTINGAN (HISTORY / PUBLISHED) === */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <div className="bg-studio-card border border-studio-border p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <History className="w-5 h-5 text-emerald-600" />
              <div>
                <h3 className="font-display font-black text-xl text-workshop-black uppercase tracking-tight">
                  RIWAYAT POSTINGAN INSTAGRAM ({publishedCount})
                </h3>
                <p className="text-xs font-mono text-concrete">
                  Arsip konten yang telah dipublikasikan ke Instagram &amp; dicerminkan ke website.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/bikinruang.co"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-600 to-rose-500 text-white font-mono text-xs font-bold uppercase shadow-sm hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@bikinruang.co</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postList.filter((p) => p.status === "published").map((pub) => (
              <div
                key={pub.id}
                className="bg-studio-card border border-studio-border hover:border-brand-navy transition-all duration-200 shadow-sm flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Thumbnail & Format Badges */}
                  <div className="relative aspect-video bg-workshop-black">
                    {pub.slides[0] && (
                      <Image
                        src={pub.slides[0].url}
                        alt={pub.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white font-mono text-[9px] font-bold uppercase flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      <span>PUBLISHED • {pub.format}</span>
                    </div>

                    {pub.mirroredTo && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 bg-brand-navy/90 text-brand-yellow font-mono text-[9px] font-bold uppercase">
                        SYNCED TO /{pub.mirroredTo}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h4 className="font-display font-black text-lg text-workshop-black uppercase tracking-tight leading-snug">
                      {pub.title}
                    </h4>
                    
                    <p className="text-xs text-concrete line-clamp-3 font-sans leading-relaxed">
                      {pub.caption}
                    </p>

                    {/* Engagement Telemetry */}
                    {pub.metrics && (
                      <div className="grid grid-cols-3 gap-2 p-2.5 bg-studio-muted border border-studio-border text-center font-mono">
                        <div>
                          <div className="text-[10px] text-concrete font-bold">LIKES</div>
                          <div className="text-xs font-black text-rose-600">❤️ {pub.metrics.likes.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-concrete font-bold">KOMENTAR</div>
                          <div className="text-xs font-black text-workshop-black">💬 {pub.metrics.comments}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-concrete font-bold">REACH</div>
                          <div className="text-xs font-black text-brand-navy">👁️ {pub.metrics.reach}</div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 text-[10px] font-mono text-concrete flex items-center justify-between border-t border-studio-border">
                      <span>TAYANG: {pub.publishedAt}</span>
                      <span className="text-brand-navy font-bold truncate max-w-[140px]">📍 {pub.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 bg-studio-muted border-t border-studio-border flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleLoadPostToStudio(pub)}
                    className="flex-1 py-2 bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black font-mono text-xs font-bold uppercase transition-colors flex items-center justify-center gap-1.5"
                    title="Muat kembali ke studio untuk diedit atau di-repost"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>REPOST / EDIT</span>
                  </button>

                  {pub.mirroredTo === "projects" ? (
                    <Link
                      href="/projects"
                      target="_blank"
                      className="p-2 bg-studio-card hover:bg-brand-yellow hover:text-workshop-black text-workshop-black border border-studio-border transition-colors"
                      title="Lihat di Halaman Proyek"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      href="/stories"
                      target="_blank"
                      className="p-2 bg-studio-card hover:bg-brand-yellow hover:text-workshop-black text-workshop-black border border-studio-border transition-colors"
                      title="Lihat di Halaman Cerita/Stories"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  )}

                  <button
                    onClick={() => handleDeletePost(pub.id)}
                    className="p-2 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                    title="Hapus dari Riwayat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
