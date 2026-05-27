import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Icosahedron,
  Float,
  Torus,
  Sparkles,
  Environment,
} from '@react-three/drei'
import { MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface CameraRigProps {
  isMobile: boolean
}

const CameraRig: React.FC<CameraRigProps> = ({ isMobile }) => {
  const { camera, mouse } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame(() => {
    if (isMobile) return

    const targetX = mouseRef.current.x * 0.5
    const targetY = mouseRef.current.y * 0.5

    camera.position.x += (targetX - camera.position.x) * 0.05
    camera.position.y += (targetY - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })

  return null
}

interface SceneContentProps {
  isMobile: boolean
}

const SceneContent: React.FC<SceneContentProps> = ({ isMobile }) => {
  const { gl } = useThree()

  // Mobile fallback: render only Icosahedron
  if (gl.capabilities.maxTextureSize < 8192) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />
        <Icosahedron args={[1.2, 1]}>
          <meshStandardMaterial
            color="#C9A84C"
            metalness={0.3}
            roughness={0.4}
          />
        </Icosahedron>
      </>
    )
  }

  // Full scene for desktop
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#C9A84C" />

      {/* Main Icosahedron with Float and Transmission */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Icosahedron args={[1.2, 1]}>
          <MeshTransmissionMaterial
            backside
            thickness={0.2}
            roughness={0.05}
            transmission={0.9}
            chromaticAberration={0.06}
            color="#C9A84C"
          />
        </Icosahedron>
      </Float>

      {/* Torus rings */}
      <Torus args={[2.2, 0.015]}>
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.2} />
      </Torus>

      <Torus args={[3.0, 0.01]}>
        <meshStandardMaterial color="#C9A84C" emissive="#C9A84C" emissiveIntensity={0.15} />
      </Torus>

      {/* Sparkles */}
      <Sparkles count={60} scale={8} size={0.6} speed={0.2} />

      {/* Environment */}
      <Environment preset="city" />

      {/* Camera rig for pointer tracking */}
      <CameraRig isMobile={isMobile} />
    </>
  )
}

interface HeroSceneProps {
  isMobile: boolean
}

export const HeroScene: React.FC<HeroSceneProps> = ({ isMobile }) => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
      dpr={[1, 1.5]}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <SceneContent isMobile={isMobile} />
    </Canvas>
  )
}
