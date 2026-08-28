"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import BrandLogo from "@/components/ui/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@bikinruang.co");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-workshop-black flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-sm w-full bg-workshop-card border border-workshop-border p-8 sm:p-10 shadow-xl">
        {/* Brand Logo */}
        <div className="flex justify-center mb-8">
          <BrandLogo variant="light" size="lg" />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="font-display font-black text-xl text-studio-white uppercase tracking-tight">
            ADMIN LOGIN
          </h1>
          <p className="text-xs font-mono text-concrete mt-1">
            Masuk untuk mengelola konten
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500 text-red-400 text-xs font-mono mb-4 text-center">
            {error}
          </div>
        )}

        {/* Simple Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-concrete uppercase mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bikinruang.co"
              required
              className="w-full px-4 py-3 bg-workshop-muted border border-workshop-border text-studio-white focus:border-brand-yellow focus:outline-none text-sm font-sans transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-concrete uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-4 py-3 bg-workshop-muted border border-workshop-border text-studio-white focus:border-brand-yellow focus:outline-none text-sm font-sans transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <span>{loading ? "MEMUAT..." : "MASUK KE DASHBOARD"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 pt-6 border-t border-workshop-border text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-concrete hover:text-brand-yellow transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
