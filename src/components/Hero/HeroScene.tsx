import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { TorusKnot, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const Scene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!)
  const spotLightRef = useRef<THREE.SpotLight>(null!)
  const sparklesRef1 = useRef<any>(null!)
  const sparklesRef2 = useRef<any>(null!)
  const { size, mouse } = useThree()
  const prefersReducedMotion = useReducedMotion()

  const particles1 = useMemo(() => {
    const count = 500
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [])

  useFrame((state, delta) => {
    if (prefersReducedMotion) return

    const time = state.clock.getElapsedTime()
    const slowTime = time * 0.1

    // Animate main shape
    if (meshRef.current) {
      meshRef.current.rotation.y = slowTime
      meshRef.current.rotation.x = slowTime * 0.3
      meshRef.current.position.y = Math.sin(slowTime * 0.5) * 0.2
    }

    // Animate spotlight
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.cos(slowTime * 0.5) * 5
      spotLightRef.current.position.y = 2 + Math.sin(slowTime * 0.5) * 2
    }

    // Animate particle layers for parallax
    const parallaxX = mouse.x * 0.5
    const parallaxY = mouse.y * 0.5
    if (sparklesRef1.current) {
      sparklesRef1.current.position.x += (parallaxX - sparklesRef1.current.position.x) * 0.5 * delta
      sparklesRef1.current.position.y += (parallaxY - sparklesRef1.current.position.y) * 0.5 * delta
    }
    if (sparklesRef2.current) {
      sparklesRef2.current.position.x += (parallaxX - sparklesRef2.current.position.x) * 0.2 * delta
      sparklesRef2.current.position.y += (parallaxY - sparklesRef2.current.position.y) * 0.2 * delta
    }
  })

  return (
    <>
      <hemisphereLight groundColor={new THREE.Color('#444444')} intensity={0.4} />
      <spotLight
        ref={spotLightRef}
        position={[5, 5, 5]}
        angle={0.8}
        penumbra={0.8}
        intensity={1.8}
        castShadow
        color="#F0EBE0"
      />

      <TorusKnot ref={meshRef} args={[1, 0.35, 256, 24]}>
        <meshStandardMaterial
          metalness={0.4}
          roughness={0.2}
          color="#C9A84C"
        />
      </TorusKnot>

      {/* Layer 1 - Fast, foreground */}
      <group ref={sparklesRef1}>
        <Sparkles
          count={80}
          scale={size.width < 768 ? 4 : 6}
          size={1.5}
          speed={0.1}
          noise={0.1}
          color="#D4AF37"
        />
      </group>

      {/* Layer 2 - Slow, mid-ground */}
      <group ref={sparklesRef2}>
        <Sparkles
          count={40}
          scale={size.width < 768 ? 8 : 12}
          size={2.5}
          speed={0.05}
          noise={0.05}
          color="#FFFFFF"
        />
      </group>

      {/* Layer 3 - Static, background */}
      <points>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={particles1.length / 3}
            array={particles1}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={0.015}
          color="#AAAAAA"
          transparent
          opacity={0.3}
        />
      </points>
    </>
  )
}

export const HeroScene: React.FC = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 7],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, 1.5]}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      gl={{
        powerPreference: 'high-performance',
        antialias: false,
        stencil: false,
        depth: false,
      }}
    >
      <Scene />
    </Canvas>
  )
}
