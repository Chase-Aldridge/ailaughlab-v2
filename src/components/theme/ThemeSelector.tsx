'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'
import { themes, themeIds, type ThemeId } from './theme-config'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const currentTheme = themes[theme]
  const otherThemes = themeIds.filter((id) => id !== theme)

  // Position dots in a radial pattern
  const radius = 48
  const angles = [-90, -30, 30] // degrees, spread upward

  return (
    <div ref={containerRef} className="relative">
      {/* Active theme dot */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-4 h-4 rounded-full cursor-pointer border-2 border-white/20"
        style={{ backgroundColor: currentTheme.accent }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Current theme: ${currentTheme.name}. Click to change.`}
      />

      {/* Radial menu */}
      <AnimatePresence>
        {open && otherThemes.map((id, i) => {
          const angle = (angles[i] * Math.PI) / 180
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          return (
            <motion.button
              key={id}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: 1, x, y: -y, scale: 1 }}
              exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: i * 0.05 }}
              onClick={() => {
                setTheme(id as ThemeId)
                setOpen(false)
              }}
              className="absolute bottom-0 right-0 w-3 h-3 rounded-full cursor-pointer border border-white/10 hover:scale-150 transition-transform"
              style={{ backgroundColor: themes[id as ThemeId].accent }}
              aria-label={`Switch to ${themes[id as ThemeId].name} theme`}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
