// A sparse night sky across the top of the page. It lives in the page (not
// fixed), so it scrolls away and fades out as you head down the road.
// Star positions come from a seeded PRNG, so server and client render the same.

import { CrescentMoon } from "@/components/space-objects";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20031);
const STARS = Array.from({ length: 70 }, (_, i) => {
  const size = rand() < 0.15 ? 2 : rand() < 0.5 ? 1.5 : 1;
  return {
    left: rand() * 100,
    top: Math.pow(rand(), 1.6) * 100, // denser near the top
    size,
    warm: rand() < 0.2, // a few gold-tinted stars
    opacity: 0.35 + rand() * 0.5,
    twinkle: i % 5 === 0, // every fifth star twinkles slowly
    delay: rand() * 6,
    duration: 4 + rand() * 4,
  };
});

// Fainter stars clustered along a gentle diagonal band (the Milky Way).
const BAND = Array.from({ length: 90 }, () => {
  const x = rand() * 100;
  const spread = (rand() + rand() + rand() - 1.5) * 9; // roughly gaussian
  return {
    left: x,
    top: 12 + x * 0.32 + spread,
    size: rand() < 0.2 ? 1.5 : 1,
    opacity: 0.15 + rand() * 0.35,
  };
}).filter((s) => s.top > 0 && s.top < 70);

// Two shooting stars on 40s cycles, offset by 20s, so one appears roughly
// every 20 seconds, each in a different part of the sky.
const SHOOTERS = [
  { top: "9%", left: "52%", angle: 24, delay: 5 },
  { top: "16%", left: "18%", angle: 18, delay: 25 },
];

export default function NightSky() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[70vh] overflow-hidden sm:h-[95vh]"
      style={{
        maskImage: "linear-gradient(to bottom, #000 0%, #000 30%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 0%, #000 30%, transparent 100%)",
      }}
    >
      {/* Milky Way glow */}
      <div
        className="absolute -left-[10%] top-[2%] h-[38%] w-[120%] rotate-[18deg] opacity-80 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(253,230,138,0.05), rgba(244,244,245,0.025) 45%, transparent 75%)",
        }}
      />
      {BAND.map((s, i) => (
        <span
          key={`b${i}`}
          className="absolute rounded-full bg-zinc-100"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, opacity: s.opacity }}
        />
      ))}

      {/* satellite drifting across the sky with a blinking light */}
      <div className="satellite absolute left-0 top-[24%]">
        <span className="satellite-light block h-[2px] w-[2px] rounded-full bg-zinc-100" />
      </div>

      {STARS.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${s.twinkle ? "star-twinkle" : ""}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            background: s.warm ? "#fde68a" : "#f4f4f5",
            boxShadow: s.size > 1.5 ? `0 0 4px ${s.warm ? "rgba(253,230,138,0.6)" : "rgba(244,244,245,0.5)"}` : undefined,
            animationDelay: s.twinkle ? `${s.delay}s` : undefined,
            animationDuration: s.twinkle ? `${s.duration}s` : undefined,
          }}
        />
      ))}

      {/* a faint crescent Moon, cropped by the right edge (md+ on tall screens) */}
      <CrescentMoon />

      {SHOOTERS.map((s, i) => (
        <div
          key={i}
          className="absolute"
          style={{ top: s.top, left: s.left, transform: `rotate(${s.angle}deg)` }}
        >
          <span className="shooting-star" style={{ animationDelay: `${s.delay}s` }} />
        </div>
      ))}
    </div>
  );
}
