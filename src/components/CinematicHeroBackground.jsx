import React, { useEffect, useRef } from 'react';

const TOTAL_FRAMES = 246;

// Generate all 246 image URLs: /Hro/ezgif-frame-001.jpg ... /Hro/ezgif-frame-246.jpg
const FRAME_PATHS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const num = String(i + 1).padStart(3, '0');
  return `/Hro/ezgif-frame-${num}.jpg`;
});

export default function CinematicHeroBackground({ containerRef }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  const currentFrameRef = useRef(0);
  const lastRenderedIndexRef = useRef(0);
  const renderScheduledRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let isDisposed = false;

    // Canvas size adjustment with devicePixelRatio support
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      if (
        canvas.width !== displayWidth * dpr ||
        canvas.height !== displayHeight * dpr
      ) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
      }

      drawFrame(currentFrameRef.current);
    };

    // Draw single frame with object-fit: cover logic
    const drawFrame = (index) => {
      if (isDisposed || !canvas) return;

      // Find best available frame (target, or closest loaded fallback to prevent any black flicker)
      let img = imagesRef.current[index];

      if (!img || !img.complete || img.naturalWidth === 0) {
        // Search backwards
        for (let i = index - 1; i >= 0; i--) {
          const fb = imagesRef.current[i];
          if (fb && fb.complete && fb.naturalWidth > 0) {
            img = fb;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) {
        // Search forwards
        for (let i = index + 1; i < TOTAL_FRAMES; i++) {
          const fb = imagesRef.current[i];
          if (fb && fb.complete && fb.naturalWidth > 0) {
            img = fb;
            break;
          }
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Calculate object-fit: cover dimensions
      const canvasRatio = cw / ch;
      const imgRatio = imgWidth / imgHeight;

      let drawWidth = cw;
      let drawHeight = ch;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawWidth = cw;
        drawHeight = cw / imgRatio;
        offsetY = (ch - drawHeight) / 2;
      } else {
        drawHeight = ch;
        drawWidth = ch * imgRatio;
        offsetX = (cw - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      lastRenderedIndexRef.current = index;
    };

    // Schedule single render on requestAnimationFrame (no runaway loops)
    const scheduleRender = () => {
      if (renderScheduledRef.current) return;
      renderScheduledRef.current = true;
      requestAnimationFrame(() => {
        renderScheduledRef.current = false;
        drawFrame(currentFrameRef.current);
      });
    };

    // Scroll progress calculator: maps scroll strictly to [0, TOTAL_FRAMES - 1]
    const handleScroll = () => {
      const container = containerRef?.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      // Normalized progress clamped between 0 and 1
      const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
      const targetIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      // Only update when target frame actually changes
      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;
        scheduleRender();
      }
    };

    // Preloading pipeline
    const loadSingleImage = (index) => {
      return new Promise((resolve) => {
        if (isDisposed) return resolve();
        const img = new Image();
        img.decoding = 'async';
        img.src = FRAME_PATHS[index];

        img.onload = () => {
          if (isDisposed) return resolve();
          imagesRef.current[index] = img;

          // Render first frame immediately
          if (index === 0 && lastRenderedIndexRef.current === 0) {
            drawFrame(0);
          }
          resolve();
        };

        img.onerror = () => {
          resolve();
        };
      });
    };

    const preloadAllImages = async () => {
      // 1. Eagerly load first 20 frames so user can begin immediately
      const initialBatch = [];
      for (let i = 0; i < Math.min(20, TOTAL_FRAMES); i++) {
        initialBatch.push(loadSingleImage(i));
      }
      await Promise.all(initialBatch);

      if (isDisposed) return;
      drawFrame(currentFrameRef.current);

      // 2. Stream remaining frames in background chunks (6 concurrent requests)
      const CHUNK_SIZE = 6;
      for (let i = 20; i < TOTAL_FRAMES; i += CHUNK_SIZE) {
        if (isDisposed) break;
        const chunk = [];
        for (let j = i; j < Math.min(i + CHUNK_SIZE, TOTAL_FRAMES); j++) {
          chunk.push(loadSingleImage(j));
        }
        await Promise.all(chunk);
      }
    };

    // Initial size and scroll calculation
    handleResize();
    handleScroll();

    // Event listeners: passive for 60fps buttery scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    preloadAllImages();

    return () => {
      isDisposed = true;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* High-Performance Canvas Animation Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Cinematic Gradient Overlay: Keeps text and buttons 100% legible while showing motion */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(3, 6, 12, 0.72) 0%, rgba(5, 10, 20, 0.58) 50%, rgba(3, 6, 12, 0.85) 100%)',
        }}
      />

      {/* Subtle Vignette & Deep Navy Accent for Atmospheric Polish */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(6, 27, 53, 0.20) 0%, rgba(0, 0, 0, 0.55) 100%)',
        }}
      />
    </div>
  );
}
