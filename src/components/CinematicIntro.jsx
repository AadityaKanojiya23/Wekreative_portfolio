/**
 * CinematicIntro.jsx
 * Full-screen brand opening sequence for WEKREATIVES.
 * Zero extra dependencies — pure CSS 3D transforms + React hooks.
 *
 * Timeline (total ≈ 3.9s):
 *   0–120ms   : black screen
 *   120–900ms : letters rush from deep Z (far away → peak overshoot)
 *   900–1600ms: letters zoom back out to their settled positions
 *   1600–2100ms: W logo fades in
 *   2100–2700ms: "CREATIVE STUDIO" subtitle + gold line reveal
 *   2700–3400ms: hold
 *   3400–3900ms: full-screen fade-out → homepage appears
 */

import React, { useEffect, useRef, useState } from 'react';

/* ─── constants ─────────────────────────────────────── */
const BRAND   = 'WEKREATIVES';
const LETTERS = BRAND.split('');

/* per-letter timing (ms) */
const LETTER_STAGGER  = 55;   // gap between each letter start
const LETTER_RUSH_DUR = 680;  // rush-in phase per letter
const LETTER_ZOOM_DUR = 580;  // zoom-out / settle phase
const RUSH_START      = 120;  // global offset before first letter

/* other phases */
const LOGO_REVEAL_START  = 1680;
const LOGO_REVEAL_DUR    = 480;
const SUB_REVEAL_START   = 2160;
const SUB_REVEAL_DUR     = 500;
const LINE_REVEAL_START  = 2250;
const LINE_REVEAL_DUR    = 480;
const HOLD_START         = 2750;
const FADEOUT_START      = 3350;
const FADEOUT_DUR        = 520;
const TOTAL_DUR          = FADEOUT_START + FADEOUT_DUR + 30; // ≈ 3900ms

/* ─── keyframe CSS injected once ───────────────────── */
const INTRO_CSS = `
  .wk-intro-wrap {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    perspective: 900px;
    pointer-events: all;
  }
  .wk-intro-wrap.wk-fading-out {
    animation: wkFadeOut ${FADEOUT_DUR}ms cubic-bezier(0.4,0,1,1) forwards;
  }
  @keyframes wkFadeOut {
    0%   { opacity: 1; }
    100% { opacity: 0; }
  }

  /* word row */
  .wk-word-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px;
    transform-style: preserve-3d;
  }

  /* each letter starts far-back (translateZ negative = small) */
  .wk-letter {
    display: inline-block;
    font-family: 'Space Grotesk', 'Inter', sans-serif;
    font-weight: 900;
    font-size: clamp(32px, 7vw, 88px);
    letter-spacing: 0.08em;
    color: #ffffff;
    opacity: 0;
    transform: translateZ(-2200px) scale(0.05);
    will-change: transform, opacity, filter;
    transform-style: preserve-3d;
  }

  /* RUSH phase: letter flies from far-Z through camera */
  @keyframes wkLetterRush {
    0%   { opacity: 0;   transform: translateZ(-2200px) scale(0.05); filter: blur(8px); }
    15%  { opacity: 0.9; }
    60%  { opacity: 1;   transform: translateZ(220px)  scale(1.9);  filter: blur(0px); }
    100% { opacity: 1;   transform: translateZ(220px)  scale(1.9);  filter: blur(0px); }
  }

  /* SETTLE phase: letter drifts back to natural position */
  @keyframes wkLetterSettle {
    0%   { transform: translateZ(220px) scale(1.9); filter: blur(0px); opacity: 1; }
    100% { transform: translateZ(0px)   scale(1);   filter: blur(0px); opacity: 1; }
  }

  /* Logo reveal */
  .wk-logo-wrap {
    opacity: 0;
    transform: scale(0.78) translateY(6px);
    will-change: transform, opacity;
  }
  .wk-logo-wrap.wk-logo-in {
    animation: wkLogoIn ${LOGO_REVEAL_DUR}ms cubic-bezier(0.16,1,0.3,1) forwards;
  }
  @keyframes wkLogoIn {
    0%   { opacity: 0; transform: scale(0.78) translateY(6px); }
    100% { opacity: 1; transform: scale(1)    translateY(0px); }
  }

  /* Purple glow pulse behind logo */
  @keyframes wkGlowPulse {
    0%, 100% { opacity: 0.18; transform: scale(1); }
    50%       { opacity: 0.32; transform: scale(1.08); }
  }

  /* Subtitle */
  .wk-subtitle {
    opacity: 0;
    transform: translateY(10px);
    letter-spacing: 0.22em;
    will-change: transform, opacity;
  }
  .wk-subtitle.wk-sub-in {
    animation: wkSubIn ${SUB_REVEAL_DUR}ms cubic-bezier(0.16,1,0.3,1) forwards;
  }
  @keyframes wkSubIn {
    0%   { opacity: 0; transform: translateY(10px); letter-spacing: 0.08em; }
    100% { opacity: 1; transform: translateY(0px);  letter-spacing: 0.28em; }
  }

  /* Gold line draw */
  .wk-gold-line {
    width: 0%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #B69A73 40%, #B69A73 60%, transparent);
    will-change: width;
  }
  .wk-gold-line.wk-line-in {
    animation: wkLineIn ${LINE_REVEAL_DUR}ms cubic-bezier(0.16,1,0.3,1) forwards;
  }
  @keyframes wkLineIn {
    0%   { width: 0%; opacity: 0; }
    10%  { opacity: 1; }
    100% { width: 100%; opacity: 1; }
  }

  /* reduced-motion: skip 3D, just fade in */
  @media (prefers-reduced-motion: reduce) {
    .wk-letter {
      animation: wkLetterFadeOnly 400ms ease forwards !important;
      transform: none !important;
      filter: none !important;
    }
    @keyframes wkLetterFadeOnly {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .wk-logo-wrap.wk-logo-in,
    .wk-subtitle.wk-sub-in {
      animation-duration: 300ms !important;
    }
  }
`;

