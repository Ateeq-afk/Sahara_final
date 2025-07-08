'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Filter, Search, Check, Info, ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'

// Material interface
interface Material {
  id: string
  name: string
  brand: string
  price: { min: number; max: number }
  unit: string
  image: string
  features: string[]
  popular?: boolean
  premium?: boolean
  description?: string
  rating?: number
  reviews?: number
}

// Comprehensive material catalog
const MATERIALS: Record<string, Material[]> = {
  flooring: [
    {
      id: 'vitrified-tiles',
      name: 'Vitrified Tiles',
      brand: 'Kajaria',
      price: { min: 45, max: 250 },
      unit: 'sq ft',
      image: '/images/materials/vitrified-tiles-premium.svg',
      features: ['Stain Resistant', 'Low Maintenance', 'Durable'],
      description: 'Premium quality vitrified tiles with superior finish',
      popular: true,
      rating: 4.8,
      reviews: 245
    },
    {
      id: 'marble',
      name: 'Italian Marble',
      brand: 'Imported',
      price: { min: 200, max: 800 },
      unit: 'sq ft',
      image: '/images/materials/marble-carrara.svg',
      features: ['Premium Look', 'Natural Stone', 'Unique Patterns'],
      description: 'Authentic Italian marble for luxury spaces',
      premium: true,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 'wooden-flooring',
      name: 'Engineered Wood',
      brand: 'Pergo',
      price: { min: 150, max: 400 },
      unit: 'sq ft',
      image: '/images/materials/wooden-oak.svg',
      features: ['Warm Feel', 'Sound Insulation', 'Elegant'],
      description: 'Multi-layer engineered wood with natural finish',
      rating: 4.7,
      reviews: 156
    },
    {
      id: 'granite',
      name: 'Granite',
      brand: 'Local',
      price: { min: 60, max: 200 },
      unit: 'sq ft',
      image: '/images/materials/granite-galaxy.svg',
      features: ['Durable', 'Heat Resistant', 'Natural'],
      description: 'Locally sourced premium granite',
      rating: 4.6,
      reviews: 312
    }
  ],
  wall: [
    {
      id: 'paint-premium',
      name: 'Premium Emulsion',
      brand: 'Asian Paints Royale',
      price: { min: 45, max: 65 },
      unit: 'sq ft',
      image: '/images/materials/paint-weather.svg',
      features: ['Washable', 'Anti-bacterial', '10 Year Warranty'],
      description: 'Luxury interior emulsion with Teflon surface protector',
      popular: true,
      rating: 4.8,
      reviews: 567
    },
    {
      id: 'wallpaper',
      name: 'Designer Wallpaper',
      brand: 'Nilaya',
      price: { min: 80, max: 300 },
      unit: 'sq ft',
      image: '/images/materials/wallpaper-3d.svg',
      features: ['Designer Patterns', 'Easy Installation', 'Removable'],
      description: 'Curated designer wallpapers from Europe',
      rating: 4.5,
      reviews: 134
    },
    {
      id: 'texture-paint',
      name: 'Texture Paint',
      brand: 'Berger',
      price: { min: 70, max: 150 },
      unit: 'sq ft',
      image: '/images/materials/texture-paint.svg',
      features: ['3D Effect', 'Hide Imperfections', 'Unique Look'],
      description: 'Create stunning textured walls',
      rating: 4.4,
      reviews: 198
    },
    {
      id: 'stone-cladding',
      name: 'Stone Cladding',
      brand: 'Natural Stone',
      price: { min: 150, max: 400 },
      unit: 'sq ft',
      image: '/images/materials/stone-cladding.svg',
      features: ['Natural Look', 'Durable', 'Weather Resistant'],
      description: 'Natural stone veneer for accent walls',
      premium: true,
      rating: 4.7,
      reviews: 87
    }
  ],
  bathroom: [
    {
      id: 'sanitaryware-premium',
      name: 'Premium Sanitaryware',
      brand: 'Kohler',
      price: { min: 25000, max: 75000 },
      unit: 'set',
      image: '/images/materials/sanitaryware.svg',
      features: ['Water Efficient', 'Modern Design', '10 Year Warranty'],
      description: 'Complete bathroom suite with WC, basin, and accessories',
      premium: true,
      rating: 4.9,
      reviews: 156
    },
    {
      id: 'cp-fittings',
      name: 'CP Fittings',
      brand: 'Jaquar',
      price: { min: 5000, max: 25000 },
      unit: 'set',
      image: '/images/materials/fittings.svg',
      features: ['Rust Proof', 'Chrome Finish', 'Lifetime Warranty'],
      description: 'Premium chrome-plated brass fittings',
      popular: true,
      rating: 4.8,
      reviews: 423
    },
    {
      id: 'shower-enclosure',
      name: 'Shower Enclosure',
      brand: 'Saint-Gobain',
      price: { min: 35000, max: 80000 },
      unit: 'unit',
      image: '/images/materials/shower.svg',
      features: ['Tempered Glass', 'Frameless Design', 'Easy Clean'],
      description: '8mm tempered glass with nano coating',
      rating: 4.7,
      reviews: 98
    },
    {
      id: 'bathroom-tiles',
      name: 'Anti-skid Tiles',
      brand: 'Johnson',
      price: { min: 45, max: 120 },
      unit: 'sq ft',
      image: '/images/materials/bathroom-tiles.svg',
      features: ['Anti-skid', 'Water Resistant', 'Easy Maintenance'],
      description: 'Specially designed tiles for wet areas',
      rating: 4.5,
      reviews: 267
    }
  ],
  kitchen: [
    {
      id: 'modular-kitchen',
      name: 'Modular Kitchen',
      brand: 'Godrej',
      price: { min: 125000, max: 500000 },
      unit: 'complete',
      image: '/images/materials/modular-kitchen.svg',
      features: ['Soft Close', 'Lifetime Warranty', 'Custom Design'],
      description: 'Complete modular kitchen with appliances',
      popular: true,
      rating: 4.8,
      reviews: 189
    },
    {
      id: 'kitchen-countertop',
      name: 'Quartz Countertop',
      brand: 'Caesarstone',
      price: { min: 150, max: 400 },
      unit: 'sq ft',
      image: '/images/materials/countertop.svg',
      features: ['Heat Resistant', 'Scratch Proof', 'Non-porous'],
      description: 'Engineered quartz with lifetime warranty',
      rating: 4.9,
      reviews: 234
    },
    {
      id: 'chimney',
      name: 'Kitchen Chimney',
      brand: 'Faber',
      price: { min: 15000, max: 50000 },
      unit: 'unit',
      image: '/images/materials/chimney.svg',
      features: ['Auto Clean', 'Touch Control', 'Silent Operation'],
      description: '90cm filterless technology chimney',
      rating: 4.6,
      reviews: 167
    },
    {
      id: 'kitchen-sink',
      name: 'Stainless Steel Sink',
      brand: 'Franke',
      price: { min: 8000, max: 30000 },
      unit: 'unit',
      image: '/images/materials/sink.svg',
      features: ['Scratch Resistant', 'Sound Dampening', 'Deep Bowl'],
      description: 'Premium 304-grade stainless steel',
      rating: 4.7,
      reviews: 298
    }
  ]
}

