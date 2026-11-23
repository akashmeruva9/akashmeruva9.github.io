// Small planets for the flight path, lit from the upper left. Land masses and
// clouds are procedural (SVG fractal noise), so they read as natural terrain
// rather than drawn shapes.

import { useId } from "react";

type P = { className?: string };

// SVG ids must be unique per instance (planets render in more than one place).
const useSvgId = () => useId().replace(/[^a-zA-Z0-9]/g, "");

export function Earth({ className }: P) {
  const u = useSvgId();
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <defs>
        <radialGradient id={`eOcean${u}`} cx="34%" cy="30%" r="78%">
          <stop offset="0" stopColor="#3b82f6" />
          <stop offset="0.4" stopColor="#1d4ed8" />
          <stop offset="0.75" stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#0b1533" />
        </radialGradient>
        <radialGradient id={`eShade${u}`} cx="30%" cy="26%" r="82%">
          <stop offset="0.42" stopColor="#020617" stopOpacity="0" />
          <stop offset="0.72" stopColor="#020617" stopOpacity="0.55" />
          <stop offset="0.95" stopColor="#020617" stopOpacity="0.92" />
        </radialGradient>
        <radialGradient id={`eGlint${u}`} cx="32%" cy="28%" r="22%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`eLimb${u}`} cx="50%" cy="50%" r="50%">
          <stop offset="0.86" stopColor="#7dd3fc" stopOpacity="0" />
          <stop offset="0.97" stopColor="#7dd3fc" stopOpacity="0.55" />
          <stop offset="1" stopColor="#bae6fd" stopOpacity="0.9" />
        </radialGradient>
        {/* land: thresholded fractal noise, olive green */}
        <filter id={`eLand${u}`} x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.085" numOctaves="4" seed="11" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.24  0 0 0 0 0.36  0 0 0 0 0.17  13 0 0 0 -7.1"
          />
        </filter>
        {/* arid patches inside the land */}
        <filter id={`eDesert${u}`} x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.085" numOctaves="4" seed="11" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.62  0 0 0 0 0.52  0 0 0 0 0.32  16 0 0 0 -10"
          />
        </filter>
        {/* clouds: finer noise, soft white wisps */}
        <filter id={`eCloud${u}`} x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.14 0.24" numOctaves="4" seed="4" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  4 0 0 0 -2.05"
          />
          <feGaussianBlur stdDeviation="0.35" />
        </filter>
        <clipPath id={`eClip${u}`}>
          <circle cx="20" cy="20" r="18.5" />
        </clipPath>
      </defs>

      <g clipPath={`url(#eClip${u})`}>
        <rect width="40" height="40" fill={`url(#eOcean${u})`} />
        <rect width="40" height="40" filter={`url(#eLand${u})`} />
        <rect width="40" height="40" filter={`url(#eDesert${u})`} opacity="0.55" />
        <rect width="40" height="40" filter={`url(#eCloud${u})`} opacity="0.85" />
        <rect width="40" height="40" fill={`url(#eGlint${u})`} />
        <rect width="40" height="40" fill={`url(#eShade${u})`} />
        <circle cx="20" cy="20" r="18.5" fill={`url(#eLimb${u})`} />
      </g>
    </svg>
  );
}

export function Mars({ className }: P) {
  const u = useSvgId();
  return (
    <svg viewBox="0 0 40 40" className={className}>
      <defs>
        <radialGradient id={`mSurface${u}`} cx="34%" cy="30%" r="78%">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="0.35" stopColor="#ea580c" />
          <stop offset="0.75" stopColor="#9a3412" />
          <stop offset="1" stopColor="#431407" />
        </radialGradient>
        <radialGradient id={`mShade${u}`} cx="30%" cy="26%" r="82%">
          <stop offset="0.42" stopColor="#1c0a05" stopOpacity="0" />
          <stop offset="0.72" stopColor="#1c0a05" stopOpacity="0.5" />
          <stop offset="0.95" stopColor="#1c0a05" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id={`mLimb${u}`} cx="50%" cy="50%" r="50%">
          <stop offset="0.88" stopColor="#fdba74" stopOpacity="0" />
          <stop offset="1" stopColor="#fed7aa" stopOpacity="0.55" />
        </radialGradient>
        {/* dark albedo regions */}
        <filter id={`mDark${u}`} x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.07 0.11" numOctaves="4" seed="23" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.32  0 0 0 0 0.1  0 0 0 0 0.04  6 0 0 0 -3.1"
          />
        </filter>
        {/* fine dust texture */}
        <filter id={`mDust${u}`} x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" seed="5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 0.8  0 0 0 0 0.6  1.2 0 0 0 -0.55"
          />
        </filter>
        <filter id={`mSoft${u}`}>
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <clipPath id={`mClip${u}`}>
          <circle cx="20" cy="20" r="18.5" />
        </clipPath>
      </defs>

      <g clipPath={`url(#mClip${u})`}>
        <rect width="40" height="40" fill={`url(#mSurface${u})`} />
        <rect width="40" height="40" filter={`url(#mDark${u})`} opacity="0.8" />
        <rect width="40" height="40" filter={`url(#mDust${u})`} opacity="0.25" />
        <ellipse cx="21" cy="2.5" rx="6.5" ry="2.6" fill="#fff7ed" opacity="0.85" filter={`url(#mSoft${u})`} />
        <rect width="40" height="40" fill={`url(#mShade${u})`} />
        <circle cx="20" cy="20" r="18.5" fill={`url(#mLimb${u})`} />
      </g>
    </svg>
  );
}
