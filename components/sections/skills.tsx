import { MicroLabel } from "@/components/ui/micro-label";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/reveal";
import { skillsSettings } from "@/lib/content/settings";

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <MicroLabel as="h2" className="mb-4">
              Toolbox & Core Stack
            </MicroLabel>
            <h3 className="type-hero text-ink">
              Technologies engineered for scale.
            </h3>
            <p className="mono-body text-ink-dim mt-4 text-sm">
              From multi-agent control planes to edge computer vision and low-latency Go daemons.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillsSettings.groups.map((group, i) => (
            <Reveal
              key={group.category}
              delay={i * 50}
              className="border-line-faint bg-raise/40 hover:border-line rounded-2xl border p-6 backdrop-blur-sm transition-colors duration-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-display text-ink text-base font-medium">
                  {group.category}
                </h4>
                <span className="mono-label text-ink-faint text-xs">
                  {group.skills.length} tools
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
