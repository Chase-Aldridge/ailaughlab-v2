'use client'

import { useEffect, useState, useRef } from 'react'

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const [progress, setProgress] = useState(0)
  const lastScrollY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      const dt = now - lastTime.current
      if (dt === 0) return

      const currentY = window.scrollY
      const dy = currentY - lastScrollY.current
      const v = Math.abs(dy / dt) * 1000 // px/s

      setVelocity(v)
      setProgress(currentY / (document.documentElement.scrollHeight - window.innerHeight))

      lastScrollY.current = currentY
      lastTime.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { velocity, progress }
}
