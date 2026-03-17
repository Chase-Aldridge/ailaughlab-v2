import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const outDir = join(process.cwd(), 'public', 'generated')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

// Manifesto text - each word gets a scroll progress range
const manifestoText = "We make AI content that's actually funny. Not corporate funny. Not cringe funny. Make-people-snort-their-coffee funny."
const words = manifestoText.split(/\s+/)
const totalWords = words.length
const manifestoWords = words.map((word, i) => ({
  word,
  start: i / totalWords,
  end: (i + 1) / totalWords,
}))

// Experiment timings - 6 experiments, each gets equal scroll portion
const experimentCount = 6
const experimentTimings = Array.from({ length: experimentCount }, (_, i) => ({
  index: i,
  enterProgress: i / experimentCount,
  exitProgress: (i + 1) / experimentCount,
}))

// Hero entry sequence delays (seconds)
const hero = {
  noiseDelay: 0,
  textDelay: 0.3,
  subtitleDelay: 0.8,
  ctaDelay: 1.2,
}

// Panorama parallax speeds (multiplier of scroll)
const panorama = {
  bgSpeed: 0.3,
  midSpeed: 0.6,
  fgSpeed: 1.0,
}

const data = {
  manifesto: {
    words: manifestoWords,
    totalDuration: 200, // vh of pin
  },
  experiments: {
    timings: experimentTimings,
    totalPinHeight: experimentCount, // multiplier of viewport height
  },
  hero,
  panorama,
}

writeFileSync(join(outDir, 'animation-data.json'), JSON.stringify(data, null, 2))
console.log('Generated animation-data.json')
