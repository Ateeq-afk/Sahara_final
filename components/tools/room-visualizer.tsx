'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Move, Palette, Download, RotateCw, Maximize2, Layers, Eye, Grid3X3, Ruler, Sofa, Bed, ChefHat, Bath } from 'lucide-react'
// import { roomVisualizerMockData } from '@/src/data/mockData'

// Room presets with styles
const ROOM_STYLES = {
  modern: {
    name: 'Modern',
    description: 'Clean lines, neutral palette',
    wallColor: '#F8F8F8',
    floorColor: '#A8967E',
    ceilingColor: '#FFFFFF',
    accentColor: '#1D1D1F'
  },
  traditional: {
    name: 'Traditional',
    description: 'Timeless elegance',
    wallColor: '#E8DCC6',
    floorColor: '#6B4423',
    ceilingColor: '#FFF8F0',
    accentColor: '#8B4513'
  },
  industrial: {
    name: 'Industrial',
    description: 'Raw and sophisticated',
    wallColor: '#A9A9A9',
    floorColor: '#505050',
    ceilingColor: '#D3D3D3',
    accentColor: '#FF6500'
  },
  scandinavian: {
    name: 'Scandinavian',
    description: 'Light and airy',
    wallColor: '#FAFAFA',
    floorColor: '#D2B48C',
    ceilingColor: '#FFFFFF',
    accentColor: '#6B8E23'
  }
}

const ROOM_TYPES = {
  livingRoom: { name: 'Living Room', icon: Sofa, defaultSize: { width: 20, length: 25, height: 10 } },
  bedroom: { name: 'Bedroom', icon: Bed, defaultSize: { width: 15, length: 18, height: 10 } },
  kitchen: { name: 'Kitchen', icon: ChefHat, defaultSize: { width: 12, length: 15, height: 10 } },
  bathroom: { name: 'Bathroom', icon: Bath, defaultSize: { width: 8, length: 10, height: 9 } }
}

