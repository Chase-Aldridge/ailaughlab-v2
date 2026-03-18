'use client'

import { useEffect, useRef, useCallback } from 'react'

// Use refs instead of useState to avoid React re-renders on every scroll frame
const scrollState = { velocity: 0, progress: 0 }

export function useScrollVelocity() {
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())
  const rafId = useRef(0)

  const update = useCallback(() => {
    const now = Date.now()
    const dt = now - lastTime.current
    if (dt > 0) {
      const currentY = window.scrollY
      const dy = currentY - lastScrollY.current
      scrollState.velocity = Math.abs(dy / dt) * 1000
      scrollState.progress = currentY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      lastScrollY.current = currentY
      lastTime.current = now
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [update])

  return scrollState
}
