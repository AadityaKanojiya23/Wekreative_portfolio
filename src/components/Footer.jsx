import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { studioConfig } from '../data/studioData';
import {
  MapPin,
  Clock,
  Globe,
  ArrowUpRight,
  ArrowUp,
  Mail,
  Video,
} from 'lucide-react';

/* ─── Social Media Icons (Circular Gold-Outlined) ─── */
function YouTubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function VimeoIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.79 3.834 7.485 3.01 7.485c-.179 0-.806.378-1.881 1.132L0 7.179c1.185-1.044 2.351-2.084 3.501-3.128 1.58-1.41 2.764-2.15 3.553-2.221 1.87-.168 3.019 1.101 3.447 3.81.459 2.89.775 4.693.951 5.419.526 2.455 1.107 3.684 1.745 3.684.49 0 1.229-.787 2.221-2.361.989-1.571 1.517-2.775 1.581-3.611.116-1.373-.391-2.061-1.523-2.061-.531 0-1.082.12-1.652.362 1.096-3.593 3.193-5.342 6.29-5.247 2.296.071 3.398 1.536 3.308 4.391z" />
    </svg>
  );
}

function LinkedInIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
    </svg>
  );
}

/* ─── Cinematic Background Vector Motifs ─── */
function FilmReelArt({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="170" cy="170" r="140" stroke="#B69A73" strokeWidth="2" strokeDasharray="6 8" opacity="0.4" />
      <circle cx="170" cy="170" r="110" stroke="#B69A73" strokeWidth="1.5" opacity="0.3" />
      <circle cx="170" cy="170" r="45" stroke="#B69A73" strokeWidth="2.5" opacity="0.6" />
      <circle cx="170" cy="170" r="16" fill="#B69A73" opacity="0.5" />
      {/* Film reel spokes & sprockets */}
      <circle cx="170" cy="95" r="24" stroke="#B69A73" strokeWidth="1.5" opacity="0.45" />
      <circle cx="170" cy="245" r="24" stroke="#B69A73" strokeWidth="1.5" opacity="0.45" />
      <circle cx="95" cy="170" r="24" stroke="#B69A73" strokeWidth="1.5" opacity="0.45" />
      <circle cx="245" cy="170" r="24" stroke="#B69A73" strokeWidth="1.5" opacity="0.45" />
      {/* Cinematic Ribbon Curve */}
      <path
        d="M30 280 C 110 320, 220 290, 310 330"
        stroke="#B69A73"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path
        d="M20 295 C 100 335, 230 305, 320 345"
        stroke="#368DFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.25"
      />
    </svg>
  );
}

