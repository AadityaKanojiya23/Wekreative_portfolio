import React, { useState } from 'react';
import { creativeProcessSteps } from '../data/studioData';
import { CheckCircle2 } from 'lucide-react';

export default function CreativeProcess() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-20 sm:py-28 relative scroll-mt-20" aria-label="Creative Process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#c0a47d] mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ad906c]"></span>
              Methodology
            </div>
            <h2 className="font-space font-bold text-3xl sm:text-5xl text-white dark:text-white light:text-[var(--bg-primary)] tracking-tight">
              Production Process
            </h2>
          </div>

          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 font-mono text-xs sm:text-sm max-w-md">
            Four disciplined phases to translate conceptual briefs into finished cinema and still masters without friction.
          </p>
        </div>

        {/* 4-Step Grid with Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {creativeProcessSteps.map((step, idx) => {
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-xl border flex flex-col justify-between transition-colors duration-200 cursor-pointer ${isSelected
                    ? 'bg-[#141620] dark:bg-[#141620] light:bg-slate-50 border-[#ad906c]'
                    : 'bg-[var(--bg-card)] dark:bg-[var(--bg-card)] light:bg-[#ffffff] border-[#20222c] dark:border-[#20222c] light:border-[#e5e5e8] hover:border-[#2b2e3c]'
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-4">
                    <span className="text-[#c0a47d] font-bold text-sm tracking-wider">
                      PHASE {step.step}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase">
                      {(idx + 1) * 25}%
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-xl text-white dark:text-white light:text-[var(--bg-primary)] mb-2">
                    {step.name}
                  </h3>

                  <p className="font-mono text-[11px] text-[#c0a47d] mb-3">
                    {step.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1e2029] dark:border-[#1e2029] light:border-[#e5e5e8]">
                  <span className="font-mono text-[10px] uppercase text-slate-500 block mb-2">
                    Key Deliverables:
                  </span>
                  <div className="space-y-1.5">
                    {step.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c0a47d] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
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
