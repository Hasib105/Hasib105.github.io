import Image from "next/image";
import { MicroLabel } from "@/components/ui/micro-label";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/reveal";
import { getAllWork } from "@/lib/content/work";
import { ACCENT_TEXT_CLASS } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function Projects() {
  const projects = getAllWork();

  return (
    <section id="work" className="relative scroll-mt-24">
      {/* Also anchor for #projects */}
      <div id="projects" className="absolute -top-24" />

      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
            <div>
              <MicroLabel as="h2" className="mb-4">
                Selected Work & Systems
              </MicroLabel>
              <h3 className="type-hero text-ink">
                Built to operate in production.
              </h3>
            </div>
            <span className="mono-label text-ink-faint">
              {String(projects.length).padStart(2, "0")} Featured Projects
            </span>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              delay={i * 60}
              className="group border-line-faint bg-raise/40 hover:border-line flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:bg-raise/70 sm:p-8"
            >
              <div>
                {/* Top bar: index, category, year */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="mono-label text-ink-faint text-xs">
                      #{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mono-label text-accent-dim rounded-full bg-white/[0.04] px-3 py-1 text-xs">
                      {project.category}
                    </span>
                  </div>
                  <span className="mono-label text-ink-faint text-xs">
                    {project.year}
                  </span>
                </div>

                {/* Thumbnail if available */}
                {project.thumbnail?.src && (
                  <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-black/40">
                    <Image
                      src={project.thumbnail.src}
                      alt={project.thumbnail.alt || project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Title & Role */}
                <h4
                  className={cn(
                    "font-display text-2xl font-medium tracking-tight text-ink transition-colors duration-300",
                    ACCENT_TEXT_CLASS[project.accent]
                  )}
                >
                  {project.title}
                </h4>
                <p className="mono-label text-ink-dim mt-1.5 text-xs">
                  Role: {project.role}
                </p>

                {/* Summary */}
                <p className="mono-body text-ink-dim mt-4 text-sm leading-relaxed">
                  {project.summary}
                </p>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-lg bg-black/30 p-2.5 border border-white/[0.03]"
                      >
                        <span className="mono-label text-ink-faint block text-[11px]">
                          {metric.label}
                        </span>
                        <span className="font-display text-ink block text-sm font-semibold mt-0.5">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom: Stack & Links */}
              <div className="mt-6 pt-6 border-t border-line-faint">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-4">
                    {project.links && project.links.length > 0 ? (
                      project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mono-label text-accent hover:text-ink text-xs underline underline-offset-4 transition-colors"
                        >
                          {link.label} ↗
                        </a>
                      ))
                    ) : (
                      <span className="mono-label text-ink-faint text-xs">
                        Private / Production Client System
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
