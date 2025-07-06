'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, AlertCircle, CheckCircle2, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

// Project phases with durations (in weeks)
const PROJECT_PHASES = {
  construction: [
    { id: 'planning', name: 'Planning & Approvals', duration: { min: 2, max: 4 }, color: 'bg-blue-500' },
    { id: 'foundation', name: 'Foundation & Structure', duration: { min: 3, max: 6 }, color: 'bg-gray-500' },
    { id: 'superstructure', name: 'Superstructure', duration: { min: 8, max: 16 }, color: 'bg-orange-500' },
    { id: 'masonry', name: 'Masonry & Plastering', duration: { min: 4, max: 8 }, color: 'bg-yellow-500' },
    { id: 'flooring', name: 'Flooring & Tiling', duration: { min: 3, max: 5 }, color: 'bg-green-500' },
    { id: 'painting', name: 'Painting & Finishing', duration: { min: 2, max: 4 }, color: 'bg-purple-500' },
    { id: 'electrical', name: 'Electrical & Plumbing', duration: { min: 3, max: 5 }, color: 'bg-red-500' },
    { id: 'final', name: 'Final Touches & Handover', duration: { min: 1, max: 2 }, color: 'bg-indigo-500' }
  ],
  interior: [
    { id: 'design', name: 'Design & Planning', duration: { min: 1, max: 2 }, color: 'bg-blue-500' },
    { id: 'civil', name: 'Civil Work', duration: { min: 2, max: 4 }, color: 'bg-gray-500' },
    { id: 'electrical', name: 'Electrical & Plumbing', duration: { min: 1, max: 2 }, color: 'bg-red-500' },
    { id: 'carpentry', name: 'Carpentry Work', duration: { min: 3, max: 5 }, color: 'bg-orange-500' },
    { id: 'painting', name: 'Painting & Polish', duration: { min: 2, max: 3 }, color: 'bg-purple-500' },
    { id: 'furnishing', name: 'Furnishing & Decor', duration: { min: 1, max: 2 }, color: 'bg-green-500' },
    { id: 'final', name: 'Final Inspection', duration: { min: 0.5, max: 1 }, color: 'bg-indigo-500' }
  ],
  renovation: [
    { id: 'assessment', name: 'Assessment & Planning', duration: { min: 0.5, max: 1 }, color: 'bg-blue-500' },
    { id: 'demolition', name: 'Demolition Work', duration: { min: 1, max: 2 }, color: 'bg-red-500' },
    { id: 'structural', name: 'Structural Changes', duration: { min: 2, max: 4 }, color: 'bg-gray-500' },
    { id: 'services', name: 'Services Update', duration: { min: 1, max: 2 }, color: 'bg-orange-500' },
    { id: 'finishing', name: 'Finishing Work', duration: { min: 2, max: 3 }, color: 'bg-green-500' },
    { id: 'cleanup', name: 'Cleanup & Handover', duration: { min: 0.5, max: 1 }, color: 'bg-purple-500' }
  ]
}

// Factors that affect timeline
const TIMELINE_FACTORS = {
  monsoon: { impact: 1.3, months: [6, 7, 8, 9] }, // June to September in Bangalore
  complexity: {
    simple: 0.9,
    standard: 1.0,
    complex: 1.3
  },
  fastTrack: 0.8,
  size: {
    small: 0.8,    // < 1500 sq ft
    medium: 1.0,   // 1500-3500 sq ft
    large: 1.2,    // 3500-6000 sq ft
    xlarge: 1.5    // > 6000 sq ft
  }
}