/* ─── helper: inject styles once ───────────────────── */
function useInjectStyles(css, id) {
  useEffect(() => {
    if (document.getElementById(id)) return;
    const el = document.createElement('style');
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
}

/* ─── main component ─────────────────────────────────── */
export default function CinematicIntro({ onComplete }) {
  useInjectStyles(INTRO_CSS, 'wk-intro-css');

  const letterRefs  = useRef([]);
  const [logoIn,    setLogoIn]    = useState(false);
  const [subIn,     setSubIn]     = useState(false);
  const [lineIn,    setLineIn]    = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  /* lock body scroll while intro is running */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── orchestrate all phases ── */
  useEffect(() => {
    const timers = [];
    const t = (fn, ms) => timers.push(setTimeout(fn, ms));

    /* fire each letter: RUSH then SETTLE */
    LETTERS.forEach((_, i) => {
      const letterEl = letterRefs.current[i];
      if (!letterEl) return;
      const start = RUSH_START + i * LETTER_STAGGER;

      /* RUSH IN */
      t(() => {
        letterEl.style.animation = `wkLetterRush ${LETTER_RUSH_DUR}ms cubic-bezier(0.14,0.8,0.22,1) forwards`;
      }, start);

      /* SETTLE */
      t(() => {
        letterEl.style.animation = `wkLetterSettle ${LETTER_ZOOM_DUR}ms cubic-bezier(0.25,1,0.5,1) forwards`;
      }, start + LETTER_RUSH_DUR);
    });

    /* logo reveal */
    t(() => setLogoIn(true),  LOGO_REVEAL_START);

    /* subtitle + line */
    t(() => setSubIn(true),   SUB_REVEAL_START);
    t(() => setLineIn(true),  LINE_REVEAL_START);

    /* fade out */
    t(() => setFadingOut(true), FADEOUT_START);

    /* unmount */
    t(() => {
      if (onComplete) onComplete();
    }, TOTAL_DUR);

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className={`wk-intro-wrap${fadingOut ? ' wk-fading-out' : ''}`} aria-hidden="true">

      {/* ── purple ambient glow ── */}
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,60,220,0.22) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: 'wkGlowPulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── logo + wordmark row ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '10px' }}>

        {/* W logo */}
        <div className={`wk-logo-wrap${logoIn ? ' wk-logo-in' : ''}`}>
          <div style={{ position: 'relative' }}>
            {/* purple glow halo behind logo */}
            <div style={{
              position: 'absolute',
              inset: '-18px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(130,60,230,0.35) 0%, transparent 70%)',
              filter: 'blur(12px)',
              pointerEvents: 'none',
            }} />
            <img
              src="/wekreatives-logo.png"
              alt="WeKreatives Logo"
              style={{
                height: 'clamp(52px, 8vw, 96px)',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 0 18px rgba(140,60,255,0.45))',
              }}
            />
          </div>
        </div>

        {/* wordmark letters — 3D perspective wrapper */}
        <div
          className="wk-word-row"
          style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
        >
          {LETTERS.map((char, i) => (
            <span
              key={i}
              ref={el => letterRefs.current[i] = el}
              className="wk-letter"
              style={{ transitionDelay: `${i * LETTER_STAGGER}ms` }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ── gold divider line ── */}
      <div style={{ width: 'clamp(220px, 36vw, 480px)', margin: '4px auto 10px' }}>
        <div className={`wk-gold-line${lineIn ? ' wk-line-in' : ''}`} />
      </div>

      {/* ── subtitle ── */}
      <p
        className={`wk-subtitle${subIn ? ' wk-sub-in' : ''}`}
        style={{
          fontFamily: "'Space Grotesk', 'Inter', monospace",
          fontSize: 'clamp(9px, 1.3vw, 13px)',
          fontWeight: 600,
          color: '#94A3B8',
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          margin: 0,
        }}
      >
        Creative&nbsp;Studio
      </p>

    </div>
  );
}