function CinemaCameraArt({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 380 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Matte box & cinema lens */}
      <rect x="20" y="70" width="75" height="110" rx="6" stroke="#B69A73" strokeWidth="2" opacity="0.45" />
      <circle cx="57" cy="125" r="32" stroke="#368DFF" strokeWidth="1.5" opacity="0.35" />
      {/* Lens barrel & rods */}
      <rect x="95" y="85" width="45" height="80" rx="4" stroke="#B69A73" strokeWidth="1.5" opacity="0.4" />
      <line x1="10" y1="188" x2="360" y2="188" stroke="#B69A73" strokeWidth="2.5" opacity="0.35" />
      <line x1="10" y1="198" x2="360" y2="198" stroke="#B69A73" strokeWidth="2" opacity="0.25" />
      {/* Camera body block */}
      <rect x="140" y="60" width="150" height="120" rx="10" stroke="#B69A73" strokeWidth="2" opacity="0.5" />
      {/* Top handle */}
      <path
        d="M165 60 V30 H260 V60"
        stroke="#B69A73"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
      {/* Viewfinder monitor */}
      <rect x="110" y="20" width="45" height="32" rx="3" stroke="#B69A73" strokeWidth="1.5" opacity="0.4" />
      {/* Rear battery & dual cards */}
      <rect x="290" y="75" width="42" height="90" rx="5" stroke="#B69A73" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e, hashId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#' + hashId);
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(hashId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="relative w-full overflow-hidden text-slate-300 font-sans text-xs"
      style={{
        background:
          'linear-gradient(180deg, #05080f 0%, #070c18 45%, #05080e 100%)',
      }}
      aria-label="Studio Footer"
    >
      {/* ── Background Vignette & Ambient Radial Lighting ── */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 15% 90%, rgba(182, 154, 115, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(6, 27, 53, 0.35) 0%, transparent 60%), radial-gradient(circle at 50% 10%, rgba(54, 141, 255, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* ── Bottom-Left Film Reel Cinematic Motif ── */}
      <div className="absolute -bottom-16 -left-16 w-80 h-80 pointer-events-none -z-10 opacity-30 select-none">
        <FilmReelArt className="w-full h-full" />
      </div>

      {/* ── Bottom-Right Cinema Camera Equipment Motif ── */}
      <div className="absolute -bottom-10 -right-12 w-96 h-72 pointer-events-none -z-10 opacity-25 select-none">
        <CinemaCameraArt className="w-full h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        {/* ========================================================= */}
        {/* FIVE-COLUMN MAIN FOOTER LAYOUT                            */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* ── COLUMN 1: Brand Identity ── */}
          <div className="space-y-5 lg:pr-4">
            <Link
              to="/"
              onClick={scrollToTop}
              className="inline-flex items-center gap-3.5 group focus-visible:outline-none"
              aria-label="WeKreatives Home"
            >
              <img
                src={studioConfig.logoUrl}
                alt="WeKreatives Logo"
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="font-space font-bold text-base tracking-[0.2em] text-white uppercase leading-none group-hover:text-[#B69A73] transition-colors">
                  {studioConfig.studioName}
                </span>
                <span className="font-mono text-[9px] tracking-[0.26em] text-[#94A3B8] uppercase mt-1 leading-none font-medium">
                  {studioConfig.studioSubtitle}
                </span>
              </div>
            </Link>

            <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-sm">
              A full-spectrum film production and editorial photography studio, crafting visual
              stories for brands, agencies, and creators worldwide.
            </p>

            {/* Social Media Circular Gold-Outlined Icons */}
            <div className="flex items-center gap-3 pt-1">
              {/* YouTube */}
              <a
                href="https://youtube.com/@wekreatives"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B69A73]/30 bg-white/[0.03] text-[#B69A73] flex items-center justify-center hover:border-[#B69A73] hover:bg-[#B69A73] hover:text-[#111111] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="YouTube Channel"
                title="YouTube"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>

              {/* Instagram */}
              <a
                href={studioConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B69A73]/30 bg-white/[0.03] text-[#B69A73] flex items-center justify-center hover:border-[#B69A73] hover:bg-[#B69A73] hover:text-[#111111] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Instagram Profile"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              {/* Vimeo */}
              <a
                href={studioConfig.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B69A73]/30 bg-white/[0.03] text-[#B69A73] flex items-center justify-center hover:border-[#B69A73] hover:bg-[#B69A73] hover:text-[#111111] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Vimeo Portfolio"
                title="Vimeo"
              >
                <VimeoIcon className="w-4 h-4" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/wekreatives"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#B69A73]/30 bg-white/[0.03] text-[#B69A73] flex items-center justify-center hover:border-[#B69A73] hover:bg-[#B69A73] hover:text-[#111111] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── COLUMN 2: Explore ── */}
          <div className="space-y-4">
            <h3 className="font-space font-bold uppercase text-xs tracking-[0.2em] text-white">
              EXPLORE
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  onClick={scrollToTop}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Our Work</span>
                </Link>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Services</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 3: Services ── */}
          <div className="space-y-4">
            <h3 className="font-space font-bold uppercase text-xs tracking-[0.2em] text-white">
              SERVICES
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Film Production</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Photography</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Post Production</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Brand Films</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Commercials</span>
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Content Creation</span>
                </a>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 4: Resources ── */}
          <div className="space-y-4">
            <h3 className="font-space font-bold uppercase text-xs tracking-[0.2em] text-white">
              RESOURCES
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5"
                >
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Project Brief</span>
                </a>
              </li>
              <li>
                <span className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Studio Guidelines</span>
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>FAQs</span>
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Privacy Policy</span>
                </span>
              </li>
              <li>
                <span className="text-slate-300 hover:text-[#B69A73] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span className="text-[#B69A73]/60">&bull;</span>
                  <span>Terms &amp; Conditions</span>
                </span>
              </li>
            </ul>
          </div>

          {/* ── COLUMN 5: Get in Touch (Glass Contact Cards) ── */}
          <div className="space-y-4">
            <h3 className="font-space font-bold uppercase text-xs tracking-[0.2em] text-white">
              GET IN TOUCH
            </h3>

            <div className="space-y-2.5">
              {/* Email Card */}
              <a
                href={`mailto:${studioConfig.contactEmail}`}
                className="group p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#B69A73]/50 flex items-center justify-between transition-all duration-200"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-[#B69A73]/30 flex items-center justify-center text-[#B69A73] shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[9px] text-[#94A3B8] uppercase block">
                      Direct Email
                    </span>
                    <span className="font-mono text-[11px] text-white group-hover:text-[#B69A73] transition-colors truncate block">
                      {studioConfig.contactEmail}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#B69A73] transition-colors shrink-0 ml-2" />
              </a>

              {/* Instagram Card */}
              <a
                href={studioConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#B69A73]/50 flex items-center justify-between transition-all duration-200"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-[#B69A73]/30 flex items-center justify-center text-[#B69A73] shrink-0">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[9px] text-[#94A3B8] uppercase block">
                      Instagram
                    </span>
                    <span className="font-mono text-[11px] text-white group-hover:text-[#B69A73] transition-colors truncate block">
                      {studioConfig.instagramHandle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#B69A73] transition-colors shrink-0 ml-2" />
              </a>

              {/* Vimeo Card */}
              <a
                href={studioConfig.vimeoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#B69A73]/50 flex items-center justify-between transition-all duration-200"
                style={{
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-[#B69A73]/30 flex items-center justify-center text-[#B69A73] shrink-0">
                    <Video className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <span className="font-mono text-[9px] text-[#94A3B8] uppercase block">
                      Vimeo Channel
                    </span>
                    <span className="font-mono text-[11px] text-white group-hover:text-[#B69A73] transition-colors truncate block">
                      nocturnestudio
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#B69A73] transition-colors shrink-0 ml-2" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THREE-ITEM STUDIO INFORMATION STRIP                       */}
        {/* ========================================================= */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 border-b border-white/[0.08]">
          {/* ITEM 1: Location (Mumbai, Maharashtra, India) */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#B69A73]/35 flex items-center justify-center text-[#B69A73] shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-space font-bold text-sm sm:text-base text-white tracking-wide">
                Mumbai, Maharashtra, India
              </span>
              <span className="font-mono text-xs text-[#94A3B8] mt-0.5">
                Our Studio Location
              </span>
            </div>
          </div>

          {/* ITEM 2: Response Time */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#B69A73]/35 flex items-center justify-center text-[#B69A73] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-space font-bold text-sm sm:text-base text-white tracking-wide">
                Within 24 Business Hours
              </span>
              <span className="font-mono text-xs text-[#94A3B8] mt-0.5">
                Typical Response Time
              </span>
            </div>
          </div>

          {/* ITEM 3: Global Collaborations */}
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#B69A73]/35 flex items-center justify-center text-[#B69A73] shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-space font-bold text-sm sm:text-base text-white tracking-wide">
                Worldwide Collaborations
              </span>
              <span className="font-mono text-xs text-[#94A3B8] mt-0.5">
                Open to Projects Worldwide
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BOTTOM FOOTER BAR                                         */}
        {/* ========================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5 font-mono text-xs text-[#94A3B8]">
          {/* Left Side: Copyright */}
          <div>
            &copy; 2026 WeKreatives Creative Studio. All rights reserved.
          </div>

          {/* Right Side: Legal Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Terms &amp; Conditions
            </span>
            <span className="text-white/20">&bull;</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              Cookies
            </span>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="ml-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-white hover:border-[#B69A73] hover:text-[#B69A73] transition-all cursor-pointer active:scale-95"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
