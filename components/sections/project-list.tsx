"use client";

import { useState } from "react";
import Image from "next/image";
import type { WorkEntry } from "@/lib/types";
import { Tag } from "@/components/ui/tag";
import { cn } from "@/lib/utils";

export function ProjectList({ projects }: { projects: WorkEntry[] }) {
  // Default first project expanded for immediate discovery
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>({
    [projects[0]?.slug || ""]: true,
  });

  const toggle = (slug: string) => {
    setExpandedSlugs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  return (
    <div className="divide-line-faint divide-y rounded-2xl border border-line-faint bg-raise/50 backdrop-blur-sm overflow-hidden">
      {projects.map((project, i) => {
        const isExpanded = !!expandedSlugs[project.slug];
        return (
          <div
            key={project.slug}
            className={cn(
              "transition-colors duration-200",
              isExpanded ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
            )}
          >
            {/* Clickable Header */}
            <button
              type="button"
              onClick={() => toggle(project.slug)}
              className="w-full text-left p-6 sm:px-8 sm:py-7 flex items-center justify-between gap-4 group cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <span className="mono-label text-ink-faint text-xs shrink-0 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h4 className="font-display text-lg sm:text-xl font-medium tracking-tight text-ink group-hover:text-accent transition-colors truncate">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2.5 mt-1">
                    <span className="mono-label text-accent-dim text-xs">
                      {project.category}
                    </span>
                    <span className="text-ink-faint text-xs">·</span>
                    <span className="mono-label text-ink-faint text-xs">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="mono-label text-xs px-3 py-1 rounded-full border border-line-faint text-ink-dim group-hover:border-accent group-hover:text-accent transition-colors hidden sm:inline-block">
                  {isExpanded ? "Hide Details −" : "See Details +"}
                </span>
                <span className="mono-label text-base text-ink-faint group-hover:text-accent transition-colors sm:hidden">
                  {isExpanded ? "−" : "+"}
                </span>
              </div>
            </button>

            {/* Expandable Details Container */}
            {isExpanded && (
              <div className="px-6 pb-8 sm:px-8 sm:pb-9 pt-2 border-t border-line-faint/60">
                <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8 items-start">
                  {/* Thumbnail Preview */}
                  {project.thumbnail?.src && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/40 border border-white/[0.04]">
                      <Image
                        src={project.thumbnail.src}
                        alt={project.thumbnail.alt || project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 280px"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="mono-label text-xs text-ink-faint uppercase tracking-wider">
                        Role & Responsibility
                      </span>
                      <p className="mono-body text-ink text-sm font-medium mt-0.5">
                        {project.role}
                      </p>
                    </div>

                    <div>
                      <span className="mono-label text-xs text-ink-faint uppercase tracking-wider">
                        System Architecture & Details
                      </span>
                      <p className="mono-body text-ink-dim text-sm leading-relaxed mt-1">
                        {project.summary}
                      </p>
                    </div>

                    {/* Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div>
                        <span className="mono-label text-xs text-ink-faint uppercase tracking-wider block mb-2">
                          Key Metrics
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {project.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              className="rounded-lg bg-black/40 border border-white/[0.05] px-3 py-1.5"
                            >
                              <span className="mono-label text-ink-faint text-[10px] block">
                                {metric.label}
                              </span>
                              <span className="font-display text-ink text-xs font-semibold">
                                {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tech Stack */}
                    <div>
                      <span className="mono-label text-xs text-ink-faint uppercase tracking-wider block mb-2">
                        Tech Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    {project.links && project.links.length > 0 ? (
                      <div className="pt-2 flex flex-wrap gap-4">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-label pill-filled text-xs rounded-full px-4 py-2 inline-flex items-center gap-1.5"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="mono-label text-ink-faint text-xs italic pt-1">
                        Client / Private Enterprise Repository
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
