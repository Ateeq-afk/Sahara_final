'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Home, Building2, Wrench, Palette, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Bangalore-specific pricing (per sq ft)
const PRICING = {
  construction: {
    basic: { min: 1650, max: 1950, name: 'Essential' },
    standard: { min: 2100, max: 2500, name: 'Professional' },
    premium: { min: 2800, max: 3500, name: 'Premium' },
    luxury: { min: 4000, max: 6000, name: 'Luxury' }
  },
  interior: {
    basic: { min: 650, max: 850, name: 'Essential' },
    standard: { min: 950, max: 1250, name: 'Professional' },
    premium: { min: 1500, max: 2000, name: 'Premium' },
    luxury: { min: 2500, max: 4000, name: 'Luxury' }
  },
  additionalCosts: {
    parking: 150000,
    landscaping: 75,
    compound: 850,
    solarPower: 125000,
    homeAutomation: 250000,
    swimmingPool: 850000
  }
}

export default function CostCalculator() {
  const [projectType, setProjectType] = useState('construction')
  const [area, setArea] = useState([2000])
  const [floors, setFloors] = useState([1])
  const [quality, setQuality] = useState('standard')
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  const [breakdown, setBreakdown] = useState<any>(null)

  const calculateCost = () => {
    const sqft = area[0]
    const numFloors = floors[0]
    const totalArea = sqft * numFloors
    
    const priceRange = PRICING[projectType as 'construction' | 'interior'][quality as 'basic' | 'standard' | 'premium' | 'luxury']
    const avgPrice = (priceRange.min + priceRange.max) / 2
    const baseCost = totalArea * avgPrice

    let additionalCost = 0
    additionalFeatures.forEach(feature => {
      const cost = PRICING.additionalCosts[feature as keyof typeof PRICING.additionalCosts]
      if (typeof cost === 'number' && feature !== 'landscaping' && feature !== 'compound') {
        additionalCost += cost
      } else if (feature === 'landscaping' || feature === 'compound') {
        additionalCost += sqft * cost
      }
    })

    const laborCost = baseCost * 0.25
    const materialCost = baseCost * 0.65
    const overheadCost = baseCost * 0.10
    const totalCost = baseCost + additionalCost

    setBreakdown({
      baseCost,
      laborCost,
      materialCost,
      overheadCost,
      additionalCost,
      totalCost,
      pricePerSqft: avgPrice,
      totalArea,
      timeline: Math.ceil(totalArea / 500) + 2
    })
  }

  useEffect(() => {
    calculateCost()
  }, [projectType, area, floors, quality, additionalFeatures])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const downloadEstimate = () => {
    const estimate = `
SAHARA CONSTRUCTION - COST ESTIMATE
====================================
Date: ${new Date().toLocaleDateString()}

PROJECT DETAILS
---------------
Type: ${projectType === 'construction' ? 'Construction' : 'Interior Design'}
Quality: ${PRICING[projectType as keyof typeof PRICING][quality as keyof typeof PRICING.construction].name}
Area: ${area[0]} sq ft
Floors: ${floors[0]}
Total Area: ${breakdown.totalArea} sq ft

COST BREAKDOWN
--------------
Base Cost: ${formatCurrency(breakdown.baseCost)}
Material Cost (65%): ${formatCurrency(breakdown.materialCost)}
Labor Cost (25%): ${formatCurrency(breakdown.laborCost)}
Overhead (10%): ${formatCurrency(breakdown.overheadCost)}
Additional Features: ${formatCurrency(breakdown.additionalCost)}

TOTAL ESTIMATE: ${formatCurrency(breakdown.totalCost)}
Price per sq ft: ${formatCurrency(breakdown.pricePerSqft)}

Estimated Timeline: ${breakdown.timeline} months

Note: This is a preliminary estimate. Final costs may vary based on site conditions,
design changes, and material selections.
    `
    
    const blob = new Blob([estimate], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sahara-estimate-${Date.now()}.txt`
    a.click()
  }

  return (
    <div className="p-12 bg-white">
      <div className="mb-12 text-center">
        <h2 className="text-5xl font-light text-gray-900 mb-4">
          Cost Calculator
        </h2>
        <p className="text-xl text-gray-600">Precision estimates for your project</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Project Type */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-light mb-6 text-gray-900">Project Type</h3>
            <Tabs value={projectType} onValueChange={setProjectType} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="construction" className="data-[state=active]:bg-white">
                  <Building2 className="w-4 h-4 mr-2" />
                  Construction
                </TabsTrigger>
                <TabsTrigger value="interior" className="data-[state=active]:bg-white">
                  <Palette className="w-4 h-4 mr-2" />
                  Interior Design
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Area & Floors */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-light mb-6 text-gray-900">Specifications</h3>
            
            <div className="mb-8">
              <Label className="text-lg font-light mb-4 block text-gray-700">
                Built-up Area
              </Label>
              <div className="text-3xl font-light mb-4 text-gray-900">{area[0].toLocaleString()} sq ft</div>
              <Slider
                value={area}
                onValueChange={setArea}
                min={500}
                max={10000}
                step={100}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>500</span>
                <span>10,000 sq ft</span>
              </div>
            </div>

            {projectType === 'construction' && (
              <div>
                <Label className="text-lg font-light mb-4 block text-gray-700">
                  Number of Floors
                </Label>
                <div className="text-3xl font-light mb-4 text-gray-900">{floors[0]} {floors[0] === 1 ? 'Floor' : 'Floors'}</div>
                <Slider
                  value={floors}
                  onValueChange={setFloors}
                  min={1}
                  max={4}
                  step={1}
                  className="mb-2"
                />
              </div>
            )}
          </div>

          {/* Quality Level */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-light mb-6 text-gray-900">Quality Level</h3>
            <RadioGroup value={quality} onValueChange={setQuality}>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(PRICING[projectType as keyof typeof PRICING]).map(([key, value]) => (
                  <label
                    key={key}
                    htmlFor={key}
                    className={`relative rounded-xl border-2 p-4 cursor-pointer transition-all ${
                      quality === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400 bg-white'
                    }`}
                  >
                    <RadioGroupItem value={key} id={key} className="sr-only" />
                    <div className="font-medium text-lg text-gray-900">{value.name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      ₹{value.min}-{value.max}/sq ft
                    </div>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Additional Features */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-light mb-6 text-gray-900">Enhancements</h3>
            <div className="space-y-3">
              {Object.entries({
                parking: 'Covered Parking',
                landscaping: 'Premium Landscaping',
                compound: 'Designer Compound Wall',
                solarPower: 'Solar Power System',
                homeAutomation: 'Smart Home Automation',
                swimmingPool: 'Swimming Pool'
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                  <span className="text-gray-700">{label}</span>
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500"
                    checked={additionalFeatures.includes(key)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAdditionalFeatures([...additionalFeatures, key])
                      } else {
                        setAdditionalFeatures(additionalFeatures.filter(f => f !== key))
                      }
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          {breakdown && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-8"
            >
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-gray-200">
                <h3 className="text-3xl font-light mb-8 text-gray-900">Estimate Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-600">Base Cost</span>
                    <span className="font-light text-gray-900">{formatCurrency(breakdown.baseCost)}</span>
                  </div>
                  
                  {breakdown.additionalCost > 0 && (
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-600">Enhancements</span>
                      <span className="font-light text-gray-900">{formatCurrency(breakdown.additionalCost)}</span>
                    </div>
                  )}
                  
                  <div className="border-t border-gray-300 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl text-gray-900">Total Investment</span>
                      <span className="text-3xl font-light bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {formatCurrency(breakdown.totalCost)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 p-6 bg-white/50 rounded-2xl mb-8">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Timeline</p>
                    <p className="text-xl font-light text-gray-900">{breakdown.timeline} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Per Sq Ft</p>
                    <p className="text-xl font-light text-gray-900">{formatCurrency(breakdown.pricePerSqft)}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={downloadEstimate}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                    Get Quote
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h4 className="font-medium mb-3 text-gray-900">What's Included</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Architectural design & planning</li>
                  <li>• Premium materials as per selection</li>
                  <li>• Professional project management</li>
                  <li>• Quality assurance & warranty</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}