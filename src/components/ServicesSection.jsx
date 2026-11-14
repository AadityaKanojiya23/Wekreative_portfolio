import React, { useState } from 'react';
import {
  Clapperboard,
  Camera,
  Music,
  Briefcase,
  Palette,
  SlidersHorizontal,
  ArrowRight,
} from 'lucide-react';

/* ─── 8 Services Data (4 columns x 2 rows on desktop) ─── */
const SERVICES_DATA = [
  {
    id: '01',
    number: '01',
    title: 'Brand Films & Commercials',
    description: 'High-impact visual stories that build brand value.',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Cinema camera on set with anamorphic lens and studio lighting',
    iconType: 'clapper',
  },
  {
    id: '02',
    number: '02',
    title: 'Product & Lifestyle Photography',
    description: 'Clean, compelling visuals that sell and connect.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Luxury product tabletop photography with warm rim lighting',
    iconType: 'camera',
  },
  {
    id: '03',
    number: '03',
    title: 'Fashion & Editorial Shoots',
    description: 'Styled, expressive shoots with a distinct visual identity.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Tailored fashion suit jacket on hanger with studio photography softbox lighting',
    iconType: 'hanger',
  },
  {
    id: '04',
    number: '04',
    title: 'Events & Live Cultural Coverage',
    description: 'Dynamic, real-time storytelling for events, shows, and culture.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Live concert stage spotlights and audience silhouettes',
    iconType: 'event',
  },
  {
    id: '05',
    number: '05',
    title: 'Music Videos & Artist Films',
    description: 'Visual translation of sonic emotion with bold art direction.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Atmospheric neon music performance and artist lighting',
    iconType: 'music',
  },
  {
    id: '06',
    number: '06',
    title: 'Corporate & Brand Photography',
    description: 'Authentic executive portraits and narrative workplace imagery.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Modern corporate architecture and executive workspace',
    iconType: 'corporate',
  },
  {
    id: '07',
    number: '07',
    title: 'Creative Direction & Art Production',
    description: 'End-to-end creative stewardship from pitch to final delivery.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Creative direction moodboards, palette, and art production treatments',
    iconType: 'creative',
  },
  {
    id: '08',
    number: '08',
    title: 'Post Production & Color Grading',
    description: 'Precision DaVinci Resolve color grading, edit, and sound design.',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=85',
    imageAlt: 'Color grading suite with reference displays and video timeline',
    iconType: 'post',
  },
];

/* ─── Elegant Golden Outline Icons matching Reference Design ─── */
function ServiceIcon({ type }) {
  const iconClass = 'w-5 h-5 text-[#D9AC72]';

  switch (type) {
    case 'clapper':
      return <Clapperboard className={iconClass} strokeWidth={1.5} />;
    case 'camera':
      return <Camera className={iconClass} strokeWidth={1.5} />;
    case 'hanger':
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 3a2.5 2.5 0 0 1 2.5 2.5c0 1.05-.65 1.95-1.5 2.33V9l8.2 5.5a1.5 1.5 0 0 1-.8 2.7H4.1a1.5 1.5 0 0 1-.8-2.7L11.5 9V7.83A2.5 2.5 0 0 1 12 3z" />
        </svg>
      );
    case 'event':
      return (
        <svg
          className={iconClass}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polygon points="12 12.2 13.1 14.5 15.6 14.8 13.8 16.5 14.2 19 12 17.8 9.8 19 10.2 16.5 8.4 14.8 10.9 14.5 12 12.2" />
        </svg>
      );
    case 'music':
      return <Music className={iconClass} strokeWidth={1.5} />;
    case 'corporate':
      return <Briefcase className={iconClass} strokeWidth={1.5} />;
    case 'creative':
      return <Palette className={iconClass} strokeWidth={1.5} />;
    case 'post':
      return <SlidersHorizontal className={iconClass} strokeWidth={1.5} />;
    default:
      return <Camera className={iconClass} strokeWidth={1.5} />;
  }
}

