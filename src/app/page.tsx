import { Eyebrow } from "@/components/eyebrow";
import { HeroVisual } from "@/components/hero-visual";
import { Nav } from "@/components/nav";
import { Reveal } from "@/components/reveal";
import {
  achievements,
  education,
  experience,
  hero,
  projects,
  services,
  site,
  skillGroups,
  type Project,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Work />
        <WhatIDo />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Warm bloom behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-accent/8 blur-[120px]"
      />
      <Shell className="relative grid items-center gap-8 pt-32 pb-20 sm:pt-40 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pb-28">
        <div>
        <Reveal className="flex items-center gap-2.5">
          <span className="status-dot h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-sm text-muted">{site.status}</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-8 text-[2.75rem] leading-[1.04] font-semibold tracking-[-0.03em] sm:text-6xl xl:text-[4rem]">
            {hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-accent">{hero.accent}</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-9 max-w-2xl text-lg leading-relaxed text-muted">
            {hero.body.map((part, i) => (
              <span key={i} className={part.accent ? "text-accent-soft" : ""}>
                {part.text}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-11 flex flex-wrap items-center gap-5">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 font-mono text-sm text-bg transition-opacity hover:opacity-85"
            >
              See the work
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              Résumé ↗
            </a>
          </div>
        </Reveal>
        </div>

        <HeroVisual />
      </Shell>
    </section>
  );
}

/* ── Selected work ─────────────────────────────────────────── */

function Work() {
  return (
    <Band id="work">
      <Reveal>
        <Eyebrow>Selected work</Eyebrow>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
            Systems people actually run on.
          </h2>
          <a
            href={site.socials[0].href}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            All projects ↗
          </a>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title} delay={(i % 2) * 90}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full rounded-xl border border-line bg-card p-5 transition-colors duration-300 hover:border-accent/40">
      {/* Browser-chrome preview — mono, not a screenshot. */}
      <div className="overflow-hidden rounded-lg border border-line bg-raised">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-dim/70" />
            <i className="h-2 w-2 rounded-full bg-dim/70" />
            <i className="h-2 w-2 rounded-full bg-dim/70" />
          </span>
          <span className="truncate font-mono text-xs text-dim">
            {project.window}
          </span>
        </div>
        <pre className="overflow-x-auto px-4 py-5 font-mono text-xs leading-6 text-muted">
          {project.preview.map((line, i) => (
            <span
              key={i}
              className={`block ${i === project.preview.length - 1 ? "mt-1 text-accent" : ""}`}
            >
              {line}
            </span>
          ))}
        </pre>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-[-0.01em]">
          {project.title}
        </h3>
        <span className="font-mono text-xs text-dim">{project.year}</span>
      </div>

      <p className="mt-1.5 text-[15px] text-muted">{project.blurb}</p>
      <p className="mt-3 text-sm leading-relaxed text-dim">{project.detail}</p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-dim">
          {project.stack.join(" · ")}
        </span>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            Source ↗
          </a>
        )}
      </div>

      {project.status && (
        <p className="mt-4 flex items-center gap-2 font-mono text-xs text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {project.status}
        </p>
      )}
    </article>
  );
}

/* ── What I do ─────────────────────────────────────────────── */

function WhatIDo() {
  return (
    <Band tone="raised">
      <Reveal>
        <Eyebrow>What I do</Eyebrow>
      </Reveal>
      <div className="mt-10 border-t border-line">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 60}>
            <div className="grid grid-cols-1 gap-3 border-b border-line py-7 sm:grid-cols-[auto_16rem_1fr] sm:items-baseline sm:gap-8">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium tracking-[-0.01em]">
                {service.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">
                {service.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ── Experience ────────────────────────────────────────────── */

function Experience() {
  return (
    <Band id="experience">
      <Reveal>
        <Eyebrow>Currently</Eyebrow>
        <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
          {site.role} at {site.company}.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Building agentic systems for Storebox — Autodesk&apos;s desktop build
          lifecycle and management platform.
        </p>
      </Reveal>

      <div className="mt-16 border-t border-line">
        {experience.map((job, i) => (
          <Reveal key={`${job.company}-${job.period}`} delay={i * 60}>
            <article className="grid gap-3 border-b border-line py-8 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <div>
                <p className="font-mono text-xs text-muted">{job.period}</p>
                <p className="mt-1 font-mono text-xs text-dim">{job.place}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium tracking-[-0.01em]">
                  {job.title}{" "}
                  <span className="text-accent">· {job.company}</span>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {job.summary}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ── About: recognition + skills + education ───────────────── */

function About() {
  return (
    <Band id="about" tone="raised">
      <Reveal>
        <Eyebrow>About</Eyebrow>
        <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-4xl">
          I like problems that only get interesting at scale.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <h3 className="font-mono text-xs tracking-[0.2em] text-dim uppercase">
            Recognition
          </h3>
          <ul className="mt-6 space-y-4">
            {achievements.map((item) => (
              <li key={item.detail} className="flex gap-4">
                <span className="w-24 shrink-0 font-mono text-xs text-accent">
                  {item.label}
                </span>
                <span className="text-[15px] leading-relaxed text-muted">
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={90}>
          <h3 className="font-mono text-xs tracking-[0.2em] text-dim uppercase">
            Toolkit
          </h3>
          <div className="mt-6 space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-xs text-dim">{group.label}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-9 border-t border-line pt-6">
            <p className="font-mono text-xs text-dim">Education</p>
            <p className="mt-2 text-[15px]">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">
              {education.school} · {education.period} · {education.grade}
            </p>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}

/* ── Contact ───────────────────────────────────────────────── */

function Contact() {
  return (
    <Band id="contact">
      <Reveal className="text-center">
        <div className="flex justify-center">
          <Eyebrow>Contact</Eyebrow>
        </div>
        <h2 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl">
          Got something hard to build?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted">
          Always up for a conversation about agents, infrastructure, or a
          problem that hasn&apos;t been solved cleanly yet.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm text-bg transition-opacity hover:opacity-90"
          >
            {site.email}
            <span className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-muted transition-colors hover:text-ink"
          >
            Résumé ↗
          </a>
        </div>
      </Reveal>
    </Band>
  );
}

/* ── Footer ────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-line">
      <Shell className="flex flex-col-reverse gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <ul className="flex flex-wrap gap-6">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-muted transition-colors hover:text-accent"
              >
                {social.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </Shell>
    </footer>
  );
}

/* ── Layout primitives ─────────────────────────────────────── */

function Shell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

function Band({
  id,
  tone = "base",
  children,
}: {
  id?: string;
  tone?: "base" | "raised";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`border-t border-line ${tone === "raised" ? "bg-raised" : ""}`}
    >
      <Shell className="py-24 sm:py-32">{children}</Shell>
    </section>
  );
}
