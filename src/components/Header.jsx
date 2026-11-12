import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { studioConfig } from '../data/studioData';
import { ChevronDown, ArrowUpRight, Menu, X } from 'lucide-react';

/* ─────────────────────────────────────────────
   Premium dropdown animation keyframes.
   Injected once as a <style> tag so we keep
   zero extra dependencies and full control.
───────────────────────────────────────────── */
const DROPDOWN_STYLES = `
  @keyframes wk-panel-in {
    from {
      opacity: 0;
      transform: translateY(14px) scale(0.97);
      filter: blur(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }

  @keyframes wk-panel-out {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
    to {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
      filter: blur(3px);
    }
  }

  @keyframes wk-item-in {
    from {
      opacity: 0;
      transform: translateY(10px);
      filter: blur(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }
  }

  .wk-panel-enter {
    animation: wk-panel-in 480ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .wk-panel-exit {
    animation: wk-panel-out 220ms cubic-bezier(0.4, 0, 1, 1) forwards;
  }

  .wk-item-enter {
    opacity: 0;
    animation: wk-item-in 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* Respect reduced-motion preference */
  @media (prefers-reduced-motion: reduce) {
    .wk-panel-enter, .wk-panel-exit, .wk-item-enter {
      animation: none;
      opacity: 1;
      transform: none;
      filter: none;
    }
  }
`;

