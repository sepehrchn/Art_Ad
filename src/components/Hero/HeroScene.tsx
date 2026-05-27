import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SceneProps {
  isPausedRef: React.RefObject<boolean>
}

const Scene: React.FC<SceneProps> = ({ isPausedRef }) => {
  const torusRef = useRef<THREE.Mesh>(null!)
  const ringRef1 = useRef<THREE.Mesh>(null!)
  const ringRef2 = useRef<THREE.Mesh>(null!)
  const ringRef3 = useRef<THREE.Mesh>(null!)
  const { size, mouse } = useThree()
  const prefersReducedMotion = useReducedMotion()

  useFrame((state, delta) => {
    if (isPausedRef.current || prefersReducedMotion) return

    const time = state.clock.getElapsedTime()

    // Main torus rotation
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3
      torusRef.current.rotation.y = time * 0.2
    }

    // Orbiting rings
    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.5
      ringRef1.current.rotation.z = time * 0.3
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y = time * 0.4
      ringRef2.current.rotation.z = -time * 0.2
    }
    if (ringRef3.current) {
      ringRef3.current.rotation.x = -time * 0.3
      ringRef3.current.rotation.y = time * 0.5
    }
  })

  return (
    <>
      {/* Strong directional lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#F0EBE0" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#C9A84C" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#D4AF37" />

      {/* Main golden torus */}
      <mesh ref={torusRef}>
        <torusGeometry args={[1.5, 0.5, 32, 100]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.9}
          roughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Orbiting ring 1 */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#F0EBE0"
          metalness={0.8}
          roughness={0.2}
          emissive="#F0EBE0"
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh ref={ringRef2}>
        <torusGeometry args={[3, 0.06, 16, 100]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.8}
          roughness={0.2}
          emissive="#C9A84C"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Orbiting ring 3 */}
      <mesh ref={ringRef3}>
        <torusGeometry args={[3.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#8B6E2E"
          metalness={0.7}
          roughness={0.3}
          emissive="#8B6E2E"
          emissiveIntensity={0.2}
          transparent
          opacity={0.4}
        />
      </mesh>
    </>
  )
}

export const HeroScene: React.FC = () => {
  const isPausedRef = useRef(false)
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = canvasContainerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { isPausedRef.current = !entry.isIntersecting },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={canvasContainerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
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
        <Scene isPausedRef={isPausedRef} />
      </Canvas>
    </div>
  )
}
