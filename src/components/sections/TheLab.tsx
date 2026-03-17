'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { useTheme } from '@/components/theme/ThemeProvider'
import { panoramaImages } from '@/data/panorama-images'
import { animationData } from '@/lib/animation-data'

export function TheLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const layers = panoramaImages[theme]
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          const { bgSpeed, midSpeed, fgSpeed } = animationData.panorama
          if (bgRef.current) bgRef.current.style.transform = `translateY(${p * bgSpeed * -100}px)`
          if (midRef.current) midRef.current.style.transform = `translateY(${p * midSpeed * -100}px)`
          if (fgRef.current) fgRef.current.style.transform = `translateY(${p * fgSpeed * -100}px)`
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      setMouseOffset({ x, y })
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-lab"
      className="relative z-10 h-[150vh] overflow-hidden"
    >
      {/* Edge fade gradients */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-deep to-transparent z-20" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-deep to-transparent z-20" />

      {/* Parallax layers */}
      <div className="absolute inset-0">
        {layers.bg && (
          <div
            ref={bgRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${layers.bg})`,
              transform: `translate(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px)`,
            }}
          />
        )}
        {layers.mid && (
          <div
            ref={midRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${layers.mid})`,
              transform: `translate(${mouseOffset.x * 0.6}px, ${mouseOffset.y * 0.6}px)`,
            }}
          />
        )}
        {layers.fg && (
          <div
            ref={fgRef}
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{
              backgroundImage: `url(${layers.fg})`,
              transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            }}
          />
        )}
      </div>
    </section>
  )
}
