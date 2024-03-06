import "../styles/Home.module.css";
import "../styles/globals.css";
import ParticlesComponent from "../components/Particles.js";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ParticlesComponent />
    </>
  );
}
