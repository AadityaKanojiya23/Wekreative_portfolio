import React, { useEffect, useRef, useState } from 'react';

// ─── 5 Cinematic Editorial Milestones ─────────────────────────────────────────
const MILESTONES = [
  {
    chapter: '01',
    label: 'OUR PHILOSOPHY',
    headingPrefix: 'Crafting Images That',
    headingHighlight: 'Command Presence.',
    description:
      'Distinct, intentional, and enduring visual storytelling built around uncompromising optical standards. We believe every cinematic frame should hold depth, stillness, and emotional gravity.',
    phaseTag: 'PHASE 01 // FOUNDATION & VISION',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Cinematic editorial portrait with dramatic lighting',
    badge: '35MM OPTICS',
  },
  {
    chapter: '02',
    label: 'CREATIVE APPROACH',
    headingPrefix: 'Every Frame Begins With',
    headingHighlight: 'An Intention.',
    description:
      'Every project begins with a clear vision, thoughtful direction, and a carefully constructed visual language. Concepts and treatments are meticulously developed before cameras roll.',
    phaseTag: 'PHASE 02 // CONCEPT & DIRECTION',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Architectural geometry and minimalist atmosphere',
    badge: 'TREATMENTS & SCOUTING',
  },
  {
    chapter: '03',
    label: 'THE ART OF PRODUCTION',
    headingPrefix: 'Turning Vision Into',
    headingHighlight: 'Visual Reality.',
    description:
      'Photography, cinematography, lighting, and camera movement working together to create powerful imagery. On-set discipline meets fluid artistic intuition.',
    phaseTag: 'PHASE 03 // PRINCIPAL CINEMA',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'High-speed cinematic automotive night shoot with anamorphic flares',
    badge: 'ARRI RAW / ANAMORPHIC',
  },
  {
    chapter: '04',
    label: 'POST-PRODUCTION',
    headingPrefix: 'Perfection Lives In',
    headingHighlight: 'The Details.',
    description:
      'Precision editing, cinematic color grading, sound design, and visual finishing. We calibrate each cut to the story tension and grade inside ACES color pipelines.',
    phaseTag: 'PHASE 04 // EDIT & COLOR GRADE',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Atmospheric concert with reactive lighting and deep contrast',
    badge: 'DAVINCI RESOLVE / ACES',
  },
  {
    chapter: '05',
    label: 'FINAL DELIVERY',
    headingPrefix: 'Every Frame. Every Detail.',
    headingHighlight: 'Every Impact.',
    description:
      'From the first creative idea to the final master, every detail is carefully crafted. We deliver uncompromised high-fidelity assets ready for international theatrical and global broadcast.',
    phaseTag: 'PHASE 05 // MASTER ARCHIVE',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Panoramic mountain peaks bathed in early morning golden light',
    badge: 'PRORES 4444 XQ / DCP',
  },
];

const CARD_COUNT = MILESTONES.length;

