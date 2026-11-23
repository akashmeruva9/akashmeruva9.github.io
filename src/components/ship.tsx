import { useId } from "react";

// Starship-style stainless ship, drawn nose up (engines at the bottom).
export default function ShipBody({ className }: { className?: string }) {
  const u = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg viewBox="0 0 16 56" className={className}>
      <defs>
        <linearGradient id={`steel${u}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#71717a" />
          <stop offset="0.35" stopColor="#e4e4e7" />
          <stop offset="0.55" stopColor="#fafafa" />
          <stop offset="0.85" stopColor="#a1a1aa" />
          <stop offset="1" stopColor="#52525b" />
        </linearGradient>
      </defs>
      {/* aft flaps */}
      <path d="M4.5 41 L1.6 44 L1.6 51 L4.5 50 Z" fill="#a1a1aa" />
      <path d="M11.5 41 L14.4 44 L14.4 51 L11.5 50 Z" fill="#a1a1aa" />
      {/* forward flaps */}
      <path d="M4.6 11.5 L2.6 14 L2.6 18 L4.6 17.5 Z" fill="#a1a1aa" />
      <path d="M11.4 11.5 L13.4 14 L13.4 18 L11.4 17.5 Z" fill="#a1a1aa" />
      {/* nose */}
      <path d="M4.5 13 C4.5 6.5 6.4 2.4 8 1.5 C9.6 2.4 11.5 6.5 11.5 13 Z" fill={`url(#steel${u})`} />
      {/* stainless body */}
      <rect x="4.5" y="12.5" width="7" height="39" fill={`url(#steel${u})`} />
      {/* heat-shield tiles on the windward side */}
      <path d="M4.5 9 C4.6 6 5.6 3.6 6.6 2.6 L6.6 51.5 L4.5 51.5 Z" fill="#1c1917" opacity="0.85" />
      {/* panel seams */}
      <g stroke="#52525b" strokeWidth="0.25" opacity="0.6">
        <path d="M4.5 22 H11.5 M4.5 31 H11.5 M4.5 40 H11.5" />
      </g>
      {/* engines */}
      <rect x="5" y="51.5" width="6" height="0.8" fill="#27272a" />
      <path d="M5.6 52.3 H7.4 L7.7 53.6 H5.3 Z M8.6 52.3 H10.4 L10.7 53.6 H8.3 Z" fill="#3f3f46" />
    </svg>  );
}
