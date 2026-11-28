"use client";

import { useEffect, useRef } from "react";
import {
  BriefcaseIcon,
  RocketIcon,
  TrophyIcon,
  CodeIcon,
} from "@/components/logos";
import { Earth, Mars } from "@/components/planets";
import ShipBody from "@/components/ship";
import { MarsMoons, OrbitingMoon } from "@/components/space-objects";

// Mission milestones, each pinned to its section heading. The last one is Mars.
const MILESTONES = [
  { id: "experience", Icon: BriefcaseIcon },
  { id: "projects", Icon: RocketIcon },
  { id: "achievements", Icon: TrophyIcon },
  { id: "skills", Icon: CodeIcon },
];
const SHIP_W = 16;
const SHIP_H = 56;
const LANDING_FLIP_AT = 0.96;
const PLANET_R = 20; // Earth / Mars radius in px // progress at which the ship flips to land

// Earth → Mars. A dotted trajectory runs down the left gutter from Earth
// (beside the name) to Mars (beside the closing section). The ship's position
// on the trajectory follows scroll progress, so it launches from Earth, passes
// each milestone exactly as it reaches that section, and lands on Mars at the
// bottom. It points the way it's travelling, flips upright for the landing
// burn, and its engine burns harder the faster you scroll.
export default function FlightPath() {
  const root = useRef<HTMLDivElement>(null);
  const ship = useRef<HTMLDivElement>(null);
  const flame = useRef<HTMLDivElement>(null);
  const path = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const earth = useRef<HTMLDivElement>(null);
  const mars = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootEl = root.current;
    const shipEl = ship.current;
    const flameEl = flame.current;
    const pathEl = path.current;
    const trailEl = trail.current;
    const earthEl = earth.current;
    const marsEl = mars.current;
    if (!rootEl || !shipEl || !flameEl || !pathEl || !trailEl || !earthEl || !marsEl) return;

    const markers = Array.from(rootEl.querySelectorAll<HTMLElement>("[data-marker]"));
    let earthY = 0;
    let marsY = 1;
    let docY: number[] = [];
    let raf = 0;
    let idleTimer = 0;
    let last = window.scrollY;
    let heading = 180; // 180 = nose down (towards Mars), 0 = nose up (towards Earth)

    const centreOf = (sel: string) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return r.top + window.scrollY + r.height / 2;
    };
    const maxScroll = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    const measure = () => {
      earthY = centreOf("main h1") ?? 80;
      marsY = centreOf("#finish h2") ?? document.documentElement.scrollHeight - 200;
      docY = MILESTONES.map(({ id }) => centreOf(`#${id} h2`) ?? Infinity);

      earthEl.style.top = `${earthY}px`;
      marsEl.style.top = `${marsY}px`;
      pathEl.style.top = `${earthY}px`;
      pathEl.style.height = `${marsY - earthY}px`;
      trailEl.style.top = `${earthY}px`;
      markers.forEach((m, i) => {
        if (Number.isFinite(docY[i])) m.style.top = `${docY[i]}px`;
      });
    };

    const burn = (speed: number) => {
      flameEl.style.opacity = "1";
      flameEl.style.transform = `translateX(-50%) scaleY(${0.7 + Math.min(speed / 30, 1) * 1.3})`;
    };
    const idle = () => {
      flameEl.style.opacity = "0.5";
      flameEl.style.transform = "translateX(-50%) scaleY(0.35)";
    };

    const update = () => {
      const y = window.scrollY;
      const progress = Math.min(Math.max(y / maxScroll(), 0), 1);
      const delta = y - last;
      last = y;

      // Nose points the way we're travelling; flip upright for the landing.
      if (progress >= LANDING_FLIP_AT) heading = 0;
      else if (delta > 0) heading = 180;
      else if (delta < 0) heading = 0;

      // Start just clear of Earth; end resting on top of Mars (engines down).
      const start = earthY + PLANET_R + 6 + SHIP_H / 2;
      const end = marsY - PLANET_R - SHIP_H / 2 + 2;
      const shipY = start + progress * (end - start);
      shipEl.style.transform = `translateY(${shipY - SHIP_H / 2}px) rotate(${heading}deg)`;
      trailEl.style.height = `${shipY - earthY}px`;

      markers.forEach((m, i) => {
        m.dataset.lit = docY[i] <= shipY + 1 ? "true" : "false";
      });
      marsEl.dataset.lit = progress >= 0.999 ? "true" : "false";

      if (delta !== 0) {
        burn(Math.abs(delta));
        window.clearTimeout(idleTimer);
        idleTimer = window.setTimeout(idle, 180);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onLayout = () => {
      measure();
      onScroll();
    };

    measure();
    idle();
    update();

    const ro = new ResizeObserver(onLayout);
    ro.observe(document.body);
    const settle = window.setTimeout(onLayout, 600);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onLayout);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onLayout);
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-14 z-0 hidden w-11 lg:block"
    >
      {/* dotted trajectory, Earth → Mars */}
      <div
        ref={path}
        className="absolute left-1/2 w-px -translate-x-1/2 opacity-70"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #71717a 0 2px, transparent 2px 10px)",
        }}
      />
      {/* gold trail: the part of the journey already flown */}
      <div
        ref={trail}
        className="absolute left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-sky-300/50 via-amber-300/50 to-amber-300/90 shadow-[0_0_6px_rgba(251,191,36,0.45)]"
      />

      {/* Earth: launch point, beside the name */}
      <div ref={earth} className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute right-[calc(100%+14px)] top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.2em] text-sky-300/60">
          EARTH
        </span>
        <Earth className="relative z-[1] h-10 w-10 drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]" />
        <OrbitingMoon />
      </div>

      {/* milestones: a node on the trajectory + a line out to its heading */}
      {MILESTONES.map(({ id, Icon }) => (
        <div
          key={id}
          data-marker
          data-lit="false"
          className="group absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="absolute left-[calc(50%+14px)] top-1/2 h-px w-[88px] bg-gradient-to-r from-neutral-700 to-transparent transition-colors duration-500 group-data-[lit=true]:from-amber-300/70" />
          <span className="relative grid h-7 w-7 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-500 transition-all duration-500 group-data-[lit=true]:border-amber-300 group-data-[lit=true]:text-amber-300 group-data-[lit=true]:shadow-[0_0_14px_2px_rgba(251,191,36,0.5)]">
            <Icon className="h-3.5 w-3.5" />
          </span>
        </div>
      ))}

      {/* Mars: destination, beside the closing section */}
      <div
        ref={mars}
        data-lit="false"
        className="group absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="absolute right-[calc(100%+14px)] top-1/2 -translate-y-1/2 font-mono text-[9px] tracking-[0.2em] text-orange-300/60">
          MARS
        </span>
        <span className="absolute left-[calc(50%+22px)] top-1/2 h-px w-[80px] bg-gradient-to-r from-orange-400/40 to-transparent transition-colors duration-500 group-data-[lit=true]:from-orange-300/80" />
        <Mars className="relative z-[1] h-10 w-10 drop-shadow-[0_0_8px_rgba(249,115,22,0.35)] transition-[filter] duration-700 group-data-[lit=true]:drop-shadow-[0_0_16px_rgba(249,115,22,0.7)]" />
        <MarsMoons />
      </div>

      {/* Starship-style ship (unrotated = nose up, engines down) */}
      <div
        ref={ship}
        className="absolute left-1/2 top-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{
          width: SHIP_W,
          height: SHIP_H,
          marginLeft: -SHIP_W / 2,
          filter: "drop-shadow(0 0 6px rgba(251,191,36,0.3))",
        }}
      >
        {/* engine plume */}
        <div
          ref={flame}
          className="absolute left-1/2 top-[52px] origin-top transition-[opacity,transform] duration-200"
          style={{ transform: "translateX(-50%)" }}
        >
          <div className="rocket-flame relative h-8 w-2.5">
            <span
              className="absolute -inset-x-1.5 inset-y-0 rounded-full opacity-70 blur-[5px]"
              style={{ background: "linear-gradient(to bottom, rgba(251,191,36,0.9), rgba(239,68,68,0))" }}
            />
            <span
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, #fffbeb 0%, #fde68a 22%, #f59e0b 55%, rgba(239,68,68,0) 100%)",
                borderRadius: "50% 50% 50% 50% / 18% 18% 82% 82%",
              }}
            />
          </div>
        </div>

        <ShipBody className="relative h-full w-full overflow-visible" />
      </div>
    </div>
  );
}
