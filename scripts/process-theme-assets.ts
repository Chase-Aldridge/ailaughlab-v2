import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const outDir = join(process.cwd(), 'public', 'generated')
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })

interface ThemeColors {
  accent: string
  accentSecondary: string
  bgDark: string
  bgDeep: string
}

const themes: Record<string, ThemeColors> = {
  'ai-lab': { accent: '#00E5A0', accentSecondary: '#00D4FF', bgDark: '#0A0E17', bgDeep: '#060910' },
  'wild-west': { accent: '#D4A574', accentSecondary: '#C87533', bgDark: '#1A0F0A', bgDeep: '#100905' },
  'space-station': { accent: '#A855F7', accentSecondary: '#3B82F6', bgDark: '#0B0D1A', bgDeep: '#06070F' },
  'retro-arcade': { accent: '#FF6EC7', accentSecondary: '#FFFF00', bgDark: '#1A0A2E', bgDeep: '#0F051C' },
}

function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return [parseFloat(r.toFixed(4)), parseFloat(g.toFixed(4)), parseFloat(b.toFixed(4))]
}

const output: Record<string, {
  shaderUniforms: {
    accent: [number, number, number]
    accentSecondary: [number, number, number]
    bgDark: [number, number, number]
    bgDeep: [number, number, number]
  }
  gradientCSS: string
}> = {}

for (const [id, colors] of Object.entries(themes)) {
  output[id] = {
    shaderUniforms: {
      accent: hexToVec3(colors.accent),
      accentSecondary: hexToVec3(colors.accentSecondary),
      bgDark: hexToVec3(colors.bgDark),
      bgDeep: hexToVec3(colors.bgDeep),
    },
    gradientCSS: `radial-gradient(ellipse at 30% 50%, ${colors.accent}08 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, ${colors.accentSecondary}06 0%, transparent 50%)`,
  }
}

writeFileSync(join(outDir, 'theme-assets.json'), JSON.stringify(output, null, 2))
console.log('Generated theme-assets.json')
