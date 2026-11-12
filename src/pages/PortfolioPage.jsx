import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { portfolioProjects } from '../data/studioData';
import { ArrowUpRight, ArrowLeft, Clock, Film, Camera } from 'lucide-react';

const FILTER_CATEGORIES = [
  'ALL',
  'FILM',
  'PHOTOGRAPHY',
  'CAMPAIGNS',
  'EVENTS',
  'FASHION',
  'PORTRAITS',
  'AUTOMOTIVE',
  'COMMERCIAL',
];

const matchesCategory = (project, cat) => {
  if (cat === 'ALL') return true;
  const target = cat.toLowerCase();
  const mainCat = (project.category || '').toLowerCase();
  const subCat = (project.subCategory || '').toLowerCase();
  return mainCat === target || subCat.includes(target);
};

export default function PortfolioPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryCat = searchParams.get('category');

  const initialCat = queryCat
    ? FILTER_CATEGORIES.find((c) => c.toLowerCase() === queryCat.toLowerCase()) || 'ALL'
    : 'ALL';

  const [activeCategory, setActiveCategory] = useState(initialCat);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (queryCat) {
      const match = FILTER_CATEGORIES.find((c) => c.toLowerCase() === queryCat.toLowerCase());
      if (match) setActiveCategory(match);
    }
  }, [queryCat]);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    if (cat === 'ALL') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat.toLowerCase() });
    }
  };

  const filteredProjects = portfolioProjects.filter((p) =>
    matchesCategory(p, activeCategory)
  );

  return (
    <div className="min-h-screen pt-28 pb-24 text-white relative">
      {/* Subtle Ambient Background Lighting */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, rgba(182, 154, 115, 0.08) 0%, transparent 55%), radial-gradient(circle at 80% 50%, rgba(120, 60, 220, 0.06) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 font-mono text-xs text-[#94A3B8]">
          <Link
            to="/"
            className="hover:text-[#B69A73] transition-colors flex items-center gap-1.5 focus-visible:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>HOME</span>
          </Link>
          <span>/</span>
          <span className="text-[#B69A73]">PORTFOLIO</span>
        </div>

        {/* ========================================================= */}
        {/* PORTFOLIO HERO                                            */}
        {/* ========================================================= */}
        <div className="border-b border-white/[0.08] pb-12 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#B69A73] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B69A73]" />
                <span>WEKREATIVES / PORTFOLIO</span>
              </div>

              <h1 className="font-space font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                A Collection of Stories,
                <br />
                Frames &amp; Experiences.
              </h1>

              <p className="mt-5 font-mono text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
                Explore our selected work across filmmaking, photography, commercial productions,
                fashion, campaigns, and creative storytelling.
              </p>
            </div>

            {/* Project Count Badge */}
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] px-5 py-4 rounded-2xl backdrop-blur-sm self-start lg:self-end">
              <div className="w-10 h-10 rounded-xl bg-[#B69A73]/15 border border-[#B69A73]/30 flex items-center justify-center text-[#B69A73]">
                <Film className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-2xl text-white leading-none">
                  {portfolioProjects.length}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] mt-1">
                  Curated Projects in Archive
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CATEGORY FILTERS                                          */}
        {/* ========================================================= */}
        <div className="mb-12">
          <div
            className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none"
            role="tablist"
            aria-label="Filter portfolio categories"
          >
            {FILTER_CATEGORIES.map((cat) => {
              const count = portfolioProjects.filter((p) => matchesCategory(p, cat)).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(cat)}
                  className={`shrink-0 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 cursor-pointer focus-visible:outline-none ${
                    isActive
                      ? 'bg-[#B69A73] text-[#111111] font-bold shadow-[0_4px_16px_rgba(182,154,115,0.25)]'
                      : 'bg-white/[0.03] text-[#94A3B8] hover:text-white border border-white/[0.06] hover:border-white/20'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-black/25 text-black font-semibold' : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PROJECT GALLERY GRID                                      */}
        {/* ========================================================= */}
        {filteredProjects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-white/10 rounded-2xl">
            <p className="font-mono text-sm text-[#94A3B8]">No projects found in this category.</p>
            <button
              onClick={() => handleCategorySelect('ALL')}
              className="mt-4 px-5 py-2.5 rounded-lg bg-[#B69A73] text-black font-mono text-xs uppercase tracking-wider font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => {
                  navigate(`/portfolio/${project.id}`);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0c0e14] border border-white/[0.07] hover:border-[#B69A73]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              >
                {/* Thumbnail Area */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* Top Tags */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white/90 border border-white/10">
                      {project.category}
                    </span>
                    {project.runtime ? (
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[#94A3B8] border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#B69A73]" />
                        {project.runtime}
                      </span>
                    ) : (
                      <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[#94A3B8] border border-white/10 flex items-center gap-1">
                        <Camera className="w-3 h-3 text-[#B69A73]" />
                        {project.aspectRatio}
                      </span>
                    )}
                  </div>

                  {/* Hover Floating Arrow */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                    <div className="w-9 h-9 rounded-full bg-[#B69A73] flex items-center justify-center text-black shadow-lg">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-4 font-mono text-[11px] mb-2.5 text-[#94A3B8]">
                      <span className="text-[#B69A73] uppercase tracking-wider font-semibold">
                        {project.subCategory}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h2 className="font-space font-bold text-xl sm:text-2xl text-white group-hover:text-[#B69A73] transition-colors leading-tight">
                      {project.title}
                    </h2>

                    <p className="mt-3 text-xs sm:text-sm text-[#94A3B8] line-clamp-2 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
                    <span className="text-white/40 text-[11px]">
                      {project.cameraSpecs?.camera?.split(' ')[0] || 'Studio Capture'}
                    </span>
                    <span className="text-[#B69A73] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      VIEW PROJECT &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Back to Home CTA */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:text-[#B69A73] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B69A73] hover:bg-[#A88B63] text-black font-space text-xs uppercase tracking-wider font-bold transition-all shadow-md"
          >
            <span>Commission a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

