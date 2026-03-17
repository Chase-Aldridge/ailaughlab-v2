'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useWebGLTheme } from './useWebGLTheme'
import { useScrollVelocity } from '@/components/scroll/useScrollVelocity'
// @ts-expect-error webpack raw loader
import vertexShader from './shaders/noise.vert'
// @ts-expect-error webpack raw loader
import fragmentShader from './shaders/noise.frag'

export function NoiseBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const theme = useWebGLTheme()
  const { progress } = useScrollVelocity()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uColorAccent: { value: new THREE.Vector3(...theme.accent) },
    uColorSecondary: { value: new THREE.Vector3(...theme.accentSecondary) },
    uColorBg: { value: new THREE.Vector3(...theme.bgDark) },
    uColorBgDeep: { value: new THREE.Vector3(...theme.bgDeep) },
    uDistortion: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const material = meshRef.current.material as THREE.ShaderMaterial
    material.uniforms.uTime.value = clock.getElapsedTime()
    material.uniforms.uScrollProgress.value = progress
    material.uniforms.uColorAccent.value.set(...theme.accent)
    material.uniforms.uColorSecondary.value.set(...theme.accentSecondary)
    material.uniforms.uColorBg.value.set(...theme.bgDark)
    material.uniforms.uColorBgDeep.value.set(...theme.bgDeep)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}
