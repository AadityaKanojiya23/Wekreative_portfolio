# WEKREATIVES CREATIVE STUDIO — Portfolio Website

A cinematic portfolio website engineered for video production and photography studios. Designed with an editorial black-and-champagne-gold visual identity, camera viewfinder interactions, responsive showcase grid, interactive case studies, and turnkey brief inquiry workflows.

---

## Quick Start

### 1. Development Server
```bash
npm install
npm run dev
```

### 2. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## Studio Configuration

All studio details, contacts, branding, and portfolio content are centrally managed in:
`src/data/studioData.js`

You can customize:
- **Studio Name**: `studioConfig.studioName` (e.g. `[STUDIO NAME]`)
- **Location**: `studioConfig.location` (e.g. `[CITY, COUNTRY]`)
- **Contact Email**: `studioConfig.contactEmail` (e.g. `[EMAIL ADDRESS]`)
- **Instagram**: `studioConfig.instagramUrl` and `studioConfig.instagramHandle` (e.g. `[INSTAGRAM URL]`)
- **Showreel Video**: `studioConfig.showreelVideoUrl` and `studioConfig.showreelPoster` (e.g. `[SHOWREEL VIDEO URL]`)
- **Curated Projects**: `portfolioProjects` array with 2.39:1, 16:9, 4:5, and 3:2 ratios
- **Services & Process**: `studioServices` and `creativeProcessSteps`

---

## Signature Interactive Features

1. **Lens-Frame Project Hover**: Four corner camera reticles contract into frame on hover/focus, illuminating a central cyan focus point and aspect ratio metadata.
2. **Scrub-Through Video Preview**: Moving pointer horizontally across thumbnails scrubs through preview frames like a director's playback bar.
3. **Camera-Focus Reticle Cursor**: Viewfinder crosshair cursor on desktop that expands into an anamorphic focus ring over images and a "PLAY" badge over video assets.
4. **Cinematic Hero**: Autoplay muted showreel with accessible play/pause, mute/unmute, still frame toggle, and a live 24 FPS running timecode HUD (`00:01:24:18`).
5. **Interactive Project Case Studies**: Immersive modal featuring video playback, creative brief, studio approach, optical camera specifications (sensor, glass, color space), multi-frame gallery, and next-project cycling.
6. **35mm Photographic Contact Sheet**: Sprocket-hole negative strip (`Kodak Vision3 500T 5219`) responsive to horizontal scrolling/dragging.
7. **Dark / Light Theme System**: Default dark mode with an accessible theme switch, smooth animated transitions, and persistent `localStorage` memory.
8. **Project Enquiry Pipeline**: Interactive brief builder with project discipline, timeline, budget range, client-side validation, and simulated reference transmission.
