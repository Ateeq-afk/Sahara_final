'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Home, Building2, Wrench, Palette, Download, Check, Sun, Wifi, Trees, Car, Shield, Waves } from 'lucide-react'
// import { costCalculatorMockData } from '@/src/data/mockData'

// Bangalore-specific pricing (per sq ft)
const PRICING = {
  construction: {
    basic: { min: 1650, max: 1950, name: 'Essential', description: 'Quality basics for your dream home', icon: Home },
    standard: { min: 2100, max: 2500, name: 'Professional', description: 'Balanced quality and value', icon: Building2 },
    premium: { min: 2800, max: 3500, name: 'Premium', description: 'Superior finishes and materials', icon: Wrench },
    luxury: { min: 4000, max: 6000, name: 'Luxury', description: 'Uncompromising excellence', icon: Palette }
  },
  interior: {
    basic: { min: 650, max: 850, name: 'Essential', description: 'Functional and aesthetic', icon: Home },
    standard: { min: 950, max: 1250, name: 'Professional', description: 'Designer selections', icon: Building2 },
    premium: { min: 1500, max: 2000, name: 'Premium', description: 'Curated luxury interiors', icon: Wrench },
    luxury: { min: 2500, max: 4000, name: 'Luxury', description: 'Bespoke design solutions', icon: Palette }
  },
  additionalCosts: {
    parking: { cost: 150000, label: 'Covered Parking', description: '2-car covered space', icon: Car },
    landscaping: { cost: 75, label: 'Premium Landscaping', description: 'Per sq ft outdoor design', icon: Trees },
    compound: { cost: 850, label: 'Designer Compound Wall', description: 'Per running ft', icon: Shield },
    solarPower: { cost: 125000, label: 'Solar Power System', description: '3kW grid-tied system', icon: Sun },
    homeAutomation: { cost: 250000, label: 'Smart Home Automation', description: 'Complete home intelligence', icon: Wifi },
    swimmingPool: { cost: 850000, label: 'Swimming Pool', description: '15x30 ft with filtration', icon: Waves }
  }
}

