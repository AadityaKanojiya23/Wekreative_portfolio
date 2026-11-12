import React, { useRef } from 'react';
import CinematicHeroBackground from './CinematicHeroBackground';
import HeroScrollKeywords from './HeroScrollKeywords';

export default function Hero() {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] w-full"
      aria-label="Studio Introduction and Showreel"
    >
      {/* ── Sticky Full-Screen Viewport Container: Pinned while user scrolls through the 300vh track ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden border-b border-white/[0.08]">
        {/* ── Scroll-Controlled Cinematic Image Sequence Background (246 frames) ── */}
        <CinematicHeroBackground containerRef={containerRef} />

        {/* ── Scroll-Controlled Animated Keywords Overlay (CAPTURE / CREATE / INSPIRE) ── */}
        <HeroScrollKeywords containerRef={containerRef} />
      </div>
    </div>
  );
}