export default function Header({ onOpenEnquiry, onSelectWorkCategory, onSelectService }) {
  const [activeDropdown, setActiveDropdown] = useState(null); // 'work' | 'services' | null
  const [closingDropdown, setClosingDropdown] = useState(null); // tracks which panel is playing exit anim
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState(null); // 'work' | 'services' | null
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef(null);

  /* Inject animation styles once */
  useEffect(() => {
    if (document.getElementById('wk-dropdown-styles')) return;
    const tag = document.createElement('style');
    tag.id = 'wk-dropdown-styles';
    tag.textContent = DROPDOWN_STYLES;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  /* Smooth close: play exit animation for ~200ms then unmount */
  const closeDropdown = (which) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setClosingDropdown(which || activeDropdown);
    closeTimerRef.current = setTimeout(() => {
      setClosingDropdown(null);
      setActiveDropdown(null);
    }, 210);
  };

  const openDropdown = (which) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setClosingDropdown(null);
    setActiveDropdown(which);
  };

  const toggleDropdown = (which) => {
    if (activeDropdown === which) {
      closeDropdown(which);
    } else {
      openDropdown(which);
    }
  };

  const workDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const navRef = useRef(null);

  // Scroll detection for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle outside click & Escape key to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        workDropdownRef.current &&
        !workDropdownRef.current.contains(e.target) &&
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target)
      ) {
        closeDropdown(activeDropdown);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeDropdown(activeDropdown);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // WORK Dropdown Items
  const workItems = [
    { label: 'All Projects', category: 'All', hint: 'Curated Portfolio' },
    { label: 'Videography', category: 'Film', hint: 'Cinema & Commercial' },
    { label: 'Photography', category: 'Photography', hint: 'Editorial & Stills' },
    { label: 'Brand Films', category: 'Film', hint: 'Narrative Identity' },
    { label: 'Commercial Films', category: 'Campaigns', hint: 'Broadcast & Web' },
    { label: 'Wedding Films', category: 'Events', hint: 'Cinematic Celebrations' },
    { label: 'Cinematic Films', category: 'Film', hint: 'Anamorphic Stories' },
    { label: 'Content Creation', category: 'Campaigns', hint: 'Multi-Platform' },
    { label: 'Social Media Reels', category: 'Film', hint: 'Vertical Short-Form' },
    { label: 'Portfolio Details', category: 'All', hint: 'Technical Specs' },
  ];

  // SERVICES Dropdown Items
  const serviceItems = [
    { label: 'Professional Videography', service: 'Brand Films & Commercials' },
    { label: 'Photography', service: 'Product & Lifestyle Photography' },
    { label: 'Cinematography', service: 'Brand Films & Commercials' },
    { label: 'Content Creation', service: 'Social-First Video & Short Form' },
    { label: 'Brand & Commercial Films', service: 'Brand Films & Commercials' },
    { label: 'Social Media Content', service: 'Social-First Video & Short Form' },
    { label: 'Event Coverage', service: 'Events & Live Cultural Coverage' },
    { label: 'Video Editing & Post Production', service: 'Post-Production, Color & Sound' },
    { label: 'Creative Direction', service: 'Creative Direction & Production' },
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    closeDropdown();
    setMobileMenuOpen(false);

    if (targetId === 'home') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (location.pathname !== '/') {
      navigate('/#' + targetId);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWorkItemClick = (e, item) => {
    e.preventDefault();
    closeDropdown();
    setMobileMenuOpen(false);

    if (item.category === 'All' || item.label === 'Portfolio Details' || location.pathname.startsWith('/portfolio')) {
      navigate(`/portfolio?category=${encodeURIComponent(item.category)}`);
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
      return;
    }

    if (onSelectWorkCategory) {
      onSelectWorkCategory(item.category);
    }

    if (location.pathname !== '/') {
      navigate('/portfolio?category=' + encodeURIComponent(item.category));
      return;
    }

    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleServiceItemClick = (e, item) => {
    e.preventDefault();
    closeDropdown();
    setMobileMenuOpen(false);

    if (onSelectService) {
      onSelectService(item.service);
    }

    if (location.pathname !== '/') {
      navigate('/#services');
      setTimeout(() => {
        const servicesEl = document.getElementById('services');
        if (servicesEl) {
          servicesEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const servicesEl = document.getElementById('services');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = (e) => {
    e.preventDefault();
    closeDropdown();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        if (onOpenEnquiry) onOpenEnquiry();
        const contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (onOpenEnquiry) {
      onOpenEnquiry();
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 w-full z-50 h-[80px] transition-all duration-500"
        style={{
          background: 'rgba(5, 8, 15, 0.35)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
        role="banner"
      >
        <div className="w-full h-full px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* ========================================================= */}
          {/* 1. LEFT SECTION — Brand Identity                          */}
          {/* ========================================================= */}
          <div className="flex-1 flex items-center justify-start">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'home')}
              className="group flex items-center gap-3.5 focus-visible:outline-none"
              aria-label={`${studioConfig.studioName} Home`}
            >
              {/* W Logo — No background container */}
              <img
                src={studioConfig.logoUrl}
                alt={`${studioConfig.studioName} Logo`}
                className="h-10 w-auto object-contain"
                style={{ maxHeight: '40px' }}
              />

              {/* Brand Typography */}
              <div className="flex flex-col text-left">
                <span className="font-space font-bold text-lg sm:text-xl tracking-[0.22em] text-white uppercase leading-none group-hover:text-[#B69A73] transition-colors">
                  {studioConfig.studioName}
                </span>
                <span className="font-mono text-[9px] tracking-[0.28em] text-[#94A3B8] uppercase mt-1 leading-none font-medium">
                  {studioConfig.studioSubtitle}
                </span>
              </div>
            </a>
          </div>

          {/* ========================================================= */}
          {/* 2. CENTER SECTION — Navigation Menu                       */}
          {/* ========================================================= */}
          <nav
            className="hidden lg:flex items-center justify-center gap-8 xl:gap-10 h-full"
            aria-label="Main Navigation"
          >
            {/* 1. HOME */}
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'home')}
              className="font-space text-xs tracking-[0.16em] uppercase font-semibold text-white hover:text-[#B69A73] transition-colors py-2 focus-visible:outline-none relative group"
            >
              <span>HOME</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B69A73] transition-all duration-200 group-hover:w-full"></span>
            </a>

            {/* 2. WORK (Dropdown) */}
            <div
              ref={workDropdownRef}
              className="relative h-full flex items-center"
              onMouseEnter={() => openDropdown('work')}
              onMouseLeave={() => closeDropdown('work')}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('work')}
                className={`font-space text-xs tracking-[0.16em] uppercase font-semibold flex items-center gap-1.5 py-2 transition-colors focus-visible:outline-none cursor-pointer ${
                  activeDropdown === 'work' ? 'text-[#B69A73]' : 'text-white hover:text-[#B69A73]'
                }`}
                aria-expanded={activeDropdown === 'work'}
                aria-haspopup="true"
              >
                <span>WORK</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'work' ? 'rotate-180 text-[#B69A73]' : 'text-[#94A3B8]'
                  }`}
                />
              </button>

              {/* WORK — Animated Dropdown Panel */}
              {(activeDropdown === 'work' || closingDropdown === 'work') && (
                <div
                  className={`absolute top-[72px] left-1/2 -translate-x-1/2 pt-2 z-50 ${
                    closingDropdown === 'work' ? 'wk-panel-exit' : 'wk-panel-enter'
                  }`}
                  role="menu"
                  aria-label="Work Projects"
                >
                  <div className="w-[330px] bg-[#FFFFFF] border border-[#E8E6E0] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.30)] p-4 sm:p-5 text-left">
                    {/* Dropdown Header */}
                    <div className="px-3 pb-3 mb-2 border-b border-[#F0EFEB] flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#777777] font-semibold">
                        Selected Folio
                      </span>
                      <span className="font-mono text-[10px] text-[#B69A73] font-semibold">
                        10 Categories
                      </span>
                    </div>

                    {/* Staggered Items */}
                    <div className="space-y-1">
                      {workItems.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => handleWorkItemClick(e, item)}
                          className="wk-item-enter w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-space font-medium text-[#111111] hover:bg-[#F6F4EF] hover:text-[#B69A73] transition-all duration-200 group/item"
                          style={{
                            animationDelay: closingDropdown === 'work' ? '0ms' : `${60 + idx * 72}ms`,
                          }}
                          role="menuitem"
                        >
                          <span className="group-hover/item:translate-x-1 transition-transform duration-200">
                            {item.label}
                          </span>
                          <span className="font-mono text-[10px] text-[#999999] group-hover/item:text-[#B69A73] transition-colors duration-200 flex items-center gap-1">
                            {item.hint}
                            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200" />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. SERVICES (Dropdown) */}
            <div
              ref={servicesDropdownRef}
              className="relative h-full flex items-center"
              onMouseEnter={() => openDropdown('services')}
              onMouseLeave={() => closeDropdown('services')}
            >
              <button
                type="button"
                onClick={() => toggleDropdown('services')}
                className={`font-space text-xs tracking-[0.16em] uppercase font-semibold flex items-center gap-1.5 py-2 transition-colors focus-visible:outline-none cursor-pointer ${
                  activeDropdown === 'services' ? 'text-[#B69A73]' : 'text-white hover:text-[#B69A73]'
                }`}
                aria-expanded={activeDropdown === 'services'}
                aria-haspopup="true"
              >
                <span>SERVICES</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeDropdown === 'services' ? 'rotate-180 text-[#B69A73]' : 'text-[#94A3B8]'
                  }`}
                />
              </button>

              {/* SERVICES — Animated Dropdown Panel */}
              {(activeDropdown === 'services' || closingDropdown === 'services') && (
                <div
                  className={`absolute top-[72px] left-1/2 -translate-x-1/2 pt-2 z-50 ${
                    closingDropdown === 'services' ? 'wk-panel-exit' : 'wk-panel-enter'
                  }`}
                  role="menu"
                  aria-label="Studio Services"
                >
                  <div className="w-[350px] bg-[#FFFFFF] border border-[#E8E6E0] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.30)] p-4 sm:p-5 text-left">
                    {/* Dropdown Header */}
                    <div className="px-3 pb-3 mb-2 border-b border-[#F0EFEB] flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#777777] font-semibold">
                        Creative Capabilities
                      </span>
                      <span className="font-mono text-[10px] text-[#B69A73] font-semibold">
                        Full-Spectrum
                      </span>
                    </div>

                    {/* Staggered Items */}
                    <div className="space-y-1">
                      {serviceItems.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={(e) => handleServiceItemClick(e, item)}
                          className="wk-item-enter w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-space font-medium text-[#111111] hover:bg-[#F6F4EF] hover:text-[#B69A73] transition-all duration-200 group/item"
                          style={{
                            animationDelay: closingDropdown === 'services' ? '0ms' : `${60 + idx * 72}ms`,
                          }}
                          role="menuitem"
                        >
                          <span className="group-hover/item:translate-x-1 transition-transform duration-200">
                            {item.label}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 text-[#B69A73] transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. ABOUT */}
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="font-space text-xs tracking-[0.16em] uppercase font-semibold text-white hover:text-[#B69A73] transition-colors py-2 focus-visible:outline-none relative group"
            >
              <span>ABOUT</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B69A73] transition-all duration-200 group-hover:w-full"></span>
            </a>

            {/* 5. CONTACT */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="font-space text-xs tracking-[0.16em] uppercase font-semibold text-white hover:text-[#B69A73] transition-colors py-2 focus-visible:outline-none relative group"
            >
              <span>CONTACT</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B69A73] transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>

          {/* ========================================================= */}
          {/* 3. RIGHT SECTION — Primary CTA Button                     */}
          {/* ========================================================= */}
          <div className="flex-1 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={handleCtaClick}
              className="group hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#B69A73] hover:bg-[#A88B63] text-[#111111] font-space text-xs uppercase tracking-[0.16em] font-bold shadow-sm hover:shadow-[0_8px_20px_rgba(182,154,115,0.25)] transition-all duration-200 active:scale-95 focus-visible:outline-none cursor-pointer"
            >
              <span>CONTACT US</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:text-[#B69A73] transition-colors focus-visible:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 4. MOBILE FULL-WIDTH NAVIGATION PANEL                     */}
      {/* ========================================================= */}
      <div
        className={`fixed inset-0 z-40 bg-[#000000]/98 transition-all duration-300 lg:hidden flex flex-col justify-between p-6 sm:p-10 pt-28 overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-4">
          {/* HOME */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'home')}
            className="text-left font-space text-xl font-bold uppercase tracking-wider text-white hover:text-[#B69A73] py-2 border-b border-[#1E293B]"
          >
            HOME
          </button>

          {/* WORK Accordion */}
          <div className="border-b border-[#1E293B] py-2">
            <button
              type="button"
              onClick={() => setMobileAccordion(mobileAccordion === 'work' ? null : 'work')}
              className="w-full flex items-center justify-between text-left font-space text-xl font-bold uppercase tracking-wider text-white hover:text-[#B69A73]"
            >
              <span>WORK</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileAccordion === 'work' ? 'rotate-180 text-[#B69A73]' : 'text-slate-400'
                }`}
              />
            </button>

            {mobileAccordion === 'work' && (
              <div className="mt-3 pl-3 space-y-2 pb-2">
                {workItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleWorkItemClick(e, item)}
                    className="w-full text-left font-space text-sm text-slate-300 hover:text-[#B69A73] py-1.5 flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-[10px] text-slate-500">{item.hint}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SERVICES Accordion */}
          <div className="border-b border-[#1E293B] py-2">
            <button
              type="button"
              onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
              className="w-full flex items-center justify-between text-left font-space text-xl font-bold uppercase tracking-wider text-white hover:text-[#B69A73]"
            >
              <span>SERVICES</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-200 ${
                  mobileAccordion === 'services' ? 'rotate-180 text-[#B69A73]' : 'text-slate-400'
                }`}
              />
            </button>

            {mobileAccordion === 'services' && (
              <div className="mt-3 pl-3 space-y-2 pb-2">
                {serviceItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleServiceItemClick(e, item)}
                    className="w-full text-left font-space text-sm text-slate-300 hover:text-[#B69A73] py-1.5"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ABOUT */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'about')}
            className="text-left font-space text-xl font-bold uppercase tracking-wider text-white hover:text-[#B69A73] py-2 border-b border-[#1E293B]"
          >
            ABOUT
          </button>

          {/* CONTACT */}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="text-left font-space text-xl font-bold uppercase tracking-wider text-white hover:text-[#B69A73] py-2 border-b border-[#1E293B]"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="pt-8">
          <button
            type="button"
            onClick={handleCtaClick}
            className="w-full py-4 rounded-lg bg-[#B69A73] text-[#111111] font-space text-sm uppercase tracking-[0.16em] font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>CONTACT US</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="mt-4 text-center font-mono text-[11px] text-slate-400">
            {studioConfig.legalName} &bull; {studioConfig.location}
          </div>
        </div>
      </div>
    </>
  );
}
