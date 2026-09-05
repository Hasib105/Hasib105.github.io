import { SceneView } from "@/components/three/scene-view";
import { MicroLabel } from "@/components/ui/micro-label";
import { PillButton } from "@/components/ui/pill-button";
import { Reveal } from "@/components/reveal";
import { profileSettings, resumeSettings } from "@/lib/content/settings";

const HIGHLIGHTS = [
  {
    icon: "🔭",
    label: "Focus",
    text: "High-performance Python backends, Computer Vision systems, and multimodal AI pipelines.",
  },
  {
    icon: "👁️",
    label: "Computer Vision & ML",
    text: "Object Detection (YOLO), Image Classification, OpenCV processing, PyTorch, and Hugging Face Transformers.",
  },
  {
    icon: "🎙️",
    label: "Speech & Audio",
    text: "End-to-end Speech-to-Text (Whisper STT) and Text-to-Speech (TTS) synthesis workflows.",
  },
  {
    icon: "⚡",
    label: "Backend & Distributed Systems",
    text: "FastAPI, Django REST Framework, Asyncio, Celery, Redis, and strict typing (Pydantic v2, Mypy).",
  },
  {
    icon: "💬",
    label: "Ask me about",
    text: "Vision model inference, Python concurrency, agentic workflows, FastAPI system design, real-time video/audio processing.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <MicroLabel as="h2" className="mb-6">
            About Me
          </MicroLabel>
        </Reveal>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_minmax(300px,400px)] lg:gap-24 items-start">
          <div>
            <Reveal>
              <h3 className="type-hero text-ink">
                Engineer first.
                <br />
                <span className="text-accent">AI-native by practice.</span>
              </h3>

              <div className="mono-body text-ink-dim mt-8 max-w-2xl space-y-4 text-[14px] sm:text-[15px] leading-relaxed">
                <p>
                  I am a <strong className="text-ink">Python Software Engineer & Applied AI/ML Developer</strong> focused on building robust backend architectures, Computer Vision pipelines, and intelligent multi-modal systems.
                </p>
                <p>
                  I bridge the gap between production software engineering and applied machine learning — developing scalable microservices with <span className="text-ink font-medium">FastAPI & Django</span>, implementing real-time vision pipelines with <span className="text-ink font-medium">OpenCV & YOLO</span>, deploying <span className="text-ink font-medium">Transformers</span> for NLP & vision tasks, and orchestrating stateful <span className="text-ink font-medium">Agentic workflows & Speech AI (TTS/STT)</span>.
                </p>
              </div>

              {/* Styled Key Highlights */}
              <div className="mt-8 border-line-faint bg-raise/50 divide-line-faint divide-y rounded-2xl border backdrop-blur-sm">
                {HIGHLIGHTS.map((item) => (
                  <div key={item.label} className="p-4 sm:p-5 flex items-start gap-3.5">
                    <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                    <p className="mono-body text-xs sm:text-sm text-ink-dim leading-relaxed">
                      <strong className="text-ink font-medium">{item.label}:</strong> {item.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <PillButton href={`mailto:${profileSettings.email}`} variant="filled">
                  Get in touch
                </PillButton>
                <a
                  href={resumeSettings.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-label border-line hover:border-accent text-ink hover:text-accent inline-flex items-center rounded-full border px-6 py-3 text-xs transition-colors duration-300"
                >
                  Resume PDF ↗
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3D scene + quick card */}
          <Reveal delay={100} className="space-y-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line-faint bg-raise/30">
              <SceneView
                scene="accent-blob"
                fallbackSrc="/fallbacks/accent-blob.avif"
                className="absolute inset-0 h-full w-full"
                fallbackClassName="object-cover"
              />
            </div>

            <div className="border-line-faint bg-raise/50 divide-line-faint divide-y rounded-2xl border p-6 backdrop-blur-sm">
              <div className="pb-4">
                <span className="mono-label text-ink-faint text-xs">Education</span>
                {resumeSettings.education.map((edu) => (
                  <div key={edu.degree} className="mt-1.5">
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

              <div className="py-4">
                <span className="mono-label text-ink-faint text-xs">Languages</span>
                <div className="mt-1.5 flex flex-wrap gap-3">
                  {resumeSettings.languages.map((lang) => (
                    <span key={lang.language} className="mono-body text-xs text-ink">
                      {lang.language} <span className="text-ink-faint">({lang.level})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <span className="mono-label text-ink-faint text-xs">Location & Status</span>
                <p className="mono-body text-ink text-xs mt-1">
                  {profileSettings.location} · <span className="text-accent">Available for remote</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
