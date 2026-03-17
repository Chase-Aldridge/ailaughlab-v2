'use client'

import { useEffect } from 'react'
import { registerGSAP } from '@/lib/gsap-setup'

export function ScrollTimeline({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGSAP()
  }, [])

  return <>{children}</>
}
