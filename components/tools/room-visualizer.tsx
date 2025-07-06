'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Move, Palette, Download, RotateCw, Maximize2, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

// Room presets with styles
const ROOM_STYLES = {
  modern: {
    name: 'Modern Minimal',
    wallColor: '#F5F5F5',
    floorColor: '#8B7355',
    ceilingColor: '#FFFFFF',
    accentColor: '#2563EB'
  },
  traditional: {
    name: 'Classic Elegant',
    wallColor: '#E8DCC6',
    floorColor: '#654321',
    ceilingColor: '#FFF8DC',
    accentColor: '#DC2626'
  },
  industrial: {
    name: 'Urban Industrial',
    wallColor: '#9B9B9B',
    floorColor: '#4A4A4A',
    ceilingColor: '#D3D3D3',
    accentColor: '#F59E0B'
  },
  scandinavian: {
    name: 'Nordic Light',
    wallColor: '#FAFAFA',
    floorColor: '#DEB887',
    ceilingColor: '#FFFFFF',
    accentColor: '#10B981'
  }
}

const ROOM_TYPES = {
  livingRoom: { name: 'Living Room', defaultSize: { width: 20, length: 25, height: 10 } },
  bedroom: { name: 'Master Bedroom', defaultSize: { width: 15, length: 18, height: 10 } },
  kitchen: { name: 'Modern Kitchen', defaultSize: { width: 12, length: 15, height: 10 } },
  bathroom: { name: 'Luxury Bathroom', defaultSize: { width: 8, length: 10, height: 9 } }
}

