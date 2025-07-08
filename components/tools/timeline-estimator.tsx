'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Calendar, AlertCircle, CheckCircle2, CloudRain, Zap, Building2, Paintbrush, Hammer, FileText, Shovel, Truck, Wrench } from 'lucide-react'
// import { timelineEstimatorMockData } from '@/src/data/mockData'

// Project phases with durations (in weeks)
const PROJECT_PHASES = {
  construction: [
    { id: 'planning', name: 'Planning & Approvals', duration: { min: 2, max: 4 }, color: '#3B82F6', icon: FileText, tasks: ['Site Survey', 'Architectural Plans', 'Municipal Approvals', 'Structural Design'] },
    { id: 'foundation', name: 'Foundation & Structure', duration: { min: 3, max: 6 }, color: '#6B7280', icon: Shovel, tasks: ['Excavation', 'Footing', 'Plinth Beam', 'DPC Work'] },
    { id: 'superstructure', name: 'Superstructure', duration: { min: 8, max: 16 }, color: '#F59E0B', icon: Building2, tasks: ['Columns', 'Beams', 'Slabs', 'Staircase', 'Roof'] },
    { id: 'masonry', name: 'Masonry & Plastering', duration: { min: 4, max: 8 }, color: '#EAB308', icon: Hammer, tasks: ['Brick Work', 'External Plastering', 'Internal Plastering', 'Waterproofing'] },
    { id: 'flooring', name: 'Flooring & Tiling', duration: { min: 3, max: 5 }, color: '#10B981', icon: Hammer, tasks: ['Floor Leveling', 'Tile Laying', 'Grouting', 'Polishing'] },
    { id: 'painting', name: 'Painting & Finishing', duration: { min: 2, max: 4 }, color: '#8B5CF6', icon: Paintbrush, tasks: ['Primer Coating', 'Putty Work', 'Paint Application', 'Touch-ups'] },
    { id: 'electrical', name: 'Electrical & Plumbing', duration: { min: 3, max: 5 }, color: '#EF4444', icon: Zap, tasks: ['Conduit Laying', 'Wiring', 'Fixture Installation', 'Testing'] },
    { id: 'final', name: 'Final Touches & Handover', duration: { min: 1, max: 2 }, color: '#6366F1', icon: CheckCircle2, tasks: ['Cleaning', 'Snagging', 'Documentation', 'Handover'] }
  ],
  interior: [
    { id: 'design', name: 'Design & Planning', duration: { min: 1, max: 2 }, color: '#3B82F6', icon: FileText, tasks: ['Concept Design', '3D Visualization', 'Material Selection', 'BOQ Preparation'] },
    { id: 'civil', name: 'Civil Work', duration: { min: 2, max: 4 }, color: '#6B7280', icon: Hammer, tasks: ['False Ceiling', 'Partitions', 'Wall Modifications', 'Floor Work'] },
    { id: 'electrical', name: 'Electrical & Plumbing', duration: { min: 1, max: 2 }, color: '#EF4444', icon: Zap, tasks: ['Electrical Points', 'Light Fixtures', 'Plumbing Updates', 'AC Installation'] },
    { id: 'carpentry', name: 'Carpentry Work', duration: { min: 3, max: 5 }, color: '#F59E0B', icon: Wrench, tasks: ['Modular Units', 'Wardrobes', 'Kitchen Cabinets', 'Custom Furniture'] },
    { id: 'painting', name: 'Painting & Polish', duration: { min: 2, max: 3 }, color: '#8B5CF6', icon: Paintbrush, tasks: ['Wall Preparation', 'Primer & Paint', 'Wood Polish', 'Metal Paint'] },
    { id: 'furnishing', name: 'Furnishing & Decor', duration: { min: 1, max: 2 }, color: '#10B981', icon: Truck, tasks: ['Furniture Delivery', 'Curtains & Blinds', 'Decorative Items', 'Final Styling'] },
    { id: 'final', name: 'Final Inspection', duration: { min: 0.5, max: 1 }, color: '#6366F1', icon: CheckCircle2, tasks: ['Quality Check', 'Snag List', 'Client Walkthrough', 'Handover'] }
  ],
  renovation: [
    { id: 'assessment', name: 'Assessment & Planning', duration: { min: 0.5, max: 1 }, color: '#3B82F6', icon: FileText, tasks: ['Site Inspection', 'Scope Definition', 'Design Planning', 'Permits'] },
    { id: 'demolition', name: 'Demolition Work', duration: { min: 1, max: 2 }, color: '#EF4444', icon: Hammer, tasks: ['Protective Covering', 'Removal Work', 'Debris Disposal', 'Site Cleaning'] },
    { id: 'structural', name: 'Structural Changes', duration: { min: 2, max: 4 }, color: '#6B7280', icon: Building2, tasks: ['Wall Modifications', 'Beam Work', 'Opening Creation', 'Reinforcement'] },
    { id: 'services', name: 'Services Update', duration: { min: 1, max: 2 }, color: '#F59E0B', icon: Wrench, tasks: ['Electrical Updates', 'Plumbing Work', 'HVAC Modifications', 'Network Cabling'] },
    { id: 'finishing', name: 'Finishing Work', duration: { min: 2, max: 3 }, color: '#10B981', icon: Paintbrush, tasks: ['Flooring', 'Wall Finishes', 'Ceiling Work', 'Fixtures'] },
    { id: 'cleanup', name: 'Cleanup & Handover', duration: { min: 0.5, max: 1 }, color: '#8B5CF6', icon: CheckCircle2, tasks: ['Deep Cleaning', 'Touch-ups', 'Documentation', 'Keys Handover'] }
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
  const [projectSize, setProjectSize] = useState(2500)
  const [complexity, setComplexity] = useState('standard')
  const [startDate, setStartDate] = useState('')
  const [fastTrack, setFastTrack] = useState(false)
  const [timeline, setTimeline] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setStartDate(new Date().toISOString().split('T')[0])
  }, [])

  const calculateTimeline = () => {
    const phases = PROJECT_PHASES[projectType as keyof typeof PROJECT_PHASES]
    const size = projectSize
    
    let sizeCategory = 'medium'
    if (size < 1500) sizeCategory = 'small'
    else if (size > 3500 && size <= 6000) sizeCategory = 'large'
    else if (size > 6000) sizeCategory = 'xlarge'

    let totalWeeks = 0
    const phaseDetails = phases.map(phase => {
      const avgDuration = (phase.duration.min + phase.duration.max) / 2
      let adjustedDuration = avgDuration

      adjustedDuration *= TIMELINE_FACTORS.complexity[complexity as keyof typeof TIMELINE_FACTORS.complexity]
      adjustedDuration *= TIMELINE_FACTORS.size[sizeCategory as keyof typeof TIMELINE_FACTORS.size]
      
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
      totalWeeks += Math.ceil(monsoonWeeks * 0.3)
    }

    setTimeline({
      phases: phaseDetails,
      totalWeeks: Math.ceil(totalWeeks),
      totalMonths: Math.ceil(totalWeeks / 4.33),
      startDate: start,
      endDate: new Date(start.getTime() + (totalWeeks * 7 * 24 * 60 * 60 * 1000)),
      monsoonImpact: monsoonWeeks > 0,
      fastTrack,
      sizeCategory
    })
  }

  useEffect(() => {
    if (startDate) {
      calculateTimeline()
    }
  }, [projectType, projectSize, complexity, startDate, fastTrack])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const projectTypes = [
    { id: 'construction', label: 'New Construction', icon: Building2 },
    { id: 'interior', label: 'Interior Design', icon: Paintbrush },
    { id: 'renovation', label: 'Renovation', icon: Hammer }
  ]

  const complexityLevels = [
    { id: 'simple', label: 'Simple', description: 'Basic finishes' },
    { id: 'standard', label: 'Standard', description: 'Quality finishes' },
    { id: 'complex', label: 'Complex', description: 'Premium finishes' }
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
          Timeline Planner
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 font-light"
        >
          AI-powered project scheduling for Bangalore construction
        </motion.p>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Project Type */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-medium mb-4">Project Type</h3>
                <div className="space-y-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setProjectType(type.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all flex items-center ${
                        projectType === type.id 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <type.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Project Size */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="text-lg font-medium">Project Size</h3>
                  <span className="text-2xl font-light">{projectSize.toLocaleString()} sq ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="100"
                  value={projectSize}
                  onChange={(e) => setProjectSize(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>500</span>
                  <span>10,000 sq ft</span>
                </div>
              </motion.div>

              {/* Complexity */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-medium mb-4">Project Complexity</h3>
                <div className="space-y-3">
                  {complexityLevels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setComplexity(level.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        complexity === level.id 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="font-medium">{level.label}</div>
                      <div className={`text-sm mt-0.5 ${complexity === level.id ? 'text-gray-300' : 'text-gray-500'}`}>
                        {level.description}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Start Date */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <label htmlFor="startDate" className="text-lg font-medium mb-4 block">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  min={mounted ? new Date().toISOString().split('T')[0] : ''}
                />
              </motion.div>

              {/* Fast Track Option */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={fastTrack}
                    onChange={(e) => setFastTrack(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-md border-2 mr-3 mt-0.5 flex items-center justify-center transition-all ${
                    fastTrack
                      ? 'bg-gray-900 border-gray-900'
                      : 'border-gray-300'
                  }`}>
                    {fastTrack && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      Fast Track Execution
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      20% faster delivery with optimized resources
                    </p>
                  </div>
                </label>
              </motion.div>
            </div>

            {/* Timeline Visualization */}
            <div className="lg:col-span-2">
              {timeline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Timeline Summary */}
                  <div className="bg-gray-900 text-white rounded-2xl p-8">
                    <h3 className="text-2xl font-light mb-6">Project Timeline</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Total Duration</p>
                        <p className="text-3xl font-light">
                          {timeline.totalMonths} months
                        </p>
                        <p className="text-sm text-gray-400">({timeline.totalWeeks} weeks)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Start Date</p>
                        <p className="text-lg">{formatDate(timeline.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Completion</p>
                        <p className="text-lg">{formatDate(timeline.endDate)}</p>
                      </div>
                    </div>

                    {timeline.monsoonImpact && projectType === 'construction' && (
                      <div className="flex items-start bg-gray-800 rounded-xl p-4 mb-4">
                        <CloudRain className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Monsoon Impact Considered</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Timeline includes buffer for weather-related delays during June-September
                          </p>
                        </div>
                      </div>
                    )}

                    {timeline.fastTrack && (
                      <div className="flex items-start bg-gray-800 rounded-xl p-4">
                        <Zap className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Fast Track Enabled</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            Timeline optimized with parallel execution and additional resources
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Gantt Chart */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="font-medium text-lg mb-6">Project Phases</h4>
                    <div className="space-y-4">
                      {timeline.phases.map((phase: any, index: number) => {
                        const Icon = phase.icon
                        const [expanded, setExpanded] = useState(false)
                        return (
                          <div key={phase.id}>
                            <div 
                              className="flex items-center justify-between mb-2 cursor-pointer"
                              onClick={() => setExpanded(!expanded)}
                            >
                              <div className="flex items-center">
                                <Icon className="w-4 h-4 mr-2 text-gray-600" />
                                <span className="text-sm font-medium">{phase.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {phase.actualDuration} weeks
                              </span>
                            </div>
                            <div className="relative h-6 bg-gray-200 rounded-lg overflow-hidden mb-2">
                              <motion.div
                                className="absolute h-full rounded-lg"
                                style={{ backgroundColor: phase.color }}
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: `${(phase.actualDuration / timeline.totalWeeks) * 100}%`,
                                  left: `${(phase.startWeek / timeline.totalWeeks) * 100}%`
                                }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              />
                            </div>
                            {expanded && phase.tasks && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="ml-6 mb-2"
                              >
                                <div className="text-xs text-gray-600 space-y-1">
                                  {phase.tasks.map((task: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2">
                                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                      <span>{task}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-6 flex justify-between text-xs text-gray-500">
                      <span>Week 1</span>
                      <span>Week {Math.ceil(timeline.totalWeeks / 2)}</span>
                      <span>Week {timeline.totalWeeks}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Schedule Consultation
                    </button>
                    <button className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-medium">
                      Download Timeline
                    </button>
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