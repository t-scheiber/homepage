'use client';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import React, { useEffect, useMemo, useState } from "react";

// tsParticles Repository: https://github.com/matteobruni/tsparticles
// tsParticles Website: https://particles.js.org/
interface ParticlesComponentProps {
  id?: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = (props) => {
  const [init, setInit] = useState(false);

  const isMobile = useMemo(() => {
    if (typeof navigator === "undefined") {
      return false;
    }
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    // Initialize particles engine
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  // using useMemo is not mandatory, but it's recommended since this value can be memoized if static
  const options = useMemo(() => {
    // using an empty options object will load the default options, which are static particles with no background and 3px radius, opacity 100%, white color
    // all options can be found here: https://particles.js.org/docs/interfaces/Options_Interfaces_IOptions.IOptions.html
    return {
      autoPlay: true,
      fullScreen: {
        enable: true, // enabling this will make the canvas fill the entire screen, it's enabled by default
        zIndex: -1, // this is the z-index value used when the fullScreen is enabled, it's 0 by default
      },
      interactivity: {
        events: {
          onClick: {
            enable: !isMobile, // enables the click event
            mode: "push", // adds the particles on click
          },
          onHover: {
            enable: !isMobile, // enables the hover event
            mode: "repulse", // make the particles run away from the cursor
          },
        },
        modes: {
          push: {
            quantity: 10, // number of particles to add on click
          },
          repulse: {
            distance: 120, // distance of the particles from the cursor
          },
        },
      },
      particles: {
        number: {
          value: 8,
          density: {
            enable: true,
            value_area: 400,
          },
        },
        links: {
          enable: true, // enabling this will make particles linked together
          distance: 150, // maximum distance for linking the particles
        },
        move: {
          enable: true, // enabling this will make particles move in the canvas
          speed: { min: 0.1, max: 1 }, // using a range in speed value will make particles move in a random speed between min/max values, each particles have its own value, it won't change in time by default
        },
        opacity: {
          value: { min: 0.1, max: 0.5 }, // using a different opacity, to have some semitransparent effects
        },
        size: {
          value: { min: 1, max: 3 }, // let's randomize the particles size a bit
        },
      },
    };
  }, [isMobile]);

  // setting an id can be useful for identifying the right particles component, this is useful for multiple instances or reusable components
  if (init) {
    return <Particles id={props.id} options={options} />;
  }
  
  return null;
};

export default ParticlesComponent;
