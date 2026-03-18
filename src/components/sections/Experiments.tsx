'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap-setup'
import { experiments } from '@/data/experiments'
import { animationData } from '@/lib/animation-data'

export function Experiments() {
  const sectionRef = useRef<HTMLElement>(null)
  const experimentRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    registerGSAP()

    const ctx = gsap.context(() => {
      const totalHeight = animationData.experiments.totalPinHeight

      // Show first experiment immediately
      if (experimentRefs.current[0]) {
        experimentRefs.current[0].style.opacity = '1'
        experimentRefs.current[0].style.clipPath = 'inset(0 0 0 0)'
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalHeight * 100}vh`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const timings = animationData.experiments.timings

          experimentRefs.current.forEach((el, i) => {
            if (!el) return
            const timing = timings[i]
            if (!timing) return

            const experimentProgress = (progress - timing.enterProgress) / (timing.exitProgress - timing.enterProgress)

            if (experimentProgress < 0) {
              el.style.opacity = '0'
              el.style.clipPath = 'inset(100% 0 0 0)'
            } else if (experimentProgress >= 0 && experimentProgress <= 0.15) {
              const enter = experimentProgress / 0.15
              el.style.opacity = String(enter)
              el.style.clipPath = `inset(${(1 - enter) * 100}% 0 0 0)`
            } else if (experimentProgress > 0.15 && experimentProgress <= 0.85) {
              el.style.opacity = '1'
              el.style.clipPath = 'inset(0 0 0 0)'
            } else if (experimentProgress > 0.85 && experimentProgress <= 1) {
              const exit = (experimentProgress - 0.85) / 0.15
              el.style.opacity = String(1 - exit)
              el.style.clipPath = `inset(0 0 ${exit * 100}% 0)`
            } else {
              el.style.opacity = '0'
              el.style.clipPath = 'inset(0 0 100% 0)'
            }
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experiments"
      className="relative z-10 min-h-screen"
    >
      {/* Section label */}
      <div className="absolute top-8 left-6 md:left-12 lg:left-20 z-20">
        <span className="text-accent text-xs font-body tracking-widest uppercase opacity-50">
          Experiments
        </span>
      </div>

      {/* Stepper dots on right */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {experiments.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-white/20 transition-colors"
            data-stepper-dot={i}
          />
        ))}
      </div>

      {/* Experiment slides */}
      {experiments.map((exp, i) => (
        <div
          key={i}
          ref={(el) => { experimentRefs.current[i] = el }}
          className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-20"
          style={{
            opacity: i === 0 ? 1 : 0,
            clipPath: i === 0 ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
          }}
        >
          <div className="relative w-full max-w-[1200px]">
            {/* Large experiment number */}
            <span className="absolute -top-16 md:-top-24 left-0 font-display font-bold text-[clamp(120px,20vw,200px)] leading-none text-accent/10 select-none">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="relative">
              {/* Accent dot */}
              <div className="w-2 h-2 rounded-full bg-accent mb-6 opacity-60" />

              <h2 className="font-display font-bold text-[clamp(2rem,8vw,8vw)] leading-[0.95] text-text-primary mb-6">
                {exp.title}
              </h2>
              <p className="text-text-secondary text-lg md:text-xl max-w-[600px] leading-relaxed">
                {exp.description}
              </p>
              <p className="mt-4 text-text-muted text-base max-w-[500px] leading-relaxed">
                {exp.backContent}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
