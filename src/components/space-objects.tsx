// Small, quiet space objects along the Earth → Mars journey. Pure SVG/CSS,
// every one aria-hidden and click-through. No "use client": this file is
// rendered by the server page and imported by client components too.
// Keyframes (.orbit, .comet-drift, .tumble, .moon-fade) live in globals.css.

import type { CSSProperties, ReactNode } from "react";
import { useSvgId } from "@/components/planets";

const DECOR = "pointer-events-none select-none";

/* ───────────────────────── Page-edge glows ───────────────────────── */

// Faint blue light spilling down from the top-left, where Earth is.
export function EarthGlow() {
  return (
    <div
      aria-hidden
      className={`${DECOR} absolute inset-x-0 top-0 z-0 h-[60svh]`}
      style={{
        background:
          "radial-gradient(ellipse 55% 60% at 8% 0%, rgba(29,78,216,.07), transparent 70%)",
      }}
    />
  );
}

// Mars rising over the bottom edge: a warm glow plus a thin limb arc.
export function MarsHorizon() {
  return (
    <div
      aria-hidden
      className={`${DECOR} absolute inset-x-0 bottom-0 z-0 h-[28svh] overflow-hidden lg:h-[38svh]`}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(194,65,12,.14), rgba(154,52,18,.06) 40%, transparent 75%)",
        }}
      />
      {/* limb: top edge of a very wide, flat ellipse, 40px above the page bottom */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 30%, #000 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 30%, #000 70%, transparent)",
        }}
      >
        <div
          className="absolute left-1/2 top-[calc(100%-40px)] h-[40vw] w-[220vw] -translate-x-1/2 rounded-[50%] border-t"
          style={{ borderColor: "rgba(253,186,116,.18)" }}
        />
      </div>
    </div>
  );
}

/* ───────────────────────── Crescent Moon (sky) ───────────────────────── */

const MARIA = [
  { cx: 30, cy: 36, rx: 9, ry: 7, o: 0.55 },
  { cx: 22, cy: 52, rx: 7, ry: 10, o: 0.5 },
  { cx: 34, cy: 62, rx: 8, ry: 6, o: 0.45 },
  { cx: 44, cy: 44, rx: 6, ry: 5, o: 0.35 },
  { cx: 26, cy: 72, rx: 5, ry: 4, o: 0.4 },
];
const CRATERS = [
  { cx: 18, cy: 40, r: 2.2 },
  { cx: 28, cy: 80, r: 3 },
  { cx: 14, cy: 62, r: 1.6 },
  { cx: 38, cy: 26, r: 1.8 },
];

