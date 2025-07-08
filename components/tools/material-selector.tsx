'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Palette, Filter, Search, Check, Info, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
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
      image: '/images/materials/vitrified-tiles.jpg',
      features: ['Stain Resistant', 'Low Maintenance', 'Durable'],
      popular: true
    },
    {
      id: 'marble',
      name: 'Italian Marble',
      brand: 'Imported',
      price: { min: 200, max: 800 },
      unit: 'sq ft',
      image: '/images/materials/marble.jpg',
      features: ['Premium Look', 'Natural Stone', 'Unique Patterns'],
      premium: true
    },
    {
      id: 'wooden-flooring',
      name: 'Wooden Flooring',
      brand: 'Pergo',
      price: { min: 150, max: 400 },
      unit: 'sq ft',
      image: '/images/materials/wooden.jpg',
      features: ['Warm Feel', 'Sound Insulation', 'Elegant']
    },
    {
      id: 'granite',
      name: 'Granite',
      brand: 'Local',
      price: { min: 60, max: 200 },
      unit: 'sq ft',
      image: '/images/materials/granite.jpg',
      features: ['Durable', 'Heat Resistant', 'Natural']
    }
  ],
  wall: [
    {
      id: 'paint-premium',
      name: 'Premium Emulsion',
      brand: 'Asian Paints Royale',
      price: { min: 45, max: 65 },
      unit: 'sq ft',
      image: '/images/materials/paint.jpg',
      features: ['Washable', 'Anti-bacterial', '10 Year Warranty'],
      popular: true
    },
    {
      id: 'wallpaper',
      name: 'Designer Wallpaper',
      brand: 'Nilaya',
      price: { min: 80, max: 300 },
      unit: 'sq ft',
      image: '/images/materials/wallpaper.jpg',
      features: ['Designer Patterns', 'Easy Installation', 'Removable']
    },
    {
      id: 'texture-paint',
      name: 'Texture Paint',
      brand: 'Berger',
      price: { min: 70, max: 150 },
      unit: 'sq ft',
      image: '/images/materials/texture.jpg',
      features: ['3D Effect', 'Hide Imperfections', 'Unique Look']
    },
    {
      id: 'stone-cladding',
      name: 'Stone Cladding',
      brand: 'Natural Stone',
      price: { min: 150, max: 400 },
      unit: 'sq ft',
      image: '/images/materials/stone-wall.jpg',
      features: ['Natural Look', 'Durable', 'Weather Resistant'],
      premium: true
    }
  ],
  bathroom: [
    {
      id: 'sanitaryware-premium',
      name: 'Premium Sanitaryware Set',
      brand: 'Kohler',
      price: { min: 25000, max: 75000 },
      unit: 'set',
      image: '/images/materials/sanitaryware.jpg',
      features: ['Water Efficient', 'Modern Design', '10 Year Warranty'],
      premium: true
    },
    {
      id: 'cp-fittings',
      name: 'CP Fittings',
      brand: 'Jaquar',
      price: { min: 5000, max: 25000 },
      unit: 'set',
      image: '/images/materials/fittings.jpg',
      features: ['Rust Proof', 'Chrome Finish', 'Lifetime Warranty'],
      popular: true
    },
    {
      id: 'shower-enclosure',
      name: 'Glass Shower Enclosure',
      brand: 'Saint-Gobain',
      price: { min: 35000, max: 80000 },
      unit: 'unit',
      image: '/images/materials/shower.jpg',
      features: ['Tempered Glass', 'Frameless Design', 'Easy Clean']
    },
    {
      id: 'bathroom-tiles',
      name: 'Anti-skid Tiles',
      brand: 'Johnson',
      price: { min: 45, max: 120 },
      unit: 'sq ft',
      image: '/images/materials/bathroom-tiles.jpg',
      features: ['Anti-skid', 'Water Resistant', 'Easy Maintenance']
    }
  ],
  kitchen: [
    {
      id: 'modular-kitchen',
      name: 'Modular Kitchen',
      brand: 'Godrej',
      price: { min: 125000, max: 500000 },
      unit: 'complete',
      image: '/images/materials/modular-kitchen.jpg',
      features: ['Soft Close', 'Lifetime Warranty', 'Custom Design'],
      popular: true
    },
    {
      id: 'kitchen-countertop',
      name: 'Granite Countertop',
      brand: 'Local',
      price: { min: 150, max: 400 },
      unit: 'sq ft',
      image: '/images/materials/countertop.jpg',
      features: ['Heat Resistant', 'Scratch Proof', 'Easy Clean']
    },
    {
      id: 'chimney',
      name: 'Kitchen Chimney',
      brand: 'Faber',
      price: { min: 15000, max: 50000 },
      unit: 'unit',
      image: '/images/materials/chimney.jpg',
      features: ['Auto Clean', 'Touch Control', 'Silent Operation']
    },
    {
      id: 'kitchen-sink',
      name: 'Stainless Steel Sink',
      brand: 'Franke',
      price: { min: 8000, max: 30000 },
      unit: 'unit',
      image: '/images/materials/sink.jpg',
      features: ['Scratch Resistant', 'Sound Dampening', 'Lifetime Warranty']
    }
  ]
}