export default function MaterialSelector() {
  const [category, setCategory] = useState('flooring')
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')

  const filteredMaterials = (MATERIALS[category as keyof typeof MATERIALS] || []).filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.brand.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'budget' && material.price.min < 100) ||
                        (priceFilter === 'mid' && material.price.min >= 100 && material.price.min < 300) ||
                        (priceFilter === 'premium' && material.price.min >= 300)
    
    return matchesSearch && matchesPrice
  })

  const toggleMaterial = (material: Material) => {
    const exists = selectedMaterials.find(m => m.id === material.id)
    if (exists) {
      setSelectedMaterials(selectedMaterials.filter(m => m.id !== material.id))
    } else {
      setSelectedMaterials([...selectedMaterials, material])
    }
  }

  const getTotalEstimate = () => {
    return selectedMaterials.reduce((total, material) => {
      return total + ((material.price.min + material.price.max) / 2)
    }, 0)
  }

  const categories = [
    { id: 'flooring', label: 'Flooring' },
    { id: 'wall', label: 'Wall Finish' },
    { id: 'bathroom', label: 'Bathroom' },
    { id: 'kitchen', label: 'Kitchen' }
  ]

  const priceFilters = [
    { id: 'all', label: 'All Prices' },
    { id: 'budget', label: 'Budget' },
    { id: 'mid', label: 'Mid-range' },
    { id: 'premium', label: 'Premium' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-12 md:px-12 md:py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-4"
        >
          Material Library
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 font-light"
        >
          Curated selection of premium construction materials
        </motion.p>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search materials or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                {priceFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setPriceFilter(filter.id)}
                    className={`px-4 py-3 rounded-xl border-2 transition-all ${
                      priceFilter === filter.id 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    category === cat.id 
                      ? 'bg-white shadow-sm' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Materials Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMaterials.map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all">
                      {/* Image */}
                      <div className="relative h-48 bg-gray-100">
                        {material.image && (
                          <Image
                            src={material.image}
                            alt={material.name}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent" />
                        {(material.popular || material.premium) && (
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              material.premium 
                                ? 'bg-gray-900 text-white' 
                                : 'bg-white text-gray-900 shadow-sm'
                            }`}>
                              {material.premium ? 'Premium' : 'Popular'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-3">
                          <h3 className="text-lg font-medium text-gray-900">{material.name}</h3>
                          <p className="text-sm text-gray-500">{material.brand}</p>
                        </div>

                        {material.description && (
                          <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                        )}
                        
                        {material.rating && (
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(material.rating!) ? 'text-yellow-400' : 'text-gray-200'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {material.rating} ({material.reviews} reviews)
                            </span>
                          </div>
                        )}
                        
                        <div className="flex items-baseline justify-between mb-4">
                          <div>
                            <span className="text-2xl font-light text-gray-900">
                              ₹{material.price.min.toLocaleString('en-IN')}
                            </span>
                            {material.price.max > material.price.min && (
                              <span className="text-sm text-gray-500">
                                {' - '}₹{material.price.max.toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="text-sm text-gray-500 ml-1">/{material.unit}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {material.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                              {feature}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => toggleMaterial(material)}
                          className={`w-full py-3 px-4 rounded-xl font-medium transition-all ${
                            selectedMaterials.find(m => m.id === material.id)
                              ? 'bg-gray-900 text-white hover:bg-gray-800' 
                              : 'border-2 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {selectedMaterials.find(m => m.id === material.id) ? (
                            <>
                              <Check className="w-4 h-4 inline mr-2" />
                              Selected
                            </>
                          ) : (
                            'Select Material'
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredMaterials.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500">No materials found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Selection Summary */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-8"
              >
                <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                  <h3 className="font-medium text-lg mb-4 flex items-center justify-between">
                    <span>Selected Materials</span>
                    <span className="text-sm font-normal text-gray-500">
                      {selectedMaterials.length} items
                    </span>
                  </h3>
                  
                  {selectedMaterials.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-8">
                      No materials selected yet
                    </p>
                  ) : (
                    <>
                      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
                        {selectedMaterials.map(material => (
                          <div key={material.id} className="flex items-start justify-between bg-white rounded-lg p-3">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{material.name}</p>
                              <p className="text-xs text-gray-500">{material.brand}</p>
                              <p className="text-xs text-gray-600 mt-1">
                                ₹{((material.price.min + material.price.max) / 2).toLocaleString('en-IN')} avg
                              </p>
                            </div>
                            <button
                              onClick={() => toggleMaterial(material)}
                              className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-sm text-gray-600">Estimated Total</span>
                          <span className="text-2xl font-light text-gray-900">
                            ₹{getTotalEstimate().toLocaleString('en-IN')}
                          </span>
                        </div>
                        
                        <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium mb-2">
                          Get Detailed Quote
                        </button>
                        <button className="w-full py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-medium">
                          Save Selection
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-blue-50 rounded-2xl p-4">
                  <div className="flex items-start">
                    <Info className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Pro Tip</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Mix premium materials in focal areas with budget options elsewhere to optimize costs without compromising on aesthetics.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}