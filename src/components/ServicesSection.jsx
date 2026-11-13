import React, { useState } from 'react';
import { studioServices } from '../data/studioData';
import { ArrowUpRight, Check } from 'lucide-react';

const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

export default function ServicesSection({ onOpenEnquiryWithService }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="services" className="py-20 sm:py-28 relative scroll-mt-20" aria-label="Studio Services">
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


        </div>

        {/* Structured 4-Column Grid (8 Disciplines) with Cinematic Focus Reveal Animation */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          onMouseLeave={() => setActiveId(null)}
        >
          {studioServices.map((service) => {
            const isFocused = activeId === service.id;
            const isOtherActive = activeId !== null && !isFocused;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => setActiveId((prev) => (prev === service.id ? null : service.id))}
                className="relative min-h-[430px] sm:min-h-[450px] p-6 rounded-xl flex flex-col justify-between bg-[var(--bg-card)] dark:bg-[var(--bg-card)] light:bg-[#ffffff] border transition-all cursor-pointer select-none group will-change-[transform,filter,opacity] overflow-hidden"
                style={{
                  transform: isFocused
                    ? 'scale(1.02) translateZ(0)'
                    : isOtherActive
                      ? 'scale(0.985) translateZ(0)'
                      : 'scale(1) translateZ(0)',
                  filter: isOtherActive ? 'blur(4.5px)' : 'none',
                  opacity: isOtherActive ? 0.38 : 1,
                  borderColor: isFocused ? 'rgba(192, 164, 125, 0.7)' : '#20222c',
                  boxShadow: isFocused
                    ? '0 24px 50px -12px rgba(0, 0, 0, 0.85), 0 0 35px rgba(192, 164, 125, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.25)',
                  zIndex: isFocused ? 20 : 1,
                  transition:
                    'transform 350ms cubic-bezier(0.25, 1, 0.5, 1), filter 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms cubic-bezier(0.25, 1, 0.5, 1), border-color 400ms cubic-bezier(0.25, 1, 0.5, 1), box-shadow 400ms cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {/* Subtle dark ambient overlay in initial & blurred state */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(ellipse at 50% 50%, rgba(192, 164, 125, 0.05) 0%, rgba(5, 8, 14, 0.6) 100%)',
                    opacity: isFocused ? 0 : 0.85,
                  }}
                />

                {/* 1. TOP AREA: Service Number (Always visible near top-left) */}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <span
                    className="font-mono font-bold text-sm tracking-wider transition-colors duration-300"
                    style={{
                      color: isFocused ? '#D9AC72' : '#c0a47d',
                      opacity: isFocused ? 1 : 0.8,
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* 2. TOP HEADLINE (in natural document flow, emerges smoothly on reveal) */}
                <div className="relative z-10 mb-2">
                  <h3
                    className="font-display font-bold text-lg text-white dark:text-white light:text-[var(--bg-primary)] leading-snug"
                    style={{
                      opacity: isFocused ? 1 : 0,
                      transform: isFocused ? 'translateY(0) scale(1)' : 'translateY(32px) scale(1.03)',
                      pointerEvents: isFocused ? 'auto' : 'none',
                      color: isFocused ? '#F5F2ED' : '#ffffff',
                      transition: isFocused
                        ? `transform 550ms ${EASING} 40ms, opacity 400ms ${EASING} 60ms, color 300ms ease`
                        : `transform 450ms ${EASING}, opacity 250ms ${EASING}`,
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* 3. CENTERED HEADLINE (Exact vertical & horizontal center in initial blurred preview state) */}
                <div
                  className="absolute inset-x-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-center"
                  style={{
                    opacity: isFocused ? 0 : 1,
                    transform: isFocused
                      ? 'translateY(-140%) scale(0.95)'
                      : 'translateY(-50%) scale(1.04)',
                    filter: isOtherActive ? 'blur(2px)' : 'none',
                    transition: isFocused
                      ? `transform 550ms ${EASING}, opacity 280ms ${EASING}`
                      : `transform 550ms ${EASING}, opacity 350ms ${EASING} 100ms, filter 400ms ease`,
                  }}
                >
                  <h3 className="font-display font-bold text-lg sm:text-xl text-[#F5F2ED] tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <div
                    className="w-8 h-[1.5px] mx-auto mt-3 rounded-full transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, transparent, #c0a47d, transparent)',
                      opacity: isFocused ? 0 : 0.65,
                    }}
                  />
                </div>

                {/* 4. SECONDARY CONTENT: Description, Deliverables & CTA Button */}
                <div className="relative z-10 flex flex-col justify-between flex-1 mt-1">
                  {/* Description / Tagline */}
                  <p
                    className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-ui text-xs sm:text-sm leading-relaxed mb-6"
                    style={{
                      opacity: isFocused ? 1 : 0,
                      transform: isFocused ? 'translateY(0)' : 'translateY(12px)',
                      filter: isFocused ? 'blur(0px)' : 'blur(7px)',
                      pointerEvents: isFocused ? 'auto' : 'none',
                      transition: isFocused
                        ? `transform 500ms ${EASING} 120ms, opacity 450ms ease 120ms, filter 500ms ease 120ms`
                        : `transform 320ms ${EASING}, opacity 220ms ease, filter 320ms ease`,
                    }}
                  >
                    {service.tagline}
                  </p>

                  <div>
                    {/* Deliverables List (Staggered item-by-item animation) */}
                    <div
                      className="space-y-1.5 mb-6 pt-4 border-t border-[#1e2029] dark:border-[#1e2029] light:border-[#e5e5e8] transition-opacity duration-300"
                      style={{
                        opacity: isFocused ? 1 : 0,
                        transitionDelay: isFocused ? '180ms' : '0ms',
                      }}
                    >
                      {service.deliverables.map((item, idx) => {
                        const itemDelay = 200 + idx * 60; // 200ms, 260ms, 320ms, 380ms
                        return (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-[11px] font-ui text-slate-300 dark:text-slate-300 light:text-slate-700"
                            style={{
                              opacity: isFocused ? 1 : 0,
                              transform: isFocused ? 'translateY(0)' : 'translateY(10px)',
                              filter: isFocused ? 'blur(0px)' : 'blur(6px)',
                              pointerEvents: isFocused ? 'auto' : 'none',
                              transition: isFocused
                                ? `transform 450ms ${EASING} ${itemDelay}ms, opacity 400ms ease ${itemDelay}ms, filter 450ms ease ${itemDelay}ms`
                                : `transform 260ms ${EASING}, opacity 180ms ease, filter 260ms ease`,
                            }}
                          >
                            <Check className="w-3 h-3 text-[#c0a47d] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* CTA Button (Appears last with fade-up and de-blurring) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEnquiryWithService(service.title);
                      }}
                      className="w-full py-2.5 px-3 rounded-lg font-ui text-xs uppercase tracking-wider font-medium flex items-center justify-between text-white bg-[#ad906c] hover:bg-[#927550] transition-colors duration-300 shadow-md cursor-pointer"
                      style={{
                        opacity: isFocused ? 1 : 0,
                        transform: isFocused ? 'translateY(0)' : 'translateY(12px)',
                        filter: isFocused ? 'blur(0px)' : 'blur(7px)',
                        pointerEvents: isFocused ? 'auto' : 'none',
                        transition: isFocused
                          ? `transform 480ms ${EASING} 420ms, opacity 420ms ease 420ms, filter 480ms ease 420ms, background-color 250ms ease`
                          : `transform 240ms ${EASING}, opacity 160ms ease, filter 240ms ease`,
                      }}
                    >
                      <span>Inquire for this</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