export default function RoomVisualizer() {
  const [roomType, setRoomType] = useState('livingRoom')
  const [style, setStyle] = useState('modern')
  const [dimensions, setDimensions] = useState(ROOM_TYPES.livingRoom.defaultSize)
  const [rotation, setRotation] = useState({ x: -20, y: 45 })
  const [zoom, setZoom] = useState(1)
  const [viewMode, setViewMode] = useState('3d')

  const currentStyle = ROOM_STYLES[style as keyof typeof ROOM_STYLES]
  const currentRoom = ROOM_TYPES[roomType as keyof typeof ROOM_TYPES]

  const handleRoomTypeChange = (newType: string) => {
    setRoomType(newType)
    setDimensions(ROOM_TYPES[newType as keyof typeof ROOM_TYPES].defaultSize)
  }

  const resetView = () => {
    setRotation({ x: -20, y: 45 })
    setZoom(1)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-12 md:px-12 md:py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-4"
        >
          3D Room Visualizer
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 font-light"
        >
          Visualize your space in three dimensions
        </motion.p>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* 3D Visualization Area */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-gray-50 rounded-2xl overflow-hidden" 
                style={{ height: '600px' }}
              >
                {/* View Controls */}
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button
                    onClick={() => setViewMode('3d')}
                    className={`px-4 py-2 rounded-lg backdrop-blur-md transition-all ${
                      viewMode === '3d' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-white/80 hover:bg-white'
                    }`}
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    3D View
                  </button>
                  <button
                    onClick={() => setViewMode('floor')}
                    className={`px-4 py-2 rounded-lg backdrop-blur-md transition-all ${
                      viewMode === 'floor' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-white/80 hover:bg-white'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4 inline mr-2" />
                    Floor Plan
                  </button>
                  <button
                    onClick={resetView}
                    className="px-4 py-2 bg-white/80 hover:bg-white rounded-lg backdrop-blur-md transition-all"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                {/* 3D Room Visualization */}
                <div className="w-full h-full flex items-center justify-center perspective-1000">
                  <motion.div
                    className="relative"
                    animate={{
                      rotateX: rotation.x,
                      rotateY: rotation.y,
                      scale: zoom
                    }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    style={{
                      width: `${dimensions.width * 16}px`,
                      height: `${dimensions.height * 16}px`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* Floor */}
                    <div
                      className="absolute border border-gray-200"
                      style={{
                        backgroundColor: currentStyle.floorColor,
                        transform: `rotateX(90deg) translateZ(-${dimensions.height * 8}px)`,
                        width: `${dimensions.width * 16}px`,
                        height: `${dimensions.length * 16}px`,
                        boxShadow: 'inset 0 0 50px rgba(0,0,0,0.1)'
                      }}
                    >
                      <div className="absolute inset-0 opacity-20" 
                        style={{
                          backgroundImage: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 40px)',
                          backgroundSize: '40px 40px'
                        }}
                      />
                    </div>
                    
                    {/* Back Wall */}
                    <div
                      className="absolute border border-gray-200"
                      style={{
                        backgroundColor: currentStyle.wallColor,
                        transform: `translateZ(-${dimensions.length * 8}px)`,
                        width: `${dimensions.width * 16}px`,
                        height: `${dimensions.height * 16}px`,
                        boxShadow: 'inset 0 -20px 40px -20px rgba(0,0,0,0.1)'
                      }}
                    />
                    
                    {/* Left Wall */}
                    <div
                      className="absolute border border-gray-200"
                      style={{
                        backgroundColor: currentStyle.wallColor,
                        transform: `rotateY(-90deg) translateZ(-${dimensions.width * 8}px)`,
                        width: `${dimensions.length * 16}px`,
                        height: `${dimensions.height * 16}px`,
                        boxShadow: 'inset -20px 0 40px -20px rgba(0,0,0,0.1)'
                      }}
                    />
                    
                    {/* Right Wall */}
                    <div
                      className="absolute border border-gray-200"
                      style={{
                        backgroundColor: currentStyle.wallColor,
                        transform: `rotateY(90deg) translateZ(${dimensions.width * 8}px)`,
                        width: `${dimensions.length * 16}px`,
                        height: `${dimensions.height * 16}px`,
                        left: `${dimensions.width * 16}px`,
                        boxShadow: 'inset 20px 0 40px -20px rgba(0,0,0,0.1)'
                      }}
                    />
                    
                    {/* Ceiling */}
                    <div
                      className="absolute border border-gray-200 opacity-95"
                      style={{
                        backgroundColor: currentStyle.ceilingColor,
                        transform: `rotateX(-90deg) translateZ(${dimensions.height * 8}px)`,
                        width: `${dimensions.width * 16}px`,
                        height: `${dimensions.length * 16}px`
                      }}
                    />

                    {/* Accent Feature */}
                    <div
                      className="absolute"
                      style={{
                        backgroundColor: currentStyle.accentColor,
                        transform: `translateZ(-${dimensions.length * 8 - 1}px)`,
                        width: `${dimensions.width * 16}px`,
                        height: '4px',
                        top: '30%'
                      }}
                    />
                  </motion.div>
                </div>

                {/* Navigation Guide */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3">
                  <div className="flex items-center gap-6 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <Move className="w-4 h-4" />
                      <span>Drag to rotate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Scroll to zoom</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Zoom Control */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium text-gray-600">Zoom Level</label>
                  <span className="text-sm text-gray-900">{Math.round(zoom * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    background: #111827;
                    border-radius: 50%;
                    cursor: pointer;
                  }
                  
                  .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    background: #111827;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                  }
                `}</style>
              </motion.div>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Room Type Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-medium mb-4">Room Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(ROOM_TYPES).map(([key, room]) => (
                    <button
                      key={key}
                      onClick={() => handleRoomTypeChange(key)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        roomType === key 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <room.icon className="w-5 h-5 mx-auto mb-2" />
                      <div className="text-sm font-medium">{room.name}</div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Style Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-medium mb-4">Design Style</h3>
                <div className="space-y-3">
                  {Object.entries(ROOM_STYLES).map(([key, styleOption]) => (
                    <button
                      key={key}
                      onClick={() => setStyle(key)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        style === key 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{styleOption.name}</div>
                          <div className={`text-sm mt-0.5 ${style === key ? 'text-gray-300' : 'text-gray-500'}`}>
                            {styleOption.description}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <div 
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: styleOption.wallColor }}
                          />
                          <div 
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: styleOption.floorColor }}
                          />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Dimensions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-medium mb-4">Dimensions</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Width', key: 'width', min: 8, max: 30, unit: 'ft' },
                    { label: 'Length', key: 'length', min: 8, max: 40, unit: 'ft' },
                    { label: 'Height', key: 'height', min: 8, max: 15, unit: 'ft', step: 0.5 }
                  ].map((dim) => (
                    <div key={dim.key}>
                      <div className="flex justify-between items-baseline mb-2">
                        <label className="text-sm font-medium text-gray-600">{dim.label}</label>
                        <span className="text-lg font-light">
                          {dimensions[dim.key as keyof typeof dimensions]} {dim.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={dim.min}
                        max={dim.max}
                        step={dim.step || 1}
                        value={dimensions[dim.key as keyof typeof dimensions]}
                        onChange={(e) => setDimensions({ 
                          ...dimensions, 
                          [dim.key]: parseFloat(e.target.value) 
                        })}
                        className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Space Analysis */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-900 text-white rounded-2xl p-6"
              >
                <h4 className="font-medium mb-4 flex items-center">
                  <Ruler className="w-4 h-4 mr-2" />
                  Space Analysis
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Floor Area</span>
                    <span className="font-light">{(dimensions.width * dimensions.length).toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Wall Area</span>
                    <span className="font-light">
                      {(2 * dimensions.height * (dimensions.width + dimensions.length)).toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Volume</span>
                    <span className="font-light">
                      {(dimensions.width * dimensions.length * dimensions.height).toLocaleString()} cu ft
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium">
                  <Palette className="w-4 h-4 inline mr-2" />
                  Customize Materials
                </button>
                <button className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-medium">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Design
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}