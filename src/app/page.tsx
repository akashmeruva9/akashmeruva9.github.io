import { resume } from "@/content/site";

function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="text-white font-medium">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#d4d4d8] antialiased selection:bg-neutral-800 selection:text-white">
      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20 space-y-12">
        
        {/* ── Header / Profile ── */}
        <header className="space-y-4 border-b border-neutral-800 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white font-sans">
                {resume.name}
              </h1>
              <p className="mt-1 text-base text-neutral-400">
                {resume.role} —{" "}
                <span className="text-neutral-200 font-medium">
                  {resume.company}
                </span>
              </p>
            </div>
          </div>

          {/* Contact Bar matching resume header */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-mono text-neutral-400">
            <a
              href={resume.contact.github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <GitHubIcon className="h-3.5 w-3.5 text-neutral-400" />
              <span>/github {resume.contact.github.username}</span>
            </a>

            <span className="text-neutral-700 select-none">|</span>

            <a
              href={resume.contact.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <LinkedInIcon className="h-3.5 w-3.5 text-neutral-400" />
              <span>/linkedin {resume.contact.linkedin.username}</span>
            </a>

            <span className="text-neutral-700 select-none">|</span>

            <a
              href={`mailto:${resume.contact.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <MailIcon className="h-3.5 w-3.5 text-neutral-400" />
              <span>{resume.contact.email}</span>
            </a>
          </div>
        </header>

        {/* ── Work Experience ── */}
        <section className="space-y-6">
          <SectionHeading title="Work Experience" />

          <div className="space-y-8">
            {resume.experience.map((job, idx) => (
              <article key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="text-base font-medium text-white">
                    {job.role} —{" "}
                    <span className="text-neutral-300 font-normal">
                      {job.company}
                    </span>
                  </h3>
                  <span className="font-mono text-xs text-neutral-400 whitespace-nowrap">
                    {job.period}
                  </span>
                </div>

                <p className="text-xs text-neutral-500 font-mono">
                  {job.location}
                </p>

                <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-neutral-300">
                  {job.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-neutral-500 mt-1 select-none leading-none">•</span>
                      <span>
                        <FormattedText text={pt} />
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section className="space-y-6">
          <SectionHeading title="Projects" />

          <div className="space-y-8">
            {resume.projects.map((proj, idx) => (
              <article key={idx} className="space-y-2.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                  <h3 className="text-base font-medium text-white">
                    {proj.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    {proj.links.map((link, lIdx) => (
                      <span key={lIdx} className="inline-flex items-center gap-2">
                        {lIdx > 0 && <span className="text-neutral-700 select-none">|</span>}
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-400 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white hover:decoration-neutral-400"
                        >
                          {link.label}
                        </a>
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-2 text-sm leading-relaxed text-neutral-300">
                  {proj.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <span className="text-neutral-500 mt-1 select-none leading-none">•</span>
                      <span>
                        <FormattedText text={pt} />
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ── Achievements ── */}
        <section className="space-y-4">
          <SectionHeading title="Achievements" />

          <ul className="space-y-2.5 text-sm leading-relaxed text-neutral-300">
            {resume.achievements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-neutral-500 mt-1 select-none leading-none">•</span>
                <span>
                  <FormattedText text={item.text} />{" "}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition-colors hover:text-white hover:decoration-neutral-400"
                    >
                      [link]
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Education ── */}
        <section className="space-y-4">
          <SectionHeading title="Education" />

          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-sm">
            <div>
              <p className="text-white font-medium">
                {resume.education.degree}{" "}
                <span className="text-neutral-400 font-normal">
                  at {resume.education.institution}
                </span>
              </p>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                {resume.education.grade}
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-400 whitespace-nowrap">
              {resume.education.period}
            </span>
          </div>
        </section>

        {/* ── Skills ── */}
        <section className="space-y-4">
          <SectionHeading title="Skills" />

          <div className="space-y-2.5 text-sm leading-relaxed">
            {resume.skills.map((skillGroup, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:gap-2">
                <span className="font-mono text-xs text-neutral-400 font-medium sm:w-28 sm:shrink-0 pt-0.5">
                  {skillGroup.category} :
                </span>
                <span className="text-neutral-200">
                  {skillGroup.items.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Minimal Footer ── */}
        <footer className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono text-neutral-400">
          <span>© {new Date().getFullYear()} {resume.name}</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/akashmeruva9"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-neutral-700 select-none">·</span>
            <a
              href="https://www.linkedin.com/in/akash-meruva-ab1420222"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-neutral-700 select-none">·</span>
            <a
              href={`mailto:${resume.contact.email}`}
              className="hover:text-white transition-colors"
            >
              Email
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-semibold tracking-tight text-white border-b border-neutral-800 pb-2">
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
