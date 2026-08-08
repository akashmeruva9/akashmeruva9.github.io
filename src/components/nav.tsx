"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

const LINKS = [
  { n: "01", label: "Work", href: "#work" },
  { n: "02", label: "Experience", href: "#experience" },
  { n: "03", label: "About", href: "#about" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <a href="#top" className="font-mono text-sm tracking-tight">
          {site.handle.split(".")[0]}
          <span className="text-accent">.</span>
          {site.handle.split(".")[1]}
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-mono text-sm text-muted transition-colors hover:text-ink"
            >
              <span className="mr-1.5 text-xs text-dim transition-colors group-hover:text-accent">
                {link.n}
              </span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden font-mono text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            Résumé
          </a>
          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-md border border-line px-3.5 py-2 font-mono text-sm text-ink transition-colors hover:border-accent hover:text-accent sm:block"
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="p-1 text-muted md:hidden"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-bg/95 px-6 py-4 backdrop-blur-md md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 font-mono text-sm text-muted"
            >
              <span className="mr-2 text-xs text-dim">{link.n}</span>
              {link.label}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="block py-2.5 font-mono text-sm text-muted"
          >
            <span className="mr-2 text-xs text-dim">04</span>Résumé
          </a>
          <a
            href={`mailto:${site.email}`}
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-md border border-line px-3.5 py-2.5 text-center font-mono text-sm text-ink"
          >
            Get in touch
          </a>
        </nav>
      )}
    </header>
  );
}
