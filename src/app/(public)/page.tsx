import React from "react";
import Hero from "@/components/public/Hero";
import Introduction from "@/components/public/Introduction";
import WhatWeBuild from "@/components/public/WhatWeBuild";
import WorkflowTimeline from "@/components/public/WorkflowTimeline";
import ProjectGrid from "@/components/public/ProjectGrid";
import ServiceGroupSection from "@/components/public/ServiceGroupSection";
import ClientGrid from "@/components/public/ClientGrid";
import CTASection from "@/components/public/CTASection";
import Marquee from "@/components/public/Marquee";
import { getProjects, getServiceGroups, getClients } from "@/lib/data/api";

export const revalidate = 60; // ISR

const MARQUEE_ITEMS = [
  "FROM VISION",
  "BUILT UNEXPECTED",
  "STAGE DECORATION",
  "EVENT PROPS",
  "BRAND ACTIVATION",
  "CUSTOM FABRICATION",
  "SPATIAL EXPERIENCE",
  "YOU BRING THE IDEA. WE BUILD THE SPACE",
];

export default async function HomePage() {
  const [projects, serviceGroups, clients] = await Promise.all([
    getProjects({ limit: 6 }),
    getServiceGroups(),
    getClients(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 01: Hero */}
      <Hero />

      {/* Kinetic Marquee Ticker */}
      <Marquee items={MARQUEE_ITEMS} direction="left" />

      {/* 02: Introduction & Philosophy */}
      <Introduction />

      {/* 03: What We Build (12 Modular Capabilities) */}
      <WhatWeBuild />

      {/* 04: How We Build It (01-08 Workflow) */}
      <WorkflowTimeline />

      {/* 05: Selected Projects / Our Work */}
      <ProjectGrid
        projects={projects}
        title="OUR WORK"
        subtitle="RECENT PHYSICAL BUILDS & SPATIAL INSTALLATIONS"
      />

      {/* 06: Service Disciplines (CREATE, CELEBRATE, ACTIVATE, SUPPORT) */}
      <ServiceGroupSection groups={serviceGroups} />

      {/* Reverse Marquee */}
      <Marquee
        items={[
          "PRECISION CARPENTRY",
          "STEEL WELDING",
          "ACRYLIC NEON",
          "LED RIGGING",
          "OVERNIGHT LOAD-IN",
          "SAFETY CERTIFIED",
          "MALANG WORKSHOP ATELIER",
        ]}
        direction="right"
        className="bg-workshop-card text-concrete border-workshop-border"
      />

      {/* 07: Clients & Collaborators */}
      <ClientGrid clients={clients} />

      {/* 08: Call To Action */}
      <CTASection />
    </div>
  );
}
