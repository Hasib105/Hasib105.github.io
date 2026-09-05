import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { ProjectList } from "@/components/sections/project-list";
import { getAllWork } from "@/lib/content/work";

export function Projects() {
  const projects = getAllWork();

  return (
    <section id="projects" className="relative scroll-mt-24">
      {/* Anchor for #work */}
      <div id="work" className="absolute -top-24" />

      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="mb-12 flex flex-col justify-between gap-4 md:mb-16 md:flex-row md:items-end">
            <div>
              <MicroLabel as="h2" className="mb-5">
                Selected Work & Systems
              </MicroLabel>
              <h3 className="type-hero text-ink">
                Featured Projects.
              </h3>
            </div>
            <p className="mono-label text-ink-faint">
              {String(projects.length).padStart(2, "0")} Systems · Click row to inspect details & stack
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ProjectList projects={projects} />
        </Reveal>
      </div>
    </section>
  );
}
