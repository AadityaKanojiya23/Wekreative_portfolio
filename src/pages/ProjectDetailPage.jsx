import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { portfolioProjects } from '../data/studioData';
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Camera,
  Layers,
  Film,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsPlaying(false);
  }, [slug]);

  const currentIndex = portfolioProjects.findIndex((p) => p.id === slug);
  const project = portfolioProjects[currentIndex];

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-24 text-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-display font-bold text-4xl mb-4">Project Not Found</h1>
        <p className="font-mono text-sm text-[#94A3B8] mb-8">
          The requested portfolio project could not be found in the archive.
        </p>
        <Link
          to="/portfolio"
          className="px-6 py-3 rounded-xl bg-[#B69A73] text-black font-mono text-xs uppercase font-bold tracking-wider"
        >
          &larr; Return to Portfolio
        </Link>
      </div>
    );
  }

  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const prevProject =
    portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen pt-28 pb-28 text-white relative">
      {/* Subtle Background Ambience */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 10%, rgba(182, 154, 115, 0.09) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(100, 50, 200, 0.05) 0%, transparent 50%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8 flex items-center justify-between text-xs font-ui text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-[#B69A73] transition-colors">
              HOME
            </Link>
            <span>/</span>
            <Link to="/portfolio" className="hover:text-[#B69A73] transition-colors">
              PORTFOLIO
            </Link>
            <span>/</span>
            <span className="text-[#B69A73] uppercase">{project.title}</span>
          </div>

          <Link
            to="/portfolio"
            className="hidden sm:inline-flex items-center gap-1.5 text-[#B69A73] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL WORK</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3 font-editorial text-xs text-[#B69A73] mb-3 uppercase tracking-widest">
            <span className="font-semibold">{project.category}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{project.subCategory}</span>
            <span className="text-white/30">/</span>
            <span className="text-white/70">{project.year}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-6">
            {project.title}
          </h1>

          <p className="font-ui text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* ========================================================= */}
        {/* CINEMA HERO PLAYER / COVER                                */}
        {/* ========================================================= */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl mb-14">
          {project.videoUrl ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={project.videoUrl}
                poster={project.coverImage}
                playsInline
                loop
                muted={isMuted}
                className="w-full h-full object-contain"
              />

              {/* Video Player Floating Controls */}
              <div className="absolute bottom-5 inset-x-6 flex items-center justify-between z-20">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B69A73] hover:bg-[#A88B63] text-black font-space text-xs font-bold uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current" />
                  )}
                  <span>{isPlaying ? 'Pause Film' : 'Play Film'}</span>
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-2.5 rounded-xl bg-black/75 hover:bg-black border border-white/15 text-white hover:text-[#B69A73] transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          )}

          {/* Aspect Ratio Badge */}
          <div className="absolute top-4 right-4 pointer-events-none">
            <span className="font-editorial text-[10px] uppercase tracking-wider text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
              {project.aspectRatio}
            </span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CREATIVE BRIEF & EXECUTION                                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
            <div className="font-editorial text-xs uppercase tracking-widest text-[#B69A73] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>The Creative Brief</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-ui">
              {project.creativeBrief}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
            <div className="font-editorial text-xs uppercase tracking-widest text-[#B69A73] mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Studio Role &amp; Execution</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-ui">
              {project.studioRole}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TECHNICAL PRODUCTION SPECIFICATIONS                       */}
        {/* ========================================================= */}
        {project.cameraSpecs && (
          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-14">
            <div className="font-editorial text-xs uppercase tracking-widest text-[#B69A73] mb-6 flex items-center gap-2">
              <Film className="w-4 h-4" />
              <span>Production Optics &amp; Camera Specifications</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 font-editorial text-xs">
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase mb-1">Camera Body</span>
                <span className="text-white font-medium">{project.cameraSpecs.camera}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase mb-1">Optics / Stock</span>
                <span className="text-white font-medium">
                  {project.cameraSpecs.lenses || project.cameraSpecs.filmStock || 'Cinema Primes'}
                </span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase mb-1">Native Aspect</span>
                <span className="text-white font-medium">{project.cameraSpecs.aspect}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px] uppercase mb-1">Lighting Design</span>
                <span className="text-white font-medium">
                  {project.cameraSpecs.lighting || project.cameraSpecs.environment || 'Directional Rig'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CURATED STILLS GALLERY                                    */}
        {/* ========================================================= */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-14">
            <div className="font-editorial text-xs uppercase tracking-widest text-[#B69A73] mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Selected Gallery Frames</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {project.gallery.map((still, idx) => (
                <div
                  key={idx}
                  className="aspect-[16/10] rounded-xl overflow-hidden bg-black border border-white/[0.08] shadow-md group"
                >
                  <img
                    src={still}
                    alt={`${project.title} frame ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PRODUCTION CREDITS                                        */}
        {/* ========================================================= */}
        {project.credits && project.credits.length > 0 && (
          <div className="p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-14">
            <div className="font-editorial text-xs uppercase tracking-widest text-[#B69A73] mb-5">
              Project Credits
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-editorial text-xs">
              {project.credits.map((c, i) => (
                <div key={i} className="border-l border-white/10 pl-3">
                  <span className="text-[#94A3B8] block text-[10px] uppercase">{c.role}</span>
                  <span className="text-white font-medium">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PREVIOUS / NEXT PROJECT NAVIGATION                        */}
        {/* ========================================================= */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* Previous Project */}
          <Link
            to={`/portfolio/${prevProject.id}`}
            className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#B69A73]/40 transition-all flex items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-black">
              <img
                src={prevProject.coverImage}
                alt={prevProject.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-editorial text-[10px] text-[#94A3B8] uppercase block">
                &larr; Previous Project
              </span>
              <span className="font-display font-bold text-white group-hover:text-[#B69A73] transition-colors truncate block">
                {prevProject.title}
              </span>
            </div>
          </Link>

          {/* Next Project */}
          <Link
            to={`/portfolio/${nextProject.id}`}
            className="group p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-[#B69A73]/40 transition-all flex items-center justify-between gap-4 text-right"
          >
            <div className="flex-1 min-w-0">
              <span className="font-editorial text-[10px] text-[#94A3B8] uppercase block">
                Next Project &rarr;
              </span>
              <span className="font-display font-bold text-white group-hover:text-[#B69A73] transition-colors truncate block">
                {nextProject.title}
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-black">
              <img
                src={nextProject.coverImage}
                alt={nextProject.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
          </Link>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:text-[#B69A73] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B69A73] hover:bg-[#A88B63] text-black font-space text-xs uppercase tracking-wider font-bold transition-all shadow-md"
          >
            <span>Commission This Quality</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}


