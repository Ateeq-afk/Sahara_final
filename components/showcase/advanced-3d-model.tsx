'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { 
  Box, 
  Plane,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  Text
} from '@react-three/drei'
import { Group, Vector3 } from 'three'

interface Advanced3DModelProps {
  projectData: {
    title: string
    images: {
      exterior: string[]
      interior: string[]
      floorPlan?: string[]
    }
    type: 'house' | 'villa' | 'commercial'
    floors: number
    area: string
  }
}

export function Advanced3DModel({ projectData }: Advanced3DModelProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Load all textures
  const textures = {
    exterior: useTexture(projectData.images.exterior[0]),
    interior: useTexture(projectData.images.interior[0] || projectData.images.exterior[0]),
    exteriorAlt: projectData.images.exterior[1] ? useTexture(projectData.images.exterior[1]) : null
  }

  // Animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth rotation
      if (!clicked) {
        groupRef.current.rotation.y += delta * 0.15
      }
      
      // Hover effect
      const scale = hovered ? 1.05 : 1
      groupRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1)
      
      // Floating effect
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  const BuildingModel = useMemo(() => {
    switch (projectData.type) {
      case 'commercial':
        return <CommercialModel {...projectData} textures={textures} />
      case 'villa':
        return <VillaModel {...projectData} textures={textures} />
      default:
        return <HouseModel {...projectData} textures={textures} />
    }
  }, [projectData, textures])

  return (
    <>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      >
        {BuildingModel}
        
        {/* Interactive label */}
        <Text
          position={[0, -2, 0]}
          fontSize={0.3}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {projectData.title}
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </group>

      {/* Shadows */}
      <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.85}
        scale={10}
        position={[0, -1.5, 0]}
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.55}
          ambient={0.25}
          position={[5, 5, -10]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.25}
          ambient={0.55}
          position={[-5, 5, -9]}
        />
      </AccumulativeShadows>
    </>
  )
}

