import React from 'react';
import { contactSheetFrames } from '../data/studioData';
import { Film } from 'lucide-react';

export default function ContactSheetScroll() {
  return (
    <section className="py-14 overflow-hidden bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] light:bg-[#f5f5f4]" aria-label="35mm Film Dailies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
          <Film className="w-4 h-4 text-[#c0a47d]" />
          <span className="uppercase tracking-wider text-[#c0a47d] font-semibold">Production Dailies // 35mm Film Frames</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">Kodak Vision3 500T</span>
        </div>
        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider hidden sm:inline">
          Drag horizontally &rarr;
        </span>
      </div>

      {/* Sprocket Dots Top */}
      <div className="w-full h-3 sprocket-dots opacity-30 mb-2"></div>

      {/* Horizontal Film Strip */}
      <div className="flex items-center gap-4 overflow-x-auto py-2 px-6 sm:px-12 scrollbar-none cursor-grab active:cursor-grabbing select-none">
        {contactSheetFrames.map((frame, index) => (
          <div
            key={index}
            className="shrink-0 flex flex-col bg-black border border-[#232632] rounded-md p-1.5 shadow-md hover:border-[#ad906c] transition-colors"
          >
            {/* Top Film Frame Info */}
            <div className="flex items-center justify-between font-mono text-[9px] text-amber-500/80 px-1 pb-1 tracking-wider">
              <span>{frame.roll}</span>
              <span className="font-bold text-white">{frame.frame}</span>
            </div>

            {/* Frame Image (100% Sharp) */}
            <div className="w-60 sm:w-64 aspect-[3/2] overflow-hidden bg-slate-900">
              <img
                src={frame.img}
                alt={frame.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Emulsion info */}
            <div className="flex items-center justify-between font-mono text-[8px] text-slate-500 px-1 pt-1 tracking-wider uppercase">
              <span>{frame.title}</span>
              <span>EXP 2026</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sprocket Dots Bottom */}
      <div className="w-full h-3 sprocket-dots opacity-30 mt-2"></div>
    </section>
  );
}