export default function RoomVisualizer() {
  const [roomType, setRoomType] = useState('livingRoom')
  const [style, setStyle] = useState('modern')
  const [dimensions, setDimensions] = useState(ROOM_TYPES.livingRoom.defaultSize)
  const [rotation, setRotation] = useState({ x: -20, y: 45 })
  const [zoom, setZoom] = useState([1])

  const currentStyle = ROOM_STYLES[style as keyof typeof ROOM_STYLES]
  const currentRoom = ROOM_TYPES[roomType as keyof typeof ROOM_TYPES]

  const handleRoomTypeChange = (newType: string) => {
    setRoomType(newType)
    setDimensions(ROOM_TYPES[newType as keyof typeof ROOM_TYPES].defaultSize)
  }

  const resetView = () => {
    setRotation({ x: -20, y: 45 })
    setZoom([1])
  }

  return (
    <div className="p-12 bg-white">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-light text-gray-900 mb-4">
          3D Room Visualizer
        </h2>
        <p className="text-xl text-gray-600">Experience your space before it's built</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <div className="lg:col-span-2">
          {/* 3D Visualization Area */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200" style={{ height: '700px' }}>
            <div className="absolute top-6 right-6 flex gap-3 z-10">
              <Button
                size="sm"
                variant="outline"
                onClick={resetView}
                className="bg-white/80 backdrop-blur"
              >
                <RotateCw className="w-4 h-4 mr-1" />
                Reset
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-white/80 backdrop-blur"
              >
                <Maximize2 className="w-4 h-4 mr-1" />
                Fullscreen
              </Button>
            </div>

            {/* 3D Room Visualization */}
            <motion.div
              className="w-full h-full flex items-center justify-center perspective-1000"
              animate={{
                rotateX: rotation.x,
                rotateY: rotation.y,
                scale: zoom[0]
              }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              <div 
                className="relative transform-gpu"
                style={{
                  width: `${dimensions.width * 20}px`,
                  height: `${dimensions.height * 20}px`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Floor */}
                <div
                  className="absolute inset-0 border border-gray-300"
                  style={{
                    backgroundColor: currentStyle.floorColor,
                    transform: `rotateX(90deg) translateZ(-${dimensions.height * 10}px)`,
                    width: `${dimensions.width * 20}px`,
                    height: `${dimensions.length * 20}px`,
                    boxShadow: 'inset 0 0 50px rgba(0,0,0,0.1)'
                  }}
                />
                
                {/* Back Wall */}
                <div
                  className="absolute inset-0 border border-gray-300"
                  style={{
                    backgroundColor: currentStyle.wallColor,
                    transform: `translateZ(-${dimensions.length * 10}px)`,
                    width: `${dimensions.width * 20}px`,
                    height: `${dimensions.height * 20}px`,
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)'
                  }}
                />
                
                {/* Left Wall */}
                <div
                  className="absolute inset-0 border border-gray-300"
                  style={{
                    backgroundColor: currentStyle.wallColor,
                    transform: `rotateY(-90deg) translateZ(-${dimensions.width * 10}px)`,
                    width: `${dimensions.length * 20}px`,
                    height: `${dimensions.height * 20}px`,
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)'
                  }}
                />
                
                {/* Right Wall */}
                <div
                  className="absolute inset-0 border border-gray-300"
                  style={{
                    backgroundColor: currentStyle.wallColor,
                    transform: `rotateY(90deg) translateZ(${dimensions.width * 10}px)`,
                    width: `${dimensions.length * 20}px`,
                    height: `${dimensions.height * 20}px`,
                    left: `${dimensions.width * 20}px`,
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)'
                  }}
                />
                
                {/* Ceiling */}
                <div
                  className="absolute inset-0 border border-gray-300 opacity-95"
                  style={{
                    backgroundColor: currentStyle.ceilingColor,
                    transform: `rotateX(-90deg) translateZ(${dimensions.height * 10}px)`,
                    width: `${dimensions.width * 20}px`,
                    height: `${dimensions.length * 20}px`,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.02)'
                  }}
                />

                {/* Accent Feature Wall */}
                <div
                  className="absolute"
                  style={{
                    backgroundColor: currentStyle.accentColor,
                    transform: `translateZ(-${dimensions.length * 10 - 1}px)`,
                    width: `${dimensions.width * 20}px`,
                    height: `${dimensions.height * 6}px`,
                    opacity: 0.8,
                    bottom: 0
                  }}
                />
              </div>
            </motion.div>

            {/* Controls Overlay */}
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-sm">
              <Label className="text-sm font-medium mb-3 block text-gray-700">Navigation</Label>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <Move className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Drag to rotate view</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Scroll to zoom</span>
                </div>
              </div>
            </div>
          </div>

          {/* Zoom Control */}
          <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Label className="text-sm font-medium mb-3 block text-gray-700">Zoom Level</Label>
            <Slider
              value={zoom}
              onValueChange={setZoom}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Room Type Selection */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Label className="text-lg font-light mb-4 block text-gray-900">Space Type</Label>
            <Tabs value={roomType} onValueChange={handleRoomTypeChange}>
              <TabsList className="grid grid-cols-2 gap-2 bg-gray-100">
                {Object.entries(ROOM_TYPES).map(([key, room]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="text-xs data-[state=active]:bg-white"
                  >
                    {room.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Style Selection */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Label className="text-lg font-light mb-4 block text-gray-900">Design Style</Label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(ROOM_STYLES).map(([key, styleOption]) => (
                <button
                  key={key}
                  onClick={() => setStyle(key)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    style === key 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-300 hover:border-gray-400 bg-white'
                  }`}
                >
                  <div className="flex gap-2 mb-2">
                    <div 
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: styleOption.wallColor }}
                    />
                    <div 
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: styleOption.floorColor }}
                    />
                  </div>
                  <p className="text-sm font-light text-left text-gray-900">{styleOption.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dimensions */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <Label className="text-lg font-light mb-4 block text-gray-900">Dimensions</Label>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-gray-600">Width</Label>
                  <span className="text-sm font-light text-gray-900">{dimensions.width} ft</span>
                </div>
                <Slider
                  value={[dimensions.width]}
                  onValueChange={(value) => setDimensions({ ...dimensions, width: value[0] })}
                  min={8}
                  max={30}
                  step={1}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-gray-600">Length</Label>
                  <span className="text-sm font-light text-gray-900">{dimensions.length} ft</span>
                </div>
                <Slider
                  value={[dimensions.length]}
                  onValueChange={(value) => setDimensions({ ...dimensions, length: value[0] })}
                  min={8}
                  max={40}
                  step={1}
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <Label className="text-sm text-gray-600">Height</Label>
                  <span className="text-sm font-light text-gray-900">{dimensions.height} ft</span>
                </div>
                <Slider
                  value={[dimensions.height]}
                  onValueChange={(value) => setDimensions({ ...dimensions, height: value[0] })}
                  min={8}
                  max={15}
                  step={0.5}
                />
              </div>
            </div>
          </div>

          {/* Room Info */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
            <h4 className="font-medium mb-4 text-gray-900">Space Analysis</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Floor Area</span>
                <span className="font-light text-gray-900">{dimensions.width * dimensions.length} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Wall Area</span>
                <span className="font-light text-gray-900">
                  {2 * dimensions.height * (dimensions.width + dimensions.length)} sq ft
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume</span>
                <span className="font-light text-gray-900">
                  {(dimensions.width * dimensions.length * dimensions.height).toLocaleString()} cu ft
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
              <Palette className="w-4 h-4 mr-2" />
              Customize Materials
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Export Design
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}