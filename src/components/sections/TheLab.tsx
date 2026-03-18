'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { useTheme } from '@/components/theme/ThemeProvider'
import { panoramaImages } from '@/data/panorama-images'
import { animationData } from '@/lib/animation-data'

export function TheLab() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()
  const layers = panoramaImages[theme]

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
          if (bgRef.current) bgRef.current.style.transform = `translateY(${p * bgSpeed * -80}px) translate(${mouseRef.current.x * 0.3}px, ${mouseRef.current.y * 0.3}px)`
          if (midRef.current) midRef.current.style.transform = `translateY(${p * midSpeed * -80}px) translate(${mouseRef.current.x * 0.6}px, ${mouseRef.current.y * 0.6}px)`
          if (fgRef.current) fgRef.current.style.transform = `translateY(${p * fgSpeed * -80}px) translate(${mouseRef.current.x}px, ${mouseRef.current.y}px)`
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 15
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 8
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="the-lab"
      className="relative z-10 h-[80vh] overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-bg-deep to-transparent z-20" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-deep to-transparent z-20" />

      <div className="absolute inset-0">
        {layers.bg && (
          <div ref={bgRef} className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${layers.bg})` }} />
        )}
        {layers.mid && (
          <div ref={midRef} className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${layers.mid})` }} />
        )}
        {layers.fg && (
          <div ref={fgRef} className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${layers.fg})` }} />
        )}
      </div>
    </section>
  )
}
