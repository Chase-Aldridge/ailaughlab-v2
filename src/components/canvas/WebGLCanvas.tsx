'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { NoiseBackground } from './NoiseBackground'

export function WebGLCanvas() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 1], fov: 45 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={1}
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <NoiseBackground />
        </Suspense>
      </Canvas>
    </div>
  )
}