function clamp(val, min = 0, max = 1) {
  return Math.min(Math.max(val, min), max);
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function AboutStudio() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Card transition thresholds across the scroll track
    // Card 0 is already present at start.
    // Cards 1, 2, 3, 4 enter at progressive intervals.
    // Card 4 completes at 0.85, providing a comfortable resting buffer before the section ends.
    const thresholds = [
      { enterStart: 0, enterEnd: 0 },         // Card 0: Base card
      { enterStart: 0.10, enterEnd: 0.28 },   // Card 1
      { enterStart: 0.29, enterEnd: 0.47 },   // Card 2
      { enterStart: 0.48, enterEnd: 0.66 },   // Card 3
      { enterStart: 0.67, enterEnd: 0.85 },   // Card 4
    ];

    function update() {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const progress = scrollableDistance > 0 ? clamp(-rect.top / scrollableDistance, 0, 1) : 0;

      // Calculate entry progress (0 to 1) for each card
      const cardProgress = thresholds.map((t, i) => {
        if (i === 0) return 1;
        if (progress < t.enterStart) return 0;
        if (progress >= t.enterEnd) return 1;
        return easeOutCubic((progress - t.enterStart) / (t.enterEnd - t.enterStart));
      });

      // Apply transforms to each card in the stack
      MILESTONES.forEach((_, idx) => {
        const cardEl = cardRefs.current[idx];
        if (!cardEl) return;

        if (prefersReduced) {
          let activeIndex = 0;
          for (let i = 0; i < CARD_COUNT; i++) {
            if (cardProgress[i] > 0.45) activeIndex = i;
          }
          cardEl.style.opacity = idx === activeIndex ? '1' : '0';
          cardEl.style.transform = 'none';
          cardEl.style.filter = 'none';
          cardEl.style.zIndex = idx === activeIndex ? '10' : '1';
          return;
        }

        const entry = cardProgress[idx];

        if (idx === 0) {
          // Base card 0: moves slightly backward as subsequent cards enter
          let push = 0;
          for (let k = 1; k < CARD_COUNT; k++) {
            push += cardProgress[k];
          }
          const scale = Math.max(1 - push * 0.034, 0.88);
          const translateY = -push * 18;
          const brightness = Math.max(1 - push * 0.14, 0.48);
          const blur = Math.min(push * 1.2, 2.5);
          const opacity = Math.max(1 - push * 0.1, 0.42);

          cardEl.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          cardEl.style.filter = `brightness(${brightness}) blur(${blur}px)`;
          cardEl.style.opacity = opacity.toString();
          cardEl.style.zIndex = '5';
          return;
        }

        // For cards 1..4
        if (entry <= 0.001) {
          // Waiting below and hidden
          cardEl.style.transform = 'translate3d(0, 120px, 0) scale(0.93)';
          cardEl.style.opacity = '0';
          cardEl.style.filter = 'none';
          cardEl.style.zIndex = '1';
          cardEl.style.pointerEvents = 'none';
          return;
        }

        // Check how many cards above this one are stacking
        let cardsAbovePush = 0;
        for (let k = idx + 1; k < CARD_COUNT; k++) {
          cardsAbovePush += cardProgress[k];
        }

        if (cardsAbovePush > 0) {
          // Stacked behind higher cards
          const scale = Math.max(1 - cardsAbovePush * 0.034, 0.88);
          const translateY = -cardsAbovePush * 18;
          const brightness = Math.max(1 - cardsAbovePush * 0.14, 0.48);
          const blur = Math.min(cardsAbovePush * 1.2, 2.5);
          const opacity = Math.max(1 - cardsAbovePush * 0.1, 0.42);

          cardEl.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          cardEl.style.filter = `brightness(${brightness}) blur(${blur}px)`;
          cardEl.style.opacity = opacity.toString();
          cardEl.style.zIndex = (10 + idx).toString();
          cardEl.style.pointerEvents = cardsAbovePush > 0.85 ? 'none' : 'auto';
        } else {
          // Currently entering or fully on top
          const translateY = (1 - entry) * 120;
          const scale = 0.94 + 0.06 * entry;
          const opacity = entry;

          cardEl.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
          cardEl.style.filter = 'none';
          cardEl.style.opacity = opacity.toString();
          cardEl.style.zIndex = (20 + idx).toString();
          cardEl.style.pointerEvents = 'auto';
        }
      });

      rafRef.current = null;
    }

    function onScroll() {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    }

    // Initial update
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative scroll-mt-20 border-t border-[#1e2230]"
      aria-label="About the Studio"
      style={{
        height: '340vh',
        background: 'radial-gradient(ellipse at 50% 20%, #0d111c 0%, #080a11 50%, #05060a 100%)',
      }}
    >
      {/* ── Sticky Centered Viewport with Dedicated 60–80px Top & Bottom Breathing Space ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-[76px] pb-16 sm:pb-20 lg:pb-[76px]">
        
        {/* Subtle cinematic ambient glow behind cards */}
        <div
          className="pointer-events-none absolute w-[600px] lg:w-[900px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217, 172, 114, 0.07) 0%, rgba(54, 141, 255, 0.02) 50%, transparent 70%)',
            filter: 'blur(80px)',
            top: '52%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* ── Section Header (Comfortable Breathing Room) ── */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 lg:mb-10 relative z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[rgba(217,172,114,0.22)] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9AC72]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#D9AC72]">
              About WEKREATIVES
            </span>
          </div>

          <h2 className="font-space font-bold text-2xl sm:text-3xl lg:text-4xl text-[#F5F2ED] tracking-tight leading-tight">
            Our Creative Journey
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#B8BEC9] font-normal max-w-md mx-auto leading-relaxed">
            The thinking, craft, and precision behind every frame.
          </p>
        </div>

        {/* ── Cinematic Overlapping Card Stack Stage ── */}
        <div className="relative w-full max-w-[1120px] min-h-[420px] sm:h-[450px] lg:h-[470px] z-30">
          {MILESTONES.map((card, idx) => {
            return (
              <article
                key={card.chapter}
                ref={(el) => (cardRefs.current[idx] = el)}
                className="absolute inset-0 rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 flex flex-col justify-between select-none overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(14, 18, 27, 0.94) 0%, rgba(9, 11, 18, 0.97) 100%)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(217, 172, 114, 0.22)',
                  boxShadow: '0 28px 70px -15px rgba(0, 0, 0, 0.92), 0 0 45px rgba(217, 172, 114, 0.06)',
                  transformOrigin: '50% 100%',
                  willChange: 'transform, opacity, filter',
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 120px, 0) scale(0.93)',
                }}
              >
                {/* Subtle top-edge warm gold ambient highlight */}
                <div
                  className="absolute top-0 left-12 right-12 h-[1px]"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(217, 172, 114, 0.5), transparent)',
                  }}
                />

                {/* ── TWO-COLUMN MAIN BODY ── */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center my-auto">
                  
                  {/* LEFT COLUMN: Chapter, Category, Large Heading, Divider, Description */}
                  <div className="md:col-span-7 flex flex-col justify-center pr-0 lg:pr-4">
                    {/* Chapter & Category Row */}
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <span className="font-mono text-xs font-bold text-[#D9AC72] tracking-wider px-2.5 py-0.5 rounded border border-[rgba(217,172,114,0.35)] bg-[rgba(217,172,114,0.08)]">
                        {card.chapter}
                      </span>
                      <span className="h-3 w-[1px] bg-white/20" />
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#B99A70] font-semibold">
                        {card.label}
                      </span>
                    </div>

                    {/* Main Heading */}
                    <h3 className="font-space font-bold text-2xl sm:text-3xl lg:text-[32px] text-[#F5F2ED] tracking-tight leading-snug mb-4">
                      {card.headingPrefix}{' '}
                      <span className="text-[#D9AC72] font-semibold">
                        {card.headingHighlight}
                      </span>
                    </h3>

                    {/* Small Decorative Gold Divider */}
                    <div
                      className="h-[1px] w-14 mb-4"
                      style={{
                        background: 'linear-gradient(90deg, #D9AC72 0%, rgba(217, 172, 114, 0) 100%)',
                      }}
                    />

                    {/* Description Paragraph */}
                    <p className="text-sm sm:text-[15px] lg:text-base text-[#B8BEC9] leading-relaxed max-w-xl font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* RIGHT COLUMN: Large Cinematic Image (~40-45% width on desktop) */}
                  <div className="md:col-span-5 relative w-full h-[180px] sm:h-[220px] md:h-[270px] lg:h-[300px] rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl group">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />

                    {/* Cinematic vignettes & gradient blend */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(14, 18, 27, 0.2) 0%, rgba(9, 11, 18, 0.65) 100%)',
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.7)',
                      }}
                    />

                    {/* Subtle corner badge for technical cinema fidelity */}
                    <div className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-widest text-[#F5F2ED] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      {card.badge}
                    </div>

                    {/* Frame indicator */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D9AC72] animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-white/70">
                        WEK // ARCHIVE {card.chapter}
                      </span>
                    </div>
                  </div>

                </div>

                {/* ── BOTTOM OF CARD: Divider, Branding, Current Phase ── */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/[0.07] text-[11px] font-mono">
                  <div className="flex items-center gap-2 text-[#B8BEC9]/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9AC72]" />
                    <span className="tracking-[0.25em] uppercase font-semibold">
                      WEKREATIVES STUDIO
                    </span>
                  </div>

                  <span className="tracking-[0.2em] uppercase text-[#D9AC72] font-medium">
                    {card.phaseTag}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
