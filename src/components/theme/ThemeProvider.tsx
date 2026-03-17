'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { type ThemeId, defaultTheme, themeIds } from './theme-config'

interface ThemeContextValue {
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  cycleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: defaultTheme,
  setTheme: () => {},
  cycleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemeId | null
    if (stored && themeIds.includes(stored)) {
      setThemeState(stored)
      document.documentElement.setAttribute('data-theme', stored)
    }
  }, [])

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }, [])

  const cycleTheme = useCallback(() => {
    const currentIndex = themeIds.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themeIds.length
    setTheme(themeIds[nextIndex])
  }, [theme, setTheme])

  return (
    <ThemeContext value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext>
  )
}
