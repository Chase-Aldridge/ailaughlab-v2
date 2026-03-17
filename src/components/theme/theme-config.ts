export type ThemeId = 'ai-lab' | 'wild-west' | 'space-station' | 'retro-arcade'

export interface ThemeConfig {
  id: ThemeId
  name: string
  tagline: string
  description: string
  accent: string
  accentSecondary: string
  bgDark: string
  bgDeep: string
}

export const themes: Record<ThemeId, ThemeConfig> = {
  'ai-lab': {
    id: 'ai-lab',
    name: 'AI Lab',
    tagline: 'Welcome to the Lab',
    description: 'Futuristic neon laboratory where comedy experiments never stop.',
    accent: '#00E5A0',
    accentSecondary: '#00D4FF',
    bgDark: '#0A0E17',
    bgDeep: '#060910',
  },
  'wild-west': {
    id: 'wild-west',
    name: 'Wild West',
    tagline: 'Welcome to the Frontier',
    description: 'Dusty frontier saloon where the jokes are as wild as the west.',
    accent: '#D4A574',
    accentSecondary: '#C87533',
    bgDark: '#1A0F0A',
    bgDeep: '#100905',
  },
  'space-station': {
    id: 'space-station',
    name: 'Space Station',
    tagline: 'Welcome Aboard',
    description: 'Zero-gravity orbital lab. Comedy in space hits different.',
    accent: '#A855F7',
    accentSecondary: '#3B82F6',
    bgDark: '#0B0D1A',
    bgDeep: '#06070F',
  },
  'retro-arcade': {
    id: 'retro-arcade',
    name: 'Retro Arcade',
    tagline: 'Insert Coin to Begin',
    description: '80s neon arcade where every joke is a high score.',
    accent: '#FF6EC7',
    accentSecondary: '#FFFF00',
    bgDark: '#1A0A2E',
    bgDeep: '#0F051C',
  },
}

export const themeIds = Object.keys(themes) as ThemeId[]
export const defaultTheme: ThemeId = 'ai-lab'
