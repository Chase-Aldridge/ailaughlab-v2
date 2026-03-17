'use client'

import { useEffect, useState } from 'react'
import themeAssetsJson from '../../../public/generated/theme-assets.json'

type ThemeId = 'ai-lab' | 'wild-west' | 'space-station' | 'retro-arcade'

interface ShaderUniforms {
  accent: [number, number, number]
  accentSecondary: [number, number, number]
  bgDark: [number, number, number]
  bgDeep: [number, number, number]
}

const themeAssets = themeAssetsJson as unknown as Record<string, { shaderUniforms: ShaderUniforms }>

export function useWebGLTheme() {
  const [uniforms, setUniforms] = useState<ShaderUniforms>(themeAssets['ai-lab'].shaderUniforms)

  useEffect(() => {
    const updateTheme = () => {
      const theme = (document.documentElement.getAttribute('data-theme') || 'ai-lab') as ThemeId
      const assets = themeAssets[theme]
      if (assets) {
        setUniforms(assets.shaderUniforms)
      }
    }

    updateTheme()

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'data-theme') {
          updateTheme()
        }
      }
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  return uniforms
}