// Realistic House Model
function HouseModel({ textures, floors = 2 }: any) {
  return (
    <group>
      {/* Foundation */}
      <Box args={[4, 0.3, 4]} position={[0, -1.35, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#555" roughness={0.9} />
      </Box>

      {/* Main Structure with Texture Mapping */}
      <group>
        {/* Front Wall */}
        <Plane args={[3.8, 2.5]} position={[0, 0.25, 1.91]} castShadow receiveShadow>
          <meshStandardMaterial map={textures.exterior} />
          
          {/* Windows as Decals */}
          <Decal position={[-1, 0.2, 0.01]} rotation={[0, 0, 0]} scale={[0.8, 0.8, 1]}>
            <meshPhysicalMaterial
              color="#87CEEB"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.8}
              clearcoat={1}
            />
          </Decal>
          <Decal position={[1, 0.2, 0.01]} rotation={[0, 0, 0]} scale={[0.8, 0.8, 1]}>
            <meshPhysicalMaterial
              color="#87CEEB"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.8}
              clearcoat={1}
            />
          </Decal>
        </Plane>

        {/* Back Wall */}
        <Plane args={[3.8, 2.5]} position={[0, 0.25, -1.91]} rotation={[0, Math.PI, 0]} castShadow>
          <meshStandardMaterial map={textures.exteriorAlt || textures.exterior} />
        </Plane>

        {/* Side Walls */}
        <Plane args={[3.8, 2.5]} position={[1.91, 0.25, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
          <meshStandardMaterial color="#f5f5dc" />
        </Plane>
        <Plane args={[3.8, 2.5]} position={[-1.91, 0.25, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <meshStandardMaterial color="#f5f5dc" />
        </Plane>

        {/* Floor */}
        <Box args={[3.8, 0.1, 3.8]} position={[0, -1.05, 0]} receiveShadow>
          <meshStandardMaterial color="#8B6F47" />
        </Box>

        {/* Ceiling */}
        <Box args={[3.8, 0.1, 3.8]} position={[0, 1.55, 0]} castShadow>
          <meshStandardMaterial color="#fff" />
        </Box>
      </group>

      {/* Roof */}
      <group position={[0, 2.3, 0]}>
        {/* Roof structure with proper geometry */}
        <mesh castShadow>
          <coneGeometry args={[3.2, 1.5, 4]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
        
        {/* Roof details */}
        <mesh position={[0, 0.02, 0]}>
          <coneGeometry args={[3.3, 1.5, 4]} />
          <meshStandardMaterial color="#A0522D" roughness={0.95} />
        </mesh>
      </group>

      {/* Architectural Details */}
      <group>
        {/* Door */}
        <Box args={[0.9, 1.6, 0.1]} position={[0, -0.25, 1.95]} castShadow>
          <meshStandardMaterial color="#654321" roughness={0.8} />
          {/* Door handle */}
          <Decal position={[0.35, 0, 0.06]} rotation={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
            <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
          </Decal>
        </Box>

        {/* Chimney */}
        <Box args={[0.5, 1.2, 0.5]} position={[1.5, 2.5, -0.5]} castShadow>
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </Box>

        {/* Porch */}
        <Box args={[2, 0.1, 1]} position={[0, -1.05, 2.4]} castShadow receiveShadow>
          <meshStandardMaterial color="#8B6F47" />
        </Box>
      </group>
    </group>
  )
}

// Villa Model with Multiple Floors
function VillaModel({ textures, floors = 2 }: any) {
  return (
    <group>
      {/* Modern Base */}
      <Box args={[6, 0.4, 5]} position={[0, -1.3, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#333" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Ground Floor */}
      <group position={[0, 0, 0]}>
        {/* Main structure */}
        <Box args={[5, 2.5, 4]} position={[0, 0.25, 0]} castShadow receiveShadow>
          <meshStandardMaterial map={textures.exterior} />
        </Box>

        {/* Large Glass Panels */}
        <Plane args={[4.5, 2]} position={[0, 0.25, 2.01]} castShadow>
          <meshPhysicalMaterial
            map={textures.exterior}
            metalness={0.1}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </Plane>
      </group>

      {/* Upper Floors */}
      {Array.from({ length: floors - 1 }).map((_, i) => (
        <group key={i} position={[0, (i + 1) * 2.5, 0]}>
          <Box args={[4.5, 2.5, 3.5]} position={[0, 0.25, 0]} castShadow receiveShadow>
            <meshStandardMaterial 
              map={i === 0 ? textures.exterior : textures.exteriorAlt || textures.exterior}
            />
          </Box>
        </group>
      ))}

      {/* Modern Flat Roof with Terrace */}
      <group position={[0, floors * 2.5 + 0.25, 0]}>
        <Box args={[5.5, 0.2, 4.5]} castShadow>
          <meshStandardMaterial color="#222" roughness={0.9} />
        </Box>
        
        {/* Terrace Garden */}
        <Box args={[2, 0.1, 2]} position={[1.5, 0.15, 1]} receiveShadow>
          <meshStandardMaterial color="#228B22" roughness={1} />
        </Box>
      </group>

      {/* Luxury Features */}
      <group>
        {/* Swimming Pool */}
        <Box args={[2.5, 0.2, 4]} position={[4, -1.1, 0]} receiveShadow>
          <meshPhysicalMaterial
            color="#00CED1"
            transmission={0.8}
            roughness={0.1}
            metalness={0.1}
            thickness={2}
            envMapIntensity={1}
          />
        </Box>

        {/* Pool Deck */}
        <Box args={[3.5, 0.05, 5]} position={[4, -1.25, 0]} receiveShadow>
          <meshStandardMaterial color="#D2691E" roughness={0.8} />
        </Box>

        {/* Balconies */}
        {Array.from({ length: floors - 1 }).map((_, i) => (
          <group key={`balcony-${i}`}>
            <Box 
              args={[3, 0.1, 1.5]} 
              position={[0, (i + 1) * 2.5, 2.5]} 
              castShadow
            >
              <meshStandardMaterial color="#f5f5f5" />
            </Box>
            {/* Glass Railing */}
            <Box 
              args={[3, 1, 0.05]} 
              position={[0, (i + 1) * 2.5 + 0.5, 3.2]} 
              castShadow
            >
              <meshPhysicalMaterial
                color="#ffffff"
                transmission={0.9}
                roughness={0.1}
                thickness={0.5}
              />
            </Box>
          </group>
        ))}
      </group>
    </group>
  )
}

// Commercial Building Model
function CommercialModel({ textures, floors = 8 }: any) {
  return (
    <group>
      {/* Base Platform */}
      <Box args={[4, 0.5, 4]} position={[0, -1.25, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </Box>

      {/* Main Tower */}
      {Array.from({ length: floors }).map((_, i) => (
        <group key={i} position={[0, i * 1.2, 0]}>
          {/* Floor Structure */}
          <Box args={[3, 1.1, 3]} castShadow receiveShadow>
            <meshStandardMaterial 
              color="#2a2a2a"
              metalness={0.6}
              roughness={0.4}
            />
          </Box>

          {/* Glass Curtain Wall - All Sides */}
          {[
            { pos: [0, 0, 1.51], rot: [0, 0, 0] },
            { pos: [0, 0, -1.51], rot: [0, Math.PI, 0] },
            { pos: [1.51, 0, 0], rot: [0, -Math.PI / 2, 0] },
            { pos: [-1.51, 0, 0], rot: [0, Math.PI / 2, 0] }
          ].map((wall, idx) => (
            <Plane 
              key={idx}
              args={[2.8, 1]} 
              position={wall.pos as [number, number, number]}
              rotation={wall.rot as [number, number, number]}
              castShadow
            >
              <meshPhysicalMaterial
                map={i === 0 ? textures.exterior : null}
                color={i === 0 ? "#ffffff" : "#4682B4"}
                transmission={0.6}
                roughness={0.1}
                metalness={0.8}
                thickness={0.5}
                envMapIntensity={1}
                clearcoat={1}
                clearcoatRoughness={0}
              />
            </Plane>
          ))}
        </group>
      ))}

      {/* Rooftop */}
      <group position={[0, floors * 1.2, 0]}>
        <Box args={[3.5, 0.3, 3.5]} castShadow>
          <meshStandardMaterial color="#333" roughness={0.9} />
        </Box>
        
        {/* Rooftop Equipment */}
        <Box args={[0.8, 0.6, 0.8]} position={[1, 0.45, 1]} castShadow>
          <meshStandardMaterial color="#666" />
        </Box>
        <Box args={[0.6, 0.8, 0.6]} position={[-1, 0.55, -1]} castShadow>
          <meshStandardMaterial color="#666" />
        </Box>
      </group>

      {/* Entrance Canopy */}
      <group position={[0, 0, 2]}>
        <Box args={[3, 0.2, 1.5]} position={[0, 1.5, 0]} castShadow>
          <meshStandardMaterial 
            color="#f5f5f5"
            metalness={0.7}
            roughness={0.3}
          />
        </Box>
        
        {/* Support Pillars */}
        <Box args={[0.2, 1.5, 0.2]} position={[-1.4, 0.75, 0.65]} castShadow>
          <meshStandardMaterial color="#333" />
        </Box>
        <Box args={[0.2, 1.5, 0.2]} position={[1.4, 0.75, 0.65]} castShadow>
          <meshStandardMaterial color="#333" />
        </Box>
      </group>
    </group>
  )
}