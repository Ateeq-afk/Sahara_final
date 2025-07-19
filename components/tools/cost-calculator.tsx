'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Home, Building2, Wrench, Palette, Download, Check, Sun, Wifi, Trees, Car, Shield, Waves, ChevronRight, X } from 'lucide-react'

// Bangalore-specific pricing (per sq ft)
const PRICING = {
  construction: {
    basic: { min: 1650, max: 1950, name: 'Essential', description: 'Quality basics', icon: Home },
    standard: { min: 2100, max: 2500, name: 'Professional', description: 'Balanced value', icon: Building2 },
    premium: { min: 2800, max: 3500, name: 'Premium', description: 'Superior finish', icon: Wrench },
    luxury: { min: 4000, max: 6000, name: 'Luxury', description: 'Excellence', icon: Palette }
  },
  interior: {
    basic: { min: 650, max: 850, name: 'Essential', description: 'Functional', icon: Home },
    standard: { min: 950, max: 1250, name: 'Professional', description: 'Designer', icon: Building2 },
    premium: { min: 1500, max: 2000, name: 'Premium', description: 'Luxury', icon: Wrench },
    luxury: { min: 2500, max: 4000, name: 'Luxury', description: 'Bespoke', icon: Palette }
  },
  additionalCosts: {
    parking: { cost: 150000, label: 'Parking', description: '2-car space', icon: Car },
    landscaping: { cost: 75, label: 'Landscaping', description: 'Per sq ft', icon: Trees },
    compound: { cost: 850, label: 'Compound', description: 'Per ft', icon: Shield },
    solarPower: { cost: 125000, label: 'Solar', description: '3kW system', icon: Sun },
    homeAutomation: { cost: 250000, label: 'Smart Home', description: 'Full system', icon: Wifi },
    swimmingPool: { cost: 850000, label: 'Pool', description: '15x30 ft', icon: Waves }
  }
}

