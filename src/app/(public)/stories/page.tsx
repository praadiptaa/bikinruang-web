import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { getNewsList } from "@/lib/data/api";
import { formatDate } from "@/lib/utils";
import CTASection from "@/components/public/CTASection";

export const metadata = {
  title: "Stories & Workshop Journal — Bikinruang",
  description: "Behind-the-scenes stories, fabrication deep-dives, material explorations, and spatial design insights from Bikinruang.",
};

export default async function StoriesPage() {
  const newsList = await getNewsList();

  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 border-b-2 border-workshop-black">
        <div className="flex items-center gap-2 font-mono text-xs text-signal-orange tracking-widest uppercase mb-4">
          <span className="w-2 h-2 bg-signal-orange"></span>
          <span>WORKSHOP JOURNAL</span>
        </div>
        <h1 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-workshop-black uppercase leading-[0.9] max-w-5xl mb-8">
          STORIES &amp; UPDATES<span className="text-signal-orange">.</span>
        </h1>
        <p className="max-w-2xl font-sans text-lg text-workshop-black/80 leading-relaxed">
          Inside looks into our fabrication floor, case study breakdowns, material innovations, and event culture.
        </p>
      </section>

      {/* Stories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((story) => (
            <article
              key={story.id}
              className="bg-studio-card border border-studio-border hover:border-workshop-black transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {story.featured_image_url && (
                  <div className="relative aspect-[16/10] overflow-hidden bg-workshop-card">
                    <Image
                      src={story.featured_image_url}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] font-mono text-concrete mb-3 uppercase">
                    <span>{formatDate(story.published_at)}</span>
                    <span>•</span>
                    <span>STUDIO INSIGHT</span>
                  </div>

                  <h2 className="font-display font-bold text-xl uppercase tracking-tight text-workshop-black group-hover:text-signal-orange transition-colors mb-3 leading-snug">
                    <Link href={`/stories/${story.slug}`}>{story.title}</Link>
                  </h2>

                  <p className="text-xs text-workshop-black/80 font-sans leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/stories/${story.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-signal-orange hover:underline uppercase"
                >
                  <span>READ STORY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
