'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { animationData } from '@/lib/animation-data'

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      const wordElements = wordsRef.current?.querySelectorAll('[data-word]')
      if (!wordElements) return

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${animationData.manifesto.totalDuration}vh`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress

          // Update progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleY(${progress})`
          }

          // Update each word opacity
          wordElements.forEach((el, i) => {
            const wordData = animationData.manifesto.words[i]
            if (!wordData) return

            let opacity = 0.15
            if (progress >= wordData.start && progress <= wordData.end) {
              const wordProgress = (progress - wordData.start) / (wordData.end - wordData.start)
              opacity = 0.15 + wordProgress * 0.85
            } else if (progress > wordData.end) {
              opacity = 1
            }

            ;(el as HTMLElement).style.opacity = String(opacity)
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20"
    >
      {/* Accent progress line */}
      <div
        ref={progressBarRef}
        className="absolute left-6 md:left-12 lg:left-20 top-[10%] bottom-[10%] w-[2px] bg-accent origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      <div className="ml-8 md:ml-16 max-w-[900px]" ref={wordsRef}>
        <p className="font-display font-semibold text-[clamp(1.5rem,5vw,6vw)] leading-[1.2] tracking-tight">
          {animationData.manifesto.words.map((w, i) => (
            <span
              key={i}
              data-word
              className="inline-block mr-[0.3em] transition-none"
              style={{ opacity: 0.15 }}
            >
              {w.word}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
