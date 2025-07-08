'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  Clock,
  CloudRain,
  Zap,
  Info,
  ChevronRight,
  CheckCircle2,
  Layers,
  Gauge
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TimelinePhase {
  name: string
  duration: number
  startWeek: number
  endWeek: number
  description: string
  icon: React.ReactNode
  progress?: number
}

export default function TimelineEstimatorApple() {
  const [projectType, setProjectType] = useState<'construction' | 'interior' | 'renovation'>('construction')
  const [projectSize, setProjectSize] = useState([2000])
  const [complexity, setComplexity] = useState<'simple' | 'standard' | 'complex'>('standard')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [fastTrack, setFastTrack] = useState(false)
  const [includeRainy, setIncludeRainy] = useState(true)

  // Calculate timeline based on inputs
  const calculateTimeline = () => {
    let baseWeeks = 0
    const size = projectSize[0]

    // Base calculation
    if (projectType === 'construction') {
      baseWeeks = Math.ceil(size / 200) + 12
    } else if (projectType === 'interior') {
      baseWeeks = Math.ceil(size / 400) + 6
    } else {
      baseWeeks = Math.ceil(size / 300) + 8
    }

    // Complexity adjustments
    if (complexity === 'simple') baseWeeks *= 0.8
    if (complexity === 'complex') baseWeeks *= 1.3

    // Fast track reduction
    if (fastTrack) baseWeeks *= 0.8

    // Monsoon buffer for Bangalore (June-September)
    if (includeRainy && projectType === 'construction') {
      const start = new Date(startDate)
      const end = new Date(start)
      end.setDate(end.getDate() + baseWeeks * 7)
      
      const monsoonMonths = [5, 6, 7, 8] // June to September
      let monsoonWeeks = 0
      
      for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
        if (monsoonMonths.includes(d.getMonth())) {
          monsoonWeeks += 2
        }
      }
      
      baseWeeks += monsoonWeeks
    }

    return Math.ceil(baseWeeks)
  }

  const totalWeeks = calculateTimeline()
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + totalWeeks * 7)

  // Generate phases
  const generatePhases = (): TimelinePhase[] => {
    const phases: TimelinePhase[] = []
    let currentWeek = 0

    if (projectType === 'construction') {
      phases.push({
        name: 'Foundation & Structure',
        duration: Math.ceil(totalWeeks * 0.3),
        startWeek: currentWeek,
        endWeek: currentWeek + Math.ceil(totalWeeks * 0.3),
        description: 'Site preparation, foundation laying, and structural framework',
        icon: <Layers className="h-5 w-5" />,
        progress: 100
      })
      currentWeek += Math.ceil(totalWeeks * 0.3)

      phases.push({
        name: 'Masonry & Roofing',
        duration: Math.ceil(totalWeeks * 0.25),
        startWeek: currentWeek,
        endWeek: currentWeek + Math.ceil(totalWeeks * 0.25),
        description: 'Brick work, plastering, and roof construction',
        icon: <Layers className="h-5 w-5" />,
        progress: 60
      })
      currentWeek += Math.ceil(totalWeeks * 0.25)

      phases.push({
        name: 'MEP Installation',
        duration: Math.ceil(totalWeeks * 0.2),
        startWeek: currentWeek,
        endWeek: currentWeek + Math.ceil(totalWeeks * 0.2),
        description: 'Mechanical, electrical, and plumbing systems',
        icon: <Gauge className="h-5 w-5" />,
        progress: 30
      })
      currentWeek += Math.ceil(totalWeeks * 0.2)

      phases.push({
        name: 'Finishing & Handover',
        duration: Math.ceil(totalWeeks * 0.25),
        startWeek: currentWeek,
        endWeek: totalWeeks,
        description: 'Flooring, painting, fixtures, and final touches',
        icon: <CheckCircle2 className="h-5 w-5" />,
        progress: 0
      })
    } else if (projectType === 'interior') {
      phases.push({
        name: 'Design & Planning',
        duration: Math.ceil(totalWeeks * 0.2),
        startWeek: 0,
        endWeek: Math.ceil(totalWeeks * 0.2),
        description: '3D designs, material selection, and approvals',
        icon: <Layers className="h-5 w-5" />,
        progress: 100
      })
      currentWeek += Math.ceil(totalWeeks * 0.2)

      phases.push({
        name: 'Civil & Electrical',
        duration: Math.ceil(totalWeeks * 0.3),
        startWeek: currentWeek,
        endWeek: currentWeek + Math.ceil(totalWeeks * 0.3),
        description: 'False ceiling, electrical wiring, and civil modifications',
        icon: <Gauge className="h-5 w-5" />,
        progress: 70
      })
      currentWeek += Math.ceil(totalWeeks * 0.3)

      phases.push({
        name: 'Furniture & Fixtures',
        duration: Math.ceil(totalWeeks * 0.3),
        startWeek: currentWeek,
        endWeek: currentWeek + Math.ceil(totalWeeks * 0.3),
        description: 'Custom furniture, modular units, and fixtures',
        icon: <Layers className="h-5 w-5" />,
        progress: 40
      })
      currentWeek += Math.ceil(totalWeeks * 0.3)

      phases.push({
        name: 'Finishing Touches',
        duration: totalWeeks - currentWeek,
        startWeek: currentWeek,
        endWeek: totalWeeks,
        description: 'Painting, decor, and final setup',
        icon: <CheckCircle2 className="h-5 w-5" />,
        progress: 10
      })
    } else {
      // Renovation phases
      phases.push({
        name: 'Assessment & Planning',
        duration: Math.ceil(totalWeeks * 0.15),
        startWeek: 0,
        endWeek: Math.ceil(totalWeeks * 0.15),
        description: 'Site inspection and renovation planning',
        icon: <Layers className="h-5 w-5" />,
        progress: 100
      })
      // Add more renovation phases...
    }

    return phases
  }

  const phases = generatePhases()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Timeline Prediction</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Project Timeline Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get accurate project timelines with weather intelligence for Bangalore
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 border-gray-200">
              <h2 className="text-lg font-semibold mb-6">Project Configuration</h2>
              
              {/* Project Type */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Project Type</label>
                <Tabs value={projectType} onValueChange={(v) => setProjectType(v as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="construction">Construction</TabsTrigger>
                    <TabsTrigger value="interior">Interior</TabsTrigger>
                    <TabsTrigger value="renovation">Renovation</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Project Size */}
              <div className="space-y-4 mt-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">Project Size</label>
                  <span className="text-sm font-semibold">{projectSize[0].toLocaleString()} sq ft</span>
                </div>
                <Slider
                  value={projectSize}
                  onValueChange={setProjectSize}
                  max={10000}
                  min={500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>500</span>
                  <span>10,000 sq ft</span>
                </div>
              </div>

              {/* Complexity */}
              <div className="space-y-4 mt-6">
                <label className="text-sm font-medium text-gray-700">Project Complexity</label>
                <div className="grid grid-cols-3 gap-2">
                  {['simple', 'standard', 'complex'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setComplexity(level as any)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        complexity === level
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-4 mt-6">
                <label className="text-sm font-medium text-gray-700">Preferred Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Options */}
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-sm">Fast Track</p>
                      <p className="text-xs text-gray-500">20% faster delivery</p>
                    </div>
                  </div>
                  <Switch
                    checked={fastTrack}
                    onCheckedChange={setFastTrack}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CloudRain className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-sm">Monsoon Buffer</p>
                      <p className="text-xs text-gray-500">Account for rain delays</p>
                    </div>
                  </div>
                  <Switch
                    checked={includeRainy}
                    onCheckedChange={setIncludeRainy}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Timeline Display */}
          <div className="lg:col-span-2">
            <Card className="p-8 border-gray-200">
              {/* Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Duration</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {Math.floor(totalWeeks / 4)} months
                    </p>
                    <p className="text-sm text-gray-500">{totalWeeks} weeks</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Start Date</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {new Date(startDate).toLocaleDateString('en-IN', { 
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Expected Completion</p>
                    <p className="text-xl font-semibold text-gray-900">
                      {endDate.toLocaleDateString('en-IN', { 
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              {(includeRainy || fastTrack) && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="space-y-1">
                      {includeRainy && (
                        <p className="text-sm text-blue-900">
                          • Monsoon buffer added for weather-related delays (June-September)
                        </p>
                      )}
                      {fastTrack && (
                        <p className="text-sm text-blue-900">
                          • Fast track enabled: Timeline reduced by 20% with optimized resources
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Phases */}
              <div>
                <h3 className="text-lg font-semibold mb-6">Project Phases</h3>
                <div className="space-y-4">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${
                          phase.progress === 100 
                            ? 'bg-green-100 text-green-700'
                            : phase.progress > 0
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                          {phase.icon}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                            <span className="text-sm text-gray-500">{phase.duration} weeks</span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                          
                          <div className="relative">
                            <Progress value={phase.progress || 0} className="h-2" />
                            <div className="flex justify-between mt-1">
                              <span className="text-xs text-gray-500">
                                Week {phase.startWeek + 1}
                              </span>
                              <span className="text-xs text-gray-500">
                                Week {phase.endWeek}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {index < phases.length - 1 && (
                        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 flex gap-4">
                <Button size="lg" className="flex-1">
                  Save Timeline
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  Download PDF
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}