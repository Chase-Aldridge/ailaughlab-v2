'use client'

import dynamic from 'next/dynamic'
import { LenisProvider } from '@/components/scroll/LenisProvider'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { GrainOverlay } from '@/components/ui/GrainOverlay'
import { ImmersiveEntry } from '@/components/sections/ImmersiveEntry'
import { Manifesto } from '@/components/sections/Manifesto'
import { TheLab } from '@/components/sections/TheLab'
import { Experiments } from '@/components/sections/Experiments'
import { SocialProof } from '@/components/sections/SocialProof'
import { JoinSection } from '@/components/sections/JoinSection'
import { SiteFooter } from '@/components/sections/SiteFooter'

// Dynamic import for WebGL (heavy, SSR not needed)
const WebGLCanvas = dynamic(
  () => import('@/components/canvas/WebGLCanvas').then((m) => m.WebGLCanvas),
  { ssr: false }
)
const CursorFollower = dynamic(
  () => import('@/components/effects/CursorFollower').then((m) => m.CursorFollower),
  { ssr: false }
)

export default function Home() {
  return (
    <ThemeProvider>
      <LenisProvider>
        <WebGLCanvas />
        <GrainOverlay />
        <CursorFollower />

        <main>
          <ImmersiveEntry />
          <Manifesto />
          <TheLab />
          <Experiments />
          <SocialProof />
          <JoinSection />
          <SiteFooter />
        </main>
      </LenisProvider>
    </ThemeProvider>
  )
}