export default function TimelineEstimator() {
  const [projectType, setProjectType] = useState('construction')
  const [projectSize, setProjectSize] = useState([2500])
  const [complexity, setComplexity] = useState('standard')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [fastTrack, setFastTrack] = useState(false)
  const [timeline, setTimeline] = useState<any>(null)

  const calculateTimeline = () => {
    const phases = PROJECT_PHASES[projectType as keyof typeof PROJECT_PHASES]
    const size = projectSize[0]
    
    // Determine size category
    let sizeCategory = 'medium'
    if (size < 1500) sizeCategory = 'small'
    else if (size > 3500 && size <= 6000) sizeCategory = 'large'
    else if (size > 6000) sizeCategory = 'xlarge'

    // Calculate base duration
    let totalWeeks = 0
    const phaseDetails = phases.map(phase => {
      const avgDuration = (phase.duration.min + phase.duration.max) / 2
      let adjustedDuration = avgDuration

      // Apply complexity factor
      adjustedDuration *= TIMELINE_FACTORS.complexity[complexity as keyof typeof TIMELINE_FACTORS.complexity]
      
      // Apply size factor
      adjustedDuration *= TIMELINE_FACTORS.size[sizeCategory as keyof typeof TIMELINE_FACTORS.size]
      
      // Apply fast track if selected
      if (fastTrack) {
        adjustedDuration *= TIMELINE_FACTORS.fastTrack
      }

      totalWeeks += adjustedDuration
      
      return {
        ...phase,
        actualDuration: Math.ceil(adjustedDuration),
        startWeek: Math.ceil(totalWeeks - adjustedDuration),
        endWeek: Math.ceil(totalWeeks)
      }
    })

    // Check for monsoon impact
    const start = new Date(startDate)
    const endDate = new Date(start)
    endDate.setDate(endDate.getDate() + (totalWeeks * 7))
    
    let monsoonWeeks = 0
    const currentDate = new Date(start)
    while (currentDate < endDate) {
      const month = currentDate.getMonth() + 1
      if (TIMELINE_FACTORS.monsoon.months.includes(month)) {
        monsoonWeeks++
      }
      currentDate.setDate(currentDate.getDate() + 7)
    }

    if (monsoonWeeks > 0 && projectType === 'construction') {
      totalWeeks += Math.ceil(monsoonWeeks * 0.3) // 30% delay during monsoon
    }

    setTimeline({
      phases: phaseDetails,
      totalWeeks: Math.ceil(totalWeeks),
      totalMonths: Math.ceil(totalWeeks / 4.33),
      startDate: start,
      endDate: new Date(start.getTime() + (totalWeeks * 7 * 24 * 60 * 60 * 1000)),
      monsoonImpact: monsoonWeeks > 0,
      fastTrack
    })
  }

  useEffect(() => {
    calculateTimeline()
  }, [projectType, projectSize, complexity, startDate, fastTrack])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <Card className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <Clock className="w-8 h-8 mr-3 text-primary" />
          Project Timeline Estimator
        </h2>
        <p className="text-gray-600">Plan your project schedule with accurate timeline predictions</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {/* Project Type */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Project Type</Label>
            <RadioGroup value={projectType} onValueChange={setProjectType}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="construction" id="construction" />
                  <Label htmlFor="construction">New Construction</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="interior" id="interior" />
                  <Label htmlFor="interior">Interior Design</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="renovation" id="renovation" />
                  <Label htmlFor="renovation">Renovation</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Project Size */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              Project Size: {projectSize[0]} sq ft
            </Label>
            <Slider
              value={projectSize}
              onValueChange={setProjectSize}
              min={500}
              max={10000}
              step={100}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>500 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          {/* Complexity */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Project Complexity</Label>
            <RadioGroup value={complexity} onValueChange={setComplexity}>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="simple" id="simple" />
                  <Label htmlFor="simple">Simple (Basic finishes)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard (Quality finishes)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complex" id="complex" />
                  <Label htmlFor="complex">Complex (Premium finishes)</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate" className="text-base font-semibold mb-3 block">
              Preferred Start Date
            </Label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* Fast Track Option */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="fastTrack"
              checked={fastTrack}
              onChange={(e) => setFastTrack(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="fastTrack" className="cursor-pointer">
              Fast Track Execution (20% faster, may increase costs)
            </Label>
          </div>
        </div>

        <div className="lg:col-span-2">
          {timeline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Timeline Summary */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Timeline</h3>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Total Duration</p>
                    <p className="text-2xl font-bold text-primary">
                      {timeline.totalMonths} months
                    </p>
                    <p className="text-sm text-gray-500">({timeline.totalWeeks} weeks)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="text-lg font-semibold">{formatDate(timeline.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expected Completion</p>
                    <p className="text-lg font-semibold">{formatDate(timeline.endDate)}</p>
                  </div>
                </div>

                {timeline.monsoonImpact && (
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Your project timeline includes monsoon season. We've added buffer time for weather-related delays.
                    </AlertDescription>
                  </Alert>
                )}

                {timeline.fastTrack && (
                  <Alert className="mb-4 border-green-200 bg-green-50">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Fast track execution enabled. Timeline reduced by 20% with optimized resource allocation.
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Gantt Chart */}
              <Card className="p-6">
                <h4 className="font-semibold text-lg mb-4">Project Phases</h4>
                <div className="space-y-3">
                  {timeline.phases.map((phase: any, index: number) => (
                    <div key={phase.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{phase.name}</span>
                        <span className="text-sm text-gray-500">
                          {phase.actualDuration} weeks
                        </span>
                      </div>
                      <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute h-full ${phase.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ 
                            width: `${(phase.actualDuration / timeline.totalWeeks) * 100}%`,
                            left: `${(phase.startWeek / timeline.totalWeeks) * 100}%`
                          }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between text-sm text-gray-500">
                  <span>Week 1</span>
                  <span>Week {Math.ceil(timeline.totalWeeks / 2)}</span>
                  <span>Week {timeline.totalWeeks}</span>
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-4">
                <Button className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Consultation
                </Button>
                <Button variant="outline" className="flex-1">
                  Download Timeline
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}