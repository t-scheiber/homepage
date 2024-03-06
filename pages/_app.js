import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/Home.module.css";
import "../styles/globals.css";
import ParticlesComponent from "../components/Particles.js";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <Component {...pageProps} />
      <ParticlesComponent />
    </>
  );
}
