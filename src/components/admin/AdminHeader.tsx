"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User, LogOut, Check, X, Shield, Sparkles } from "lucide-react";

function getInitials(name: string, email: string): string {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email) {
    const username = email.split("@")[0] || "";
    return username.slice(0, 2).toUpperCase();
  }
  return "AD";
}

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Profile States
  const [fullName, setFullName] = useState("Adnan (PIC Atelier)");
  const [email, setEmail] = useState("admin@bikinruang.co");
  const [role, setRole] = useState("PIC Administrator");

  // Modal state
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [tempFullName, setTempFullName] = useState(fullName);
  const [isSavedToast, setIsSavedToast] = useState(false);

  useEffect(() => {
    // 1. Read from localStorage for instant customization
    try {
      if (typeof window !== "undefined") {
        const savedName = localStorage.getItem("bikinruang_admin_name");
        const savedEmail = localStorage.getItem("bikinruang_admin_email");

        if (savedName) setFullName(savedName);
        if (savedEmail) setEmail(savedEmail);
      }
    } catch (e) {
      console.warn("Storage read note:", e);
    }

    // 2. Read from Supabase user session
    async function loadUser() {
      try {
        const supabase = createClient();
        if (supabase) {
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (user) {
            if (user.email) setEmail(user.email);
            if (user.user_metadata?.full_name) {
              setFullName(user.user_metadata.full_name);
            }
          }
        }
      } catch (e) {
        console.warn("Could not fetch user session:", e);
      }
    }

    loadUser();
  }, []);

  if (pathname === "/admin/login") return null;

  // Extract page title from pathname
  const section = pathname.split("/")[2] || "Dashboard";
  const title =
    section === "inquiries"
      ? "Client Inquiries"
      : section === "social"
      ? "Social Media"
      : section.charAt(0).toUpperCase() + section.slice(1);

  const initials = getInitials(fullName, email);

  const handleOpenModal = () => {
    setTempFullName(fullName);
    setIsProfileModalOpen(true);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setFullName(tempFullName);

    // Save to localStorage
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("bikinruang_admin_name", tempFullName);
      }
    } catch (e) {
      console.warn("Storage save error:", e);
    }

    // Save to Supabase auth user_metadata
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.updateUser({
          data: {
            full_name: tempFullName,
          },
        });
      }
    } catch (err) {
      console.warn("Supabase user update note:", err);
    }

    setIsSavedToast(true);
    setTimeout(() => {
      setIsSavedToast(false);
      setIsProfileModalOpen(false);
    }, 1200);
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn("Sign out note:", e);
    }
    router.push("/admin/login");
  };

  return (
    <>
      <header className="h-16 bg-studio-card border-b-2 border-brand-navy px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        {/* Page Title */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-brand-yellow"></div>
          <h1 className="font-display font-black text-xl text-workshop-black uppercase tracking-tight">
            {title}
          </h1>
          <span className="text-xs font-mono text-concrete font-bold hidden sm:inline-block">
            / BIKINRUANG
          </span>
        </div>

        {/* User Profile Pill with PIC Name & Email (Clickable to Edit) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenModal}
            className="flex items-center gap-2.5 p-1.5 pr-3 hover:bg-studio-muted border border-transparent hover:border-studio-border transition-all text-left group"
            title="Klik untuk ubah Nama PIC Admin"
          >
            <div className="w-9 h-9 rounded-full bg-brand-navy text-brand-yellow flex items-center justify-center font-mono font-black text-xs border border-brand-yellow tracking-tighter shadow-xs group-hover:scale-105 transition-transform">
              {initials}
            </div>

            <div className="hidden sm:block">
              <div className="text-xs font-bold text-workshop-black leading-tight group-hover:text-brand-navy">
                {fullName}
              </div>
              <div className="text-[10px] font-mono text-concrete leading-tight">
                {email}
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* EDIT PIC NAME MODAL */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-studio-card border-2 border-brand-navy max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b-2 border-brand-navy">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 bg-brand-yellow"></span>
                  <span className="text-xs font-mono font-bold uppercase text-brand-navy">
                    PENGATURAN IDENTITAS ADMIN
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl text-workshop-black uppercase tracking-tight">
                  NAMA PIC ADMIN
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="p-1.5 bg-studio-muted text-workshop-black hover:bg-brand-navy hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Saved Toast */}
            {isSavedToast && (
              <div className="p-3 bg-emerald-100 border border-emerald-500 text-emerald-950 font-mono text-xs flex items-center gap-2 font-bold animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-700" />
                <span>Nama PIC Berhasil Disimpan!</span>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4 font-sans text-xs">
              
              {/* Full Name / PIC */}
              <div>
                <label className="block font-mono font-bold uppercase text-workshop-black mb-1.5">
                  NAMA PIC / ADMINISTRATOR *
                </label>
                <input
                  type="text"
                  required
                  value={tempFullName}
                  onChange={(e) => setTempFullName(e.target.value)}
                  placeholder="e.g. Adnan / Budi Santoso"
                  className="w-full px-3.5 py-2.5 bg-studio-white border border-studio-border text-sm font-sans font-bold text-workshop-black focus:border-brand-navy focus:outline-none"
                />
                <p className="text-[10px] font-mono text-concrete mt-1">
                  Nama PIC ini akan ditampilkan di header dan signature komunikasi atelier.
                </p>
              </div>

              {/* Email Address (Read-only reference) */}
              <div>
                <label className="block font-mono font-bold uppercase text-concrete mb-1.5">
                  EMAIL AKUN LOGIN
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3.5 py-2.5 bg-studio-muted border border-studio-border text-xs font-mono text-concrete cursor-not-allowed"
                />
              </div>

              {/* Role Badge */}
              <div className="p-3 bg-brand-navy/5 border border-brand-navy/15 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-brand-navy font-bold">
                  <Shield className="w-4 h-4 text-brand-navy" />
                  <span>AKSES OTORITAS:</span>
                </div>
                <span className="px-2 py-0.5 bg-brand-navy text-studio-white text-[10px] font-bold uppercase">
                  {role}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-studio-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full sm:w-auto px-4 py-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-mono text-xs font-bold uppercase border border-red-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>LOGOUT</span>
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black font-mono text-xs font-bold uppercase transition-colors shadow-sm"
                >
                  SIMPAN PERUBAHAN
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}
