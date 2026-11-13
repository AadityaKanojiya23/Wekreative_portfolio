import React from 'react';
import { studioServices } from '../data/studioData';
import { ArrowUpRight, Check, Sliders } from 'lucide-react';

export default function ServicesSection({ onOpenEnquiryWithService }) {
  return (
    <section id="services" className="py-20 sm:py-28 relative scroll-mt-20" aria-label="Studio Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#c0a47d] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ad906c]"></span>
              Disciplines &amp; Capabilities
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-5xl text-white dark:text-white light:text-[var(--bg-primary)] tracking-tight">
              Studio Services
            </h2>
          </div>

          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono text-xs sm:text-sm max-w-md">
            Turnkey production or specialized creative roles. Tailored to the script, timeline, and delivery requirements of every commission.
          </p>
        </div>

        {/* Structured 4-Column Grid (8 Disciplines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studioServices.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-xl flex flex-col justify-between bg-[var(--bg-card)] dark:bg-[var(--bg-card)] light:bg-[#ffffff] border border-[#20222c] dark:border-[#20222c] light:border-[#e5e5e8] transition-colors duration-200 hover:border-[#ad906c] group"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-slate-500 mb-4">
                  <span className="text-[#c0a47d] font-bold text-sm">
                    {service.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider bg-white/5 dark:bg-white/5 light:bg-slate-100 px-2 py-0.5 rounded border border-[#222530] dark:border-[#222530] light:border-[#e2e2e6] text-slate-400 dark:text-slate-400 light:text-slate-600">
                    {service.format}
                  </span>
                </div>

                <h3 className="font-space font-bold text-lg text-white dark:text-white light:text-[var(--bg-primary)] mb-2 group-hover:text-[#ad906c] dark:group-hover:text-[#c0a47d] transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {service.tagline}
                </p>
              </div>

              <div>
                <div className="space-y-1.5 mb-6 pt-4 border-t border-[#1e2029] dark:border-[#1e2029] light:border-[#e5e5e8]">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                      <Check className="w-3 h-3 text-[#c0a47d] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onOpenEnquiryWithService(service.title)}
                  className="w-full py-2.5 px-3 rounded-lg font-mono text-xs uppercase tracking-wider font-medium flex items-center justify-between text-slate-300 dark:text-slate-300 light:text-slate-800 bg-[var(--bg-secondary)] dark:bg-[var(--bg-secondary)] light:bg-slate-100 group-hover:bg-[#ad906c] group-hover:text-white transition-colors"
                >
                  <span>Inquire for this</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bespoke Production Callout */}
        <div className="mt-8 p-6 rounded-xl bg-[var(--bg-card)] dark:bg-[var(--bg-card)] light:bg-[#ffffff] border border-[#20222c] dark:border-[#20222c] light:border-[#e5e5e8] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-[#ad906c]/15 text-[#c0a47d]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-space font-bold text-base text-white dark:text-white light:text-black">
                Bespoke &amp; Cross-Disciplinary Projects
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-400 light:text-slate-600">
                Need a hybrid film and stills package? We structure scalable crews specifically for your deliverables.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenEnquiryWithService("Bespoke Production")}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[#ad906c] hover:bg-[#927550] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            Custom Brief
          </button>
        </div>
      </div>
    </section>
  );
}
