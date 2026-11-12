/**
 * SelectedWork.jsx — Premium Dual-Row Infinite Marquee Portfolio
 * WEKREATIVES · Two independent, continuously scrolling horizontal rows.
 *
 * Row 1: right → left  (~50s loop)
 * Row 2: left → right  (~58s loop)
 *
 * Pure CSS keyframes — zero extra dependencies.
 * Hover pauses the row being hovered. Clicking opens the case-study modal.
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioProjects } from '../data/studioData';
import { ArrowUpRight } from 'lucide-react';

/* ─── inject marquee keyframes once ─────────────────── */
const MARQUEE_CSS = `
  @keyframes wk-marquee-ltr {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
  }
  @keyframes wk-marquee-rtl {
    0%   { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }

  .wk-track-rtl {
    display: flex;
    width: max-content;
    animation: wk-marquee-rtl 34s linear infinite;
    will-change: transform;
  }
  .wk-track-ltr {
    display: flex;
    width: max-content;
    animation: wk-marquee-ltr 38s linear infinite;
    will-change: transform;
  }

  /* pause on row hover */
  .wk-row-wrap:hover .wk-track-rtl,
  .wk-row-wrap:hover .wk-track-ltr {
    animation-play-state: paused;
  }

  /* card */
  .wk-card {
    cursor: default;
    user-select: none;
    transition: transform 320ms cubic-bezier(0.25,1,0.5,1),
                box-shadow 320ms cubic-bezier(0.25,1,0.5,1);
    position: relative;
  }
  .wk-card:hover {
    transform: scale(1.038) translateY(-3px);
    box-shadow: 0 24px 48px rgba(0,0,0,0.60);
    z-index: 10;
  }
  .wk-card-img {
    transition: filter 320ms ease, transform 420ms ease;
  }
  .wk-card:hover .wk-card-img {
    filter: brightness(1.08);
    transform: scale(1.06);
  }
  .wk-card-hover-overlay {
    transition: opacity 300ms ease;
    opacity: 0;
  }
  .wk-card:hover .wk-card-hover-overlay {
    opacity: 1;
  }
  .wk-card-meta {
    transform: translateY(7px);
    opacity: 0;
    transition: transform 300ms cubic-bezier(0.25,1,0.5,1), opacity 280ms ease;
  }
  .wk-card:hover .wk-card-meta {
    transform: translateY(0);
    opacity: 1;
  }

  /* reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .wk-track-rtl, .wk-track-ltr { animation: none !important; }
    .wk-card:hover               { transform: none; box-shadow: none; }
    .wk-card-meta                { opacity: 1; transform: none; }
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

/* ─── single portfolio card (presentation only) ─── */
function PortfolioCard({ project }) {
  return (
    <div
      className="wk-card shrink-0 rounded-2xl overflow-hidden bg-[#0d0f14] pointer-events-auto select-none"
      style={{
        width: 'clamp(240px, 25vw, 340px)',
        height: 'clamp(165px, 17vw, 230px)',
        margin: '0 10px',
      }}
    >
      {/* ── image ── */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <img
          src={project.coverImage}
          alt={project.title}
          loading="lazy"
          className="wk-card-img w-full h-full object-cover"
        />
      </div>

      {/* permanent bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 48%, transparent 100%)',
        }}
      />

      {/* hover overlay — deeper tint */}
      <div
        className="wk-card-hover-overlay absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)',
        }}
      />

      {/* ── category badge ── */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/75 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
          {project.category}
        </span>
      </div>

      {/* ── year ── */}
      <div className="absolute top-3 right-3 pointer-events-none">
        <span className="font-mono text-[9px] text-white/40">{project.year}</span>
      </div>

      {/* ── bottom text ── */}
      <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
        <h3 className="font-space font-bold text-white text-sm sm:text-base leading-tight mb-1">
          {project.title}
        </h3>
        <div className="wk-card-meta">
          <p className="font-mono text-[10px] text-[#B69A73] uppercase tracking-wider">
            {project.subCategory}
          </p>
          {project.runtime && (
            <p className="font-mono text-[10px] text-white/35 mt-0.5">{project.runtime}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── marquee row ────────────────────────────────────── */
function MarqueeRow({ projects, direction }) {
  // duplicate items for seamless infinite loop
  const doubled = [...projects, ...projects];
  const trackClass = direction === 'rtl' ? 'wk-track-rtl' : 'wk-track-ltr';

  return (
    <div className="wk-row-wrap relative overflow-hidden" style={{ padding: '12px 0' }}>
      <div className={trackClass}>
        {doubled.map((project, i) => (
          <PortfolioCard
            key={`${project.id}-${i}`}
            project={project}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── main exported section ──────────────────────────── */
const CATEGORIES = ['All', 'Film', 'Photography', 'Campaigns', 'Events', 'Fashion', 'Portraits'];

export default function SelectedWork({
  onSelectProject,
  activeCategory: controlledCategory,
  onCategoryChange,
}) {
  useInjectStyles(MARQUEE_CSS, 'wk-marquee-css');
  const navigate = useNavigate();

  const [internalCategory, setInternalCategory] = useState('All');
  const activeCategory =
    controlledCategory !== undefined ? controlledCategory : internalCategory;
  const setActiveCategory = onCategoryChange || setInternalCategory;

  /* filter + pad so both rows always have enough cards */
  const allProjects = portfolioProjects;
  const filtered =
    activeCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const padded =
    filtered.length < 4
      ? [...filtered, ...filtered, ...filtered]
      : filtered;

  /* split into two alternating rows */
  const row1 = padded.filter((_, i) => i % 2 === 0);
  const row2 = padded.filter((_, i) => i % 2 === 1);
  const finalRow1 = row1.length ? row1 : padded;
  const finalRow2 = row2.length ? row2 : [...padded].reverse();

  /* ── background color to sync edge fades ── */
  // We read the CSS variable if set; otherwise fall back to pure black.
  const edgeBg = 'var(--bg-primary, #07090f)';

  return (
    <section
      id="work"
      className="py-20 sm:py-28 relative scroll-mt-20 overflow-hidden"
      aria-label="Selected Works"
    >
      {/* ── section header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#B69A73] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B69A73]" aria-hidden="true" />
              Portfolio Index
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Selected Work
            </h2>
          </div>

          <p className="text-slate-400 font-mono text-xs sm:text-sm max-w-md leading-relaxed">
            Films and photography produced across fashion, culture, automotive, and architecture.
            Every project is calibrated for cinema screens and editorial print.
          </p>
        </div>

        {/* ── category filter ── */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/[0.06]"
          role="tablist"
          aria-label="Filter portfolio projects"
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat === 'All'
                ? allProjects.length
                : allProjects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2 focus-visible:outline-none ${
                  isActive
                    ? 'bg-[#B69A73] text-[#111111] font-semibold'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.07] hover:border-white/20'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-black/20 text-white' : 'bg-white/5 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── dual marquee rows with edge fades ── */}
      <div className="relative">
        {/* left fade */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${edgeBg} 0%, transparent 100%)` }}
        />
        {/* right fade */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${edgeBg} 0%, transparent 100%)` }}
        />

        {/* ROW 1 — right to left */}
        <MarqueeRow
          projects={finalRow1}
          direction="rtl"
        />

        {/* ROW 2 — left to right */}
        <div className="mt-3">
          <MarqueeRow
            projects={finalRow2}
            direction="ltr"
          />
        </div>
      </div>

      {/* ── View Full Portfolio CTA ── */}
      <div className="mt-14 flex justify-center">
        <button
          onClick={() => {
            navigate('/portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-white font-space text-xs uppercase tracking-[0.14em] font-semibold hover:bg-[#B69A73] hover:text-[#111111] hover:border-[#B69A73] transition-all duration-200 focus-visible:outline-none cursor-pointer"
        >
          <span>View Full Portfolio</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </div>
    </section>
  );
}
