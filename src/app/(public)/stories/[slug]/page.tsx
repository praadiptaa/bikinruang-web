import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Share2, ArrowUpRight } from "lucide-react";
import { getNewsBySlug, getNewsList } from "@/lib/data/api";
import { formatDate } from "@/lib/utils";
import CTASection from "@/components/public/CTASection";

interface StoryDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: StoryDetailPageProps) {
  const story = await getNewsBySlug(params.slug);
  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} — Bikinruang Stories`,
    description: story.excerpt,
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const story = await getNewsBySlug(params.slug);

  if (!story) {
    notFound();
  }

  const moreStories = (await getNewsList())
    .filter((s) => s.id !== story.id)
    .slice(0, 2);

  return (
    <div className="pt-28 md:pt-36 bg-studio-white">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 font-mono text-xs text-concrete hover:text-workshop-black transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO ALL STORIES</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-signal-orange uppercase tracking-wider mb-4">
          <span>{formatDate(story.published_at)}</span>
          <span>•</span>
          <span>STUDIO JOURNAL</span>
        </div>

        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-workshop-black uppercase tracking-tight leading-[1.05] mb-8">
          {story.title}
        </h1>

        <p className="font-sans text-lg text-workshop-black/80 font-medium leading-relaxed mb-8 border-l-2 border-signal-orange pl-4">
          {story.excerpt}
        </p>

        {story.featured_image_url && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-workshop-card border border-workshop-black mb-12">
            <Image
              src={story.featured_image_url}
              alt={story.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="font-sans text-base text-workshop-black/90 leading-relaxed space-y-6 whitespace-pre-line border-b border-studio-border pb-12">
          {story.content}
        </div>
      </article>

      {/* More Stories */}
      {moreStories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t-2 border-workshop-black">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-workshop-black uppercase tracking-tight">
              MORE FROM THE WORKSHOP
            </h2>
            <Link
              href="/stories"
              className="font-mono text-xs font-bold text-workshop-black hover:text-signal-orange underline"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {moreStories.map((item) => (
              <div
                key={item.id}
                className="p-6 bg-studio-card border border-studio-border hover:border-workshop-black transition-colors"
              >
                <div className="text-[11px] font-mono text-concrete mb-2">
                  {formatDate(item.published_at)}
                </div>
                <h3 className="font-display font-bold text-xl uppercase tracking-tight mb-2 hover:text-signal-orange">
                  <Link href={`/stories/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-xs text-concrete line-clamp-2">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
