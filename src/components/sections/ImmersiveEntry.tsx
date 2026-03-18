'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { SKOOL_URL } from '@/lib/constants'
import { useTheme } from '@/components/theme/ThemeProvider'
import { themeCopy } from '@/data/theme-copy'

export function ImmersiveEntry() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const copy = themeCopy[theme]

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1, delay: 0.3 }
      )
      .fromTo(line2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1 },
        '-=0.5'
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.2'
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress
          gsap.set(line1Ref.current, { y: -p * 80, opacity: 1 - p * 1.5 })
          gsap.set(line2Ref.current, { y: -p * 120, opacity: 1 - p * 1.5 })
          gsap.set(subtitleRef.current, { y: -p * 60, opacity: 1 - p * 2 })
          gsap.set(ctaRef.current, { y: -p * 40, opacity: 1 - p * 2.5 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12 lg:px-20"
    >
      {/* Accent gradient behind hero text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 70%, var(--theme-accent) 0%, transparent 50%)',
          opacity: 0.06,
        }}
      />

      <div className="relative max-w-[1400px]">
        <h1
          ref={line1Ref}
          className="font-display font-bold text-[clamp(3rem,15vw,25vw)] leading-[0.85] text-text-primary text-glow-accent"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          AI LAUGH
        </h1>
        <h1
          ref={line2Ref}
          className="font-display font-bold text-[clamp(4rem,20vw,35vw)] leading-[0.85] text-text-primary ml-[5vw] text-glow-accent"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          LAB
        </h1>

        {/* Accent underline */}
        <div className="mt-6 w-24 h-[3px] bg-accent opacity-60" />

        <p
          ref={subtitleRef}
          className="mt-6 text-text-secondary text-lg md:text-xl max-w-[480px] leading-relaxed opacity-0"
        >
          {copy.heroSubheadline}
        </p>
        <div ref={ctaRef} className="mt-8 opacity-0">
          <MagneticButton href={SKOOL_URL}>
            {copy.ctaButton}
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
