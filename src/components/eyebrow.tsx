/** The `—— SECTION LABEL` marker that opens every band. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5">
      <span aria-hidden="true" className="h-px w-8 bg-dim" />
      <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
        {children}
      </span>
    </div>
  );
}
