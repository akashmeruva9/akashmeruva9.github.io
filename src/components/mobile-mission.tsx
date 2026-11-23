"use client";

import { useEffect, useRef } from "react";
import { Earth, Mars } from "@/components/planets";
import ShipBody from "@/components/ship";

// Phones and tablets only (desktop has the vertical flight path): a slim bar
// pinned to the top with Earth on the left, Mars on the right, and the ship
// flying between them as you read. It doubles as a reading-progress bar.
export default function MobileMission() {
  const ship = useRef<HTMLDivElement>(null);
  const flame = useRef<HTMLSpanElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const mars = useRef<HTMLDivElement>(null);
  const ctx = useRef<HTMLDivElement>(null);
  const ctxSection = useRef<HTMLSpanElement>(null);
  const ctxItem = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shipEl = ship.current;
    const flameEl = flame.current;
    const trailEl = trail.current;
    const marsEl = mars.current;
    const ctxEl = ctx.current;
    const ctxSectionEl = ctxSection.current;
    const ctxItemEl = ctxItem.current;
    if (
      !shipEl ||
      !flameEl ||
      !trailEl ||
      !marsEl ||
      !ctxEl ||
      !ctxSectionEl ||
      !ctxItemEl
    )
      return;

    // The reading line sits just under the bar + context row.
    const READ_LINE = 36 + 30 + 14;
    let shownSection = "";
    let shownItem = "";

    const updateContext = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main section[data-label]"),
      );
      let current: HTMLElement | null = null;
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= READ_LINE) current = sec;
      }
      // At the very end the last section can't reach the reading line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = sections[sections.length - 1];
      if (!current) {
        ctxEl.dataset.show = "false";
        return;
      }
      let item = "";
      for (const art of Array.from(
        current.querySelectorAll<HTMLElement>("article[data-context]"),
      )) {
        if (art.getBoundingClientRect().top <= READ_LINE)
          item = art.dataset.context ?? "";
      }
      const section = current.dataset.label ?? "";
      if (section !== shownSection) {
        ctxSectionEl.textContent = section;
        shownSection = section;
      }
      if (item !== shownItem) {
        ctxItemEl.textContent = item;
        ctxItemEl.parentElement!.dataset.hasItem = item ? "true" : "false";
        shownItem = item;
      }
      ctxEl.dataset.show = "true";
    };

    let raf = 0;
    let idleTimer = 0;
    let last = window.scrollY;
    let heading = 90; // 90 = nose right (towards Mars), -90 = nose left

    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      const delta = y - last;
      last = y;

      if (p >= 0.995) heading = 90;
      else if (delta > 0) heading = 90;
      else if (delta < 0) heading = -90;

      shipEl.style.left = `${p * 100}%`;
      shipEl.style.transform = `translate(-50%, -50%) rotate(${heading}deg)`;
      trailEl.style.width = `${p * 100}%`;
      marsEl.dataset.lit = p >= 0.995 ? "true" : "false";
      updateContext();

      if (delta !== 0) {
        flameEl.style.opacity = "1";
        flameEl.style.transform = `translateX(-50%) scaleY(${0.8 + Math.min(Math.abs(delta) / 30, 1)})`;
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(() => {
          flameEl.style.opacity = "0.45";
          flameEl.style.transform = "translateX(-50%) scaleY(0.5)";
        }, 180);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* context row: which section + which item you're reading */}
      <div
        ref={ctx}
        data-show="false"
        className="pointer-events-none fixed inset-x-0 top-9 z-40 flex h-[30px] -translate-y-full items-center border-b border-white/[0.06] bg-[#0a0a0c]/85 px-5 opacity-0 backdrop-blur-md transition-[transform,opacity] duration-300 data-[show=true]:translate-y-0 data-[show=true]:opacity-100 motion-reduce:transition-none lg:hidden"
      >
        <p
          data-has-item="false"
          className="group flex min-w-0 items-baseline gap-2"
        >
          <span
            ref={ctxSection}
            className="shrink-0 font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-amber-300/90"
          />
          <span
            aria-hidden
            className="hidden text-neutral-600 group-data-[has-item=true]:inline"
          >
            ·
          </span>
          <span
            ref={ctxItem}
            className="truncate text-[13px] text-neutral-200"
          />
        </p>
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex h-9 items-center gap-3 border-b border-white/[0.06] bg-[#0a0a0c]/80 px-5 backdrop-blur-md lg:hidden"
      >
        <Earth className="h-[18px] w-[18px] shrink-0 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" />

        <div className="relative h-full flex-1">
          {/* dotted route */}
          <div
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 opacity-70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, #71717a 0 2px, transparent 2px 8px)",
            }}
          />
          {/* distance flown */}
          <div
            ref={trail}
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-sky-300/60 via-amber-300/80 to-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.6)]"
            style={{ width: 0 }}
          />
          {/* ship (drawn nose up; rotated to point along the route) */}
          <div
            ref={ship}
            className="absolute top-1/2 h-[24px] w-[7px] transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              left: 0,
              transform: "translate(-50%, -50%) rotate(90deg)",
            }}
          >
            <span
              ref={flame}
              className="rocket-flame absolute left-1/2 top-[22px] h-3 w-[5px] origin-top rounded-b-full opacity-45"
              style={{
                transform: "translateX(-50%) scaleY(0.5)",
                background:
                  "linear-gradient(to bottom, #fffbeb, #fbbf24 45%, rgba(239,68,68,0))",
              }}
            />
            <ShipBody className="relative h-full w-full overflow-visible" />
          </div>
        </div>

        <div ref={mars} data-lit="false" className="group shrink-0">
          <Mars className="h-[18px] w-[18px] drop-shadow-[0_0_4px_rgba(249,115,22,0.4)] transition-[filter] duration-500 group-data-[lit=true]:drop-shadow-[0_0_9px_rgba(249,115,22,0.85)]" />
        </div>
      </div>
    </>
  );
}
