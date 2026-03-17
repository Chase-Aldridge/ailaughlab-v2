import type { ThemeId } from '@/components/theme/theme-config'

interface PanoramaLayers {
  bg: string | null
  mid: string | null
  fg: string | null
}

const CDN = 'https://res.cloudinary.com/dnflu4ixl/image/upload'

export const panoramaImages: Record<ThemeId, PanoramaLayers> = {
  'ai-lab': {
    bg: `${CDN}/ai-laugh-lab/panorama/ai-lab/bg-layer.webp`,
    mid: `${CDN}/ai-laugh-lab/panorama/ai-lab/mid-layer.webp`,
    fg: `${CDN}/ai-laugh-lab/panorama/ai-lab/fg-layer.webp`,
  },
  'wild-west': {
    bg: `${CDN}/ai-laugh-lab/panorama/wild-west/bg-layer.webp`,
    mid: `${CDN}/ai-laugh-lab/panorama/wild-west/mid-layer.webp`,
    fg: `${CDN}/ai-laugh-lab/panorama/wild-west/fg-layer.webp`,
  },
  'space-station': {
    bg: `${CDN}/ai-laugh-lab/panorama/space-station/bg-layer.webp`,
    mid: `${CDN}/ai-laugh-lab/panorama/space-station/mid-layer.webp`,
    fg: `${CDN}/ai-laugh-lab/panorama/space-station/fg-layer.webp`,
  },
  'retro-arcade': {
    bg: `${CDN}/ai-laugh-lab/panorama/retro-arcade/bg-layer.webp`,
    mid: `${CDN}/ai-laugh-lab/panorama/retro-arcade/mid-layer.webp`,
    fg: `${CDN}/ai-laugh-lab/panorama/retro-arcade/fg-layer.webp`,
  },
}