export default function CostCalculator() {
  const [projectType, setProjectType] = useState('construction')
  const [area, setArea] = useState(2000)
  const [floors, setFloors] = useState(1)
  const [quality, setQuality] = useState('standard')
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  const [breakdown, setBreakdown] = useState<any>(null)

  const calculateCost = () => {
    const totalArea = area * floors
    
    const projectPricing = PRICING[projectType as 'construction' | 'interior']
    if (!projectPricing) return
    
    const priceRange = projectPricing[quality as 'basic' | 'standard' | 'premium' | 'luxury']
    if (!priceRange || !priceRange.min || !priceRange.max) return
    
    const avgPrice = (priceRange.min + priceRange.max) / 2
    const baseCost = totalArea * avgPrice

    let additionalCost = 0
    additionalFeatures.forEach(feature => {
      const item = PRICING.additionalCosts[feature as keyof typeof PRICING.additionalCosts]
      if (!item || !item.cost) return
      
      if (feature === 'landscaping' || feature === 'compound') {
        additionalCost += area * item.cost
      } else {
        additionalCost += item.cost
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
    const priceData = PRICING[projectType as 'construction' | 'interior'][quality as 'basic' | 'standard' | 'premium' | 'luxury']
    const estimate = `
SAHARA CONSTRUCTION - COST ESTIMATE
====================================
Date: ${new Date().toLocaleDateString()}

PROJECT DETAILS
---------------
Type: ${projectType === 'construction' ? 'Construction' : 'Interior Design'}
Quality: ${priceData.name}
Area: ${area} sq ft
Floors: ${floors}
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-12 md:px-12 md:py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-4"
        >
          Cost Calculator
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 font-light"
        >
          Transparent pricing for your construction project
        </motion.p>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Project Type */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-lg font-medium mb-6">Project Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setProjectType('construction')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      projectType === 'construction' 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mx-auto mb-2" />
                    <div className="font-medium">Construction</div>
                  </button>
                  <button
                    onClick={() => setProjectType('interior')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      projectType === 'interior' 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <Palette className="w-5 h-5 mx-auto mb-2" />
                    <div className="font-medium">Interior Design</div>
                  </button>
                </div>
              </motion.div>

              {/* Area & Floors */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-lg font-medium mb-6">Project Specifications</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-baseline mb-4">
                      <label className="text-sm font-medium text-gray-600">Built-up Area</label>
                      <span className="text-2xl font-light">{area.toLocaleString()} sq ft</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={area}
                      onChange={(e) => setArea(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>500</span>
                      <span>10,000 sq ft</span>
                    </div>
                  </div>

                  {projectType === 'construction' && (
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <label className="text-sm font-medium text-gray-600">Number of Floors</label>
                        <span className="text-2xl font-light">{floors} {floors === 1 ? 'Floor' : 'Floors'}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            onClick={() => setFloors(num)}
                            className={`py-3 rounded-lg border-2 transition-all ${
                              floors === num 
                                ? 'border-gray-900 bg-gray-900 text-white' 
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Quality Level */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-lg font-medium mb-6">Quality Level</h3>
                <div className="space-y-3">
                  {Object.entries(PRICING[projectType as keyof typeof PRICING] || {}).map(([key, value]) => {
                    if (!value || typeof value !== 'object' || !('icon' in value)) return null
                    const Icon = value.icon
                    return (
                      <button
                        key={key}
                        onClick={() => setQuality(key)}
                        className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                          quality === key 
                            ? 'border-gray-900 bg-gray-900 text-white' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Icon className={`w-5 h-5 mt-0.5 ${quality === key ? 'text-white' : 'text-gray-600'}`} />
                            <div>
                              <div className="font-medium text-lg">{value.name}</div>
                              <div className={`text-sm mt-1 ${quality === key ? 'text-gray-300' : 'text-gray-500'}`}>
                                {value.description}
                              </div>
                            </div>
                          </div>
                          <div className={`text-right ${quality === key ? 'text-white' : 'text-gray-900'}`}>
                            <div className="font-medium">₹{value.min}-{value.max}</div>
                            <div className="text-sm">per sq ft</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>

              {/* Additional Features */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-2xl p-6 md:p-8"
              >
                <h3 className="text-lg font-medium mb-6">Enhancements</h3>
                <div className="space-y-3">
                  {Object.entries(PRICING.additionalCosts || {}).map(([key, item]) => {
                    if (!item || !item.icon) return null
                    const Icon = item.icon
                    return (
                      <label 
                        key={key} 
                        className="flex items-start p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 cursor-pointer transition-all bg-white"
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={additionalFeatures.includes(key)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAdditionalFeatures([...additionalFeatures, key])
                            } else {
                              setAdditionalFeatures(additionalFeatures.filter(f => f !== key))
                            }
                          }}
                        />
                        <div className={`w-5 h-5 rounded-md border-2 mr-4 mt-0.5 flex items-center justify-center transition-all ${
                          additionalFeatures.includes(key)
                            ? 'bg-gray-900 border-gray-900'
                            : 'border-gray-300'
                        }`}>
                          {additionalFeatures.includes(key) && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div className="flex items-start gap-3 flex-1">
                          <Icon className="w-5 h-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-medium">{item.label}</div>
                            <div className="text-sm text-gray-500 mt-0.5">{item.description}</div>
                          </div>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Summary Panel */}
            <div className="lg:sticky lg:top-8 h-fit">
              {breakdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Main Summary Card */}
                  <div className="bg-gray-900 text-white rounded-2xl p-8 mb-6">
                    <h3 className="text-2xl font-light mb-8">Estimate Summary</h3>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Base Cost</span>
                        <span className="text-xl font-light">{formatCurrency(breakdown.baseCost)}</span>
                      </div>
                      
                      {breakdown.additionalCost > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Enhancements</span>
                          <span className="text-xl font-light">{formatCurrency(breakdown.additionalCost)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-700 pt-4 mt-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-lg">Total Investment</span>
                          <span className="text-3xl font-light">
                            {formatCurrency(breakdown.totalCost)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800 rounded-xl mb-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Timeline</p>
                        <p className="text-xl font-light">{breakdown.timeline} months</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Per Sq Ft</p>
                        <p className="text-xl font-light">{formatCurrency(breakdown.pricePerSqft)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button 
                        onClick={downloadEstimate}
                        className="w-full py-3 px-4 border border-gray-600 rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Estimate
                      </button>
                      <button className="w-full py-3 px-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all font-medium">
                        Get Detailed Quote
                      </button>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-medium mb-4">What's Included</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-sm text-gray-600">Architectural design & planning</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-sm text-gray-600">Premium materials as per selection</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-sm text-gray-600">Professional project management</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span className="ml-2 text-sm text-gray-600">Quality assurance & warranty</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

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
    </div>
  )
}