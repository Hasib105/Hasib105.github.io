import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { experienceSettings, resumeSettings } from "@/lib/content/settings";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
            <div>
              <MicroLabel as="h2" className="mb-4">
                Experience & Focus
              </MicroLabel>
              <h3 className="type-hero text-ink">
                Engineering highlights.
              </h3>
            </div>
            <a
              href={resumeSettings.pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label border-line hover:border-accent text-ink hover:text-accent inline-flex items-center rounded-full border px-5 py-2.5 transition-colors duration-300"
            >
              Download PDF Resume ↗
            </a>
          </div>
        </Reveal>

        <div className="space-y-6">
          {experienceSettings.items.map((item, i) => (
            <Reveal
              key={`${item.organization}-${item.role}`}
              delay={i * 60}
              className="border-line-faint bg-raise/40 hover:border-line rounded-2xl border p-6 transition-all duration-300 sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:gap-12">
                <div>
                  <div className="flex items-center gap-2">
                    {item.current && (
                      <span
                        aria-hidden="true"
                        className="bg-accent inline-block size-2 animate-pulse rounded-full"
                      />
                    )}
                    <h4
                      className={cn(
                        "font-display text-xl font-medium tracking-tight",
                        item.current ? "text-accent" : "text-ink"
                      )}
                    >
                      {item.organization}
                    </h4>
                  </div>
                  <p className="mono-label text-ink-dim mt-2 text-xs font-semibold">
                    {item.role}
                  </p>
                  <p className="mono-label text-ink-faint mt-1 text-xs">
                    {item.start} — {item.end} · {item.location}
                  </p>
                </div>

                <ul className="space-y-3">
                  {item.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="mono-body text-ink-dim text-xs sm:text-sm leading-relaxed relative pl-5 before:absolute before:left-0 before:top-0 before:text-ink-faint before:content-['→']"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
