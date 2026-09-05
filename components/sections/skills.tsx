import { MicroLabel } from "@/components/ui/micro-label";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/reveal";
import { skillsSettings } from "@/lib/content/settings";

const CATEGORY_ICONS: Record<string, string> = {
  "Core Python & Concurrency": "🐍",
  "Computer Vision & Machine Learning": "👁️",
  "Speech & Audio AI (TTS / STT)": "🎙️",
  "Deep Learning, Transformers & AI Agents": "🧠",
  "Web & API Frameworks": "⚡",
  "Databases, ORM & Vector Search": "💾",
  "DevOps, Infrastructure & Tooling": "☁️",
};

export function Skills() {
  return (
    <section id="arsenal" className="relative scroll-mt-24">
      {/* Anchor for #skills */}
      <div id="skills" className="absolute -top-24" />

      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="mb-12 max-w-3xl md:mb-16">
            <MicroLabel as="h2" className="mb-5">
              Toolbox
            </MicroLabel>
            <h3 className="type-hero text-ink">
              Technical Arsenal.
            </h3>
            <p className="mono-body text-ink-dim mt-6 max-w-xl text-[15px] leading-relaxed">
              Core technologies, frameworks, and pipelines engineered for production scale — from multi-agent control planes to edge computer vision and high-concurrency microservices.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillsSettings.groups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={i * 45}
              className="border-line-faint bg-raise/40 hover:border-line flex flex-col justify-between rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:bg-raise/70 sm:p-7"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl shrink-0">
                      {CATEGORY_ICONS[group.category] || "⚡"}
                    </span>
                    <h4 className="font-display text-ink text-base font-medium">
                      {group.category}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {group.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
