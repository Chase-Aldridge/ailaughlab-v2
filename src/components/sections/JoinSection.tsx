'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SKOOL_URL } from '@/lib/constants'
import { useTheme } from '@/components/theme/ThemeProvider'
import { themeCopy } from '@/data/theme-copy'

export function JoinSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const { theme } = useTheme()
  const copy = themeCopy[theme]

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative z-10 min-h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-20"
    >
      {/* Stronger radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, var(--theme-accent) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, var(--theme-accent-secondary) 0%, transparent 50%)
          `,
          opacity: 0.08,
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-6 md:left-12 lg:left-20 right-1/2 h-px" style={{ background: 'linear-gradient(90deg, var(--theme-accent), transparent)', opacity: 0.2 }} />

      <div className="relative max-w-[1200px]">
        <span className="text-accent text-xs font-body tracking-widest uppercase opacity-50 mb-8 block">
          Join Us
        </span>

        <h2
          ref={headlineRef}
          className="font-display font-bold text-[clamp(3rem,10vw,10vw)] leading-[0.9] text-text-primary text-glow-accent opacity-0"
        >
          {copy.ctaHeadline}
        </h2>
        <div className="mt-12">
          <MagneticButton href={SKOOL_URL}>
            {copy.ctaButton}
          </MagneticButton>
        </div>
        <p className="mt-8 text-text-muted text-sm">
          Free forever. No credit card. 100+ members.
        </p>
      </div>
    </section>
  )
}
