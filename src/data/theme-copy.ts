import type { ThemeId } from '@/components/theme/theme-config'

interface ThemeCopy {
  heroHeadline: string
  heroHighlight: string
  heroSubheadline: string
  ctaHeadline: string
  ctaSubtext: string
  ctaButton: string
}

export const themeCopy: Record<ThemeId, ThemeCopy> = {
  'ai-lab': {
    heroHeadline: 'Welcome to the',
    heroHighlight: 'Laugh Lab',
    heroSubheadline: 'The AI comedy community where we turn robots into stand-up comedians. Join 100+ creators experimenting with AI humor.',
    ctaHeadline: 'Join the Experiment',
    ctaSubtext: 'Free to join. No lab coat required.',
    ctaButton: 'Enter the Lab',
  },
  'wild-west': {
    heroHeadline: 'Welcome to the',
    heroHighlight: 'Frontier',
    heroSubheadline: 'The wildest AI comedy saloon this side of the internet. Saddle up with 100+ creators making AI funnier than a rattlesnake in a boot.',
    ctaHeadline: 'Saddle Up, Partner',
    ctaSubtext: 'Free to join. Spurs optional.',
    ctaButton: 'Ride In',
  },
  'space-station': {
    heroHeadline: 'Welcome to the',
    heroHighlight: 'Space Lab',
    heroSubheadline: 'The zero-gravity comedy station orbiting the AI universe. Float alongside 100+ creators launching comedy into the stratosphere.',
    ctaHeadline: 'Board the Station',
    ctaSubtext: 'Free launch. Oxygen included.',
    ctaButton: 'Begin Docking',
  },
  'retro-arcade': {
    heroHeadline: 'Welcome to the',
    heroHighlight: 'Arcade',
    heroSubheadline: 'The 8-bit comedy arcade where AI meets nostalgia. Press start with 100+ creators going for the comedy high score.',
    ctaHeadline: 'Insert Coin to Continue',
    ctaSubtext: 'Free play mode. Unlimited lives.',
    ctaButton: 'Press Start',
  },
}
