# AI Laugh Lab v2

Award-winning rebuild of ailaughlab.com. Handcrafted feel, not AI-generated.

## Stack
- Next.js 15 (App Router, SSR + SSG)
- TypeScript, Bun
- Three.js + @react-three/fiber (WebGL noise background)
- GSAP 3 + ScrollTrigger (pin, scrub, cinematic scroll)
- Lenis (smooth scroll)
- Framer Motion (hover/click micro-interactions only)
- TailwindCSS v4 (theme via CSS custom properties)
- Clash Display + General Sans (self-hosted)

## Commands
- `bun dev` - Dev server with Turbopack
- `bun run prebuild` - Generate noise SVGs, animation data, theme assets
- `bun run build` - Prebuild + Next.js production build
- `bun run start` - Start production server

## Architecture
- `scripts/` - Prebuild pipeline (noise, animations, theme assets)
- `public/generated/` - Prebuild output (committed)
- `src/components/canvas/` - WebGL noise background, shaders
- `src/components/scroll/` - Lenis provider, GSAP ScrollTimeline
- `src/components/sections/` - Page sections (NOT card grids)
- `src/components/theme/` - 4-theme system via CSS custom properties
- `src/data/` - Content data (ported from v1, no emoji fields)

## Theme System
4 themes: AI Lab, Wild West, Space Station, Retro Arcade
CSS custom properties on `<html>`, WebGL canvas reacts to theme changes.

## Design Principles (CRITICAL)
- NO centered heading + card grid patterns
- NO emoji as design elements
- NO font-mono uppercase tracking-widest
- NO marquee strips, glow effects, hover:scale cards
- YES: WebGL canvas, SVG grain overlay, GSAP pin/scrub
- YES: Asymmetric typography, negative space, scroll-velocity effects
- YES: Blend mode compositing, custom bezier curves

## Deploy
Coolify Docker at v2.ailaughlab.com. v1 stays live at ailaughlab.com.
