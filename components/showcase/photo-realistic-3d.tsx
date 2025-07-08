'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { 
  TextureLoader, 
  Mesh, 
  Group,
  RepeatWrapping,
  SRGBColorSpace,
  MeshStandardMaterial
} from 'three'
import { 
  Box, 
  Plane, 
  useTexture,
  Float
} from '@react-three/drei'

interface PhotoRealistic3DProps {
  images: {
    exterior: string[]
    interior: string[]
  }
  type: 'house' | 'villa' | 'commercial'
  title: string
}

export function PhotoRealistic3D({ images, type, title }: PhotoRealistic3DProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  
  // Load textures
  const exteriorTexture = useTexture(images.exterior[0])
  const interiorTextureUrl = images.interior[0] || images.exterior[0]
  const interiorTexture = useTexture(interiorTextureUrl)
  
  // Configure textures
  useEffect(() => {
    exteriorTexture.wrapS = exteriorTexture.wrapT = RepeatWrapping
    exteriorTexture.colorSpace = SRGBColorSpace
    interiorTexture.wrapS = interiorTexture.wrapT = RepeatWrapping
    interiorTexture.colorSpace = SRGBColorSpace
  }, [exteriorTexture, interiorTexture])

  // Animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!hovered) {
        groupRef.current.rotation.y += delta * 0.1
      } else {
        // Smooth rotation to face camera when hovered
        groupRef.current.rotation.y += (0 - groupRef.current.rotation.y) * 0.1
      }
    }
  })

  const renderBuilding = () => {
    switch (type) {
      case 'commercial':
        return <CommercialBuilding exterior={exteriorTexture} interior={interiorTexture} />
      case 'villa':
        return <VillaBuilding exterior={exteriorTexture} interior={interiorTexture} />
      default:
        return <HouseBuilding exterior={exteriorTexture} interior={interiorTexture} />
    }
  }

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group 
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {renderBuilding()}
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial 
            color="#151515"
            metalness={0.5}
            roughness={0.8}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Detailed House Model with Photo Textures
function HouseBuilding({ exterior, interior }: any) {
  return (
    <group>
      {/* Main Structure */}
      <Box args={[3.5, 2.5, 3]} position={[0, 0.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={exterior} />
      </Box>
      
      {/* Roof Structure */}
      <group position={[0, 1.5, 0]}>
        {/* Roof base */}
        <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
          <coneGeometry args={[3, 1.5, 4]} />
          <meshStandardMaterial 
            color="#8B4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Roof tiles effect */}
        <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.01, 0]}>
          <coneGeometry args={[3.1, 1.5, 4]} />
          <meshStandardMaterial 
            color="#A0522D"
            roughness={0.9}
            metalness={0}
          />
        </mesh>
      </group>
      
      {/* Front Wall with Texture */}
      <Plane args={[3.5, 2.5]} position={[0, 0.25, 1.51]} castShadow>
        <meshStandardMaterial 
          map={exterior}
          roughness={0.7}
          metalness={0.1}
        />
      </Plane>
      
      {/* Windows with Glass Effect */}
      <group>
        {/* Left Window */}
        <Box args={[0.8, 0.8, 0.1]} position={[-1, 0.5, 1.55]} castShadow>
          <meshPhysicalMaterial
            color="#87CEEB"
            transmission={0.9}
            roughness={0.1}
            metalness={0.1}
            thickness={0.5}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </Box>
        
        {/* Right Window */}
        <Box args={[0.8, 0.8, 0.1]} position={[1, 0.5, 1.55]} castShadow>
          <meshPhysicalMaterial
            color="#87CEEB"
            transmission={0.9}
            roughness={0.1}
            metalness={0.1}
            thickness={0.5}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </Box>
      </group>
      
      {/* Door */}
      <Box args={[0.9, 1.6, 0.1]} position={[0, -0.2, 1.55]} castShadow>
        <meshStandardMaterial 
          color="#654321"
          roughness={0.8}
          metalness={0.1}
        />
      </Box>
      
      {/* Details */}
      <group>
        {/* Chimney */}
        <Box args={[0.4, 1, 0.4]} position={[1.5, 2, -0.5]} castShadow>
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </Box>
        
        {/* Garden Area */}
        <Plane 
          args={[5, 5]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1.49, 0]}
          receiveShadow
        >
          <meshStandardMaterial color="#228B22" roughness={1} />
        </Plane>
      </group>
    </group>
  )
}

