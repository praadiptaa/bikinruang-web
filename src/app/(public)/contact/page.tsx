"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, Clock, Instagram } from "lucide-react";
import { InquiryFormData } from "@/types/database";
import { createClient } from "@/lib/supabase/client";

const inquirySchema = z.object({
  name: z.string().min(2, "Nama wajib diisi minimal 2 karakter"),
  company: z.string().min(2, "Nama perusahaan atau organisasi wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(8, "Nomor WhatsApp / Telepon tidak valid"),
  project_type: z.string().min(1, "Silakan pilih tipe kebutuhan proyek"),
  estimated_date: z.string().optional(),
  location: z.string().optional(),
  budget_range: z.string().optional(),
  project_description: z.string().min(10, "Ceritakan ringkasan ide proyek Anda minimal 10 karakter"),
});

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      project_type: "Event Property / Decoration",
      budget_range: "Rp 25jt - Rp 50jt",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    const newInquiry = {
      id: `inq-${Date.now()}`,
      client_name: data.name,
      client_email: data.email,
      client_phone: data.phone,
      company_name: data.company,
      service_category: data.project_type,
      event_date: data.estimated_date || null,
      location: data.location || "Malang / Jawa Timur",
      budget_range: data.budget_range || null,
      project_brief: data.project_description,
      status: "new",
      created_at: new Date().toISOString(),
    };

    // 1. Dual Persistence: Save to localStorage for instant offline & cross-tab sync
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("bikinruang_inquiries");
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem("bikinruang_inquiries", JSON.stringify([newInquiry, ...list]));
        localStorage.setItem("bikinruang_last_inquiry", JSON.stringify(newInquiry));

        // Broadcast to admin tabs
        if ("BroadcastChannel" in window) {
          const bc = new BroadcastChannel("bikinruang_inquiries_channel");
          bc.postMessage(newInquiry);
          bc.close();
        }
      }
    } catch (e) {
      console.warn("Local storage sync error:", e);
    }

    // 2. Insert to Supabase live database
    try {
      const supabase = createClient();
      if (supabase) {
        const { error } = await supabase.from("inquiries").insert([newInquiry]);
        if (error) {
          console.warn("Supabase insert note:", error.message);
        }
      }
    } catch (err) {
      console.warn("Supabase network note:", err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      reset();
    }
  };

  return (
    <div className="pt-28 md:pt-36 bg-studio-white min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b-2 border-brand-navy">
        <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold tracking-widest uppercase mb-4">
          <span className="w-2.5 h-2.5 bg-brand-yellow"></span>
          <span>GET IN TOUCH • BIKINRUANG. WORKSHOP ATELIER</span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-workshop-black uppercase leading-[0.92] max-w-5xl mb-6">
          READY TO BRING YOUR VISION EVENT TO LIFE?<br />
          <span className="text-brand-navy">CONTACT US!</span>
        </h1>
        <p className="max-w-2xl font-sans text-lg text-workshop-black/80 leading-relaxed font-medium">
          Mulai kolaborasi produksi kreatif Anda. Isi formulir brief proyek di bawah ini atau hubungi saluran langsung workshop kami di Kota Malang.
        </p>
      </section>

      {/* Main Form & Contact Info Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Project Inquiry Form */}
          <div className="lg:col-span-7 bg-studio-card border-2 border-brand-navy p-6 sm:p-10 shadow-lg relative">
            <div className="flex items-center justify-between pb-6 border-b border-studio-border mb-8">
              <div>
                <h2 className="font-display font-black text-2xl uppercase tracking-tight text-workshop-black">
                  PROJECT INQUIRY FORM
                </h2>
                <span className="text-xs font-mono text-concrete uppercase tracking-wider">
                  [ RESPON CEPAT &lt; 24 JAM ]
                </span>
              </div>
              <div className="w-3 h-3 bg-brand-yellow"></div>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-emerald-50 border-2 border-emerald-500 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-emerald-950">
                  BRIEF PROYEK BERHASIL TERKIRIM!
                </h3>
                <p className="text-sm font-sans text-emerald-900 leading-relaxed max-w-md mx-auto">
                  Terima kasih atas kepercayaan Anda. Tim Bikinruang Workshop Atelier akan segera meninjau kebutuhan Anda dan menghubungi PIC dalam waktu kurang dari 24 jam.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="https://wa.me/6282225658357?text=Halo%20Adnan%2C%20saya%20sudah%20mengisi%20form%20inquiry%20di%20website%20Bikinruang."
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors shadow-sm inline-flex items-center gap-2"
                  >
                    <span>KONFIRMASI VIA WHATSAPP ADNAN</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-studio-muted text-workshop-black font-mono text-xs font-bold uppercase hover:bg-stone-200 transition-colors"
                  >
                    KIRIM INQUIRY LAIN
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      NAMA LENGKAP / PIC *
                    </label>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="e.g. Budi Santoso"
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black focus:border-brand-navy focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="text-xs font-mono text-red-600 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      PERUSAHAAN / ORGANISASI *
                    </label>
                    <input
                      type="text"
                      {...register("company")}
                      placeholder="e.g. PT. Antam / Cimory / Event Organizer"
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black focus:border-brand-navy focus:outline-none transition-colors"
                    />
                    {errors.company && (
                      <p className="text-xs font-mono text-red-600 mt-1">{errors.company.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="email@company.com"
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-mono text-workshop-black focus:border-brand-navy focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs font-mono text-red-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone / WA */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      WHATSAPP / PHONE *
                    </label>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="0812-xxxx-xxxx"
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-mono text-workshop-black focus:border-brand-navy focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs font-mono text-red-600 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      LAYANAN / PROJECT TYPE *
                    </label>
                    <select
                      {...register("project_type")}
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black focus:border-brand-navy focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Event Property / Decoration">Event Property / Decoration</option>
                      <option value="Party Sets">Party Sets</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Stage Decoration">Stage Decoration</option>
                      <option value="Custom Backdrop">Custom Backdrop</option>
                      <option value="Rental Decoration Items">Rental Decoration Items</option>
                      <option value="Event Desk / Booth">Event Desk / Booth</option>
                      <option value="Full Production Setup">Full Production Setup</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      ESTIMASI BUDGET RANGE
                    </label>
                    <select
                      {...register("budget_range")}
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black focus:border-brand-navy focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="< Rp 10 Juta">&lt; Rp 10 Juta</option>
                      <option value="Rp 10 Juta - Rp 25 Juta">Rp 10 Juta - Rp 25 Juta</option>
                      <option value="Rp 25 Juta - Rp 50 Juta">Rp 25 Juta - Rp 50 Juta</option>
                      <option value="Rp 50 Juta - Rp 100 Juta">Rp 50 Juta - Rp 100 Juta</option>
                      <option value="> Rp 100 Juta">&gt; Rp 100 Juta</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Event Date */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      ESTIMASI TANGGAL EVENT
                    </label>
                    <input
                      type="date"
                      {...register("estimated_date")}
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-mono text-workshop-black focus:border-brand-navy focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                      LOKASI / KOTA VENUE
                    </label>
                    <input
                      type="text"
                      {...register("location")}
                      placeholder="e.g. Jakarta / Surabaya / Malang"
                      className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black focus:border-brand-navy focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-workshop-black mb-2">
                    DESKRIPSI PROYEK / BRIEF EVENT *
                  </label>
                  <textarea
                    rows={4}
                    {...register("project_description")}
                    placeholder="Jelaskan kebutuhan dekorasi event, konsep, ukuran area, mood board, atau referensi visual Anda..."
                    className="w-full px-4 py-3 bg-studio-white border border-studio-border text-sm font-sans text-workshop-black focus:border-brand-navy focus:outline-none transition-colors leading-relaxed"
                  ></textarea>
                  {errors.project_description && (
                    <p className="text-xs font-mono text-red-600 mt-1">{errors.project_description.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-navy text-studio-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-brand-yellow hover:text-workshop-black transition-all duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <span>{isSubmitting ? "MENGIRIM BRIEF..." : "SUBMIT PROJECT BRIEF"}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Workshop Direct Channels & Location */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Direct Contact Card */}
            <div className="bg-brand-navy text-studio-white p-8 border border-brand-navy shadow-lg">
              <div className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-yellow"></span>
                <span>[ DIRECT CHANNELS ]</span>
              </div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight mb-6">
                HUBUNGI KAMI LANGSUNG
              </h3>

              <div className="space-y-6">
                <a
                  href="https://wa.me/6282225658357"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black transition-colors group"
                >
                  <Phone className="w-5 h-5 text-brand-yellow group-hover:text-workshop-black shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase opacity-70">WHATSAPP / CONSULTATION</div>
                    <div className="text-base font-mono font-bold">0822 2565 8357 (Adnan)</div>
                  </div>
                </a>

                <a
                  href="mailto:bikinruangworkshop@gmail.com"
                  className="flex items-start gap-4 p-4 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black transition-colors group"
                >
                  <Mail className="w-5 h-5 text-brand-yellow group-hover:text-workshop-black shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase opacity-70">OFFICIAL EMAIL</div>
                    <div className="text-base font-mono font-bold">bikinruangworkshop@gmail.com</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/bikinruang.co"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-4 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-brand-yellow group-hover:text-workshop-black shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-mono uppercase opacity-70">INSTAGRAM</div>
                    <div className="text-base font-mono font-bold">@bikinruang.co</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Atelier Location & Operations */}
            <div className="bg-studio-card border border-studio-border p-8 shadow-sm space-y-6">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase mb-1">
                  <MapPin className="w-4 h-4 text-brand-yellow" />
                  <span>WORKSHOP ATELIER LOCATION</span>
                </div>
                <h4 className="font-display font-black text-xl text-workshop-black uppercase tracking-tight">
                  KOTA MALANG, JAWA TIMUR
                </h4>
                <p className="text-sm font-sans text-concrete mt-2 leading-relaxed">
                  Fabrikasi terpusat di Kota Malang, melayani produksi dan instalasi panggung serta properti event di seluruh Indonesia (Jawa Timur, Bali, Surabaya, Jakarta, dll).
                </p>
              </div>

              <div className="pt-4 border-t border-studio-border space-y-2 text-xs font-mono text-workshop-black">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-navy" />
                  <span>Workshop Hours: Senin – Sabtu (08:00 – 17:00 WIB)</span>
                </div>
                <div className="flex items-center gap-2 text-concrete">
                  <span>* Tim On-Site &amp; Loading: 24/7 Standby Event Support</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
