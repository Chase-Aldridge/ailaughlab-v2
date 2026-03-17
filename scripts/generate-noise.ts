import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const outDir = join(process.cwd(), 'public', 'generated')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

// Grain overlay SVG - feTurbulence fractal noise at 3% opacity
const grainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.03"/>
</svg>`

writeFileSync(join(outDir, 'noise-grain.svg'), grainSvg)
console.log('Generated noise-grain.svg')

// Displacement map SVG for CTA distortion effect
const displacementSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <filter id="displacement">
    <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="5" seed="42" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#displacement)"/>
</svg>`

writeFileSync(join(outDir, 'noise-displacement.svg'), displacementSvg)
console.log('Generated noise-displacement.svg')