export default function ServicesSection({ onOpenEnquiryWithService }) {
  // Persistent Set of revealed card IDs — cards stay revealed cumulatively once hovered
  const [revealedCards, setRevealedCards] = useState(() => new Set());
  // Tracks active hovered card for subtle focus styling without resetting revealed state
  const [hoveredCard, setHoveredCard] = useState(null);

  // Progressive reveal: adds card to set permanently
  const revealCard = (id) => {
    setHoveredCard(id);
    setRevealedCards((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleCardClick = (service) => {
    revealCard(service.id);
    if (revealedCards.has(service.id)) {
      if (onOpenEnquiryWithService) {
        onOpenEnquiryWithService(service.title);
      }
    }
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-28 relative scroll-mt-20"
      aria-label="Studio Services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-editorial text-xs uppercase tracking-widest text-[#c0a47d] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ad906c]"></span>
              Disciplines &amp; Capabilities
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white dark:text-white light:text-[var(--bg-primary)] tracking-tight">
              Studio Services
            </h2>
          </div>

          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-ui text-xs sm:text-sm max-w-md">
            Turnkey production or specialized creative roles. Tailored to the script, timeline, and
            delivery requirements of every commission.
          </p>
        </div>

        {/* 8-Card Responsive Grid (Desktop: 4 columns x 2 rows, Tablet: 2 cols, Mobile: 1 col) */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {SERVICES_DATA.map((service) => {
            // Once a card is revealed, it stays permanently revealed!
            const isRevealed = revealedCards.has(service.id);
            const isHovered = hoveredCard === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => revealCard(service.id)}
                onClick={() => handleCardClick(service)}
                className="relative h-[300px] rounded-[18px] flex flex-col justify-between bg-[#0B0D13] border transition-all duration-500 cursor-pointer select-none group overflow-hidden will-change-[transform,box-shadow,border-color]"
                style={{
                  transform: isHovered
                    ? 'scale(1.025) translateZ(0)'
                    : 'scale(1) translateZ(0)',
                  borderColor: isHovered
                    ? 'rgba(217, 172, 114, 0.75)'
                    : isRevealed
                    ? 'rgba(217, 172, 114, 0.35)'
                    : 'rgba(217, 172, 114, 0.16)',
                  boxShadow: isHovered
                    ? '0 18px 45px -8px rgba(0, 0, 0, 0.95), 0 0 28px rgba(217, 172, 114, 0.22)'
                    : isRevealed
                    ? '0 8px 24px rgba(0, 0, 0, 0.5)'
                    : '0 6px 20px rgba(0, 0, 0, 0.4)',
                  zIndex: isHovered ? 20 : isRevealed ? 10 : 1,
                  transition:
                    'transform 380ms cubic-bezier(0.22, 1, 0.36, 1), border-color 380ms ease, box-shadow 380ms ease',
                }}
              >
                {/* ── TOP-LEFT NUMBER BADGE (Always sharp & visible) ── */}
                <div className="absolute top-3.5 left-3.5 z-30 pointer-events-none">
                  <span
                    className="font-mono text-[11px] font-semibold tracking-wider text-[#D9AC72] border border-[#D9AC72]/35 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full shadow-sm transition-opacity duration-300"
                    style={{ opacity: isRevealed ? 1 : 0.85 }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* ── UPPER PORTION: CINEMATIC IMAGE ── */}
                <div className="relative w-full h-[125px] overflow-hidden pointer-events-none">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover transition-all duration-600 ease-out"
                    style={{
                      opacity: isRevealed ? 1 : 0.2,
                      filter: isRevealed ? 'blur(0px) brightness(1.05)' : 'blur(7px) brightness(0.55)',
                      transform: isRevealed ? 'scale(1)' : 'scale(1.08)',
                    }}
                    loading="lazy"
                  />

                  {/* Gradient Overlay for Readability */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-400"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(11, 13, 19, 0.35) 0%, rgba(11, 13, 19, 0.15) 35%, rgba(11, 13, 19, 0.85) 85%, #0B0D13 100%)',
                      opacity: isRevealed ? 1 : 0.85,
                    }}
                  />
                </div>

                {/* ── BLURRED STATE: CENTERED HEADLINE (Smoothly hides on reveal and stays hidden) ── */}
                <div
                  className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-center"
                  style={{
                    opacity: isRevealed ? 0 : 1,
                    transform: isRevealed
                      ? 'translateY(-130%) scale(0.96)'
                      : 'translateY(-50%) scale(1)',
                    transition: isRevealed
                      ? 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease'
                      : 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1), opacity 300ms ease 60ms',
                  }}
                >
                  <h3 className="font-display font-bold text-[16px] sm:text-[17px] text-[#F5F2ED] tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <div
                    className="w-8 h-[1.5px] mx-auto mt-2 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #D9AC72, transparent)',
                      opacity: isRevealed ? 0 : 0.65,
                      transition: 'opacity 250ms ease',
                    }}
                  />
                </div>

                {/* ── LOWER PORTION: REVEALED CONTENT (Becomes clear permanently upon hover) ── */}
                <div className="p-4 pt-1 flex flex-col justify-between flex-1 relative z-10">
                  <div>
                    {/* Golden Outline Icon */}
                    <div
                      className="mb-2"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'translateY(0)' : 'translateY(12px)',
                        filter: isRevealed ? 'blur(0px)' : 'blur(5px)',
                        transition: isRevealed
                          ? 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 70ms, opacity 300ms ease 70ms, filter 350ms ease 70ms'
                          : 'transform 200ms ease, opacity 160ms ease, filter 200ms ease',
                      }}
                    >
                      <ServiceIcon type={service.iconType} />
                    </div>

                    {/* Prominent Service Heading */}
                    <h3
                      className="font-display font-bold text-[16px] sm:text-[17px] text-white leading-tight tracking-tight mb-1.5"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'translateY(0)' : 'translateY(14px)',
                        transition: isRevealed
                          ? 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 40ms, opacity 350ms ease 40ms'
                          : 'transform 200ms ease, opacity 160ms ease',
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p
                      className="font-ui text-[11.5px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed max-w-[250px]"
                      style={{
                        opacity: isRevealed ? 1 : 0,
                        transform: isRevealed ? 'translateY(0)' : 'translateY(10px)',
                        filter: isRevealed ? 'blur(0px)' : 'blur(5px)',
                        transition: isRevealed
                          ? 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 110ms, opacity 300ms ease 110ms, filter 350ms ease 110ms'
                          : 'transform 200ms ease, opacity 160ms ease, filter 200ms ease',
                      }}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom Row: Minimal Golden Arrow */}
                  <div
                    className="pt-2 flex items-center justify-between"
                    style={{
                      opacity: isRevealed ? 1 : 0,
                      transform: isRevealed ? 'translateX(0)' : 'translateX(-6px)',
                      transition: isRevealed
                        ? 'transform 400ms cubic-bezier(0.22, 1, 0.36, 1) 160ms, opacity 300ms ease 160ms'
                        : 'transform 180ms ease, opacity 140ms ease',
                    }}
                  >
                    <div className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
                      <ArrowRight className="w-3.5 h-3.5 text-[#D9AC72]" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* ── BOTTOM-RIGHT DIAGONAL GOLD STREAK (Subtle luxury accent) ── */}
                <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none overflow-hidden rounded-br-[18px]">
                  <div
                    className="absolute -bottom-1 -right-1 w-20 h-[1.5px] origin-bottom-right rotate-[-45deg] transition-all duration-400"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent 0%, rgba(217, 172, 114, 0.4) 30%, rgba(217, 172, 114, 0.95) 70%, rgba(255, 235, 195, 1) 100%)',
                      boxShadow: isRevealed
                        ? '0 0 10px rgba(217, 172, 114, 0.7), 0 0 16px rgba(217, 172, 114, 0.3)'
                        : '0 0 3px rgba(217, 172, 114, 0.2)',
                      opacity: isRevealed ? 1 : 0.3,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
