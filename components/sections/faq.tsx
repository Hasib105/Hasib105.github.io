import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { resumeSettings } from "@/lib/content/settings";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <MicroLabel as="h2" className="mb-4">
              Quick Overview
            </MicroLabel>
            <h3 className="type-hero text-ink">
              Common questions.
            </h3>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {resumeSettings.faq.map((item, i) => (
            <Reveal
              key={item.question}
              delay={i * 60}
              className="border-line-faint bg-raise/40 hover:border-line rounded-2xl border p-6 sm:p-8 transition-colors duration-300"
            >
              <h4 className="font-display text-ink text-lg font-medium tracking-tight mb-3">
                {item.question}
              </h4>
              <p className="mono-body text-ink-dim text-xs sm:text-sm leading-relaxed">
                {item.answer}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
