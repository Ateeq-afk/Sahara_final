'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Smartphone, Move3d, RotateCw, ZoomIn, ZoomOut, Maximize, X, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei'
import { HouseModel3D, VillaModel3D, CommercialModel3D } from './house-model-3d'

interface ARViewerProps {
  projectType: 'house' | 'villa' | 'commercial'
  projectName: string
  onClose?: () => void
}

export default function ARViewer({ projectType, projectName, onClose }: ARViewerProps) {
  const [viewMode, setViewMode] = useState<'3d' | 'ar'>('3d')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([5, 5, 5])
  const [showGrid, setShowGrid] = useState(true)
  const [showMeasurements, setShowMeasurements] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Model selector based on project type
  const ModelComponent = {
    house: HouseModel3D,
    villa: VillaModel3D,
    commercial: CommercialModel3D
  }[projectType]

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else if (document.fullscreenElement) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Simulated AR mode (in production, would use WebXR)
  const handleARMode = () => {
    setViewMode('ar')
    // In production, initialize WebXR session here
    alert('AR Mode: Point your device camera at a flat surface to place the model')
  }

  const resetCamera = () => {
    setCameraPosition([5, 5, 5])
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      >
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl h-[90vh] bg-white/95 backdrop-blur overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold">{projectName}</h2>
                  <Badge variant="secondary">Interactive View</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleFullscreen}
                    className="rounded-full"
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                  {onClose && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={onClose}
                      className="rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="h-full pt-20 pb-24">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="h-full">
                <TabsList className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
                  <TabsTrigger value="3d" className="gap-2">
                    <Move3d className="h-4 w-4" />
                    3D View
                  </TabsTrigger>
                  <TabsTrigger value="ar" className="gap-2">
                    <Smartphone className="h-4 w-4" />
                    AR View
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="3d" className="h-full mt-0">
                  <div className="relative h-full">
                    <Canvas camera={{ position: cameraPosition, fov: 60 }}>
                      <PerspectiveCamera makeDefault position={cameraPosition} />
                      <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        enableRotate={true}
                        minDistance={3}
                        maxDistance={20}
                      />
                      
                      <ambientLight intensity={0.5} />
                      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
                      <pointLight position={[-10, -10, -5]} intensity={0.5} />
                      
                      <ModelComponent scale={1.5} />
                      
                      {showGrid && (
                        <Grid
                          args={[20, 20]}
                          cellSize={1}
                          cellThickness={0.5}
                          cellColor="#6b7280"
                          sectionSize={5}
                          sectionThickness={1}
                          sectionColor="#374151"
                          fadeDistance={30}
                          fadeStrength={1}
                          followCamera={false}
                        />
                      )}
                      
                      <Environment preset="apartment" />
                    </Canvas>

                    {/* 3D Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setShowGrid(!showGrid)}
                        className={`rounded-full ${showGrid ? 'bg-gray-100' : ''}`}
                      >
                        <Layers className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={resetCamera}
                        className="rounded-full"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], cameraPosition[2] - 1])}
                        className="rounded-full"
                      >
                        <ZoomIn className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setCameraPosition([cameraPosition[0], cameraPosition[1], cameraPosition[2] + 1])}
                        className="rounded-full"
                      >
                        <ZoomOut className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Instructions */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
                      <h3 className="font-semibold mb-2">Controls:</h3>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Left click + drag to rotate</li>
                        <li>• Right click + drag to pan</li>
                        <li>• Scroll to zoom in/out</li>
                        <li>• Double click to focus</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="h-full mt-0">
                  <div className="relative h-full flex items-center justify-center bg-gray-100">
                    {/* Simulated AR View */}
                    <div className="text-center space-y-4 p-8">
                      <Camera className="h-24 w-24 mx-auto text-gray-400" />
                      <h3 className="text-2xl font-semibold">AR Mode</h3>
                      <p className="text-gray-600 max-w-md">
                        To view this project in AR, please access this page on a mobile device with AR capabilities.
                      </p>
                      <Button onClick={handleARMode} className="gap-2">
                        <Smartphone className="h-4 w-4" />
                        Launch AR on Mobile
                      </Button>
                      
                      <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                        <p className="font-semibold mb-2">AR Instructions:</p>
                        <ol className="text-left space-y-1">
                          <li>1. Open this page on your smartphone</li>
                          <li>2. Tap "Launch AR" button</li>
                          <li>3. Point camera at a flat surface</li>
                          <li>4. Tap to place the 3D model</li>
                          <li>5. Move around to view from different angles</li>
                        </ol>
                      </div>
                    </div>

                    {/* QR Code for mobile access */}
                    <div className="absolute bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                      <img
                        src="https://placehold.co/150x150/000/fff?text=QR+Code"
                        alt="QR Code"
                        className="w-32 h-32"
                      />
                      <p className="text-xs text-center mt-2">Scan for mobile AR</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Bottom Info Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t p-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Model Type</p>
                    <p className="font-semibold capitalize">{projectType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">View Mode</p>
                    <p className="font-semibold">{viewMode === '3d' ? '3D Interactive' : 'Augmented Reality'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Scale</p>
                    <p className="font-semibold">1:100</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Share View
                  </Button>
                  <Button variant="outline" size="sm">
                    Download Model
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}