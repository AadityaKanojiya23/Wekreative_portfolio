/**
 * STUDIO CONFIGURATION & PORTFOLIO DATA
 * Replace the bracketed values with your studio's specific details.
 */
export const studioConfig = {
  // STUDIO DETAILS
  studioName: "WEKREATIVES",
  studioSubtitle: "CREATIVE STUDIO",
  studioFullName: "WEKREATIVES CREATIVE STUDIO",
  logoUrl: "/wekreatives-logo.png",
  legalName: "WeKreatives Creative Studio Ltd.",
  location: "London, UK & Worldwide",
  coordinates: "51.5074° N, 0.1278° W",
  contactEmail: "create@nocturnestudio.film",
  instagramUrl: "https://instagram.com/nocturne.studio",
  instagramHandle: "@nocturne.studio",
  vimeoUrl: "https://vimeo.com/nocturnestudio",
  showreelVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  showreelPoster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2000&q=85",
  
  // HERO HEADLINES & INTRO
  heroHeadline: "Stories made to be seen.",
  heroSubheadline: "Real moments. Cinematic frames.",
  heroDescription: "A boutique film production and photography studio crafting high-end commercials, editorial narratives, fashion, and culture films with uncompromising visual fidelity.",
  
  // AVAILABILITY STATUS
  availability: "Taking commissions for Q3/Q4 2026 & 2027 worldwide.",
  timecodeBase: "00:00:24:18",
  fps: "24.00 FPS",
  colorSpace: "ARRI LogC4 / ACES 1.3"
};

/**
 * CURATED WORK & CASE STUDIES
 * Varied aspect ratios (2.39:1, 16:9, 4:5, 3:2) for rich visual rhythm.
 */
