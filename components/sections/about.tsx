import { MicroLabel } from "@/components/ui/micro-label";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/reveal";
import { profileSettings, resumeSettings } from "@/lib/content/settings";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <MicroLabel as="h2" className="mb-6">
            About & Background
          </MicroLabel>
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <Reveal>
            <h3 className="type-hero text-ink mb-8">
              Engineer first.
              <br />
              <span className="text-accent">AI-native by practice.</span>
            </h3>

            <div className="mono-body text-ink-dim space-y-5 leading-relaxed">
              <p>{profileSettings.summary}</p>
              <p>
                The through-line in my work is turning advanced AI capabilities into
                automation people actually run in production. Agent workflows get
                explicit state machines and checkpointing; retrieval gets grounded,
                vector-indexed context; and computer vision pipelines get optimized
                for real-time streaming and edge throughput.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <PillButton href="#contact" variant="filled">
                Get in touch
              </PillButton>
              <a
                href={resumeSettings.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label border-line hover:border-accent text-ink hover:text-accent inline-flex items-center rounded-full border px-6 py-3 transition-colors duration-300"
              >
                Download Resume PDF ↗
              </a>
            </div>
          </Reveal>

          {/* Quick facts card */}
          <Reveal delay={100}>
            <div className="border-line-faint bg-raise/60 divide-line-faint divide-y rounded-2xl border p-6 backdrop-blur-sm sm:p-8">
              <div className="pb-6">
                <span className="mono-label text-ink-faint text-xs">Current Focus</span>
                <p className="font-display text-ink mt-1.5 text-base font-medium">
                  Autonomous Multi-Agent Control Planes, Computer Vision & Go Backends
                </p>
              </div>

              <div className="py-6">
                <span className="mono-label text-ink-faint text-xs">Education</span>
                {resumeSettings.education.map((edu) => (
                  <div key={edu.degree} className="mt-2">
                    <p className="font-display text-ink text-sm font-medium">{edu.degree}</p>
                    <p className="mono-label text-ink-dim text-xs mt-0.5">
                      {edu.institution} · {edu.location}
                    </p>
                    <p className="mono-label text-ink-faint text-xs mt-0.5">
                      {edu.start} — {edu.end}
                    </p>
                  </div>
                ))}
              </div>

              <div className="py-6">
                <span className="mono-label text-ink-faint text-xs">Spoken Languages</span>
                <div className="mt-2 flex flex-wrap gap-4">
                  {resumeSettings.languages.map((lang) => (
                    <span key={lang.language} className="mono-body text-xs text-ink">
                      <strong className="text-ink">{lang.language}</strong>{" "}
                      <span className="text-ink-faint">({lang.level})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <span className="mono-label text-ink-faint text-xs">Base & Availability</span>
                <p className="mono-body text-ink mt-1.5 text-xs">
                  {profileSettings.location} · <span className="text-accent">Available for worldwide remote</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
