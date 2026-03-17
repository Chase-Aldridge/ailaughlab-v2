'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 30 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 30 })
  const visible = useRef(false)

  useEffect(() => {
    // Only show on desktop
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible.current) visible.current = true
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [cursorX, cursorY])

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[60] mix-blend-difference bg-white"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      aria-hidden="true"
    />
  )
}
