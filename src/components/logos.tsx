type P = { className?: string };

// Autodesk mark (Simple Icons, CC0), tinted to match the dark theme.
export function AutodeskLogo({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="#e4e4e7" aria-label="Autodesk" role="img" className={className}>
      <path d="m.129 20.202 14.7-9.136h7.625c.235 0 .445.188.445.445 0 .21-.092.305-.21.375l-7.222 4.323c-.47.283-.633.845-.633 1.265l-.008 2.725H24V4.362a.561.561 0 0 0-.585-.562h-8.752L0 12.893V20.2h.129z" />
    </svg>
  );
}

// Google Summer of Code sun mark.
export function GsocLogo({ className }: P) {
  return (
    <svg viewBox="0 0 25 25" aria-label="Google Summer of Code" role="img" className={className}>
      <path fill="#F9AB00" d="M8.8,21.3l3.7,3.7l3.7-3.7h5.2v-5.2l3.7-3.7l-3.7-3.7V3.6h-5.2L12.5,0l-1,1L9.6,2.9L8.8,3.6H3.7v5.2L0,12.5 l2.9,2.9l0.8,0.8v5.2H8.8z" />
      <path fill="#E37400" d="M19.7,12.5c0,4-3.2,7.2-7.2,7.2s-7.2-3.2-7.2-7.2s3.2-7.2,7.2-7.2C16.5,5.3,19.7,8.5,19.7,12.5z" />
      <path fill="#FFFFFF" d="M11.2,15.5l1.8-6.6l1,0.3l-1.8,6.6L11.2,15.5z" />
      <path fill="#FFFFFF" d="M10,10l0.8,0.7l-1.5,1.7l1.5,1.7L10,14.7l-2.1-2.3C7.9,12.3,10,10,10,10z M15,10l2.1,2.3L15,14.6L14.3,14l1.5-1.7l-1.5-1.7C14.3,10.6,15,10,15,10z" />
    </svg>
  );
}


export const jobLogos = { autodesk: AutodeskLogo, gsoc: GsocLogo } as const;
export type JobLogo = keyof typeof jobLogos;

// ── Generic line icons (Lucide-style, stroke = currentColor) ──
function Line({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {children}
    </svg>
  );
}

export const PinIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Line>
);

export const TrophyIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </Line>
);

export const PlayIcon = ({ className }: P) => (
  <Line className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m10 8 6 4-6 4V8Z" />
  </Line>
);

export const ExternalIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M15 3h6v6M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </Line>
);

export const CodeIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Line>
);

export const BotIcon = ({ className }: P) => (
  <Line className={className}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4M8 16h.01M16 16h.01" />
  </Line>
);

export const WrenchIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </Line>
);

export const CloudIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </Line>
);


export const skillIcons: Record<string, (p: P) => React.JSX.Element> = {
  Languages: CodeIcon,
  "Agentic AI": BotIcon,
  "AI Tools": WrenchIcon,
  Cloud: CloudIcon,
};

export const linkIcons: Record<string, (p: P) => React.JSX.Element> = {
  "Pitch Video": PlayIcon,
  Live: ExternalIcon,
};

export const BriefcaseIcon = ({ className }: P) => (
  <Line className={className}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Line>
);

export const RocketIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </Line>
);


export const FlagIcon = ({ className }: P) => (
  <Line className={className}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
  </Line>
);
