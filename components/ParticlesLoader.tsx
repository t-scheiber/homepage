"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const Particles = lazy(() => import("@/components/Particles"));

// Decoration only: load it after the page is idle, on wide screens with a fine
// pointer, and never when the visitor prefers reduced motion.
export default function ParticlesLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const allowed = window.matchMedia(
      "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!allowed.matches) return;
    const idle =
      window.requestIdleCallback ??
      ((callback: () => void) => window.setTimeout(callback, 1500));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => setReady(true));
    return () => cancel(handle);
  }, []);
  return (
    <div className="particles-layer" aria-hidden="true">
      {ready && (
        <Suspense fallback={null}>
          <Particles id="tsparticles" />
        </Suspense>
      )}
    </div>
  );
}
