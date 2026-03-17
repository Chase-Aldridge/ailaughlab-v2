'use client'

import { ThemeSelector } from '@/components/theme/ThemeSelector'

export function SiteFooter() {
  return (
    <footer className="relative z-10 px-6 md:px-12 lg:px-20 pb-8">
      {/* Thin line */}
      <div className="w-full h-px bg-white/5 mb-6" />

      <div className="flex items-center justify-between">
        <span className="text-text-secondary text-sm font-body">
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
