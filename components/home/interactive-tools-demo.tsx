'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  IndianRupee, 
  Ruler, 
  Calendar,
  Sparkles,
  Play,
  Pause
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import CountUp from 'react-countup'

export default function InteractiveToolsDemo() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeStep, setActiveStep] = useState(0)
  const [area, setArea] = useState([2000])
  const [selectedQuality, setSelectedQuality] = useState('premium')
  
  // Demo data
  const qualities = {
    essential: { price: 1650, label: 'Essential', color: 'from-gray-400 to-gray-500' },
    professional: { price: 2200, label: 'Professional', color: 'from-blue-400 to-blue-500' },
    premium: { price: 3500, label: 'Premium', color: 'from-purple-400 to-purple-500' },
    luxury: { price: 5000, label: 'Luxury', color: 'from-yellow-400 to-[#D26700]' }
  }

  const steps = [
    {
      title: 'Select your area',
      description: 'Drag to adjust square footage',
      icon: Ruler
    },
    {
      title: 'Choose quality',
      description: 'Pick your finish level',
      icon: Sparkles
    },
    {
      title: 'Get instant estimate',
      description: 'See your project cost',
      icon: IndianRupee
    },
    {
      title: 'View timeline',
      description: 'Know your move-in date',
      icon: Calendar
    }
  ]

  // Auto-play through steps
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length)
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, steps.length])

  const totalCost = area[0] * qualities[selectedQuality as keyof typeof qualities].price
  const months = Math.ceil(area[0] / 250) + 4 // Simple timeline calculation

  return (
    <section className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Experience the magic.
            <span className="block text-gray-400">Live.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch how our intelligent tools work together to plan your perfect home.
          </p>
        </motion.div>

        {/* Interactive Demo */}
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: Controls */}
              <div className="p-8 lg:p-12 border-r border-gray-800">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold">Live Calculator Demo</h3>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="rounded-full bg-gray-800 border-gray-700"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Steps Progress */}
                <div className="space-y-4 mb-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <motion.div
                        key={index}
                        animate={{ opacity: index === activeStep ? 1 : 0.5 }}
                        className="flex items-center gap-4 cursor-pointer"
                        onClick={() => setActiveStep(index)}
                      >
                        <div className={`p-3 rounded-xl ${
                          index === activeStep 
                            ? 'bg-gradient-to-br from-sahara-primary to-sahara-secondary' 
                            : 'bg-gray-800'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-gray-400">{step.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Interactive Controls */}
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="area"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <label className="text-sm text-gray-400">Project Area (sq ft)</label>
                      <Slider
                        value={area}
                        onValueChange={setArea}
                        max={5000}
                        min={500}
                        step={100}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm">
                        <span>500 sq ft</span>
                        <span className="text-2xl font-bold">{area[0]} sq ft</span>
                        <span>5000 sq ft</span>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="quality"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {Object.entries(qualities).map(([key, quality]) => (
                        <button
                          key={key}
                          onClick={() => setSelectedQuality(key)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedQuality === key
                              ? 'border-sahara-primary bg-sahara-primary/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <div className={`h-2 w-full rounded-full bg-gradient-to-r ${quality.color} mb-3`} />
                          <h4 className="font-semibold">{quality.label}</h4>
                          <p className="text-sm text-gray-400">₹{quality.price}/sq ft</p>
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="estimate"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-8"
                    >
                      <p className="text-sm text-gray-400 mb-2">Total Project Cost</p>
                      <div className="text-5xl font-bold text-sahara-primary">
                        ₹<CountUp end={totalCost} duration={1} separator="," />
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {area[0]} sq ft × ₹{qualities[selectedQuality as keyof typeof qualities].price}
                      </p>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="timeline"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Project Duration</p>
                          <p className="text-3xl font-bold">{months} months</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Move-in Date</p>
                          <p className="text-xl font-semibold">
                            {new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-sahara-primary to-sahara-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: Visual */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12 flex items-center justify-center min-h-[500px]">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="visual-area"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative"
                    >
                      <div 
                        className="bg-gradient-to-br from-sahara-primary/20 to-sahara-secondary/20 rounded-3xl border-2 border-dashed border-sahara-primary/50 transition-all duration-500"
                        style={{
                          width: `${Math.min(300, area[0] / 10)}px`,
                          height: `${Math.min(300, area[0] / 10)}px`
                        }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Home className="h-12 w-12 text-sahara-primary/50" />
                        </div>
                      </div>
                      <motion.div
                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <p className="text-2xl font-bold">{area[0]} sq ft</p>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="visual-quality"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {Object.entries(qualities).map(([key, quality]) => (
                        <motion.div
                          key={key}
                          animate={{ 
                            scale: selectedQuality === key ? 1.1 : 1,
                            opacity: selectedQuality === key ? 1 : 0.5
                          }}
                          className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${quality.color} flex items-center justify-center`}
                        >
                          <span className="text-white font-bold">{quality.label}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="visual-cost"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-64 h-64 rounded-full border-4 border-dashed border-sahara-primary/30 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <IndianRupee className="h-16 w-16 text-sahara-primary mx-auto mb-4" />
                          <p className="text-3xl font-bold">₹{(totalCost / 100000).toFixed(1)}L</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div
                      key="visual-timeline"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="w-full max-w-sm"
                    >
                      {['Foundation', 'Structure', 'Finishing', 'Handover'].map((phase, idx) => (
                        <motion.div
                          key={phase}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.2 }}
                          className="flex items-center gap-4 mb-4"
                        >
                          <div className={`w-4 h-4 rounded-full ${
                            idx < 3 ? 'bg-sahara-primary' : 'bg-gray-600'
                          }`} />
                          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-sahara-primary to-sahara-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: idx < 3 ? '100%' : '0%' }}
                              transition={{ delay: idx * 0.3, duration: 0.5 }}
                            />
                          </div>
                          <span className="text-sm">{phase}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-gradient-to-r from-sahara-primary to-sahara-secondary p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-semibold mb-1">Ready to use our tools?</h4>
                  <p className="text-sm opacity-90">Get accurate estimates for your project in minutes.</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Start Planning
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

// Add this to package.json dependencies if not already present
// "react-countup": "^6.5.0"