export const portfolioProjects = [
  {
    id: "elysian-velocity",
    title: "Elysian Velocity",
    category: "Film",
    subCategory: "Commercial / Automotive",
    year: "2026",
    aspectRatio: "2.39:1",
    aspectLabel: "2.39:1 CinemaScope",
    runtime: "02:18",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    summary: "An atmospheric night-drive film exploring silence, speed, and sculptural industrial design across rainy mountain passes.",
    creativeBrief: "The brief called for subverting high-energy car tropes in favor of meditative nocturnal tension, letting anamorphic lens flares and naturalistic street lighting establish the mood.",
    studioRole: "Full Production: Concept, Location Scouting, High-Speed Gimbal Rigging, 35mm Anamorphic Cinematography, DaVinci Resolve Color Grade, Bespoke Spatial Audio Design.",
    cameraSpecs: {
      camera: "ARRI Alexa 35",
      lenses: "Cooke Anamorphic /i Full Frame Plus (32mm, 50mm, 85mm)",
      aspect: "2.39:1 Anamorphic",
      lighting: "Astera Titan Tubes + 4K HMI Rain Rigs"
    },
    gallery: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85"
    ],
    credits: [
      { role: "Director & Cinematographer", name: "Studio Nocturne" },
      { role: "Gaffer", name: "M. Vance" },
      { role: "Colorist", name: "K. Lindqvist" },
      { role: "Sound Design", name: "Aperture Audio" }
    ]
  },
  {
    id: "solaris-haute",
    title: "Solaris Couture",
    category: "Fashion",
    subCategory: "Editorial / Fashion Film",
    year: "2026",
    aspectRatio: "4:5",
    aspectLabel: "4:5 Vertical Editorial",
    runtime: "01:05",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    summary: "Monochrome architectural silhouettes meet fluid silk draping in an uncompromising editorial study of light and shade.",
    creativeBrief: "Create a dual-medium campaign: 4:5 vertical fashion film alongside large-format stills for international billboard and print deployment.",
    studioRole: "Creative Direction, Studio Lighting Architecture, 100MP Medium Format Photography, 120fps Slow-Motion Film Capture, High-End Retouching.",
    cameraSpecs: {
      camera: "Hasselblad H6D-100c & RED V-Raptor 8K",
      lenses: "Hasselblad HC 100mm f/2.2 & Leica Summilux-C",
      aspect: "4:5 Vertical Format",
      lighting: "Profoto Pro-11 Generators with 7ft Octa Softboxes"
    },
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
    ],
    credits: [
      { role: "Creative Direction", name: "Studio Nocturne" },
      { role: "Stylist", name: "E. Laurent" },
      { role: "Retoucher", name: "Atelier Lux" }
    ]
  },
  {
    id: "echoes-of-concrete",
    title: "Echoes of Concrete",
    category: "Photography",
    subCategory: "Architectural / Still Life",
    year: "2025",
    aspectRatio: "16:9",
    aspectLabel: "16:9 Landscape Frame",
    runtime: null,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: null,
    summary: "A photographic meditation on brutalist structures, morning fog, and the geometry of raw urban monoliths.",
    creativeBrief: "Documenting spatial volume and shadows at dawn without artificial illumination to celebrate tactile raw textures.",
    studioRole: "Still Photography, Location Curation, Natural Light Mapping, Exhibition Archival Printing.",
    cameraSpecs: {
      camera: "Leica SL3 & M11 Monochrom",
      lenses: "Leica APO-Summicron-M 35mm f/2 ASPH",
      aspect: "3:2 & 16:9 Crops",
      lighting: "100% Available Morning Fog & Sunlight"
    },
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=85"
    ],
    credits: [
      { role: "Photographer", name: "Studio Nocturne" },
      { role: "Print Master", name: "Canson Fine Art Labs" }
    ]
  },
  {
    id: "nocturnal-rhythm",
    title: "Nocturnal Rhythm",
    category: "Events",
    subCategory: "Culture / Live Performance",
    year: "2026",
    aspectRatio: "16:9",
    aspectLabel: "16:9 Cinematic Live",
    runtime: "03:42",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    summary: "Multi-camera cinema documentation of an underground electronic synthesis concert immersed in reactive laser geometry.",
    creativeBrief: "Capture the visceral collective energy and dark strobe-lit atmosphere without compromising shadow details or audio dynamics.",
    studioRole: "Live Multi-Cam Direction, 4x ARRI Mini LF Rigs, Direct Multitrack 32-bit Float Sound Capture, Dynamic Rhythm Edit.",
    cameraSpecs: {
      camera: "ARRI Alexa Mini LF (x4)",
      lenses: "Zeiss Supreme Primes",
      aspect: "16:9 DCI UHD",
      audio: "Sound Devices 32-Bit Float Multitrack"
    },
    gallery: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85"
    ],
    credits: [
      { role: "Director", name: "Studio Nocturne" },
      { role: "Live Sound Engineer", name: "T. Richter" }
    ]
  },
  {
    id: "silent-horizon",
    title: "Silent Horizon",
    category: "Campaigns",
    subCategory: "Brand Narrative / Outdoor",
    year: "2025",
    aspectRatio: "2.39:1",
    aspectLabel: "2.39:1 Widescreen",
    runtime: "01:45",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    summary: "A panoramic brand anthem set against jagged volcanic peaks and remote glacial coastlines in sub-zero terrain.",
    creativeBrief: "Translate endurance, human resilience, and alpine minimalism into a cinematic master film and photographic billboard series.",
    studioRole: "Extreme Location Logistics, Helicopter & FPV Heavy-Lift Filming, 35mm Stills, Full Post-Production.",
    cameraSpecs: {
      camera: "Sony Venice 2 & RED Komodo-X",
      lenses: "Atlas Orion Anamorphic Series",
      aspect: "2.39:1 CinemaScope",
      environment: "-15°C Sub-Zero Certified Rigging"
    },
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85"
    ],
    credits: [
      { role: "Director / DP", name: "Studio Nocturne" },
      { role: "Alpine Safety Lead", name: "J. Hille" },
      { role: "Editor", name: "Studio Nocturne" }
    ]
  },
  {
    id: "visage-intime",
    title: "Visage Intime",
    category: "Portraits",
    subCategory: "Fine Art / Character Study",
    year: "2026",
    aspectRatio: "3:2",
    aspectLabel: "3:2 35mm Celluloid",
    runtime: null,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: null,
    summary: "Unretouched, analog 35mm and medium format character portraits exploring human vulnerability and micro-expressions.",
    creativeBrief: "Stripping away high-gloss commercial artifice to reveal raw gaze and candid emotional resonance through singular tungsten lighting.",
    studioRole: "Analog Film Development, Darkroom Printing, Character Lighting, Bespoke Print Portfolio.",
    cameraSpecs: {
      camera: "Pentax 67II & Leica MP 0.72",
      filmStock: "Kodak Portra 400 & Tri-X 400 pushed 1 stop",
      aspect: "3:2 & 6:7",
      lighting: "Single Mole-Richardson 2K Tungsten Fresnel"
    },
    gallery: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=85"
    ],
    credits: [
      { role: "Photographer", name: "Studio Nocturne" },
      { role: "Film Lab", name: "Bayeux London" }
    ]
  },
  {
    id: "luminescence-gastronomie",
    title: "Luminescence Gastronomie",
    category: "Photography",
    subCategory: "Culinary / Still Life",
    year: "2025",
    aspectRatio: "4:5",
    aspectLabel: "4:5 Tabletop Macro",
    runtime: null,
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
    ],
    videoUrl: null,
    summary: "High-contrast culinary sculptures and artisanal ingredients highlighted by theatrical chiaroscuro shadows.",
    creativeBrief: "Elevating culinary craft into museum-grade still-life art for an experimental tasting menu book and launch film.",
    studioRole: "Food Styling Collaboration, Precision Macro Cinematography & Still Photography, Color Calibrated Master Stills.",
    cameraSpecs: {
      camera: "Phase One IQ4 150MP",
      lenses: "Schneider Kreuznach 120mm Macro",
      aspect: "4:5 Crop",
      lighting: "Broncolor Pulso Spot & Honeycomb Grids"
    },
    gallery: [
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=85"
    ],
    credits: [
      { role: "Director & Stills", name: "Studio Nocturne" },
      { role: "Food Stylist", name: "C. Moreau" }
    ]
  },
  {
    id: "sonic-monolith",
    title: "Sonic Monolith",
    category: "Film",
    subCategory: "Music Video / Experimental",
    year: "2026",
    aspectRatio: "2.39:1",
    aspectLabel: "2.39:1 Anamorphic",
    runtime: "03:15",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=85",
    previewFrames: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1000&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    summary: "A surreal, high-contrast narrative film bridging ambient soundscapes with monumental kinetic sculptures in an abandoned quarry.",
    creativeBrief: "Create a visual world where sound reverberations trigger shifting optical illusions and electric blue anamorphic flares.",
    studioRole: "Narrative Conception, Production Design, 35mm Celluloid Filming, Practical SFX Lighting, Sound Design.",
    cameraSpecs: {
      camera: "ARRI Alexa Mini LF",
      lenses: "Atlas Mercury 1.5x Full Frame Anamorphics",
      aspect: "2.39:1 DCI",
      lighting: "6x DMX-Controlled Strobe Towers"
    },
    gallery: [
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1400&q=85"
    ],
    credits: [
      { role: "Director", name: "Studio Nocturne" },
      { role: "Production Designer", name: "R. Sterling" },
      { role: "Editor & VFX", name: "Studio Nocturne" }
    ]
  }
];

