'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { highlights } from '@/data/highlights'

const quotes = highlights.slice(0, 3)

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      quoteRefs.current.forEach((el, i) => {
        if (!el) return

        const direction = i % 2 === 0 ? -60 : 60

        gsap.fromTo(el,
          { opacity: 0, x: direction },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="social-proof"
      className="relative z-10 py-32 md:py-48"
    >
      {/* Section label */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20 mb-16">
        <span className="text-accent text-xs font-body tracking-widest uppercase opacity-50">
          Community
        </span>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-20">
        {quotes.map((quote, i) => (
          <div
            key={i}
            ref={(el) => { quoteRefs.current[i] = el }}
            className="py-16 md:py-24 first:pt-0 last:pb-0"
          >
            {i > 0 && (
              <div className="w-full h-px mb-16 md:mb-24" style={{ background: 'linear-gradient(90deg, var(--theme-accent) 0%, transparent 60%)', opacity: 0.15 }} />
            )}

            <div className="relative">
              {/* Oversized quotation mark */}
              <span className="absolute -top-8 -left-2 md:-left-4 font-display text-[clamp(100px,15vw,200px)] leading-none text-accent/15 select-none">
                &ldquo;
              </span>

              <blockquote className="relative">
                <p className="font-display font-semibold text-[clamp(1.5rem,4vw,4vw)] leading-[1.2] text-text-primary max-w-[800px]">
                  {quote.title}
                </p>
                <p className="mt-6 text-text-secondary text-lg md:text-xl max-w-[600px] leading-relaxed">
                  {quote.description}
                </p>
                <cite className="mt-6 block text-accent/60 text-sm not-italic">
                  {quote.category}
                </cite>
              </blockquote>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