// Villa Model
function VillaBuilding({ exterior, interior }: any) {
  return (
    <group>
      {/* Ground Floor */}
      <Box args={[5, 2, 4]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={exterior} />
      </Box>
      
      {/* First Floor */}
      <Box args={[4.5, 2, 3.5]} position={[0, 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial map={exterior} />
      </Box>
      
      {/* Modern Flat Roof */}
      <Box args={[5.5, 0.2, 4.5]} position={[0, 3.1, 0]} castShadow>
        <meshStandardMaterial color="#333" roughness={0.9} metalness={0.1} />
      </Box>
      
      {/* Glass Panels */}
      <Plane args={[4, 3.5]} position={[0, 1, 2.01]} castShadow>
        <meshPhysicalMaterial
          map={exterior}
          transmission={0.6}
          roughness={0.1}
          metalness={0.5}
          thickness={1}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0}
          transparent
          opacity={0.9}
        />
      </Plane>
      
      {/* Balcony */}
      <group>
        <Box args={[3, 0.1, 1.5]} position={[0, 2, 2.5]} castShadow>
          <meshStandardMaterial color="#f5f5f5" />
        </Box>
        {/* Glass Railing */}
        <Box args={[3, 1, 0.05]} position={[0, 2.5, 3.2]} castShadow>
          <meshPhysicalMaterial
            color="#ffffff"
            transmission={0.9}
            roughness={0.1}
            thickness={0.5}
          />
        </Box>
      </group>
      
      {/* Swimming Pool */}
      <Box args={[2, 0.1, 3]} position={[3.5, -0.95, 0]} receiveShadow>
        <meshPhysicalMaterial
          color="#00CED1"
          transmission={0.8}
          roughness={0.1}
          metalness={0.1}
          thickness={2}
          envMapIntensity={1}
        />
      </Box>
    </group>
  )
}

// Commercial Building
function CommercialBuilding({ exterior, interior }: any) {
  const floors = 8
  
  return (
    <group>
      {/* Main Tower */}
      <Box args={[3, floors * 1.2, 3]} position={[0, floors * 0.6, 0]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      
      {/* Glass Facade */}
      {Array.from({ length: floors }).map((_, i) => (
        <group key={i}>
          {/* Front */}
          <Plane 
            args={[2.8, 1]} 
            position={[0, i * 1.2 + 0.6, 1.51]}
            castShadow
          >
            <meshPhysicalMaterial
              map={exterior}
              transmission={0.6}
              roughness={0.1}
              metalness={0.8}
              thickness={0.5}
              envMapIntensity={1}
              transparent
              opacity={0.8}
            />
          </Plane>
          
          {/* Side panels for each floor */}
          {i % 2 === 0 && (
            <>
              <Box 
                args={[0.1, 1, 2.8]} 
                position={[1.51, i * 1.2 + 0.6, 0]}
                castShadow
              >
                <meshStandardMaterial 
                  color="#2a2a2a"
                  roughness={0.4}
                  metalness={0.6}
                />
              </Box>
              <Box 
                args={[0.1, 1, 2.8]} 
                position={[-1.51, i * 1.2 + 0.6, 0]}
                castShadow
              >
                <meshStandardMaterial 
                  color="#2a2a2a"
                  roughness={0.4}
                  metalness={0.6}
                />
              </Box>
            </>
          )}
        </group>
      ))}
      
      {/* Rooftop */}
      <Box args={[3.5, 0.3, 3.5]} position={[0, floors * 1.2 + 0.3, 0]} castShadow>
        <meshStandardMaterial color="#333" roughness={0.9} />
      </Box>
      
      {/* Entrance */}
      <Box args={[2, 2, 0.5]} position={[0, 0, 1.75]} castShadow>
        <meshStandardMaterial 
          map={exterior}
          roughness={0.5}
          metalness={0.3}
        />
      </Box>
    </group>
  )
}