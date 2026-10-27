"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { useMemo, useSyncExternalStore } from "react";
import { useTheme } from "@/lib/theme";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToMotion = (notify: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotion = () => true;

const initParticles = async (engine: Parameters<typeof loadSlim>[0]) => {
  await loadSlim(engine);
};

interface ParticlesComponentProps {
  id?: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = (props) => {
  const theme = useTheme();
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }, []);

  const options = useMemo(
    () => ({
      autoPlay: true,
      fullScreen: {
        enable: true,
        zIndex: -1,
      },
      interactivity: {
        events: {
          onClick: {
            enable: !isMobile,
            mode: "push",
          },
          onHover: {
            enable: !isMobile,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 10,
          },
          repulse: {
            distance: 120,
          },
        },
      },
      particles: {
        color: { value: theme === "light" ? "#365f59" : "#b8d6d4" },
        number: {
          value: 8,
          density: {
            enable: true,
            value_area: 400,
          },
        },
        links: {
          enable: true,
          distance: 150,
          color: theme === "light" ? "#365f59" : "#b8d6d4",
          opacity: theme === "light" ? 0.18 : 0.14,
        },
        move: {
          enable: true,
          speed: { min: 0.1, max: 1 },
        },
        opacity: {
          value: { min: 0.15, max: theme === "light" ? 0.45 : 0.35 },
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    }),
    [isMobile, theme],
  );

  if (reducedMotion) return null;

  return (
    <ParticlesProvider init={initParticles}>
      <Particles key={theme} id={props.id} options={options} />
    </ParticlesProvider>
  );
};

export default ParticlesComponent;
