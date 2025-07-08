'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Grid, Center } from '@react-three/drei'
import { Advanced3DModel } from '@/components/showcase/advanced-3d-model'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const projects3D = [
  {
    title: 'Luxury Villa Paradise',
    type: 'villa' as const,
    floors: 2,
    area: '3,500 sq.ft',
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1024&h=1024&fit=crop'
      ],
      interior: [
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1024&h=1024&fit=crop'
      ]
    }
  },
  {
    title: 'Sky Heights Tower',
    type: 'commercial' as const,
    floors: 8,
    area: '25,000 sq.ft',
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=1024&h=1024&fit=crop'
      ],
      interior: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1024&h=1024&fit=crop'
      ]
    }
  },
  {
    title: 'Modern Family Home',
    type: 'house' as const,
    floors: 2,
    area: '2,400 sq.ft',
    images: {
      exterior: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1024&h=1024&fit=crop'
      ],
      interior: [
        'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1024&h=1024&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1024&h=1024&fit=crop'
      ]
    }
  }
]

export default function Showcase3DPage() {
  const [activeProject, setActiveProject] = useState(0)
  const currentProject = projects3D[activeProject]

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects3D.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects3D.length) % projects3D.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div className="pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            3D Project Visualization
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our projects in stunning 3D with photo-realistic textures
          </p>
        </motion.div>
      </div>

      {/* Main 3D Viewer */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Canvas */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700 overflow-hidden">
              <div className="aspect-square relative">
                <Canvas
                  camera={{ position: [8, 6, 8], fov: 45 }}
                  shadows
                  className="bg-gradient-to-br from-gray-800 to-gray-900"
                >
                  <Suspense fallback={null}>
                    <Environment preset="city" />
                    <ambientLight intensity={0.3} />
                    <directionalLight
                      position={[10, 10, 5]}
                      intensity={1}
                      castShadow
                      shadow-mapSize={[2048, 2048]}
                    />
                    
                    <Center>
                      <Advanced3DModel
                        key={activeProject}
                        projectData={currentProject}
                      />
                    </Center>
                    
                    <Grid
                      args={[20, 20]}
                      cellSize={1}
                      cellThickness={0.5}
                      cellColor="#374151"
                      sectionSize={5}
                      sectionThickness={1}
                      sectionColor="#4B5563"
                      fadeDistance={30}
                      fadeStrength={1}
                      position={[0, -1.5, 0]}
                    />
                    
                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={5}
                      maxDistance={20}
                      maxPolarAngle={Math.PI / 2.2}
                    />
                  </Suspense>
                </Canvas>

                {/* Navigation */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={prevProject}
                    className="bg-white/10 backdrop-blur text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex items-center gap-1 px-3">
                    {projects3D.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveProject(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === activeProject
                            ? 'bg-white w-8'
                            : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={nextProject}
                    className="bg-white/10 backdrop-blur text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            <Card className="bg-gray-900 border-gray-700 p-6">
              <div className="flex items-center gap-3 mb-4">
                {currentProject.type === 'commercial' ? (
                  <Building2 className="h-8 w-8 text-blue-400" />
                ) : (
                  <Home className="h-8 w-8 text-green-400" />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {currentProject.title}
                  </h2>
                  <p className="text-gray-400 capitalize">{currentProject.type}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Total Area</span>
                  <span className="text-white font-semibold">{currentProject.area}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Floors</span>
                  <span className="text-white font-semibold">{currentProject.floors}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">3D Model</span>
                  <span className="text-white font-semibold">Photo-Realistic</span>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Controls</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Left click + drag to rotate</li>
                <li>• Right click + drag to pan</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Double click to reset view</li>
              </ul>
            </Card>

            <Card className="bg-gray-900 border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Real project images as textures</li>
                <li>✓ Accurate proportions and scale</li>
                <li>✓ Interactive 3D navigation</li>
                <li>✓ Soft shadows and lighting</li>
                <li>✓ High-quality materials</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="container mx-auto px-4 mt-12 pb-12">
        <Card className="bg-gray-900 border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            How We Transform Images to 3D
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Image Analysis</h3>
              <p className="text-gray-400 text-sm">
                We use your project photos to create realistic textures and materials
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3D Modeling</h3>
              <p className="text-gray-400 text-sm">
                Accurate 3D models are built based on project specifications
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Texture Mapping</h3>
              <p className="text-gray-400 text-sm">
                Photos are mapped onto 3D surfaces for photo-realistic results
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}