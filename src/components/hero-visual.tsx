"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js is ~600KB — keep it out of the initial bundle and off the server
// (there is no server here anyway: the site is statically exported).
const ComputerScene = dynamic(() => import("./computer-scene"), {
  ssr: false,
  loading: () => <Placeholder />,
});

/** Flat stand-in shown while three.js loads, or if WebGL is unavailable. */
function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[68%] max-w-sm rounded-lg border border-line bg-card/60 p-4">
        <div className="flex gap-1.5 pb-3">
          <i className="h-2 w-2 rounded-full bg-dim/60" />
          <i className="h-2 w-2 rounded-full bg-dim/60" />
          <i className="h-2 w-2 rounded-full bg-dim/60" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded bg-line" />
          <div className="h-2 w-1/2 rounded bg-line" />
          <div className="h-2 w-2/3 rounded bg-line" />
          <div className="h-2 w-1/3 rounded bg-accent/40" />
        </div>
      </div>
    </div>
  );
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function HeroVisual() {
  // Mount only after we know the browser can actually render it.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Deliberately after mount: the check needs a browser, and running it
    // during render would disagree with the prerendered HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(hasWebGL());
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative h-[46vh] min-h-[280px] w-full lg:h-[76vh]"
    >
      {ready ? <ComputerScene /> : <Placeholder />}
    </div>
  );
}
