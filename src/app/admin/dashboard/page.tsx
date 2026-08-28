import React from "react";
import Link from "next/link";
import {
  FolderGit2,
  Hammer,
  Users,
  Newspaper,
  Plus,
  ArrowUpRight,
  Share2,
} from "lucide-react";
import { getProjects, getServices, getClients, getNewsList } from "@/lib/data/api";
import StatusBadge from "@/components/admin/StatusBadge";
import DashboardAnalyticsCharts from "@/components/admin/DashboardAnalyticsCharts";

export default async function AdminDashboardPage() {
  const [projects, services, clients, newsList] = await Promise.all([
    getProjects(),
    getServices(),
    getClients(),
    getNewsList(),
  ]);

  const stats = [
    { label: "Total Projects", value: projects.length, icon: FolderGit2, href: "/admin/projects" },
    { label: "Active Services", value: services.length, icon: Hammer, href: "/admin/services" },
    { label: "Client Roster", value: clients.length, icon: Users, href: "/admin/clients" },
    { label: "Published Stories", value: newsList.length, icon: Newspaper, href: "/admin/news" },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-brand-navy">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-brand-navy font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 bg-brand-yellow"></span>
            <span>OVERVIEW &amp; TELEMETRY</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-workshop-black uppercase tracking-tight">
            WORKSHOP DASHBOARD
          </h2>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/social"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-yellow text-workshop-black font-mono text-xs font-bold hover:bg-brand-navy hover:text-studio-white transition-all duration-150 shadow-sm border border-brand-yellow"
          >
            <Share2 className="w-4 h-4" />
            <span>SOCIAL STUDIO</span>
          </Link>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-navy text-studio-white font-mono text-xs font-bold hover:bg-brand-steel transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>NEW PROJECT</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="p-6 bg-studio-card border border-studio-border hover:border-brand-navy transition-all duration-200 group flex flex-col justify-between shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-concrete uppercase tracking-wide">{item.label}</span>
                <div className="p-2.5 bg-brand-navy/5 text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-yellow transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-2 border-t border-studio-border">
                <span className="font-display font-black text-4xl text-workshop-black">
                  {item.value}
                </span>
                <span className="text-xs font-mono font-bold text-brand-navy group-hover:text-brand-yellow flex items-center gap-1">
                  MANAGE <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Analytics Visual Charts Section */}
      <DashboardAnalyticsCharts />

      {/* Recent Projects & Content Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Projects Table */}
        <div className="lg:col-span-8 bg-studio-card border border-studio-border p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b-2 border-brand-navy mb-4">
            <h3 className="font-display font-black text-xl uppercase tracking-tight text-workshop-black">
              RECENT PROJECTS
            </h3>
            <Link
              href="/admin/projects"
              className="font-mono text-xs font-bold text-brand-navy hover:text-brand-yellow-hover hover:underline uppercase flex items-center gap-1"
            >
              <span>VIEW ALL ({projects.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-brand-navy text-studio-white font-mono uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3.5">PROJECT TITLE</th>
                  <th className="p-3.5">CLIENT</th>
                  <th className="p-3.5">YEAR</th>
                  <th className="p-3.5">STATUS</th>
                  <th className="p-3.5 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-border font-medium">
                {projects.slice(0, 5).map((project) => (
                  <tr key={project.id} className="hover:bg-studio-muted/70 transition-colors">
                    <td className="p-3.5 font-bold text-workshop-black">
                      {project.title}
                    </td>
                    <td className="p-3.5 font-mono text-concrete font-semibold">
                      {project.clients?.name || "-"}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-workshop-black">{project.project_year}</td>
                    <td className="p-3.5">
                      <StatusBadge status={project.is_published} />
                    </td>
                    <td className="p-3.5 text-right font-mono">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="px-2.5 py-1 bg-brand-navy text-studio-white hover:bg-brand-yellow hover:text-workshop-black font-bold uppercase transition-colors"
                      >
                        EDIT
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-brand-navy text-studio-white p-6 border border-brand-navy shadow-sm">
            <div className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-yellow"></span>
              <span>[ DIRECT SHORTCUTS ]</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <Link
                href="/admin/inquiries"
                className="flex items-center justify-between p-3 bg-brand-yellow text-workshop-black font-bold transition-colors shadow-sm"
              >
                <span>📬 INBOX PESAN &amp; ORDER KLIEN</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/social"
                className="flex items-center justify-between p-3 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black font-bold transition-colors"
              >
                <span>★ SOCIAL MEDIA STUDIO</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/projects/new"
                className="flex items-center justify-between p-3 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black font-bold transition-colors"
              >
                <span>+ ADD NEW PROJECT BUILD</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/services"
                className="flex items-center justify-between p-3 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black font-bold transition-colors"
              >
                <span>+ EDIT SERVICES &amp; SCOPE</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black font-bold transition-colors"
              >
                <span>+ MANAGE CATEGORIES</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center justify-between p-3 bg-brand-navy-hover hover:bg-brand-yellow hover:text-workshop-black font-bold transition-colors"
              >
                <span>+ MEDIA ASSETS MANAGER</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
