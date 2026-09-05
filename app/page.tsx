import Image from "next/image";
import { ProjectList } from "@/components/sections/project-list";
import { getAllWork } from "@/lib/content/work";
import { profileSettings, resumeSettings } from "@/lib/content/settings";

const ARSENAL = [
  {
    icon: "🐍",
    category: "Core Python & Concurrency",
    skills: ["Python", "Asyncio", "Pydantic", "Pytest", "Celery", "Poetry", "Mypy"],
  },
  {
    icon: "👁️",
    category: "Computer Vision & Machine Learning",
    skills: ["OpenCV", "YOLO", "PyTorch", "Torchvision", "Image Classification", "scikit-learn", "NumPy"],
  },
  {
    icon: "🎙️",
    category: "Speech & Audio AI (TTS / STT)",
    skills: ["Whisper STT", "TTS", "FFmpeg", "Audio Processing"],
  },
  {
    icon: "🧠",
    category: "Deep Learning, Transformers & AI Agents",
    skills: ["Transformers", "LangGraph", "CrewAI", "LangChain", "OpenAI", "Anthropic", "Hugging Face"],
  },
  {
    icon: "⚡",
    category: "Web & API Frameworks",
    skills: ["FastAPI", "Django", "Django REST Framework", "Starlette", "Uvicorn", "WebSockets"],
  },
  {
    icon: "💾",
    category: "Databases, ORM & Vector Search",
    skills: ["PostgreSQL", "Redis", "SQLAlchemy", "Alembic", "ChromaDB", "Pinecone", "Milvus", "SQLite"],
  },
  {
    icon: "☁️",
    category: "DevOps, Infrastructure & Tooling",
    skills: ["Docker", "Linux", "Nginx", "Git", "GitHub Actions", "Postman"],
  },
];

