'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    registerGSAP()

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for Lenis
    const tickHandler = (time: number) => {
      lenis.raf(time * 1000)
    }

    import('gsap').then(({ gsap }) => {
      gsap.ticker.add(tickHandler)
      gsap.ticker.lagSmoothing(0)
    })

    return () => {
      lenis.destroy()
      import('gsap').then(({ gsap }) => {
        gsap.ticker.remove(tickHandler)
      })
    }
  }, [])

  return <>{children}</>
}
