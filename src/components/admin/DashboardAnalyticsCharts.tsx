"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  ShoppingBag,
  Instagram,
  ArrowUpRight,
  Calendar,
  Layers,
  Sparkles,
  MousePointerClick,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type TimeRange = "7d" | "30d" | "1y";

export default function DashboardAnalyticsCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);
  const [liveOrderEvent, setLiveOrderEvent] = useState<string | null>(null);

  // Subscribe to Supabase Realtime WebSocket
  useEffect(() => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const channel = supabase
        .channel("admin-dashboard-realtime")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "inquiries" },
          (payload) => {
            console.log("Realtime New Inquiry Received:", payload);
            setLiveOrderEvent(`Order Baru Masuk: ${payload.new.client_name || "Customer"}`);
            setTimeout(() => setLiveOrderEvent(null), 5000);
          }
        )
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "projects" },
          (payload) => {
            console.log("Realtime Project Updated:", payload);
          }
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            setIsRealtimeActive(true);
          }
        });

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn("Realtime listener error:", err);
    }
  }, []);

  // 1. Website Visitors Data
  const visitorData = {
    "7d": [
      { label: "Sen", visitors: 420, pageviews: 1250 },
      { label: "Sel", visitors: 580, pageviews: 1680 },
      { label: "Rab", visitors: 650, pageviews: 1920 },
      { label: "Kam", visitors: 720, pageviews: 2150 },
      { label: "Jum", visitors: 890, pageviews: 2640 },
      { label: "Sab", visitors: 1100, pageviews: 3200 },
      { label: "Min", visitors: 960, pageviews: 2840 },
    ],
    "30d": [
      { label: "Mgg 1", visitors: 3400, pageviews: 9800 },
      { label: "Mgg 2", visitors: 4600, pageviews: 13200 },
      { label: "Mgg 3", visitors: 5800, pageviews: 16900 },
      { label: "Mgg 4", visitors: 7150, pageviews: 21450 },
    ],
    "1y": [
      { label: "Jan", visitors: 12400, pageviews: 36200 },
      { label: "Feb", visitors: 15800, pageviews: 47100 },
      { label: "Mar", visitors: 18200, pageviews: 54000 },
      { label: "Apr", visitors: 21000, pageviews: 62500 },
      { label: "Mei", visitors: 24500, pageviews: 73000 },
      { label: "Jun", visitors: 28450, pageviews: 85200 },
    ],
  };

  // 2. Customer Order / Project Inquiries Data
  const orderData = {
    "7d": [
      { category: "Stage Decoration", orders: 6, value: "Rp 95M", percentage: 38 },
      { category: "Event Props & Backdrop", orders: 5, value: "Rp 45M", percentage: 31 },
      { category: "Corporate Activation", orders: 3, value: "Rp 60M", percentage: 19 },
      { category: "Party Sets & Desk", orders: 2, value: "Rp 15M", percentage: 12 },
    ],
    "30d": [
      { category: "Stage Decoration", orders: 18, value: "Rp 280M", percentage: 42 },
      { category: "Event Props & Backdrop", orders: 14, value: "Rp 120M", percentage: 33 },
      { category: "Corporate Activation", orders: 7, value: "Rp 140M", percentage: 17 },
      { category: "Party Sets & Desk", orders: 3, value: "Rp 25M", percentage: 8 },
    ],
    "1y": [
      { category: "Stage Decoration", orders: 74, value: "Rp 1.1B", percentage: 45 },
      { category: "Event Props & Backdrop", orders: 56, value: "Rp 480M", percentage: 34 },
      { category: "Corporate Activation", orders: 28, value: "Rp 560M", percentage: 15 },
      { category: "Party Sets & Desk", orders: 12, value: "Rp 95M", percentage: 6 },
    ],
  };

  // 3. Social Media Analytics
  const socialData = {
    "7d": {
      reach: "24.8K",
      reachGrowth: "+18.4%",
      impressions: "62.4K",
      profileVisits: "3,120",
      engagementRate: "6.8%",
      dailyReach: [2800, 3200, 3100, 3900, 4800, 5600, 4900],
    },
    "30d": {
      reach: "98.5K",
      reachGrowth: "+26.2%",
      impressions: "245.0K",
      profileVisits: "12,480",
      engagementRate: "7.4%",
      dailyReach: [18000, 22500, 26800, 31200],
    },
    "1y": {
      reach: "480.0K",
      reachGrowth: "+42.5%",
      impressions: "1.2M",
      profileVisits: "64,200",
      engagementRate: "8.1%",
      dailyReach: [45000, 62000, 78000, 95000, 110000, 140000],
    },
  };

  const currentVisitors = visitorData[timeRange];
  const currentOrders = orderData[timeRange];
  const currentSocial = socialData[timeRange];

  const totalVisitorsCount = currentVisitors.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalOrdersCount = currentOrders.reduce((acc, curr) => acc + curr.orders, 0);

  // SVG dimensions for visitors curve
  const svgWidth = 500;
  const svgHeight = 160;
  const maxVal = Math.max(...currentVisitors.map((v) => v.pageviews));
  const points = currentVisitors.map((item, index) => {
    const x = (index / (currentVisitors.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - (item.pageviews / maxVal) * (svgHeight - 40) - 20;
    return { x, y, ...item };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    return `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  return (
    <div className="space-y-6">
      {/* Realtime Live Incoming Event Banner */}
      {liveOrderEvent && (
        <div className="p-3 bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-mono text-xs flex items-center justify-between shadow-md animate-bounce">
          <div className="flex items-center gap-2 font-bold">
            <Radio className="w-4 h-4 text-emerald-700 animate-pulse" />
            <span>⚡ REALTIME EVENT: {liveOrderEvent}</span>
          </div>
          <span className="text-[10px] bg-emerald-200 px-2 py-0.5 font-bold uppercase">JUST NOW</span>
        </div>
      )}

      {/* Header & Time Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-brand-navy">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-brand-yellow"></div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-xl text-workshop-black uppercase tracking-tight">
                PERFORMANCE &amp; CONVERSION ANALYTICS
              </h3>
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-100 border border-emerald-300 text-emerald-800 font-mono text-[9px] font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>REALTIME LIVE</span>
              </div>
            </div>
            <p className="text-xs font-mono text-concrete">
              Statistik real-time kunjungan website, order customer, dan jangkauan media sosial.
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-studio-card border border-studio-border p-1 shadow-sm">
          <span className="text-[10px] font-mono text-concrete font-bold px-2 hidden sm:inline-block">
            PERIODE:
          </span>
          {(["7d", "30d", "1y"] as TimeRange[]).map((tr) => (
            <button
              key={tr}
              onClick={() => setTimeRange(tr)}
              className={`px-3 py-1 text-xs font-mono font-bold uppercase transition-all ${
                timeRange === tr
                  ? "bg-brand-navy text-studio-white shadow-xs"
                  : "text-workshop-black hover:bg-studio-muted"
              }`}
            >
              {tr === "7d" ? "7 Hari" : tr === "30d" ? "30 Hari" : "1 Tahun"}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* KPI 1: Website Traffic */}
        <div className="p-5 bg-studio-card border border-studio-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-concrete uppercase">TRAFIK WEBSITE</span>
            <div className="p-2 bg-brand-navy/10 text-brand-navy">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-black text-3xl text-workshop-black">
              {totalVisitorsCount.toLocaleString()}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.6%
            </span>
          </div>
          <div className="text-[11px] font-mono text-concrete mt-2 pt-2 border-t border-studio-border flex justify-between">
            <span>Unique Visitors</span>
            <span className="font-bold text-workshop-black">{(totalVisitorsCount * 0.42).toFixed(0)}</span>
          </div>
        </div>

        {/* KPI 2: Customer Orders */}
        <div className="p-5 bg-studio-card border border-studio-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-concrete uppercase">CUSTOMER PROJECT ORDERS</span>
            <div className="p-2 bg-brand-yellow/20 text-workshop-black">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-black text-3xl text-workshop-black">
              {totalOrdersCount} <span className="text-sm font-sans font-bold text-concrete">Builds</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24.0%
            </span>
          </div>
          <div className="text-[11px] font-mono text-concrete mt-2 pt-2 border-t border-studio-border flex justify-between">
            <span>Quotation Approved</span>
            <span className="font-bold text-brand-navy">88.5% Rate</span>
          </div>
        </div>

        {/* KPI 3: Social Media Reach */}
        <div className="p-5 bg-studio-card border border-studio-border shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold text-concrete uppercase">INSTAGRAM REACH &amp; ENGAGEMENT</span>
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-rose-500 text-white">
              <Instagram className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-black text-3xl text-workshop-black">
              {currentSocial.reach}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {currentSocial.reachGrowth}
            </span>
          </div>
          <div className="text-[11px] font-mono text-concrete mt-2 pt-2 border-t border-studio-border flex justify-between">
            <span>Engagement Rate</span>
            <span className="font-bold text-purple-700">{currentSocial.engagementRate}</span>
          </div>
        </div>

      </div>

      {/* Main Charts Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART 1: Website Visitors Trend (Area / Line Chart) */}
        <div className="lg:col-span-7 bg-studio-card border border-studio-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border">
            <div>
              <h4 className="font-display font-black text-base uppercase text-workshop-black">
                GRAFIK PENGUNJUNG WEBSITE &amp; PAGEVIEWS
              </h4>
              <p className="text-[11px] font-mono text-concrete">
                Visualisasi intensitas traffic pengunjung website resmi Bikinruang.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono font-bold">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-brand-navy rounded-xs"></span>
                <span>Pageviews</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-brand-yellow rounded-xs"></span>
                <span>Visitors</span>
              </div>
            </div>
          </div>

          {/* SVG Interactive Area Chart */}
          <div className="relative w-full h-44 pt-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="visitorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#003B6F" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#003B6F" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1={svgHeight - 20} x2={svgWidth} y2={svgHeight - 20} stroke="#E5E5E0" strokeWidth="1" />
              <line x1="0" y1={svgHeight / 2} x2={svgWidth} y2={svgHeight / 2} stroke="#F0F0EC" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="20" x2={svgWidth} y2="20" stroke="#F0F0EC" strokeWidth="1" strokeDasharray="4 4" />

              {/* Area Fill */}
              <path d={areaD} fill="url(#visitorGradient)" />

              {/* Line Curve */}
              <path d={pathD} fill="none" stroke="#003B6F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

              {/* Interactive Data Dots */}
              {points.map((pt, idx) => (
                <g key={idx} className="cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint === idx ? 6 : 4}
                    fill="#FFC700"
                    stroke="#003B6F"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPoint(idx)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    className="transition-all"
                  />
                  {/* Label Text */}
                  <text
                    x={pt.x}
                    y={svgHeight - 4}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-concrete font-bold"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* Hover Tooltip */}
            {hoveredPoint !== null && points[hoveredPoint] && (
              <div
                className="absolute bg-workshop-black text-studio-white p-2 text-[10px] font-mono shadow-lg pointer-events-none rounded-none border border-brand-yellow z-10"
                style={{
                  left: `${(points[hoveredPoint].x / svgWidth) * 100}%`,
                  top: "10px",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="font-bold text-brand-yellow">{points[hoveredPoint].label}</div>
                <div>Pageviews: {points[hoveredPoint].pageviews.toLocaleString()}</div>
                <div>Visitors: {points[hoveredPoint].visitors.toLocaleString()}</div>
              </div>
            )}
          </div>
        </div>

        {/* CHART 2: Customer Project Orders by Category (Bar Chart) */}
        <div className="lg:col-span-5 bg-studio-card border border-studio-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-studio-border">
            <div>
              <h4 className="font-display font-black text-base uppercase text-workshop-black">
                DISTRIBUSI ORDER CUSTOMER
              </h4>
              <p className="text-[11px] font-mono text-concrete">
                Frekuensi customer order &amp; inquiry per kategori produksi.
              </p>
            </div>
            <span className="font-mono text-xs font-bold text-brand-navy bg-brand-navy/10 px-2 py-0.5">
              {totalOrdersCount} TOTAL
            </span>
          </div>

          {/* Categorized Bar Distribution */}
          <div className="space-y-3.5 pt-1">
            {currentOrders.map((item, idx) => (
              <div key={item.category} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-workshop-black truncate">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-brand-navy">{item.orders} Order</span>
                    <span className="text-concrete text-[10px]">({item.value})</span>
                  </div>
                </div>
                
                {/* Visual Bar Indicator */}
                <div className="w-full h-3 bg-studio-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${
                      idx === 0
                        ? "bg-brand-navy"
                        : idx === 1
                        ? "bg-brand-yellow"
                        : idx === 2
                        ? "bg-brand-steel"
                        : "bg-concrete"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CHART 3: Social Media Reach & Content Engagement Performance */}
      <div className="bg-studio-card border border-studio-border p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-studio-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-purple-600 to-rose-500 text-white shadow-xs">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-display font-black text-base uppercase text-workshop-black">
                ANALYTICS MEDIA SOSIAL (@bikinruang.co)
              </h4>
              <p className="text-[11px] font-mono text-concrete">
                Jangkauan akun, total impresi konten video/foto, dan kunjungan profil Instagram.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold text-workshop-black">
            <div>
              <span className="text-concrete">Impresi: </span>
              <span className="text-purple-700">{currentSocial.impressions}</span>
            </div>
            <div>
              <span className="text-concrete">Kunjungan Profil: </span>
              <span className="text-brand-navy">{currentSocial.profileVisits}</span>
            </div>
          </div>
        </div>

        {/* Visual Multi-Column Daily Reach Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-2">
          {currentSocial.dailyReach.map((val, idx) => {
            const maxReach = Math.max(...currentSocial.dailyReach);
            const heightPercent = Math.round((val / maxReach) * 100);
            return (
              <div
                key={idx}
                className="bg-studio-muted border border-studio-border p-3 flex flex-col justify-between items-center group hover:border-brand-navy transition-colors"
              >
                <span className="text-[10px] font-mono font-bold text-purple-700">
                  {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                </span>

                {/* Vertical Bar */}
                <div className="w-full h-20 bg-white my-2 flex items-end overflow-hidden p-1">
                  <div
                    className="w-full bg-gradient-to-t from-brand-navy to-purple-600 transition-all duration-500 group-hover:from-brand-yellow group-hover:to-brand-navy"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <span className="text-[9px] font-mono font-bold text-concrete uppercase">
                  {timeRange === "7d"
                    ? ["H-6", "H-5", "H-4", "H-3", "H-2", "Kemarin", "Hari Ini"][idx] || `Hari ${idx + 1}`
                    : `W${idx + 1}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
