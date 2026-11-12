import React from 'react';

const PHRASES = [
  "ARRI ALEXA 35",
  "COOKE ANAMORPHIC /I",
  "24.00 FPS DCI",
  "ACES COLOR SCIENCE",
  "100MP MEDIUM FORMAT",
  "SPATIAL AUDIO DESIGN",
  "KODAK 500T CELLULOID",
  "PRECISION RETOUCHING"
];

export default function FilmMarquee() {
  return (
    <div className="py-6 border-y border-white/10 dark:border-white/10 light:border-black/10 bg-black/40 dark:bg-black/40 light:bg-slate-50 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      <div className="animate-marquee flex items-center gap-12 font-mono text-xs uppercase tracking-widest text-slate-400 dark:text-slate-400 light:text-slate-600">
        {[...PHRASES, ...PHRASES, ...PHRASES].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span className="hover:text-[#c0a47d] transition-colors">{phrase}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ad906c]"></span>
          </div>
        ))}
      </div>
    </div>
  );
}

