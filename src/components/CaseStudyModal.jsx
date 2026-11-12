import React, { useEffect, useRef, useState } from 'react';
import { portfolioProjects } from '../data/studioData';
import { X, Play, Pause, Volume2, VolumeX, ArrowRight, ArrowLeft, Camera, Layers } from 'lucide-react';

export default function CaseStudyModal({ project, onClose, onSelectProject }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    if (modalRef.current) modalRef.current.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const currentIndex = portfolioProjects.findIndex((p) => p.id === project.id);
  const nextProject = portfolioProjects[(currentIndex + 1) % portfolioProjects.length];
  const prevProject = portfolioProjects[(currentIndex - 1 + portfolioProjects.length) % portfolioProjects.length];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex justify-center p-3 sm:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <div className="relative w-full max-w-5xl bg-[#0f1016] dark:bg-[#0f1016] light:bg-[#ffffff] border border-[#232634] dark:border-[#232634] light:border-[#e2e2e6] rounded-xl shadow-2xl overflow-hidden my-auto text-slate-200 dark:text-slate-200 light:text-slate-800 flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#202330] dark:border-[#202330] light:border-[#e5e5e8] bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] light:bg-slate-50">
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="text-[#c0a47d] font-bold uppercase tracking-wider">
              CASE STUDY {String(currentIndex + 1).padStart(2, '0')} // {portfolioProjects.length}
            </span>
            <span className="text-slate-600">|</span>
            <span>{project.aspectRatio}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-1.5 rounded hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-400 hover:text-white dark:hover:text-black transition-colors focus-visible:outline-none"
              aria-label="Previous project"
              title="Previous project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-1.5 rounded hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-slate-400 hover:text-white dark:hover:text-black transition-colors focus-visible:outline-none"
              aria-label="Next project"
              title="Next project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="ml-2 p-1.5 rounded bg-[#1e212b] hover:bg-[#ad906c] text-white transition-colors focus-visible:outline-none"
              aria-label="Close case study"
              title="Close modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Crisp Cinema Player Frame */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
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

              {/* Player Bottom Control Strip */}
              <div className="absolute bottom-4 inset-x-6 flex items-center justify-between z-10">
                <button
                  onClick={togglePlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ad906c] hover:bg-[#927550] text-white font-mono text-xs font-semibold uppercase tracking-wider shadow transition-colors"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>{isPlaying ? 'Pause Film' : 'Play Film'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-lg bg-black/80 border border-[#232632] text-white hover:text-[#c0a47d] transition-colors"
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
        </div>

        {/* Case Study Content Details */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Title & Metadata */}
          <div className="border-b border-[#202330] dark:border-[#202330] light:border-[#e5e5e8] pb-6">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#c0a47d] mb-2">
              <span className="uppercase tracking-wider font-semibold">{project.category}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{project.subCategory}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{project.year}</span>
            </div>

            <h2 id="case-study-title" className="font-space font-bold text-2xl sm:text-4xl text-white dark:text-white light:text-[var(--bg-primary)] tracking-tight">
              {project.title}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed max-w-3xl">
              {project.summary}
            </p>
          </div>

          {/* Two-Column Brief & Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-lg bg-[#141620] dark:bg-[#141620] light:bg-slate-50 border border-[#222532] dark:border-[#222532] light:border-[#e5e5e8]">
              <div className="font-mono text-xs uppercase tracking-wider text-[#c0a47d] mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                Creative Brief
              </div>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {project.creativeBrief}
              </p>
            </div>

            <div className="p-5 rounded-lg bg-[#141620] dark:bg-[#141620] light:bg-slate-50 border border-[#222532] dark:border-[#222532] light:border-[#e5e5e8]">
              <div className="font-mono text-xs uppercase tracking-wider text-[#c0a47d] mb-2 flex items-center gap-2">
                <Camera className="w-3.5 h-3.5" />
                Studio Execution
              </div>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                {project.studioRole}
              </p>
            </div>
          </div>

          {/* Technical Production Specifications Grid */}
          <div className="p-5 rounded-lg bg-[#12131b] dark:bg-[#12131b] light:bg-slate-100 border border-[#20222e] dark:border-[#20222e] light:border-[#e2e2e6]">
            <div className="font-mono text-xs uppercase tracking-wider text-[#c0a47d] mb-3">
              Production Camera &amp; Optical Specifications
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Camera</span>
                <span className="text-white dark:text-white light:text-black font-medium">{project.cameraSpecs.camera}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Optics</span>
                <span className="text-white dark:text-white light:text-black font-medium">{project.cameraSpecs.lenses || project.cameraSpecs.filmStock}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Aspect Ratio</span>
                <span className="text-white dark:text-white light:text-black font-medium">{project.cameraSpecs.aspect}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Lighting Setup</span>
                <span className="text-white dark:text-white light:text-black font-medium">{project.cameraSpecs.lighting || project.cameraSpecs.environment || 'Studio Rig'}</span>
              </div>
            </div>
          </div>

          {/* Curated Stills Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-slate-400 mb-3">
                Selected Stills
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.gallery.map((still, idx) => (
                  <div key={idx} className="aspect-[16/9] rounded-lg overflow-hidden bg-black border border-[#20222e]">
                    <img
                      src={still}
                      alt={`${project.title} still ${idx + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Project Footer */}
          <div className="pt-6 border-t border-[#202330] dark:border-[#202330] light:border-[#e5e5e8] flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">
              Next project: <strong className="text-white dark:text-white light:text-black">{nextProject.title}</strong>
            </span>

            <button
              onClick={() => onSelectProject(nextProject)}
              className="px-5 py-2.5 rounded-lg bg-[#ad906c] hover:bg-[#927550] text-white font-mono text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
