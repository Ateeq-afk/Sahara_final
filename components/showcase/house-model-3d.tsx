'use client'

import { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Mesh, Group, TextureLoader } from 'three'
import { useGLTF } from '@react-three/drei'

interface HouseModel3DProps {
  modelPath?: string
  scale?: number
  rotation?: [number, number, number]
  position?: [number, number, number]
}

// Fallback 3D House Component
export function HouseModel3D({ 
  modelPath, 
  scale = 1, 
  rotation = [0, 0, 0],
  position = [0, 0, 0] 
}: HouseModel3DProps) {
  const meshRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  // Rotate the model slowly
  useFrame((state, delta) => {
    if (meshRef.current && !hovered) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  // If a model path is provided, try to load it
  if (modelPath) {
    try {
      const { scene } = useGLTF(modelPath)
      return (
        <primitive 
          object={scene} 
          scale={scale} 
          rotation={rotation}
          position={position}
        />
      )
    } catch (error) {
      console.warn('Failed to load 3D model, using fallback')
    }
  }

  // Fallback: Create a simple house model
  return (
    <group ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {/* Base/Foundation */}
      <mesh position={[0, -1, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 2, 3.5]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>

      {/* Roof Base */}
      <mesh position={[0, 1.75, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0, 1.76]} castShadow>
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Windows */}
      {/* Front Windows */}
      <mesh position={[-1, 0.5, 1.76]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1, 0.5, 1.76]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Side Windows */}
      <mesh position={[1.76, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-1.76, 0.5, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.1]} />
        <meshStandardMaterial color="#87CEEB" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Chimney */}
      <mesh position={[1.2, 2.2, -0.5]} castShadow>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Garden/Yard */}
      <mesh position={[0, -0.99, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Interactive Hover Effect */}
      <mesh 
        position={[0, 0, 0]} 
        visible={false}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[4, 3, 4]} />
      </mesh>
    </group>
  )
}

// Luxury Villa Model
export function VillaModel3D({ scale = 1, position = [0, 0, 0] }: Omit<HouseModel3DProps, 'modelPath'>) {
  const meshRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Foundation */}
      <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.3, 5]} />
        <meshStandardMaterial color="#555555" />
      </mesh>

      {/* Main Structure - First Floor */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 2.5, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Second Floor */}
      <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 2.5, 4]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Modern Flat Roof */}
      <mesh position={[0, 4, 0]} castShadow>
        <boxGeometry args={[5.5, 0.2, 4.5]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Glass Panels - Front */}
      <mesh position={[0, 1.25, 2.01]} castShadow>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial 
          color="#87CEEB" 
          metalness={0.9} 
          roughness={0.1} 
          opacity={0.5}
          transparent
        />
      </mesh>

      {/* Balcony */}
      <mesh position={[0, 2.5, 2.5]} castShadow>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Pool */}
      <mesh position={[3, -1.4, 0]} receiveShadow>
        <boxGeometry args={[2, 0.1, 3]} />
        <meshStandardMaterial color="#00CED1" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Commercial Building Model
export function CommercialModel3D({ scale = 1, position = [0, 0, 0] }: Omit<HouseModel3DProps, 'modelPath'>) {
  const meshRef = useRef<Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, -2, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Main Tower */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 8, 3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Glass Windows Pattern */}
      {[...Array(6)].map((_, i) => (
        <group key={i}>
          {/* Front */}
          <mesh position={[0, -1 + i * 1.3, 1.51]} castShadow>
            <boxGeometry args={[2.8, 1, 0.1]} />
            <meshStandardMaterial 
              color="#4682B4" 
              metalness={0.9} 
              roughness={0.1}
              opacity={0.7}
              transparent
            />
          </mesh>
          {/* Back */}
          <mesh position={[0, -1 + i * 1.3, -1.51]} castShadow>
            <boxGeometry args={[2.8, 1, 0.1]} />
            <meshStandardMaterial 
              color="#4682B4" 
              metalness={0.9} 
              roughness={0.1}
              opacity={0.7}
              transparent
            />
          </mesh>
          {/* Left */}
          <mesh position={[-1.51, -1 + i * 1.3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[2.8, 1, 0.1]} />
            <meshStandardMaterial 
              color="#4682B4" 
              metalness={0.9} 
              roughness={0.1}
              opacity={0.7}
              transparent
            />
          </mesh>
          {/* Right */}
          <mesh position={[1.51, -1 + i * 1.3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
            <boxGeometry args={[2.8, 1, 0.1]} />
            <meshStandardMaterial 
              color="#4682B4" 
              metalness={0.9} 
              roughness={0.1}
              opacity={0.7}
              transparent
            />
          </mesh>
        </group>
      ))}

      {/* Rooftop */}
      <mesh position={[0, 6.1, 0]} castShadow>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Entrance */}
      <mesh position={[0, -1.5, 1.6]} castShadow>
        <boxGeometry args={[1.5, 1, 0.2]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  )
}