export default function HomePage() {
  const projects = getAllWork();

  return (
    <div className="mx-auto max-w-5xl px-5 pt-28 pb-24 sm:px-8 sm:pt-36">
      {/* ==================== 👨💻 ABOUT ME ==================== */}
      <section id="about" className="scroll-mt-28">
        {/* Status pill & location */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="mono-label text-xs inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-emerald-400">
            <span className="inline-block size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for Select Roles & Projects
          </span>
          <span className="mono-label text-xs text-ink-faint">
            Dhaka, Bangladesh · Remote Worldwide
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
            Hasib Ahmad Bhuyan
          </h1>
          <p className="font-mono text-sm sm:text-base text-accent mt-2 font-medium">
            Python Software Engineer & Applied AI/ML Developer
          </p>
        </div>

        {/* Core summary */}
        <div className="space-y-4 text-ink-dim text-sm sm:text-base leading-relaxed font-mono">
          <p>
            I am a <strong className="text-ink">Python Software Engineer & Applied AI/ML Developer</strong> focused
            on building robust backend architectures, Computer Vision pipelines, and intelligent multi-modal systems.
          </p>
          <p>
            I bridge the gap between production software engineering and applied machine learning — developing scalable
            microservices with <span className="text-ink">FastAPI & Django</span>, implementing real-time vision pipelines with{" "}
            <span className="text-ink">OpenCV & YOLO</span>, deploying <span className="text-ink">Transformers</span> for NLP & vision tasks,
            and orchestrating stateful <span className="text-ink">Agentic workflows & Speech AI (TTS/STT)</span>.
          </p>
        </div>

        {/* Highlights List */}
        <div className="mt-8 rounded-2xl border border-line-faint bg-raise/50 p-5 sm:p-7 backdrop-blur-sm space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-base sm:text-lg shrink-0">🔭</span>
            <p className="text-xs sm:text-sm font-mono text-ink-dim">
              <strong className="text-ink">Focus:</strong> High-performance Python backends, Computer Vision systems, and multimodal AI pipelines.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-base sm:text-lg shrink-0">👁️</span>
            <p className="text-xs sm:text-sm font-mono text-ink-dim">
              <strong className="text-ink">Computer Vision & ML:</strong> Object Detection (YOLO), Image Classification, OpenCV processing, PyTorch, and Hugging Face Transformers.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-base sm:text-lg shrink-0">🎙️</span>
            <p className="text-xs sm:text-sm font-mono text-ink-dim">
              <strong className="text-ink">Speech & Audio:</strong> End-to-end Speech-to-Text (Whisper STT) and Text-to-Speech (TTS) synthesis workflows.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-base sm:text-lg shrink-0">⚡</span>
            <p className="text-xs sm:text-sm font-mono text-ink-dim">
              <strong className="text-ink">Backend & Distributed Systems:</strong> FastAPI, Django REST Framework, Asyncio, Celery, Redis, and strict typing (Pydantic v2, Mypy).
            </p>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-base sm:text-lg shrink-0">💬</span>
            <p className="text-xs sm:text-sm font-mono text-ink-dim">
              <strong className="text-ink">Ask me about:</strong> Vision model inference, Python concurrency, agentic workflows, FastAPI system design, real-time video/audio processing.
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={`mailto:${profileSettings.email}`}
            className="mono-label pill-filled rounded-full px-6 py-3 text-xs"
          >
            Email Me
          </a>
          <a
            href={profileSettings.socials.find((s) => s.label === "LinkedIn")?.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label rounded-full border border-line px-6 py-3 text-xs text-ink hover:border-accent hover:text-accent transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href={profileSettings.socials.find((s) => s.label === "GitHub")?.href || "https://github.com/Hasib105"}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label rounded-full border border-line px-6 py-3 text-xs text-ink hover:border-accent hover:text-accent transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href={resumeSettings.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label rounded-full border border-line px-6 py-3 text-xs text-ink hover:border-accent hover:text-accent transition-colors"
          >
            Resume PDF ↗
          </a>
        </div>
      </section>

      {/* ==================== 🛠️ TECHNICAL ARSENAL ==================== */}
      <section id="arsenal" className="mt-20 sm:mt-28 scroll-mt-28">
        <div className="mb-8">
          <span className="mono-label text-xs text-accent uppercase tracking-wider block mb-2">
            Skill Stack
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink flex items-center gap-2.5">
            <span>🛠️</span> Technical Arsenal
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {ARSENAL.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-line-faint bg-raise/50 p-5 sm:p-6 backdrop-blur-sm hover:border-line transition-colors"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">{group.icon}</span>
                <h3 className="font-display text-sm sm:text-base font-medium text-ink">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="mono-label border-line-faint text-ink-dim hover:text-ink hover:border-line inline-flex items-center rounded-lg border bg-black/30 px-2.5 py-1 text-[11px] sm:text-xs transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 📈 GITHUB ACTIVITY & STREAK ==================== */}
      <section id="activity" className="mt-20 sm:mt-28 scroll-mt-28">
        <div className="mb-6">
          <span className="mono-label text-xs text-accent uppercase tracking-wider block mb-2">
            Open Source
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink flex items-center gap-2.5">
            <span>📈</span> GitHub Activity & Streak
          </h2>
        </div>

        <div className="rounded-2xl border border-line-faint bg-raise/50 p-6 sm:p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center">
          <p className="mono-label text-xs text-ink-dim mb-4">
            Hasib&apos;s GitHub Streak
          </p>
          <div className="w-full flex justify-center overflow-x-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=Hasib105&theme=dark&hide_border=true&background=0d0d0e&stroke=cecafb&ring=cecafb&fire=cecafb&currStreakNum=f0f3f3&sideNums=f0f3f3&currStreakLabel=cecafb&sideLabels=989e9e&dates=788080"
              alt="Hasib's GitHub Streak"
              className="max-w-full rounded-xl"
              loading="lazy"
            />
          </div>
          <a
            href="https://github.com/Hasib105"
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label text-xs text-accent hover:text-ink mt-5 underline underline-offset-4 transition-colors"
          >
            Visit github.com/Hasib105 ↗
          </a>
        </div>
      </section>

      {/* ==================== 🤝 LET'S CONNECT & COLLABORATE ==================== */}
      <section id="connect" className="mt-20 sm:mt-28 scroll-mt-28">
        <div className="rounded-2xl border border-line-faint bg-raise/60 p-6 sm:p-10 backdrop-blur-sm text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink flex items-center justify-center gap-2.5">
            <span>🤝</span> Let&apos;s Connect & Collaborate
          </h2>
          <p className="mono-body text-ink-dim text-xs sm:text-sm max-w-xl mx-auto mt-4 leading-relaxed">
            I&apos;m always keen to connect on Python backend engineering, Computer Vision & ML systems,
            Speech AI (TTS/STT), and autonomous AI agents.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profileSettings.email}`}
              className="mono-label pill-filled rounded-full px-7 py-3 text-xs"
            >
              Email Me ({profileSettings.email})
            </a>
            <a
              href={profileSettings.socials.find((s) => s.label === "LinkedIn")?.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label rounded-full border border-line px-6 py-3 text-xs text-ink hover:border-accent hover:text-accent transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/Hasib105"
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label rounded-full border border-line px-6 py-3 text-xs text-ink hover:border-accent hover:text-accent transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ==================== 📁 FEATURED PROJECTS (LAST) ==================== */}
      <section id="projects" className="mt-20 sm:mt-28 scroll-mt-28">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <span className="mono-label text-xs text-accent uppercase tracking-wider block mb-1">
              Production Work & Systems
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ink flex items-center gap-2.5">
              <span>📁</span> Featured Projects
            </h2>
          </div>
          <span className="mono-label text-xs text-ink-faint">
            Click any project to view architecture, metrics & stack ({projects.length} Total)
          </span>
        </div>

        {/* Expandable Project List */}
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
