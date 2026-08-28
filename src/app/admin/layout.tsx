"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen w-full bg-workshop-black">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-studio-white flex text-workshop-black">
      <AdminSidebar />
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        <AdminHeader />
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