export default function MaterialSelector() {
  const [category, setCategory] = useState('flooring')
  const [selectedMaterials, setSelectedMaterials] = useState<any[]>([])
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

  const toggleMaterial = (material: any) => {
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

  return (
    <Card className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Palette className="w-8 h-8 mr-3 text-primary" />
          Material Selection Tool
        </h2>
        <p className="text-gray-600">Browse and compare premium construction materials</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search materials or brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={priceFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('all')}
              >
                All
              </Button>
              <Button
                variant={priceFilter === 'budget' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('budget')}
              >
                Budget
              </Button>
              <Button
                variant={priceFilter === 'mid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('mid')}
              >
                Mid-range
              </Button>
              <Button
                variant={priceFilter === 'premium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriceFilter('premium')}
              >
                Premium
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={category} onValueChange={setCategory}>
            <TabsList className="grid grid-cols-4 w-full mb-6">
              <TabsTrigger value="flooring">Flooring</TabsTrigger>
              <TabsTrigger value="wall">Wall Finish</TabsTrigger>
              <TabsTrigger value="bathroom">Bathroom</TabsTrigger>
              <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
            </TabsList>

            <TabsContent value={category} className="mt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMaterials.map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48 bg-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <Palette className="w-16 h-16 text-gray-400" />
                        </div>
                        {material.popular && (
                          <Badge className="absolute top-2 right-2 bg-orange-500">Popular</Badge>
                        )}
                        {material.premium && (
                          <Badge className="absolute top-2 right-2 bg-purple-600">Premium</Badge>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="mb-3">
                          <h3 className="font-semibold text-lg">{material.name}</h3>
                          <p className="text-sm text-gray-600">{material.brand}</p>
                        </div>
                        
                        <div className="flex items-baseline justify-between mb-3">
                          <div>
                            <span className="text-2xl font-bold text-primary">
                              ₹{material.price.min}
                            </span>
                            <span className="text-sm text-gray-500">
                              {material.price.max > material.price.min && ` - ₹${material.price.max}`}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">/{material.unit}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {material.features.map((feature, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          className="w-full"
                          variant={selectedMaterials.find(m => m.id === material.id) ? 'default' : 'outline'}
                          onClick={() => toggleMaterial(material)}
                        >
                          {selectedMaterials.find(m => m.id === material.id) ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Selected
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Select Material
                            </>
                          )}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Selection Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Selected Materials ({selectedMaterials.length})
              </h3>
              
              {selectedMaterials.length === 0 ? (
                <p className="text-gray-500 text-sm">No materials selected yet</p>
              ) : (
                <>
                  <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                    {selectedMaterials.map(material => (
                      <div key={material.id} className="flex items-center justify-between text-sm">
                        <div>
                          <p className="font-medium">{material.name}</p>
                          <p className="text-gray-500">{material.brand}</p>
                        </div>
                        <button
                          onClick={() => toggleMaterial(material)}
                          className="text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Estimated Range:</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{getTotalEstimate().toLocaleString('en-IN')}
                      </span>
                    </div>
                    
                    <Button className="w-full mb-2">
                      Get Detailed Quote
                    </Button>
                    <Button variant="outline" className="w-full">
                      Save Selection
                    </Button>
                  </div>
                </>
              )}
            </Card>

            <Card className="p-4 mt-4 bg-blue-50 border-blue-200">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Pro Tip</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Mix premium materials in focal areas with budget options in less visible spaces to optimize costs.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  )
}