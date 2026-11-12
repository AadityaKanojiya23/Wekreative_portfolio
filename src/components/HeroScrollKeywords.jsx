import React, { useEffect, useRef } from 'react';

const SCENES = [
  {
    id: 'scene-01',
    start: 0.02,
    end: 0.30,
    headlineLine1: "We don't just capture moments.",
    headlineLine2Prefix: "We create ",
    highlight: "stories.",
    description: "Every frame has a purpose. Every story deserves to be remembered.",
  },
  {
    id: 'scene-02',
    start: 0.32,
    end: 0.60,
    headlineLine1: "From vision to",
    headlineLine2Prefix: "",
    highlight: "Visual Reality.",
    description: "Cinematic filmmaking. Creative editing. Powerful visual storytelling.",
  },
  {
    id: 'scene-03',
    start: 0.62,
    end: 0.90,
    headlineLine1: "Make your brand",
    headlineLine2Prefix: "",
    highlight: "Unforgettable.",
    description: "We turn creative ideas into experiences that connect with audiences.",
  },
];

export default function HeroScrollKeywords({ containerRef }) {
  const sceneRefs = useRef([]);
  const headlineRefs = useRef([]);
  const descRefs = useRef([]);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    // Accessibility check
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const updateScenes = () => {
      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      // Normalized scroll progress clamped between 0.0 and 1.0
      const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

      SCENES.forEach((scene, index) => {
        const wrapperEl = sceneRefs.current[index];
        const headlineEl = headlineRefs.current[index];
        const descEl = descRefs.current[index];
        if (!wrapperEl) return;

        const { start, end } = scene;
        const duration = end - start;

        // Outside active range: hide completely
        if (progress < start || progress > end) {
          wrapperEl.style.opacity = '0';
          wrapperEl.style.visibility = 'hidden';
          wrapperEl.style.transform = 'translate3d(0, 24px, 0) scale(0.96)';
          wrapperEl.style.filter = 'blur(6px)';
          return;
        }

        wrapperEl.style.visibility = 'visible';

        if (prefersReducedMotion) {
          wrapperEl.style.opacity = '1';
          wrapperEl.style.transform = 'none';
          wrapperEl.style.filter = 'none';
          if (headlineEl) headlineEl.style.opacity = '1';
          if (descEl) descEl.style.opacity = '1';
          return;
        }

        // Relative timeline progress from 0.0 to 1.0 within this scene's window
        const t = (progress - start) / duration;

        let scale = 1;
        let translateY = 0;
        let blur = 0;
        let headlineOpacity = 0;
        let descOpacity = 0;

        if (t < 0.30) {
          // Entrance phase: scale 0.96 -> 1.00, blur 6px -> 0px, translateY 24px -> 0px
          const f = t / 0.30;
          scale = 0.96 + 0.04 * f;
          translateY = 24 * (1 - f);
          blur = 6 * (1 - f);
          headlineOpacity = f;
          // Description reveals slightly after headline
          descOpacity = Math.max(0, Math.min(1, (t - 0.06) / 0.24));
        } else if (t < 0.70) {
          // Sustained peak hold phase with subtle cinematic camera push
          const f = (t - 0.30) / 0.40;
          scale = 1.00 + 0.03 * f;
          translateY = -4 * f;
          blur = 0;
          headlineOpacity = 1;
          descOpacity = 1;
        } else {
          // Exit phase: dissolve out, scale 1.03 -> 1.07, blur 0px -> 6px, translateY -4px -> -24px
          const f = (t - 0.70) / 0.30;
          scale = 1.03 + 0.04 * f;
          translateY = -4 - 20 * f;
          blur = 6 * f;
          headlineOpacity = 1 - f;
          descOpacity = 1 - f;
        }

        // Apply interpolated styles directly to DOM for 60fps GPU smoothness
        wrapperEl.style.opacity = '1';
        wrapperEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        wrapperEl.style.filter = `blur(${blur.toFixed(1)}px)`;

        if (headlineEl) {
          headlineEl.style.opacity = headlineOpacity.toFixed(3);
        }
        if (descEl) {
          descEl.style.opacity = descOpacity.toFixed(3);
        }
      });
    };

    let rafId = null;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScenes();
      });
    };

    updateScenes();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScenes);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScenes);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {SCENES.map((scene, index) => (
        <div
          key={scene.id}
          ref={(el) => (sceneRefs.current[index] = el)}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8 max-w-4xl mx-auto will-change-[transform,filter]"
          style={{
            opacity: 0,
            visibility: 'hidden',
          }}
        >
          {/* Headline with Electric Blue Highlight */}
          <h2
            ref={(el) => (headlineRefs.current[index] = el)}
            className="font-space font-extrabold text-white text-center leading-[1.12] tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.92)] text-3xl sm:text-5xl lg:text-6xl max-w-3xl"
            style={{
              fontSize: 'clamp(32px, 5.5vw, 64px)',
            }}
          >
            <span>{scene.headlineLine1}</span>
            <br />
            <span>{scene.headlineLine2Prefix}</span>
            <span
              className="text-[#368DFF]"
              style={{
                textShadow: '0 0 35px rgba(54, 141, 255, 0.45)',
              }}
            >
              {scene.highlight}
            </span>
          </h2>

          {/* Supporting Description */}
          <p
            ref={(el) => (descRefs.current[index] = el)}
            className="mt-4 sm:mt-6 font-sans text-slate-200 text-center leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] text-sm sm:text-lg md:text-xl max-w-2xl font-normal"
            style={{
              fontSize: 'clamp(15px, 2.2vw, 20px)',
            }}
          >
            {scene.description}
          </p>
        </div>
      ))}
    </div>
  );
}
