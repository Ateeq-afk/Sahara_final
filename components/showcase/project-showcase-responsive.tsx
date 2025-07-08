'use client'

import React, { useState, useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PresentationControls, Environment, ContactShadows, Html, useProgress, Stage } from '@react-three/drei'
import { PhotoRealistic3D } from './photo-realistic-3d'
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, RotateCw, Layers, Eye, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import dynamic from 'next/dynamic'

const ARViewer = dynamic(() => import('./ar-viewer'), { ssr: false })

interface ProjectShowcaseProps {
  projects: Array<{
    id: string
    title: string
    subtitle: string
    category: string
    price: string
    area: string
    bedrooms: number
    bathrooms: number
    floors: number
    highlights: string[]
    modelUrl?: string
    images: {
      exterior: string[]
      interior: string[]
      floorPlan: string[]
    }
    features: Array<{
      icon: React.ReactNode
      label: string
      value: string
    }>
    description: string
  }>
}

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center">
        <div className="w-32 h-32 relative">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div 
            className="absolute inset-0 border-4 border-sahara-primary rounded-full border-t-transparent animate-spin"
            style={{ transform: `rotate(${progress * 3.6}deg)` }}
          ></div>
        </div>
        <p className="mt-4 text-sm text-gray-600">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  )
}

function Model3D({ project }: { project: any }) {
  const modelType = project.category === 'Commercial' ? 'commercial' : 
                    project.bedrooms > 3 ? 'villa' : 'house'
  
  return (
    <PhotoRealistic3D
      images={project.images}
      type={modelType}
      title={project.title}
    />
  )
}

