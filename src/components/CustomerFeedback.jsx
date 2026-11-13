import React, { useEffect } from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    name: 'Marcus Vance',
    company: 'Veloce Dynamics',
    role: 'Global Head of Brand',
    initials: 'MV',
    rating: 5,
    verified: true,
    quote:
      'WEKREATIVES transformed our seasonal campaign from a conventional product film into a truly visceral cinematic experience. The anamorphic lens work and post-production color grading set a benchmark our audience is still talking about.',
  },
  {
    id: 2,
    name: 'Elena Rostova',
    company: 'Aura Haute Joaillerie',
    role: 'Creative Director',
    initials: 'ER',
    rating: 5,
    verified: true,
    quote:
      'Their photographic discipline and lighting control are unmatched. Every frame captured the tactile brilliance of our pieces without unnecessary gloss. Calm, meticulous, and visionary on set.',
  },
  {
    id: 3,
    name: 'Julian Hille',
    company: 'Nordic Alpine Equipment',
    role: 'Marketing Director',
    initials: 'JH',
    rating: 5,
    verified: true,
    quote:
      'Filming in sub-zero glacial conditions required immense technical resilience. The studio delivered large-format master footage that looks as breathtaking on Times Square billboards as it does on cinema screens.',
  },
  {
    id: 4,
    name: 'Siddharth Rao',
    company: 'Monolith Sound Records',
    role: 'Executive Producer',
    initials: 'SR',
    rating: 5,
    verified: true,
    quote:
      'The synergy between their camera movements and our sound design was seamless. They do not just record images; they translate emotional rhythm into pure visual poetry.',
  },
  {
    id: 5,
    name: 'Clara Moreau',
    company: "L'Hiver Magazine",
    role: 'Editor-in-Chief',
    initials: 'CM',
    rating: 5,
    verified: true,
    quote:
      'Working with the WEKREATIVES team on our September cover story was effortless. They brought bold editorial direction, exquisite medium-format detail, and delivered high-res retouches ahead of schedule.',
  },
  {
    id: 6,
    name: 'David Sterling',
    company: 'Crestview Capital & Culture',
    role: 'VP of Strategic Communications',
    initials: 'DS',
    rating: 5,
    verified: true,
    quote:
      'Our brand film needed gravitas and emotional resonance. The final cut exceeded every internal stakeholder expectation and elevated our international prestige overnight.',
  },
];

const FEEDBACK_CSS = `
  @keyframes wk-feedback-marquee {
    0%   { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .wk-feedback-track {
    display: flex;
    width: max-content;
    animation: wk-feedback-marquee 38s linear infinite;
    will-change: transform;
  }

  .wk-feedback-wrap:hover .wk-feedback-track {
    animation-play-state: paused;
  }

  .wk-feedback-card {
    transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1),
                border-color 300ms ease,
                box-shadow 300ms ease;
  }

  .wk-feedback-card:hover {
    transform: translateY(-4px) scale(1.015);
    border-color: rgba(182, 154, 115, 0.45);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  }

  @media (prefers-reduced-motion: reduce) {
    .wk-feedback-track {
      animation: none !important;
    }
    .wk-feedback-card:hover {
      transform: none !important;
    }
  }
`;

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

function FeedbackCard({ item }) {
  return (
    <article
      className="wk-feedback-card shrink-0 w-[320px] sm:w-[410px] p-6 sm:p-8 rounded-2xl bg-[#0c0e14] border border-white/[0.08] flex flex-col justify-between mx-3 select-none"
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
      }}
    >
      <div>
        {/* Top Header: Avatar, Name & Quote Icon */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3.5">
            {/* Monogram Initials Badge */}
            <div className="w-11 h-11 rounded-full bg-white/[0.04] border border-[#B69A73]/30 flex items-center justify-center font-space font-bold text-xs text-[#B69A73] shrink-0 shadow-inner">
              {item.initials}
            </div>

            <div className="flex flex-col text-left">
              <span className="font-space font-bold text-sm sm:text-base text-white leading-tight">
                {item.name}
              </span>
              <span className="font-mono text-[11px] text-[#94A3B8] leading-snug mt-0.5">
                {item.role} · <strong className="text-white/80 font-normal">{item.company}</strong>
              </span>
            </div>
          </div>

          {/* Decorative Quote Icon */}
          <Quote className="w-6 h-6 text-[#B69A73]/30 shrink-0" aria-hidden="true" />
        </div>

        {/* Rating Stars & Verification Tag */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
            {Array.from({ length: item.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 text-[#B69A73] fill-[#B69A73]"
                aria-hidden="true"
              />
            ))}
          </div>

          {item.verified && (
            <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-[#B69A73] bg-[#B69A73]/10 border border-[#B69A73]/25 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Verified Client</span>
            </span>
          )}
        </div>

        {/* Feedback Body Quote */}
        <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed text-left font-normal">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Subtle Bottom Accent Indicator */}
      <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between font-mono text-[10px] text-[#94A3B8]">
        <span className="uppercase tracking-widest text-[#B69A73]">Client Review</span>
        <span>WEKREATIVES Studio</span>
      </div>
    </article>
  );
}

export default function CustomerFeedback() {
  useInjectStyles(FEEDBACK_CSS, 'wk-feedback-styles');

  // Duplicate cards for seamless continuous infinite loop
  const doubledCards = [...testimonialsData, ...testimonialsData];

  return (
    <section
      id="feedback"
      className="py-24 sm:py-32 relative overflow-hidden"
      aria-label="Client Testimonials and Feedback"
    >
      {/* Background Subtle Gradient Accents */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(182, 154, 115, 0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(6, 27, 53, 0.25) 0%, transparent 50%)',
        }}
      />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-[#B69A73] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B69A73]" />
          <span>WHAT CLIENTS SAY</span>
        </div>

        <h2 className="font-space font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-4">
          Stories Behind The Success.
        </h2>

        <p className="font-mono text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          Real experiences from the people and brands we&apos;ve had the pleasure of working with.
        </p>
      </div>

      {/* Continuous Marquee Wrapper with Edge Fade Masks */}
      <div className="wk-feedback-wrap relative overflow-hidden">
        {/* Left Fade Mask */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, var(--bg-primary, #05080f) 0%, transparent 100%)',
          }}
        />

        {/* Right Fade Mask */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to left, var(--bg-primary, #05080f) 0%, transparent 100%)',
          }}
        />

        {/* Continuously Moving Track (Right to Left) */}
        <div className="wk-feedback-track py-4">
          {doubledCards.map((item, idx) => (
            <FeedbackCard key={`${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