/**
 * STUDIO SERVICES
 */
export const studioServices = [
  {
    id: "brand-films",
    number: "01",
    title: "Brand Films & Commercials",
    tagline: "Cinema-scale narrative storytelling designed to elevate prestige brand perception.",
    deliverables: ["Script & Treatment Development", "35mm / Large Format Cinematography", "Full Production Crew & Permitting", "Broadcast & Cinema Deliverables"],
    format: "DCI 4K / UHD / Anamorphic 2.39:1"
  },
  {
    id: "product-lifestyle",
    number: "02",
    title: "Product & Lifestyle Photography",
    tagline: "Sculptural tabletop lighting and lived-in environmental scenes showcasing tactile textures.",
    deliverables: ["100MP Medium Format Capture", "Location & Studio Sets", "Macro Precision Rigging", "Archival Master Retouching"],
    format: "Print Resolution / High-Res Digital Stills"
  },
  {
    id: "fashion-editorial",
    number: "03",
    title: "Fashion & Editorial Shoots",
    tagline: "Bold sartorial concepts, dynamic pacing, and evocative lighting tailored for runway & covers.",
    deliverables: ["Editorial Direction & Casting", "Dual Film + Stills Workflow", "Custom Lighting Mood Boards", "Cover & Billboard Grade"],
    format: "4:5 Vertical & 3:2 Editorial Ratio"
  },
  {
    id: "events-live",
    number: "04",
    title: "Events & Live Cultural Coverage",
    tagline: "Multi-camera cinema coverage of exclusive showcases, festivals, summits, and performances.",
    deliverables: ["Multi-Camera ARRI / RED Systems", "32-Bit Float Live Audio", "Fast Same-Day Teasers", "Director's Master Cut"],
    format: "4K Multi-Cam / Spatial Audio"
  },
  {
    id: "music-videos",
    number: "05",
    title: "Music Videos & Artist Films",
    tagline: "Visual translation of sonic emotion with bold cinematography, choreography, and experimental art.",
    deliverables: ["Treatment & World-Building", "Choreography & Kinetic Camera", "SFX Lighting Synchronisation", "Sound Design Integration"],
    format: "Anamorphic Widescreen 2.39:1"
  },
  {
    id: "social-video",
    number: "06",
    title: "Social-First Video & Short Form",
    tagline: "High-production short-form films calibrated for vertical feeds that stop the scroll instantly.",
    deliverables: ["Native 9:16 Cinematic Framing", "Dynamic Sound & Cut Pacing", "Modular Episodic Content", "Platform Multi-Format Crops"],
    format: "9:16 4K Vertical / 1:1 Square"
  },
  {
    id: "creative-direction",
    number: "07",
    title: "Creative Direction & Production",
    tagline: "End-to-end stewardship from first brief through location scouting, casting, and shoot execution.",
    deliverables: ["Visual Identity & Moodboarding", "Location Logistics & Scouting", "Casting & Crew Curation", "Budget & Schedule Governance"],
    format: "Pre-Production Document & Pitch Bible"
  },
  {
    id: "post-finishing",
    number: "08",
    title: "Post-Production, Color & Sound",
    tagline: "Precision DaVinci Resolve color grading, offline editing, Foley, and spatial audio mastering.",
    deliverables: ["ACES Color Pipeline & Film Emulation", "Commercial Rhythm Edit", "Bespoke Sound Mix & Foley", "Master DCP / Web Packaging"],
    format: "Dolby Vision HDR / ProRes 4444 XQ"
  }
];

