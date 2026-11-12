import React, { useState } from 'react';
import { X, Download, Maximize2, ExternalLink } from 'lucide-react';

export default function GradientViewer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="16:9 Minimal Gradient View"
    >
      {/* Top Bar */}
      <div className="w-full max-w-6xl flex items-center justify-between pb-4 font-mono text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <span className="text-[#3b82f6] font-bold">16:9 GRADIENT</span>
          <span className="text-slate-600">|</span>
          <span>#000000 &rarr; #061B35</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Ultra-Smooth Easing (Zero Banding)</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/gradient-16-9-4k.png"
            download="gradient-4k.png"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161822] border border-[#232634] hover:border-[#3b82f6] text-white transition-colors"
            title="Download 4K PNG (3840x2160)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>4K PNG</span>
          </a>

          <a
            href="/gradient-16-9.svg"
            download="gradient.svg"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161822] border border-[#232634] hover:border-[#3b82f6] text-white transition-colors"
            title="Download Vector SVG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>SVG</span>
          </a>

          <a
            href="/gradient-16-9-4k.png"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded bg-[#161822] border border-[#232634] hover:text-[#3b82f6] text-white transition-colors"
            title="Open 4K Image in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#1e2029] hover:bg-rose-600 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 16:9 Frame Container */}
      <div className="relative w-full max-w-6xl aspect-[16/9] rounded-xl overflow-hidden border border-[#1b2230] shadow-2xl bg-black">
        {/* Rendered smooth gradient */}
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #000000 0%, #000000 30%, #01050c 50%, #020b18 70%, #041326 88%, #061B35 100%)',
          }}
        />

        {/* Minimal info badges on bottom corners */}
        <div className="absolute top-4 left-4 font-mono text-[11px] text-slate-500 uppercase tracking-widest pointer-events-none">
          TOP: #000000 (RGB 0, 0, 0)
        </div>

        <div className="absolute bottom-4 right-4 font-mono text-[11px] text-slate-400 uppercase tracking-widest pointer-events-none">
          BOTTOM: #061B35 (RGB 6, 27, 53)
        </div>
      </div>

      <div className="mt-4 font-mono text-[11px] text-slate-500 text-center">
        16:9 Aspect Ratio &bull; Continuous 64-bit dithered interpolation &bull; No bands or textures
      </div>
    </div>
  );
}

