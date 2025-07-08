'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, DoubleSide, Mesh, Group } from 'three'
import { Text } from '@react-three/drei'

interface Image3DModelProps {
  imageUrl: string
  title?: string
  type: 'house' | 'villa' | 'commercial'
}

// Create a 3D model from a 2D image using perspective projection
export function Image3DModel({ imageUrl, title, type }: Image3DModelProps) {
  const meshRef = useRef<Group>(null)
  const texture = useLoader(TextureLoader, imageUrl)

  // Auto-rotate the model
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  // Create different geometries based on building type
  const geometry = useMemo(() => {
    switch (type) {
      case 'commercial':
        // Tall building with multiple floors
        return (
          <group ref={meshRef}>
            {/* Main building structure */}
            <mesh position={[0, 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[3, 6, 2.5]} />
              <meshStandardMaterial map={texture} />
            </mesh>
            
            {/* Glass facade effect */}
            <mesh position={[0, 2, 1.26]} castShadow>
              <planeGeometry args={[3, 6]} />
              <meshPhysicalMaterial 
                map={texture}
                transparent
                opacity={0.9}
                metalness={0.8}
                roughness={0.1}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </mesh>
            
            {/* Side wings */}
            <mesh position={[-2, 1.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, 4, 2]} />
              <meshStandardMaterial color="#666" metalness={0.5} roughness={0.5} />
            </mesh>
            <mesh position={[2, 1.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, 4, 2]} />
              <meshStandardMaterial color="#666" metalness={0.5} roughness={0.5} />
            </mesh>
          </group>
        )
      
      case 'villa':
        // Luxury villa with multiple levels
        return (
          <group ref={meshRef}>
            {/* Ground floor */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[4, 1.5, 3]} />
              <meshStandardMaterial map={texture} />
            </mesh>
            
            {/* First floor */}
            <mesh position={[0, 2, 0]} castShadow receiveShadow>
              <boxGeometry args={[3.5, 1.5, 2.5]} />
              <meshStandardMaterial map={texture} opacity={0.95} transparent />
            </mesh>
            
            {/* Modern flat roof */}
            <mesh position={[0, 2.8, 0]} castShadow>
              <boxGeometry args={[4.5, 0.1, 3.5]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            
            {/* Balcony */}
            <mesh position={[0, 2, 1.5]} castShadow>
              <boxGeometry args={[2, 0.1, 1]} />
              <meshStandardMaterial color="#f5f5f5" />
            </mesh>
            
            {/* Pool area */}
            <mesh position={[2.5, -0.45, 0]} receiveShadow>
              <boxGeometry args={[1.5, 0.1, 2]} />
              <meshStandardMaterial color="#00CED1" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        )
      
      default:
        // Standard house
        return (
          <group ref={meshRef}>
            {/* Main structure */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[3, 2, 3]} />
              <meshStandardMaterial map={texture} />
            </mesh>
            
            {/* Roof */}
            <mesh position={[0, 1.75, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
              <coneGeometry args={[2.5, 1.2, 4]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            
            {/* Front facade with texture */}
            <mesh position={[0, 0.5, 1.51]} castShadow>
              <planeGeometry args={[3, 2]} />
              <meshStandardMaterial map={texture} side={DoubleSide} />
            </mesh>
            
            {/* Windows */}
            <mesh position={[-0.8, 0.5, 1.52]} castShadow>
              <planeGeometry args={[0.6, 0.6]} />
              <meshPhysicalMaterial 
                color="#87CEEB" 
                metalness={0.9} 
                roughness={0.1}
                transparent
                opacity={0.7}
              />
            </mesh>
            <mesh position={[0.8, 0.5, 1.52]} castShadow>
              <planeGeometry args={[0.6, 0.6]} />
              <meshPhysicalMaterial 
                color="#87CEEB" 
                metalness={0.9} 
                roughness={0.1}
                transparent
                opacity={0.7}
              />
            </mesh>
          </group>
        )
    }
  }, [type, texture])

  return (
    <>
      {geometry}
      {title && (
        <Text
          position={[0, -1.5, 0]}
          fontSize={0.3}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      )}
    </>
  )
}

// Pseudo-3D card effect using depth and perspective
export function Image3DCard({ imageUrl, title }: { imageUrl: string; title?: string }) {
  const meshRef = useRef<Mesh>(null)
  const texture = useLoader(TextureLoader, imageUrl)
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }
  })

  return (
    <group>
      {/* Main image plane */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <planeGeometry args={[4, 3]} />
        <meshPhysicalMaterial 
          map={texture}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.1}
          roughness={0.2}
        />
      </mesh>
      
      {/* Depth layers for 3D effect */}
      <mesh position={[0, 0, -0.1]} castShadow>
        <planeGeometry args={[4.1, 3.1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Frame */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      
      {title && (
        <Text
          position={[0, -2, 0]}
          fontSize={0.3}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      )}
    </group>
  )
}

// Layered 2.5D effect
export function LayeredImage3D({ 
  imageUrl, 
  depthMapUrl,
  layers = 5 
}: { 
  imageUrl: string
  depthMapUrl?: string
  layers?: number 
}) {
  const texture = useLoader(TextureLoader, imageUrl)
  const groupRef = useRef<any>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      const mouse = state.mouse
      groupRef.current.rotation.y = mouse.x * 0.3
      groupRef.current.rotation.x = -mouse.y * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: layers }).map((_, i) => {
        const z = (i / layers) * 0.5
        const scale = 1 - (i / layers) * 0.1
        const opacity = 1 - (i / layers) * 0.3
        
        return (
          <mesh key={i} position={[0, 0, z]} scale={[scale, scale, 1]}>
            <planeGeometry args={[4, 3]} />
            <meshStandardMaterial 
              map={texture}
              transparent
              opacity={opacity}
              side={DoubleSide}
            />
          </mesh>
        )
      })}
    </group>
  )
}