export default function CostCalculator() {
  const [projectType, setProjectType] = useState('construction')
  const [area, setArea] = useState(2000)
  const [floors, setFloors] = useState(1)
  const [quality, setQuality] = useState('standard')
  const [additionalFeatures, setAdditionalFeatures] = useState<string[]>([])
  const [breakdown, setBreakdown] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

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

  const formatShortCurrency = (amount: number) => {
    if (amount >= 10000000) { // 1 crore or more
      return `₹${(amount / 10000000).toFixed(1)}Cr`
    } else if (amount >= 100000) { // 1 lakh or more
      return `₹${(amount / 100000).toFixed(1)}L`
    }
    return formatCurrency(amount)
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

  const totalSteps = projectType === 'construction' ? 5 : 4

  const renderMobileStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-6">What are you building?</h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <button
                onClick={() => {
                  setProjectType('construction')
                  setCurrentStep(2)
                }}
                className="relative overflow-hidden rounded-2xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:border-sahara-primary transition-all"
              >
                <Building2 className="w-12 h-12 mb-3 text-sahara-primary" />
                <span className="font-medium text-lg">Construction</span>
                <span className="text-sm text-gray-500 mt-1">Full build</span>
              </button>
              <button
                onClick={() => {
                  setProjectType('interior')
                  setCurrentStep(2)
                }}
                className="relative overflow-hidden rounded-2xl border-2 border-gray-200 p-6 flex flex-col items-center justify-center hover:border-sahara-primary transition-all"
              >
                <Palette className="w-12 h-12 mb-3 text-sahara-primary" />
                <span className="font-medium text-lg">Interior</span>
                <span className="text-sm text-gray-500 mt-1">Design only</span>
              </button>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-2">Built-up Area</h3>
            <p className="text-gray-500 mb-8">Slide to adjust your project size</p>
            
            <div className="flex-1 flex flex-col justify-center">
              <div className="text-center mb-8">
                <span className="text-5xl font-light">{area.toLocaleString()}</span>
                <span className="text-2xl text-gray-500 ml-2">sq ft</span>
              </div>
              
              <div className="px-4">
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={area}
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-mobile"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <span>500</span>
                  <span>10,000 sq ft</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-8">
                {[1200, 2000, 3000].map((size) => (
                  <button
                    key={size}
                    onClick={() => setArea(size)}
                    className="py-3 px-4 rounded-xl border border-gray-200 text-sm hover:border-sahara-primary transition-all"
                  >
                    {size} sq ft
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setCurrentStep(projectType === 'construction' ? 3 : 4)}
              className="w-full py-4 bg-sahara-primary text-white rounded-xl font-medium hover:bg-sahara-secondary transition-all flex items-center justify-center"
            >
              Continue
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </motion.div>
        )

      case 3:
        return projectType === 'construction' ? (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-2">Number of Floors</h3>
            <p className="text-gray-500 mb-8">Select how many floors you need</p>
            
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setFloors(num)
                    setCurrentStep(4)
                  }}
                  className={`relative rounded-2xl border-2 p-6 transition-all ${
                    floors === num 
                      ? 'border-sahara-primary bg-sahara-primary/5' 
                      : 'border-gray-200 hover:border-sahara-primary'
                  }`}
                >
                  <span className="text-3xl font-light">{num}</span>
                  <span className="block text-sm text-gray-500 mt-1">
                    {num === 1 ? 'Floor' : 'Floors'}
                  </span>
                  {num === 1 && <span className="text-xs text-gray-400 mt-2 block">Ground only</span>}
                  {num === 2 && <span className="text-xs text-gray-400 mt-2 block">G+1</span>}
                  {num === 3 && <span className="text-xs text-gray-400 mt-2 block">G+2</span>}
                  {num === 4 && <span className="text-xs text-gray-400 mt-2 block">G+3</span>}
                </button>
              ))}
            </div>
          </motion.div>
        ) : null

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-2">Quality Level</h3>
            <p className="text-gray-500 mb-6">Choose your finish quality</p>
            
            <div className="flex-1 space-y-3 overflow-y-auto">
              {Object.entries(PRICING[projectType as keyof typeof PRICING] || {}).map(([key, value]) => {
                if (!value || typeof value !== 'object' || !('icon' in value)) return null
                const Icon = value.icon
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setQuality(key)
                      setCurrentStep(5)
                    }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      quality === key 
                        ? 'border-sahara-primary bg-sahara-primary/5' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          quality === key ? 'bg-sahara-primary/10' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            quality === key ? 'text-sahara-primary' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium">{value.name}</div>
                          <div className="text-sm text-gray-500">{value.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">₹{value.min}-{value.max}</div>
                        <div className="text-xs text-gray-500">per sq ft</div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="h-full flex flex-col"
          >
            <h3 className="text-xl font-medium mb-2">Add Enhancements</h3>
            <p className="text-gray-500 mb-6">Optional premium features</p>
            
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {Object.entries(PRICING.additionalCosts || {}).map(([key, item]) => {
                if (!item || !item.icon) return null
                const Icon = item.icon
                const isSelected = additionalFeatures.includes(key)
                return (
                  <label 
                    key={key} 
                    className={`block p-4 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-sahara-primary bg-sahara-primary/5' 
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAdditionalFeatures([...additionalFeatures, key])
                        } else {
                          setAdditionalFeatures(additionalFeatures.filter(f => f !== key))
                        }
                      }}
                    />
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-sahara-primary border-sahara-primary'
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <Icon className="w-5 h-5 text-gray-600 mr-3" />
                      <div className="flex-1">
                        <div className="font-medium">{item.label}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                      <div className="text-sm font-medium">
                        {key === 'landscaping' || key === 'compound' 
                          ? `₹${item.cost}/ft` 
                          : formatShortCurrency(item.cost)
                        }
                      </div>
                    </div>
                  </label>
                )
              })}
            </div>
            
            <button
              onClick={() => setShowResults(true)}
              className="w-full py-4 bg-sahara-primary text-white rounded-xl font-medium hover:bg-sahara-secondary transition-all"
            >
              Calculate Cost
            </button>
          </motion.div>
        )
    }
  }

  // Mobile Results View
  const MobileResults = () => (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      className="fixed inset-0 bg-white z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <h3 className="text-xl font-medium">Your Estimate</h3>
        <button
          onClick={() => setShowResults(false)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {breakdown && (
          <div className="p-6 space-y-6">
            {/* Total Cost Card */}
            <div className="bg-sahara-primary text-white rounded-2xl p-6">
              <p className="text-sm opacity-80 mb-2">Total Investment</p>
              <p className="text-4xl font-light mb-4">
                {formatShortCurrency(breakdown.totalCost)}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-xs opacity-70">Timeline</p>
                  <p className="text-lg font-light">{breakdown.timeline} months</p>
                </div>
                <div>
                  <p className="text-xs opacity-70">Per Sq Ft</p>
                  <p className="text-lg font-light">₹{breakdown.pricePerSqft}</p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-3">
              <h4 className="font-medium mb-4">Cost Breakdown</h4>
              <div className="flex justify-between">
                <span className="text-gray-600">Base Cost</span>
                <span className="font-medium">{formatShortCurrency(breakdown.baseCost)}</span>
              </div>
              {breakdown.additionalCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Enhancements</span>
                  <span className="font-medium">{formatShortCurrency(breakdown.additionalCost)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t">
                <span className="font-medium">Total</span>
                <span className="font-medium">{formatShortCurrency(breakdown.totalCost)}</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h4 className="font-medium">What's Included</h4>
              {[
                'Architectural design & planning',
                'Premium materials as selected',
                'Professional project management',
                'Quality assurance & warranty'
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <Check className="w-4 h-4 text-sahara-primary flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-3 pb-6">
              <button
                onClick={downloadEstimate}
                className="w-full py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Estimate
              </button>
              <button className="w-full py-3 bg-sahara-primary text-white rounded-xl font-medium hover:bg-sahara-secondary transition-all">
                Get Detailed Quote
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop View - Keep existing */}
      <div className="hidden lg:block">
        {/* Original desktop code here - keeping it unchanged */}
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
      </div>

      {/* Mobile View - New optimized design */}
      <div className="lg:hidden h-screen flex flex-col">
        {/* Mobile Header */}
        <div className="px-6 py-8 text-center border-b">
          <h1 className="text-2xl font-medium text-gray-900">Cost Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">Get instant project estimate</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Step {currentStep} of {totalSteps}</span>
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-sm text-sahara-primary"
              >
                Back
              </button>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sahara-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Mobile Steps */}
        <div className="flex-1 px-6 pb-6 overflow-hidden">
          <AnimatePresence mode="wait">
            {renderMobileStep()}
          </AnimatePresence>
        </div>

        {/* Mobile Results */}
        <AnimatePresence>
          {showResults && <MobileResults />}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .slider-mobile::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          background: #FFB800;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .slider-mobile::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: #FFB800;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

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