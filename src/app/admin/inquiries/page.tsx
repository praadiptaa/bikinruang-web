"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  Calendar,
  MapPin,
  Trash2,
  Radio,
  Share2,
  ExternalLink,
  Check,
  X,
  FileText,
  MessageSquare,
  Send,
  Copy,
  Sparkles,
  RefreshCw,
  Clock,
  User,
} from "lucide-react";
import { Inquiry, InquiryStatus } from "@/types/database";
import { createClient } from "@/lib/supabase/client";
import { formatDate } from "@/lib/utils";
import DeleteModal from "@/components/admin/DeleteModal";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"detail" | "whatsapp" | "email">("detail");
  const [deleteTarget, setDeleteTarget] = useState<Inquiry | null>(null);
  const [newInquiryAlert, setNewInquiryAlert] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Note editor in modal
  const [adminNote, setAdminNote] = useState("");

  // WhatsApp Composer State
  const [waTemplate, setWaTemplate] = useState<"greeting" | "quotation" | "meeting" | "custom">("greeting");
  const [waMessage, setWaMessage] = useState("");

  // Email Composer State
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailTemplate, setEmailTemplate] = useState<"standard" | "quotation" | "custom">("standard");

  // Fetch live inquiries from Supabase, localStorage & Subscribe to Realtime + BroadcastChannel
  useEffect(() => {
    // 1. Initial Local Storage Load
    const localInqs: Inquiry[] = [];
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("bikinruang_inquiries");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            localInqs.push(...parsed);
          }
        }
      }
    } catch (e) {
      console.warn("Local storage read error:", e);
    }

    async function loadInquiries() {
      try {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("inquiries")
            .select("*")
            .order("created_at", { ascending: false });

          if (data && data.length > 0) {
            // Merge Supabase + LocalStorage items (deduplicated by ID)
            const map = new Map<string, Inquiry>();
            [...data, ...localInqs].forEach((item) => {
              if (!map.has(item.id)) map.set(item.id, item as Inquiry);
            });
            setInquiries(Array.from(map.values()));
            return;
          }
        }
      } catch (err) {
        console.warn("Using local inquiries fallback:", err);
      }

      // Fallback: only use actual local submissions
      const map = new Map<string, Inquiry>();
      localInqs.forEach((item) => {
        if (!map.has(item.id)) map.set(item.id, item);
      });
      setInquiries(Array.from(map.values()));
    }

    loadInquiries();

    // 2. Cross-tab BroadcastChannel listener
    let bc: BroadcastChannel | null = null;
    try {
      if (typeof window !== "undefined" && "BroadcastChannel" in window) {
        bc = new BroadcastChannel("bikinruang_inquiries_channel");
        bc.onmessage = (event) => {
          const newInq = event.data as Inquiry;
          if (newInq && newInq.id) {
            setInquiries((prev) => [newInq, ...prev.filter((i) => i.id !== newInq.id)]);
            setNewInquiryAlert(`Pesan Baru Masuk dari: ${newInq.client_name} (${newInq.company_name || "Personal"})`);
            setTimeout(() => setNewInquiryAlert(null), 6000);
          }
        };
      }
    } catch (e) {
      console.warn("BroadcastChannel error:", e);
    }

    // 3. Storage event listener (fallback for cross-window sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "bikinruang_last_inquiry" && e.newValue) {
        try {
          const newInq = JSON.parse(e.newValue) as Inquiry;
          setInquiries((prev) => [newInq, ...prev.filter((i) => i.id !== newInq.id)]);
          setNewInquiryAlert(`Pesan Baru Masuk dari: ${newInq.client_name} (${newInq.company_name || "Personal"})`);
          setTimeout(() => setNewInquiryAlert(null), 6000);
        } catch (err) {
          console.warn("Storage sync error:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorage);

    // 4. Setup Supabase Realtime WebSocket Channel
    try {
      const supabase = createClient();
      if (supabase) {
        const channel = supabase
          .channel("inquiries-live-channel")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "inquiries" },
            (payload) => {
              const newInq = payload.new as Inquiry;
              setInquiries((prev) => [newInq, ...prev.filter((item) => item.id !== newInq.id)]);
              setNewInquiryAlert(`Pesan Baru Masuk dari: ${newInq.client_name} (${newInq.company_name || "Personal"})`);
              setTimeout(() => setNewInquiryAlert(null), 6000);
            }
          )
          .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: "inquiries" },
            (payload) => {
              const updatedInq = payload.new as Inquiry;
              setInquiries((prev) =>
                prev.map((item) => (item.id === updatedInq.id ? updatedInq : item))
              );
            }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
          if (bc) bc.close();
          window.removeEventListener("storage", handleStorage);
        };
      }
    } catch (err) {
      console.warn("Realtime error:", err);
    }

    return () => {
      if (bc) bc.close();
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Update templates when selecting an inquiry
  useEffect(() => {
    if (selectedInquiry) {
      setAdminNote(selectedInquiry.admin_notes || "");
      setActiveModalTab("detail");

      // Populate default WhatsApp Greeting
      setWaMessage(
        `Halo ${selectedInquiry.client_name}, terima kasih telah menghubungi Bikinruang Workshop Atelier terkait kebutuhan ${selectedInquiry.service_category || "Event Production"}.\n\nKami telah menerima ringkasan brief acara Anda untuk tanggal ${selectedInquiry.event_date || "mendatang"}. Apakah ada waktu luang hari ini untuk kami koordinasikan konsep visual dan penawaran harga terbaik?`
      );

      // Populate default Email
      setEmailSubject(`Tanggapan & Penawaran Proyek Bikinruang Atelier - ${selectedInquiry.service_category || "Event Fabrication"}`);
      setEmailBody(
        `Yth. ${selectedInquiry.client_name},\n${selectedInquiry.company_name ? `(${selectedInquiry.company_name})\n` : ""}\nTerima kasih atas ketertarikan Anda berkolaborasi dengan Bikinruang Workshop Atelier Malang.\n\nKami telah meninjau brief kebutuhan proyek:\n- Layanan: ${selectedInquiry.service_category || "-"}\n- Lokasi: ${selectedInquiry.location || "-"}\n- Estimasi Tanggal: ${selectedInquiry.event_date || "-"}\n\nTim workshop kami siap menyusun rekomendasi moodboard, spesifikasi material, serta penawaran biaya produksi yang presisi dan relevan dengan tren visual terkini.\n\nSalam hangat,\nBikinruang Workshop Atelier\nWhatsApp: 0822 2565 8357 (Adnan)\nKota Malang, Jawa Timur`
      );
    }
  }, [selectedInquiry]);

  const handleUpdateStatus = async (id: string, newStatus: InquiryStatus) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase
          .from("inquiries")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("id", id);
      }
    } catch (err) {
      console.warn("Failed to update status in Supabase:", err);
    }

    setToastMsg(`Status diubah menjadi: ${newStatus.toUpperCase()}`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;

    setInquiries((prev) =>
      prev.map((item) =>
        item.id === selectedInquiry.id ? { ...item, admin_notes: adminNote } : item
      )
    );
    setSelectedInquiry({ ...selectedInquiry, admin_notes: adminNote });

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase
          .from("inquiries")
          .update({ admin_notes: adminNote, updated_at: new Date().toISOString() })
          .eq("id", selectedInquiry.id);
      }
    } catch (err) {
      console.warn("Failed to save note in Supabase:", err);
    }

    setToastMsg("Catatan follow-up berhasil disimpan!");
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setInquiries((prev) => prev.filter((item) => item.id !== deleteTarget.id));
    if (selectedInquiry?.id === deleteTarget.id) {
      setSelectedInquiry(null);
    }

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from("inquiries").delete().eq("id", deleteTarget.id);
      }
    } catch (err) {
      console.warn("Failed to delete inquiry in Supabase:", err);
    }

    setDeleteTarget(null);
  };

  // Switch WhatsApp Templates
  const handleSelectWaTemplate = (type: "greeting" | "quotation" | "meeting") => {
    if (!selectedInquiry) return;
    setWaTemplate(type);

    if (type === "greeting") {
      setWaMessage(
        `Halo ${selectedInquiry.client_name}, terima kasih telah menghubungi Bikinruang Workshop Atelier terkait kebutuhan ${selectedInquiry.service_category || "Event Production"}.\n\nKami telah menerima ringkasan brief acara Anda. Apakah ada waktu luang untuk kami koordinasikan konsep visual dan penawaran harga terbaik?`
      );
    } else if (type === "quotation") {
      setWaMessage(
        `Halo ${selectedInquiry.client_name}, dokumen penawaran harga resmi (Quotation) untuk kebutuhan ${selectedInquiry.service_category || "Event Production"} dari Bikinruang Atelier telah kami siapkan dengan estimasi anggaran ${selectedInquiry.budget_range || "sesuai brief"}.\n\nBoleh kami kirimkan file PDF-nya ke WhatsApp ini?`
      );
    } else if (type === "meeting") {
      setWaMessage(
        `Halo ${selectedInquiry.client_name}, untuk mematangkan konsep visual dan survei lokasi venue di ${selectedInquiry.location || "venue"}, apakah bisa kita jadwalkan meeting teknis via Zoom / Offline di Workshop Bikinruang Malang minggu ini?`
      );
    }
  };

  // Launch WhatsApp Web directly with text
  const handleLaunchWhatsApp = () => {
    if (!selectedInquiry?.client_phone) return;
    const cleanPhone = selectedInquiry.client_phone.replace(/[^0-9]/g, "").replace(/^0/, "62");
    const waUrl = `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");

    // Auto mark as contacted
    handleUpdateStatus(selectedInquiry.id, "contacted");
  };

  // Launch Email client directly with formatted text
  const handleLaunchEmail = () => {
    if (!selectedInquiry?.client_email) return;
    const mailtoUrl = `mailto:${selectedInquiry.client_email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoUrl;

    // Auto mark as contacted
    handleUpdateStatus(selectedInquiry.id, "contacted");
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company_name && inq.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.project_brief.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const newCount = inquiries.filter((i) => i.status === "new").length;

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "new":
        return (
          <span className="px-2.5 py-1 bg-amber-100 border border-amber-300 text-amber-950 font-mono text-[10px] font-black uppercase flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
            <span>BARU</span>
          </span>
        );
      case "reviewed":
        return (
          <span className="px-2.5 py-1 bg-blue-100 border border-blue-300 text-blue-950 font-mono text-[10px] font-bold uppercase">
            REVIEWED
          </span>
        );
      case "contacted":
        return (
          <span className="px-2.5 py-1 bg-purple-100 border border-purple-300 text-purple-950 font-mono text-[10px] font-bold uppercase">
            SUDAH DIHUBUNGI
          </span>
        );
      case "approved":
        return (
          <span className="px-2.5 py-1 bg-emerald-100 border border-emerald-300 text-emerald-950 font-mono text-[10px] font-black uppercase flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-700" />
            <span>APPROVED / DEAL</span>
          </span>
        );
      case "declined":
        return (
          <span className="px-2.5 py-1 bg-stone-200 border border-stone-300 text-stone-700 font-mono text-[10px] font-bold uppercase">
            DECLINED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-brand-navy">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>CLIENT INQUIRY &amp; MESSAGES INBOX</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
              INBOX PESAN MASUK
            </h2>
            {newCount > 0 && (
              <span className="px-3 py-1 bg-brand-yellow text-workshop-black font-mono text-xs font-black uppercase shadow-sm border border-brand-yellow">
                {newCount} PESAN BARU
              </span>
            )}
          </div>
        </div>

        {/* Realtime Live Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 border border-emerald-300 text-emerald-900 font-mono text-xs font-bold uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>WEBSOCKET REALTIME AKTIF</span>
        </div>
      </div>

      {/* Realtime Alert Banner */}
      {newInquiryAlert && (
        <div className="p-4 bg-amber-100 border-2 border-amber-500 text-amber-950 font-mono text-xs flex items-center justify-between shadow-lg animate-bounce">
          <div className="flex items-center gap-2 font-bold">
            <Radio className="w-4 h-4 text-amber-700 animate-pulse" />
            <span>⚡ {newInquiryAlert}</span>
          </div>
          <span className="text-[10px] bg-amber-200 px-2.5 py-1 font-black uppercase">BARU SAJA</span>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="p-3.5 bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-mono text-xs flex items-center justify-between shadow-md animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-studio-card border border-studio-border p-4 shadow-sm">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama klien, perusahaan, email, atau pesan..."
            className="w-full pl-10 pr-4 py-2.5 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none"
          />
          <Search className="w-4 h-4 text-concrete absolute left-3.5 top-3" />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {[
            { key: "all", label: `Semua (${inquiries.length})` },
            { key: "new", label: `Baru (${newCount})` },
            { key: "reviewed", label: "Reviewed" },
            { key: "contacted", label: "Dihubungi" },
            { key: "approved", label: "Approved" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
                statusFilter === tab.key
                  ? "bg-brand-navy text-studio-white shadow-xs"
                  : "bg-studio-white border border-studio-border text-workshop-black hover:border-brand-navy"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Inbox Table */}
      <div className="bg-studio-card border border-studio-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-brand-navy text-studio-white font-mono uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3.5">NAMA KLIEN &amp; PERUSAHAAN</th>
                <th className="p-3.5">LAYANAN PROYEK</th>
                <th className="p-3.5">KONTAK (WA / EMAIL)</th>
                <th className="p-3.5">BUDGET &amp; VENUE</th>
                <th className="p-3.5">TANGGAL MASUK</th>
                <th className="p-3.5">STATUS</th>
                <th className="p-3.5 text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border font-medium">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-concrete font-mono text-xs">
                    Tidak ada pesan atau formulir inquiry yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className={`hover:bg-studio-muted/60 transition-colors cursor-pointer ${
                      inq.status === "new" ? "bg-amber-50/40 font-semibold" : ""
                    }`}
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    <td className="p-3.5">
                      <div className="font-bold text-workshop-black text-sm uppercase">
                        {inq.client_name}
                      </div>
                      <div className="text-[11px] font-mono text-concrete flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3" />
                        <span>{inq.company_name || "Personal Client"}</span>
                      </div>
                    </td>

                    <td className="p-3.5 font-mono">
                      <span className="px-2 py-0.5 bg-brand-navy/10 border border-brand-navy/20 text-brand-navy text-[10px] font-bold uppercase">
                        {inq.service_category || "General Event"}
                      </span>
                    </td>

                    <td className="p-3.5 font-mono text-xs space-y-0.5">
                      <div className="text-workshop-black font-bold">
                        {inq.client_phone || "-"}
                      </div>
                      <div className="text-concrete text-[10px] truncate max-w-[150px]">
                        {inq.client_email}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-xs space-y-0.5">
                      <div className="text-brand-navy font-bold">
                        {inq.budget_range || "-"}
                      </div>
                      <div className="text-concrete text-[10px]">
                        📍 {inq.location || "Malang / Jatim"}
                      </div>
                    </td>

                    <td className="p-3.5 font-mono text-concrete text-xs">
                      {formatDate(inq.created_at)}
                    </td>

                    <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                      {getStatusBadge(inq.status)}
                    </td>

                    <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5 font-mono">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-2.5 py-1 bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black font-bold text-xs uppercase transition-colors"
                        >
                          DETAIL
                        </button>
                        <button
                          onClick={() => setDeleteTarget(inq)}
                          className="p-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border border-red-200 transition-colors"
                          title="Hapus Pesan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL INQUIRY & COMMUNICATOR MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-studio-card border-2 border-brand-navy max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b-2 border-brand-navy">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-brand-yellow text-workshop-black font-mono text-[10px] font-black uppercase">
                    INQUIRY MANAGER
                  </span>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
                <h3 className="font-display font-black text-2xl text-workshop-black uppercase tracking-tight">
                  {selectedInquiry.client_name}
                </h3>
                <p className="text-xs font-mono text-concrete">
                  Perusahaan / Klien: <span className="font-bold text-workshop-black">{selectedInquiry.company_name || "Personal Client"}</span> • Masuk: {formatDate(selectedInquiry.created_at)}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 bg-studio-muted text-workshop-black hover:bg-brand-navy hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs (Detail vs WhatsApp Composer vs Email Composer) */}
            <div className="flex items-center gap-2 border-b border-studio-border pb-2">
              <button
                type="button"
                onClick={() => setActiveModalTab("detail")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 ${
                  activeModalTab === "detail"
                    ? "bg-brand-navy text-studio-white shadow-xs"
                    : "bg-studio-muted text-workshop-black hover:bg-stone-200"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>DETAIL BRIEF PROYEK</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("whatsapp")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 ${
                  activeModalTab === "whatsapp"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-studio-muted text-workshop-black hover:bg-emerald-100"
                }`}
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>CHAT WHATSAPP WEB</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalTab("email")}
                className={`px-4 py-2 font-mono text-xs font-bold uppercase transition-colors flex items-center gap-2 ${
                  activeModalTab === "email"
                    ? "bg-brand-navy text-studio-white shadow-xs"
                    : "bg-studio-muted text-workshop-black hover:bg-brand-navy/10"
                }`}
              >
                <Mail className="w-4 h-4 text-brand-yellow" />
                <span>KIRIM EMAIL</span>
              </button>
            </div>

            {/* === TAB 1: DETAIL BRIEF === */}
            {activeModalTab === "detail" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Project Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-studio-muted border border-studio-border text-xs font-mono">
                  <div>
                    <div className="text-[10px] text-concrete font-bold uppercase">LAYANAN</div>
                    <div className="font-bold text-workshop-black mt-0.5">{selectedInquiry.service_category || "Custom"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-concrete font-bold uppercase">BUDGET RANGE</div>
                    <div className="font-bold text-brand-navy mt-0.5">{selectedInquiry.budget_range || "-"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-concrete font-bold uppercase">TANGGAL EVENT</div>
                    <div className="font-bold text-workshop-black mt-0.5">{selectedInquiry.event_date ? formatDate(selectedInquiry.event_date) : "TBD"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-concrete font-bold uppercase">LOKASI VENUE</div>
                    <div className="font-bold text-workshop-black mt-0.5">{selectedInquiry.location || "Malang/Jatim"}</div>
                  </div>
                </div>

                {/* Project Brief Content */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-brand-navy mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>DESKRIPSI PROYEK &amp; KEBUTUHAN EVENT</span>
                  </label>
                  <div className="p-4 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.project_brief}
                  </div>
                </div>

                {/* Status Changer & Notes */}
                <div className="space-y-3 pt-3 border-t border-studio-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="text-xs font-mono font-bold uppercase text-workshop-black">
                      UBAH STATUS PESAN:
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(["new", "reviewed", "contacted", "approved", "declined"] as InquiryStatus[]).map(
                        (st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                            className={`px-3 py-1 font-mono text-xs font-bold uppercase transition-all ${
                              selectedInquiry.status === st
                                ? "bg-brand-navy text-studio-white shadow-xs"
                                : "bg-studio-muted text-workshop-black hover:bg-stone-200"
                            }`}
                          >
                            {st}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-concrete mb-1">
                      CATATAN INTERNAL ADMIN (FOLLOW UP NOTES)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        placeholder="Tulis catatan follow up (e.g. Sudah kirim quotation via WA)..."
                        className="flex-1 px-3.5 py-2 bg-studio-white border border-studio-border text-xs font-sans text-workshop-black focus:border-brand-navy focus:outline-none"
                      />
                      <button
                        onClick={handleSaveNotes}
                        className="px-4 py-2 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase hover:bg-brand-navy hover:text-white transition-colors"
                      >
                        SIMPAN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === TAB 2: WHATSAPP WEB COMPOSER === */}
            {activeModalTab === "whatsapp" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 text-emerald-950 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span>Nomor WhatsApp Tujuan: <strong className="text-emerald-900">{selectedInquiry.client_phone || "Tidak ada nomor"}</strong></span>
                  </div>
                  <span className="text-[10px] bg-emerald-200 px-2 py-0.5 font-bold uppercase">READY TO SEND</span>
                </div>

                {/* Template Presets */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-concrete mb-1.5">
                    PILIH TEMPLATE PESAN WA:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectWaTemplate("greeting")}
                      className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                        waTemplate === "greeting" ? "bg-emerald-700 text-white" : "bg-studio-muted text-workshop-black hover:bg-stone-200"
                      }`}
                    >
                      👋 1. Salam &amp; Konfirmasi Brief
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectWaTemplate("quotation")}
                      className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                        waTemplate === "quotation" ? "bg-emerald-700 text-white" : "bg-studio-muted text-workshop-black hover:bg-stone-200"
                      }`}
                    >
                      📄 2. Penawaran Harga (Quotation)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectWaTemplate("meeting")}
                      className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                        waTemplate === "meeting" ? "bg-emerald-700 text-white" : "bg-studio-muted text-workshop-black hover:bg-stone-200"
                      }`}
                    >
                      📅 3. Undangan Meeting &amp; Survei
                    </button>
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-workshop-black mb-1">
                    ISI PESAN WHATSAPP (BISA DIEDIT SEBELUM DIKIRIM)
                  </label>
                  <textarea
                    rows={6}
                    value={waMessage}
                    onChange={(e) => setWaMessage(e.target.value)}
                    className="w-full p-4 bg-emerald-50/40 border-2 border-emerald-300 text-sm font-sans text-workshop-black focus:border-emerald-600 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-studio-border">
                  <span className="text-[11px] font-mono text-concrete">
                    Klik tombol untuk membuka chat langsung di WhatsApp Web.
                  </span>

                  <button
                    type="button"
                    onClick={handleLaunchWhatsApp}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white font-mono text-xs font-bold uppercase hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                    <span>BUKA &amp; KIRIM DI WHATSAPP WEB →</span>
                  </button>
                </div>
              </div>
            )}

            {/* === TAB 3: EMAIL REPLY COMPOSER === */}
            {activeModalTab === "email" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between bg-brand-navy/10 border border-brand-navy/20 p-3 text-brand-navy font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-navy" />
                    <span>Email Penerima: <strong>{selectedInquiry.client_email}</strong></span>
                  </div>
                  <span className="text-[10px] bg-brand-navy text-brand-yellow px-2 py-0.5 font-bold uppercase">
                    BIKINRUANG ATELIER
                  </span>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-workshop-black mb-1">
                    SUBJECT EMAIL
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-xs font-sans font-bold text-workshop-black focus:border-brand-navy"
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-workshop-black mb-1">
                    BODY EMAIL TANGGAPAN
                  </label>
                  <textarea
                    rows={8}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-4 bg-studio-white border border-studio-border text-xs font-mono text-workshop-black focus:border-brand-navy focus:outline-none leading-relaxed whitespace-pre-wrap"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-studio-border">
                  <span className="text-[11px] font-mono text-concrete">
                    Akan membuka aplikasi / web email default dengan isi terformat.
                  </span>

                  <button
                    type="button"
                    onClick={handleLaunchEmail}
                    className="w-full sm:w-auto px-6 py-3 bg-brand-navy text-studio-white font-mono text-xs font-bold uppercase hover:bg-brand-steel transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Mail className="w-4 h-4 text-brand-yellow" />
                    <span>KIRIM VIA EMAIL CLIENT →</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        title="HAPUS PESAN INQUIRY"
        itemName={deleteTarget ? `${deleteTarget.client_name} (${deleteTarget.company_name || "Inquiry"})` : ""}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