export function CrescentMoon() {
  const u = useSvgId();
  return (
    <div
      aria-hidden
      className={`${DECOR} absolute hidden opacity-20 md:top-10 md:-right-[50px] md:h-[150px] md:w-[150px] md:tall:block lg:top-10 lg:-right-[70px] lg:h-[220px] lg:w-[220px] xl:top-8 xl:-right-[90px] xl:h-[280px] xl:w-[280px]`}
    >
      <div className="moon-fade h-full w-full">
        <svg viewBox="0 0 100 100" width="150" height="150" className="h-full w-full">
          <defs>
            <radialGradient id={`mnLit${u}`} cx="30%" cy="35%" r="75%">
              <stop offset="0" stopColor="#e7e5e4" />
              <stop offset="1" stopColor="#a8a29e" />
            </radialGradient>
            <radialGradient id={`mnMare${u}`}>
              <stop offset="0" stopColor="#57534e" stopOpacity="1" />
              <stop offset="1" stopColor="#57534e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`mnCrater${u}`}>
              <stop offset="0" stopColor="#57534e" stopOpacity="0.9" />
              <stop offset="0.7" stopColor="#78716c" stopOpacity="0.4" />
              <stop offset="1" stopColor="#e7e5e4" stopOpacity="0" />
            </radialGradient>
            {/* soft terminator: black core fading to white at the edge */}
            <radialGradient id={`mnTerm${u}`}>
              <stop offset="0" stopColor="#000" />
              <stop offset="0.9" stopColor="#000" />
              <stop offset="1" stopColor="#fff" />
            </radialGradient>
            <mask id={`mnMask${u}`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
              <circle cx="50" cy="50" r="48" fill="#fff" />
              <circle cx="66" cy="45" r="50" fill={`url(#mnTerm${u})`} />
            </mask>
          </defs>

          {/* earthshine on the dark side */}
          <circle cx="50" cy="50" r="48" fill="#93c5fd" opacity="0.05" />

          <g mask={`url(#mnMask${u})`}>
            <circle cx="50" cy="50" r="48" fill={`url(#mnLit${u})`} />
            {MARIA.map((m, i) => (
              <ellipse
                key={i}
                cx={m.cx}
                cy={m.cy}
                rx={m.rx}
                ry={m.ry}
                fill={`url(#mnMare${u})`}
                opacity={m.o}
              />
            ))}
            {CRATERS.map((c, i) => (
              <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill={`url(#mnCrater${u})`} />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ───────────────────────── Orbiting moons (flight path) ───────────────────────── */

// An ellipse centred on (0,0), tilted by `tilt` degrees, as two arcs. It
// starts at the right end and sweeps clockwise, so 0–50% is the near (lower)
// half and 50–100% is the far half, where the moon passes behind the planet.
function ends(rx: number, tilt: number) {
  const t = (tilt * Math.PI) / 180;
  const x = +(rx * Math.cos(t)).toFixed(2);
  const y = +(rx * Math.sin(t)).toFixed(2);
  return { x, y };
}
function orbitPath(rx: number, ry: number, tilt: number) {
  const { x, y } = ends(rx, tilt);
  return `M ${x} ${y} A ${rx} ${ry} ${tilt} 1 1 ${-x} ${-y} A ${rx} ${ry} ${tilt} 1 1 ${x} ${y} Z`;
}

type OrbitSpec = {
  rx: number;
  ry: number;
  tilt: number;
  size: number;
  duration: number;
  delay: number;
  light: string;
  dark: string;
  ring: string;
};

// The ring's far half sits under the planet (z-0); its near half and the moon
// (on the near side) sit over it (z-[2]). The planet itself is z-[1].
function Orbit({ o }: { o: OrbitSpec }) {
  const { x, y } = ends(o.rx, o.tilt);
  const ring = (
    <ellipse
      rx={o.rx}
      ry={o.ry}
      transform={`rotate(${o.tilt})`}
      fill="none"
      stroke={o.ring}
      strokeWidth="0.5"
    />
  );
  const style: CSSProperties = {
    width: o.size,
    height: o.size,
    offsetPath: `path("${orbitPath(o.rx, o.ry, o.tilt)}")`,
    animationDuration: `${o.duration}s`,
    animationDelay: `${o.delay}s`,
    background: `radial-gradient(circle at 35% 30%, ${o.light}, ${o.dark})`,
  };
  return (
    <>
      <svg
        width="80"
        height="80"
        viewBox="-40 -40 80 80"
        className="absolute -left-10 -top-10 z-0 overflow-visible"
      >
        {ring}
      </svg>
      <svg
        width="80"
        height="80"
        viewBox="-40 -40 80 80"
        className="absolute -left-10 -top-10 z-[2] overflow-visible"
      >
        <path
          d={`M ${x} ${y} A ${o.rx} ${o.ry} ${o.tilt} 0 1 ${-x} ${-y}`}
          fill="none"
          stroke={o.ring}
          strokeWidth="0.5"
        />
      </svg>
      <span className="orbit absolute left-0 top-0 block rounded-full" style={style} />
    </>
  );
}

// 0×0 box at the planet's centre, with no transform or z-index, so the moons'
// z-index competes with the planet inside the marker's stacking context.
function OrbitOrigin({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden className={`${DECOR} absolute left-1/2 top-1/2 h-0 w-0`}>
      {children}
    </div>
  );
}

export function OrbitingMoon() {
  return (
    <OrbitOrigin>
      <Orbit
        o={{
          rx: 28,
          ry: 8,
          tilt: -18,
          size: 5,
          duration: 40,
          delay: -12,
          light: "#e4e4e7",
          dark: "#71717a",
          ring: "rgba(161,161,170,.18)",
        }}
      />
    </OrbitOrigin>
  );
}

export function MarsMoons() {
  const ring = "rgba(253,186,116,.15)";
  return (
    <OrbitOrigin>
      {/* Phobos */}
      <Orbit
        o={{ rx: 26, ry: 7, tilt: -12, size: 4, duration: 9, delay: -2, light: "#a8a29e", dark: "#57534e", ring }}
      />
      {/* Deimos */}
      <Orbit
        o={{ rx: 32, ry: 9, tilt: -12, size: 3, duration: 26, delay: -17, light: "#78716c", dark: "#44403c", ring }}
      />
    </OrbitOrigin>
  );
}

/* ───────────────────────── Comet (Projects heading) ───────────────────────── */

export function Comet() {
  const u = useSvgId();
  return (
    <span
      aria-hidden
      className={`${DECOR} absolute bottom-[14px] right-[4%] -z-10 block opacity-55 sm:right-[8%] lg:right-[14%]`}
    >
      <span className="comet-drift block">
        <svg
          viewBox="0 0 220 48"
          width="220"
          height="48"
          className="block h-8 w-[140px] sm:h-10 sm:w-[180px] lg:h-12 lg:w-[220px]"
        >
          <defs>
            <linearGradient id={`cIon${u}`} gradientUnits="userSpaceOnUse" x1="14" y1="10" x2="214" y2="30">
              <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.45" />
              <stop offset="1" stopColor="#7dd3fc" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`cDust${u}`} gradientUnits="userSpaceOnUse" x1="14" y1="10" x2="196" y2="44">
              <stop offset="0" stopColor="#fde68a" stopOpacity="0.35" />
              <stop offset="1" stopColor="#fde68a" stopOpacity="0" />
            </linearGradient>
            <radialGradient id={`cComa${u}`}>
              <stop offset="0" stopColor="#e0f2fe" stopOpacity="0.6" />
              <stop offset="1" stopColor="#e0f2fe" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* dust tail: a broad, gently curved wedge */}
          <path d="M14 10 Q 100 22 196 46 L 200 36 Q 104 18 14 10 Z" fill={`url(#cDust${u})`} />
          {/* ion tail: thin and straight */}
          <path d="M14 10 L 214 30" stroke={`url(#cIon${u})`} strokeWidth="1" strokeLinecap="round" fill="none" />
          <circle cx="14" cy="10" r="7" fill={`url(#cComa${u})`} />
          <circle cx="14" cy="10" r="1.5" fill="#f8fafc" />
        </svg>
      </span>
    </span>
  );
}

/* ───────────────────────── Asteroid pair (Achievements heading) ───────────────────────── */

function Rock({ d, className, style }: { d: string; className: string; style?: CSSProperties }) {
  const u = useSvgId();
  return (
    <span className="tumble block" style={style}>
      <svg viewBox="0 0 24 24" width="22" height="22" className={`block ${className}`}>
        <defs>
          <radialGradient id={`aRock${u}`} cx="32%" cy="28%" r="80%">
            <stop offset="0" stopColor="#a8a29e" />
            <stop offset="1" stopColor="#44403c" />
          </radialGradient>
        </defs>
        <path d={d} fill={`url(#aRock${u})`} />
        <circle cx="9" cy="13" r="1.6" fill="#292524" />
        <circle cx="15" cy="9" r="1.1" fill="#292524" />
      </svg>
    </span>
  );
}

export function AsteroidPair() {
  return (
    <span
      aria-hidden
      className={`${DECOR} absolute bottom-[16px] right-[6%] -z-10 block opacity-50 lg:right-[18%]`}
    >
      <span className="relative block">
        <Rock
          d="M5 8 L10 3.5 L16 4 L21 8.5 L20.5 15 L17 20 L10.5 21 L5 17.5 L3.5 12.5 Z"
          className="h-4 w-4 lg:h-[22px] lg:w-[22px]"
          style={{ animationDuration: "60s" }}
        />
        <span className="absolute -left-3 -top-2 block lg:-left-4 lg:-top-3">
          <Rock
            d="M4 9 L9 4 L15 3 L20 7 L21 13 L18 19 L12 21 L6 19 L3 14 Z"
            className="h-1.5 w-1.5 lg:h-2 lg:w-2"
            style={{ animationDuration: "38s", animationDirection: "reverse" }}
          />
        </span>
      </span>
    </span>
  );
}
