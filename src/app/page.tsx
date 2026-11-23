import { Fragment } from "react";
import { resume } from "@/content/site";
import FlightPath from "@/components/flight-path";
import MobileMission from "@/components/mobile-mission";
import NightSky from "@/components/night-sky";
import {
  jobLogos,
  PinIcon,
  TrophyIcon,
  skillIcons,
  linkIcons,
} from "@/components/logos";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-[#d4d4d8] antialiased selection:bg-amber-300/25 selection:text-white">
      <NightSky />
      <FlightPath />
      <MobileMission />
      <main className="relative mx-auto w-full max-w-3xl px-5 pt-[3.75rem] pb-16 sm:px-10 sm:pt-24 sm:pb-24 lg:py-24 lg:mx-0 lg:max-w-[120rem] lg:pl-48 lg:pr-12 xl:pr-16 flex flex-col gap-14 sm:gap-20">

        {/* ── Header / Profile ── */}
        <header className="-mb-6 space-y-4 border-b border-neutral-800 pb-6 sm:-mb-8 sm:space-y-5 sm:pb-8">
          <div>
            <h1 className="text-[1.85rem] leading-tight sm:text-4xl font-semibold tracking-tight text-white font-sans">
              {resume.name}
            </h1>
            <p className="mt-2 text-[15px] leading-7 text-neutral-400 sm:text-lg">
              {resume.role} —{" "}
              <span className="text-neutral-200 font-medium">{resume.company}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[13px] font-mono text-neutral-300 sm:gap-x-5 sm:gap-y-3 sm:pt-3">
            <a
              href={resume.contact.github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 transition-colors hover:text-amber-200 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
            >
              <GitHubIcon className="h-3.5 w-3.5 text-neutral-400" />
              <span className="sm:hidden">GitHub</span>
              <span className="hidden truncate sm:inline">/github {resume.contact.github.username}</span>
            </a>

            <span className="hidden text-neutral-700 select-none sm:inline">|</span>

            <a
              href={resume.contact.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 transition-colors hover:text-amber-200 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
            >
              <LinkedInIcon className="h-3.5 w-3.5 text-neutral-400" />
              <span className="sm:hidden">LinkedIn</span>
              <span className="hidden truncate sm:inline">/linkedin {resume.contact.linkedin.username}</span>
            </a>

            <span className="hidden text-neutral-700 select-none sm:inline">|</span>

            <a
              href={`mailto:${resume.contact.email}`}
              className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 transition-colors hover:text-amber-200 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
            >
              <MailIcon className="h-3.5 w-3.5 text-neutral-400" />
              <span className="sm:hidden">Email</span>
              <span className="hidden truncate sm:inline">{resume.contact.email}</span>
            </a>
          </div>
        </header>

        {/* ── Work Experience ── */}
        <section id="experience" data-label="Experience" className="space-y-8">
          <SectionHeading title="Work Experience" />

          <div className="space-y-10 sm:space-y-12">
            {resume.experience.map((job, idx) => {
              const Logo = job.logo ? jobLogos[job.logo] : null;
              return (
                <article key={idx} data-context={`${job.company} · ${job.role}`} className="space-y-2.5 sm:space-y-3">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-1">
                    <h3 className="flex items-start gap-3 text-[17px] leading-7 font-medium text-white text-pretty sm:text-lg">
                      {Logo && <Logo className="mt-1 h-5 w-5 shrink-0" />}
                      <span>
                        {job.role}
                        <span className="hidden sm:inline">
                          {"\u00a0"}—{" "}
                          <span className="text-neutral-300 font-normal">{job.company}</span>
                        </span>
                      </span>
                    </h3>
                    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 pl-8 sm:block sm:pl-0">
                      <span className="text-[15px] text-neutral-300 sm:hidden">{job.company}</span>
                      <span aria-hidden className="text-neutral-600 sm:hidden">·</span>
                      <span className="font-mono text-[13px] text-neutral-400 whitespace-nowrap">
                        {job.period}
                      </span>
                    </span>
                  </div>

                  <p className="flex items-start gap-1.5 pl-8 text-[13px] leading-5 text-neutral-400 font-mono sm:items-center sm:pl-0">
                    <PinIcon className="mt-[3px] h-3.5 w-3.5 shrink-0 sm:mt-0" />
                    {job.location}
                  </p>

                  <Points points={job.points} className="mt-3 sm:mt-4" />
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" data-label="Projects" className="space-y-8">
          <SectionHeading title="Projects" />

          <div className="space-y-10 sm:space-y-12">
            {resume.projects.map((proj, idx) => (
              <article key={idx} data-context={proj.title} className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3 sm:gap-y-1.5">
                  <h3 className="text-[17px] font-medium text-white sm:text-lg">{proj.title}</h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-mono sm:gap-x-3">
                    {proj.links.map((link, lIdx) => {
                      const Icon = link.label === "Github" ? GitHubIcon : linkIcons[link.label];
                      return (
                        <span key={lIdx} className="inline-flex items-center gap-2">
                          {lIdx > 0 && <span className="hidden text-neutral-700 select-none sm:inline">|</span>}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-1.5 py-1 text-neutral-400 transition-colors sm:py-0.5 hover:text-amber-200"
                          >
                            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                            <span className="underline decoration-neutral-700 underline-offset-4 group-hover:decoration-amber-200/60">
                              {link.label}
                            </span>
                          </a>
                        </span>
                      );
                    })}
                  </div>
                </div>

                <Points points={proj.points} />
              </article>
            ))}
          </div>
        </section>

        {/* ── Achievements ── */}
        <section id="achievements" data-label="Achievements" className="space-y-6">
          <SectionHeading title="Achievements" />

          <ul className="space-y-3.5 sm:space-y-4 text-[15px] leading-[1.7] text-neutral-200 sm:text-base sm:leading-7 xl:text-[17px] xl:leading-8">
            {resume.achievements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 sm:gap-3.5">
                <TrophyIcon className="mt-[3px] h-[18px] w-[18px] shrink-0 text-amber-400/90 sm:mt-1 sm:h-5 sm:w-5" />
                <span className="text-pretty">
                  {item.text}{" "}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="-my-1.5 inline-flex items-center gap-1 py-1.5 font-mono text-[13px] text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition-colors hover:text-amber-200 hover:decoration-amber-200/60"
                    >
                      [link]
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Skills ── */}
        <section id="skills" data-label="Skills" className="space-y-6">
          <SectionHeading title="Skills" />

          <div className="space-y-5 text-[15px] leading-7 sm:space-y-4 sm:text-base">
            {resume.skills.map((skillGroup, idx) => {
              const Icon = skillIcons[skillGroup.category];
              return (
                <div key={idx} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="flex items-center gap-2 font-mono text-[13px] text-neutral-400 font-medium sm:w-40 sm:shrink-0 pt-1">
                    {Icon && <Icon className="h-4 w-4 shrink-0" />}
                    {skillGroup.category}
                  </span>
                  <span className="text-neutral-200">
                    {skillGroup.items.map((item, i) => (
                      <Fragment key={item}>
                        <span className="whitespace-nowrap">{item}</span>
                        {i < skillGroup.items.length - 1 && ", "}
                      </Fragment>
                    ))}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Finish line ── */}
        <section id="finish" data-label="Touchdown" className="space-y-3">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Touchdown on Mars.
          </h2>
          <p className="text-[15px] leading-7 text-neutral-300 sm:text-base">
            Thanks for flying along. Want to build something together? Say hi at{" "}
            <a
              href={`mailto:${resume.contact.email}`}
              className="[overflow-wrap:anywhere] text-amber-300 underline decoration-amber-300/40 underline-offset-4 transition-colors hover:text-amber-200 hover:decoration-amber-200"
            >
              {resume.contact.email}
            </a>
            .
          </p>
        </section>

        {/* ── Minimal Footer ── */}
        <footer className="pt-10 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px] font-mono text-neutral-400">
          <span>© {new Date().getFullYear()} {resume.name}</span>
          <div className="-my-2 flex items-center gap-5 sm:my-0 sm:gap-4">
            <a href={resume.contact.github.url} target="_blank" rel="noreferrer" className="py-2 hover:text-amber-200 transition-colors sm:py-0">
              GitHub
            </a>
            <span className="text-neutral-700 select-none">·</span>
            <a href={resume.contact.linkedin.url} target="_blank" rel="noreferrer" className="py-2 hover:text-amber-200 transition-colors sm:py-0">
              LinkedIn
            </a>
            <span className="text-neutral-700 select-none">·</span>
            <a href={`mailto:${resume.contact.email}`} className="py-2 hover:text-amber-200 transition-colors sm:py-0">
              Email
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}

function Points({ points, className = "" }: { points: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 sm:space-y-4 text-[15px] leading-[1.7] text-neutral-200 sm:text-base sm:leading-7 xl:text-[17px] xl:leading-8 ${className}`}>
      {points.map((pt, i) => (
        <li key={i} className="flex items-start gap-3 sm:gap-3.5">
          <span aria-hidden className="mt-[0.68rem] h-1 w-1 sm:mt-[0.7rem] shrink-0 rounded-full bg-neutral-500" />
          <span className="text-pretty">{pt}</span>
        </li>
      ))}
    </ul>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="relative text-lg sm:text-xl font-semibold tracking-tight text-white border-b border-neutral-800 pb-3 after:absolute after:-bottom-px after:left-0 after:h-px after:w-10 after:bg-amber-300/80">
      {title}
    </h2>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46V10.9M7.86 6.32a1.64 1.64 0 0 0-1.66 1.63 1.64 1.64 0 0 0 1.66 1.63 1.64 1.64 0 0 0 1.65-1.63 1.64 1.64 0 0 0-1.65-1.63z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
