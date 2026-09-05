import { MicroLabel } from "@/components/ui/micro-label";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/reveal";

export function GithubActivity() {
  return (
    <section id="activity" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <MicroLabel as="h2" className="mb-5">
              Open Source
            </MicroLabel>
            <h3 className="type-hero text-ink">
              GitHub Activity & Streak.
            </h3>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-line-faint bg-raise/40 hover:border-line rounded-2xl border p-6 sm:p-10 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300 hover:bg-raise/60">
            <p className="mono-label text-xs text-ink-dim mb-6">
              Live GitHub Activity & Contribution Streak for <span className="text-accent">@Hasib105</span>
            </p>
            <div className="w-full flex justify-center overflow-x-auto py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-streak-stats.herokuapp.com/?user=Hasib105&theme=dark&hide_border=true&background=0d0d0e&stroke=cecafb&ring=cecafb&fire=cecafb&currStreakNum=f0f3f3&sideNums=f0f3f3&currStreakLabel=cecafb&sideLabels=989e9e&dates=788080"
                alt="Hasib's GitHub Streak"
                className="max-w-full rounded-xl"
                loading="lazy"
              />
            </div>
            <div className="mt-8">
              <PillButton
                href="https://github.com/Hasib105"
                variant="ghost"
              >
                Visit github.com/Hasib105 ↗
              </PillButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