export default function ProjectShowcaseResponsive({ projects }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState(0)
  const [activeView, setActiveView] = useState<'3d' | 'gallery'>('3d')
  const [activeImageCategory, setActiveImageCategory] = useState<'exterior' | 'interior' | 'floorPlan'>('exterior')
  const [fullscreen, setFullscreen] = useState(false)
  const [showAR, setShowAR] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentProject = projects[activeProject]

  const handleFullscreen = () => {
    if (!fullscreen && containerRef.current) {
      containerRef.current.requestFullscreen()
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
    }
    setFullscreen(!fullscreen)
  }

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <>
      <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="container mx-auto px-4 py-4 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6 lg:mb-12"
          >
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2 lg:mb-4">
              Project Showcase
            </h1>
            <p className="text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Explore our premium construction projects in stunning detail
            </p>
          </motion.div>

          {/* Project Selector */}
          <div className="flex items-center justify-center gap-2 lg:gap-4 mb-6 lg:mb-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevProject}
              className="rounded-full h-8 w-8 lg:h-10 lg:w-10"
            >
              <ChevronLeft className="h-4 w-4 lg:h-6 lg:w-6" />
            </Button>
            
            <div className="flex gap-1 lg:gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`transition-all duration-300 ${
                    index === activeProject
                      ? 'bg-sahara-primary w-6 lg:w-8 h-2 lg:h-3'
                      : 'bg-gray-300 hover:bg-gray-400 w-2 lg:w-3 h-2 lg:h-3'
                  } rounded-full`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextProject}
              className="rounded-full h-8 w-8 lg:h-10 lg:w-10"
            >
              <ChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Left: Visual Display */}
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="overflow-hidden bg-gray-100 rounded-xl lg:rounded-3xl shadow-2xl">
                {/* View Toggle */}
                <div className="absolute top-2 lg:top-4 left-2 lg:left-4 z-10 flex gap-1 lg:gap-2">
                  <Button
                    size="sm"
                    variant={activeView === '3d' ? 'default' : 'secondary'}
                    onClick={() => setActiveView('3d')}
                    className="rounded-full text-xs lg:text-sm h-8 lg:h-10"
                  >
                    <Layers className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                    3D View
                  </Button>
                  <Button
                    size="sm"
                    variant={activeView === 'gallery' ? 'default' : 'secondary'}
                    onClick={() => setActiveView('gallery')}
                    className="rounded-full text-xs lg:text-sm h-8 lg:h-10"
                  >
                    <Eye className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                    Gallery
                  </Button>
                </div>

                {/* Fullscreen Button */}
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleFullscreen}
                  className="absolute top-2 lg:top-4 right-2 lg:right-4 z-10 rounded-full h-8 w-8 lg:h-10 lg:w-10"
                >
                  <Maximize2 className="h-3 w-3 lg:h-4 lg:w-4" />
                </Button>

                <AnimatePresence mode="wait">
                  {activeView === '3d' ? (
                    <motion.div
                      key="3d"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-square"
                    >
                      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <Suspense fallback={<Loader />}>
                          <Stage
                            environment="city"
                            intensity={0.6}
                          >
                            <PresentationControls
                              global
                              config={{ mass: 2, tension: 500 }}
                              snap={{ mass: 4, tension: 1500 }}
                              rotation={[0, 0.3, 0]}
                              polar={[-Math.PI / 3, Math.PI / 3]}
                              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                            >
                              <Model3D project={currentProject} />
                            </PresentationControls>
                          </Stage>
                          <ContactShadows
                            rotation-x={Math.PI / 2}
                            position={[0, -1.4, 0]}
                            opacity={0.5}
                            width={10}
                            height={10}
                            blur={2.5}
                            far={4}
                          />
                          <Environment preset="city" />
                        </Suspense>
                        <OrbitControls
                          enablePan={false}
                          enableZoom={true}
                          minDistance={3}
                          maxDistance={10}
                        />
                      </Canvas>

                      {/* 3D Controls */}
                      <div className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 lg:gap-2 bg-white/80 backdrop-blur rounded-full p-1 lg:p-2 shadow-lg">
                        <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur h-8 w-8 lg:h-10 lg:w-10">
                          <ZoomIn className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur h-8 w-8 lg:h-10 lg:w-10">
                          <ZoomOut className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full bg-white/80 backdrop-blur h-8 w-8 lg:h-10 lg:w-10">
                          <RotateCw className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-white/80 backdrop-blur h-8 w-8 lg:h-10 lg:w-10"
                          onClick={() => setShowAR(true)}
                        >
                          <Smartphone className="h-3 w-3 lg:h-4 lg:w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="aspect-square p-4 lg:p-8"
                    >
                      <Tabs value={activeImageCategory} onValueChange={(v) => setActiveImageCategory(v as any)}>
                        <TabsList className="grid w-full grid-cols-3 mb-2 lg:mb-4">
                          <TabsTrigger value="exterior" className="text-xs lg:text-sm">Exterior</TabsTrigger>
                          <TabsTrigger value="interior" className="text-xs lg:text-sm">Interior</TabsTrigger>
                          <TabsTrigger value="floorPlan" className="text-xs lg:text-sm">Floor Plan</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="exterior" className="mt-0">
                          <div className="grid grid-cols-2 gap-1 lg:gap-2">
                            {currentProject.images.exterior.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Exterior ${idx + 1}`}
                                className="w-full h-24 lg:h-40 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                              />
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="interior" className="mt-0">
                          <div className="grid grid-cols-2 gap-1 lg:gap-2">
                            {currentProject.images.interior.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Interior ${idx + 1}`}
                                className="w-full h-24 lg:h-40 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                              />
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="floorPlan" className="mt-0">
                          <div className="space-y-1 lg:space-y-2">
                            {currentProject.images.floorPlan.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Floor Plan ${idx + 1}`}
                                className="w-full object-contain rounded-lg"
                              />
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* Right: Project Details */}
            <motion.div
              key={`details-${activeProject}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 lg:space-y-6"
            >
              {/* Project Title and Category */}
              <div>
                <Badge className="mb-1 lg:mb-2 text-xs lg:text-sm">{currentProject.category}</Badge>
                <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-1 lg:mb-2">
                  {currentProject.title}
                </h2>
                <p className="text-base lg:text-xl text-gray-600">{currentProject.subtitle}</p>
              </div>

              {/* Price */}
              <div className="text-2xl lg:text-3xl font-semibold text-sahara-primary">
                {currentProject.price}
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                {currentProject.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 lg:gap-3">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-sahara-primary/10 flex items-center justify-center text-sahara-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-gray-600">{feature.label}</p>
                      <p className="text-sm lg:text-base font-semibold">{feature.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="prose prose-sm lg:prose-base prose-gray">
                <p>{currentProject.description}</p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-base lg:text-lg font-semibold mb-2 lg:mb-3">Key Highlights</h3>
                <ul className="space-y-1 lg:space-y-2">
                  {currentProject.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-sahara-primary mt-1.5 lg:mt-2" />
                      <span className="text-sm lg:text-base text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 pt-2 lg:pt-4">
                <Button size="default" className="flex-1 text-sm lg:text-base h-10 lg:h-12">
                  Schedule Visit
                </Button>
                <Button size="default" variant="outline" className="flex-1 text-sm lg:text-base h-10 lg:h-12">
                  Download Brochure
                </Button>
                <Button 
                  size="default" 
                  variant="outline" 
                  className="flex-1 gap-2 text-sm lg:text-base h-10 lg:h-12"
                  onClick={() => setShowAR(true)}
                >
                  <Smartphone className="h-3 w-3 lg:h-4 lg:w-4" />
                  View in AR
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* AR Viewer Modal */}
      {showAR && (
        <ARViewer
          projectType={currentProject.category === 'Commercial' ? 'commercial' : currentProject.bedrooms > 3 ? 'villa' : 'house'}
          projectName={currentProject.title}
          onClose={() => setShowAR(false)}
        />
      )}
    </>
  )
}