/**
 * 4-STEP CREATIVE PROCESS
 */
export const creativeProcessSteps = [
  {
    step: "01",
    name: "Discover",
    tagline: "Unearthing the core tension and aesthetic horizon.",
    description: "We dissect the brief, investigate the audience, clarify emotional beats, and define the visual thesis. We align on references, tone, format constraints, and core deliverables before lighting a single scene.",
    deliverables: ["Creative Brief Alignment", "Aesthetic Moodboards", "Budget & Feasibility Roadmap"]
  },
  {
    step: "02",
    name: "Develop",
    tagline: "Engineering the creative direction and production architecture.",
    description: "We translate intent into an actionable production plan: scene treatments, shotlists, optical packages, location recce, casting, and lighting schematics. Every frame is planned with intention.",
    deliverables: ["Director's Treatment", "Technical Shotlist & Overhead Maps", "Casting & Location Clearances"]
  },
  {
    step: "03",
    name: "Produce",
    tagline: "Capturing the film and stills with uncompromising discipline.",
    description: "On set or in the elements, our dedicated camera, lighting, and sound crews execute with calm precision. We capture large-format imagery, high-fidelity sound, and candid behind-the-scenes assets simultaneously.",
    deliverables: ["Principal Filming on Cinema Systems", "High-Resolution Stills Capture", "On-Set DIT Backup & Live Color Look"]
  },
  {
    step: "04",
    name: "Finish",
    tagline: "Sculpting the final cut, color grade, and sonic texture.",
    description: "The raw footage is edited for rhythm, paced for maximum impact, color-graded on calibrated reference displays in DaVinci Resolve, paired with bespoke sound design, and delivered across global master formats.",
    deliverables: ["Offline & Online Edit", "Color Grade & Film Stock Emulation", "Spatial Sound Mastering & DCP Master"]
  }
];

/**
 * 35MM CONTACT SHEET FRAMES
 * For photographic contact sheet scroll strip.
 */
export const contactSheetFrames = [
  { frame: "01A", title: "Dawn Setup", roll: "5219 500T", img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=700&q=80" },
  { frame: "02A", title: "Anamorphic Flare", roll: "5219 500T", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80" },
  { frame: "03A", title: "Silhouette Study", roll: "5219 500T", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=700&q=80" },
  { frame: "04A", title: "Fog & Shadow", roll: "5219 500T", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80" },
  { frame: "05A", title: "Stage Laser", roll: "5219 500T", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=700&q=80" },
  { frame: "06A", title: "Glacial Ridge", roll: "5219 500T", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80" },
  { frame: "07A", title: "Gaze / Tungsten", roll: "5219 500T", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80" },
  { frame: "08A", title: "Sculptural Macro", roll: "5219 500T", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=80" },
  { frame: "09A", title: "Monolith Quarry", roll: "5219 500T", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=700&q=80" },
  { frame: "10A", title: "Camera Rig Wrap", roll: "5219 500T", img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=700&q=80" }
];

/**
 * STUDIO CREDO & STATEMENT (No fake client logos / no invented quotes)
 */
export const studioStatement = {
  headline: "Visual storytelling built on patience, intention, and light.",
  credo: "We do not believe in chasing algorithmic noise or generic studio templates. Every project we undertake is framed with optical distinction, graded with care, and structured to evoke emotion that lingers far beyond the final frame.",
  pillars: [
    { title: "Optical Purity", desc: "We favor cinema glass, large formats, and deliberate focal depth over digital tricks." },
    { title: "Emotional Pacing", desc: "Editing calibrated to pulse, breath, and story tension rather than rushed cuts." },
    { title: "Full-Spectrum Discipline", desc: "Seamless continuity from preliminary concept through final color and DCP master." }
  ]
};

