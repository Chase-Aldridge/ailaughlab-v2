'use client'

import { ThemeSelector } from '@/components/theme/ThemeSelector'

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-6 md:px-12 lg:px-20 pb-8 pt-16">
      <div className="w-full h-px mb-6" style={{ background: 'linear-gradient(90deg, var(--theme-accent) 0%, transparent 40%)', opacity: 0.15 }} />

      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-sm font-display">
          AI Laugh Lab
        </span>
        <ThemeSelector />
      </div>

      <div className="mt-4">
        <span className="text-text-muted text-xs">2026</span>
      </div>
    </footer>
  )
}
