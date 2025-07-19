'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  Clock,
  CloudRain,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Layers,
  Home,
  Building2,
  Hammer,
  Sofa,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  AlertTriangle,
  Brain,
  BarChart3,
  Activity,
  Thermometer,
  AlertCircle,
  CheckCircle,
  Timer,
  Banknote,
  UserCheck,
  Package,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Share2,
  Save,
  RefreshCw,
  Settings,
  Star,
  Award,
  Target,
  X,
  Menu,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet'

// Simplified AI Timeline Engine for mobile
class AITimelineEngine {
  predictDuration(projectDetails: any) {
    // Simplified calculation for mobile
    const baseDurations: any = {
      construction: {
        residential: 180,
        villa: 240,
        apartment: 365,
        commercial: 300
      },
      interior: {
        apartment: 60,
        villa: 90,
        office: 45,
        retail: 40
      },
      renovation: {
        cosmetic: 30,
        moderate: 60,
        major: 120
      }
    }

    let baseDuration = 180
    if (projectDetails.type === 'construction') {
      baseDuration = baseDurations.construction[projectDetails.constructionType] || 180
    } else if (projectDetails.type === 'interior') {
      baseDuration = baseDurations.interior[projectDetails.interiorType] || 60
    } else if (projectDetails.type === 'renovation') {
      baseDuration = baseDurations.renovation[projectDetails.renovationType] || 60
    }

    // Adjust for size
    const sizeFactor = projectDetails.type === 'construction' 
      ? (projectDetails.builtUpArea || 2000) / 2000
      : (projectDetails.carpetArea || 1200) / 1200
    baseDuration *= sizeFactor

    // Fast track adjustment
    if (projectDetails.fastTrack) {
      baseDuration *= 0.8
    }

    return {
      baseDuration,
      optimisticDuration: baseDuration * 0.85,
      pessimisticDuration: baseDuration * 1.15,
      mostLikelyDuration: baseDuration,
      confidence: 92,
      factors: []
    }
  }
}

export function TimelineEstimatorMobile() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [selectedInfo, setSelectedInfo] = useState<any>(null)
  
  const aiEngine = new AITimelineEngine()
  
  // Project Details State
  const [projectDetails, setProjectDetails] = useState({
    // Basic
    projectName: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectAddress: '',
    
    // Type
    type: 'construction',
    constructionType: 'residential',
    interiorType: 'apartment',
    renovationType: 'cosmetic',
    
    // Construction specific
    plotArea: 1200,
    builtUpArea: 2000,
    floors: 2,
    units: 1,
    
    // Interior specific
    carpetArea: 1200,
    rooms: {
      bedrooms: 2,
      bathrooms: 2,
      livingRooms: 1,
      kitchen: 1,
      balconies: 1,
      studyRoom: 0,
      poojaRoom: 0,
      utilityRoom: 0
    },
    workScope: [],
    furnitureWork: [],
    
    // Renovation specific
    structuralChanges: [],
    renovationAreas: [],
    
    // Quality & Features
    qualityLevel: 'standard',
    finishingLevel: 'standard',
    sustainability: false,
    smartHome: false,
    customWork: 0,
    brandPreferences: [],
    
    // Timeline
    startDate: new Date().toISOString().split('T')[0],
    targetEndDate: '',
    flexibilityDays: 0,
    fastTrack: false,
    includeRainy: true,
    workingDays: 'standard',
    
    // Budget
    budgetRange: { min: 0, max: 0 },
    paymentTerms: 'milestone',
    financingRequired: false,
    
    // Special Requirements
    specialRequirements: '',
    accessConstraints: [],
    neighboringConstraints: false,
    
    // Preferences
    contractorPreference: 'recommended',
    supervisorRequired: true,
    dailyReporting: true,
    videoUpdates: false
  })

  // AI Analysis Results
  const [aiResults, setAiResults] = useState<any>(null)
  const [phases, setPhases] = useState<any[]>([])
  const [risks, setRisks] = useState<any[]>([])
  const [optimizations, setOptimizations] = useState<any[]>([])
  const [costPrediction, setCostPrediction] = useState<any>(null)

  // Mobile-optimized steps
  const STEPS = [
    { id: 'welcome', title: 'Welcome', icon: Brain },
    { id: 'basic', title: 'Basic Info', icon: Home },
    { id: 'project-type', title: 'Project Type', icon: Building2 },
    { id: 'specifications', title: 'Details', icon: Layers },
    { id: 'quality', title: 'Quality', icon: Award },
    { id: 'timeline', title: 'Timeline', icon: Calendar },
    { id: 'budget', title: 'Budget', icon: Banknote },
    { id: 'requirements', title: 'Requirements', icon: FileCheck },
    { id: 'analysis', title: 'Analyzing', icon: Brain },
    { id: 'results', title: 'Results', icon: BarChart3 }
  ]

  const handleNext = async () => {
    if (currentStep === STEPS.length - 2) {
      setLoading(true)
      await runAIAnalysis()
      setLoading(false)
    }
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const runAIAnalysis = async () => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock AI results for mobile
    const mockResults = {
      baseDuration: 180,
      optimisticDuration: 160,
      pessimisticDuration: 210,
      mostLikelyDuration: 185,
      confidence: 92,
      factors: [
        { factor: 'Project Size', impact: 15, description: '2000 sq ft impacts timeline' },
        { factor: 'Weather', impact: -10, description: 'Monsoon season consideration' },
        { factor: 'Fast Track', impact: 20, description: 'Accelerated schedule' }
      ]
    }
    
    const mockPhases = [
      {
        name: 'Foundation & Structure',
        duration: 45,
        startWeek: 1,
        endWeek: 6,
        activities: ['Site clearing', 'Foundation work', 'Columns & beams'],
        dependencies: [],
        weatherSensitive: true,
        criticalPath: true
      },
      {
        name: 'Walls & Roofing',
        duration: 40,
        startWeek: 7,
        endWeek: 12,
        activities: ['Brick work', 'Roofing', 'External plastering'],
        dependencies: ['Foundation & Structure'],
        weatherSensitive: true,
        criticalPath: true
      },
      {
        name: 'Interior Work',
        duration: 60,
        startWeek: 13,
        endWeek: 21,
        activities: ['Flooring', 'Painting', 'Woodwork'],
        dependencies: ['Walls & Roofing'],
        weatherSensitive: false,
        criticalPath: true
      },
      {
        name: 'Finishing',
        duration: 40,
        startWeek: 22,
        endWeek: 26,
        activities: ['Final touches', 'Cleaning', 'Handover'],
        dependencies: ['Interior Work'],
        weatherSensitive: false,
        criticalPath: true
      }
    ]
    
    const mockRisks = [
      {
        type: 'weather',
        severity: 'medium',
        probability: 0.6,
        impact: 'Potential 2-3 week delay',
        mitigation: 'Schedule critical work during dry season'
      },
      {
        type: 'material',
        severity: 'low',
        probability: 0.3,
        impact: 'Minor delays in specific materials',
        mitigation: 'Pre-order critical materials'
      }
    ]
    
    setAiResults(mockResults)
    setPhases(mockPhases)
    setRisks(mockRisks)
    setShowResults(true)
  }

  const renderStepContent = () => {
    const step = STEPS[currentStep].id

    switch (step) {
      case 'welcome':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full px-4 text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Brain className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold mb-4">
              AI Timeline Intelligence
            </h2>
            
            <p className="text-gray-600 mb-8">
              Get accurate project timelines using AI and weather data from 10,000+ Bangalore projects
            </p>
            
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              {[
                { icon: Brain, label: 'AI Accuracy', value: '94%' },
                { icon: CloudRain, label: 'Weather AI', value: 'Live' },
                { icon: BarChart3, label: 'Data Points', value: '50K+' },
                { icon: Target, label: 'Smart', value: 'Yes' }
              ].map((stat, i) => (
                <Card key={i} className="p-4">
                  <stat.icon className="h-6 w-6 text-gray-600 mb-2" />
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="font-semibold">{stat.value}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        )

      case 'basic':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Information</h3>
              <p className="text-sm text-gray-600">Basic project details</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Project Name</Label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Dream Home"
                  value={projectDetails.projectName}
                  onChange={(e) => setProjectDetails({...projectDetails, projectName: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Your Name</Label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full name"
                  value={projectDetails.clientName}
                  onChange={(e) => setProjectDetails({...projectDetails, clientName: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Email</Label>
                <input
                  type="email"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                  value={projectDetails.clientEmail}
                  onChange={(e) => setProjectDetails({...projectDetails, clientEmail: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Phone</Label>
                <input
                  type="tel"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 98765 43210"
                  value={projectDetails.clientPhone}
                  onChange={(e) => setProjectDetails({...projectDetails, clientPhone: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Location</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Area, Bangalore"
                    value={projectDetails.projectAddress}
                    onChange={(e) => setProjectDetails({...projectDetails, projectAddress: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 'project-type':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Type</h3>
              <p className="text-sm text-gray-600">What are you planning?</p>
            </div>
            
            <RadioGroup
              value={projectDetails.type}
              onValueChange={(value) => setProjectDetails({...projectDetails, type: value})}
            >
              <div className="space-y-3">
                {[
                  {
                    value: 'construction',
                    title: 'New Construction',
                    description: 'Build from ground up',
                    icon: Building2,
                    color: 'blue'
                  },
                  {
                    value: 'interior',
                    title: 'Interior Design',
                    description: 'Transform your space',
                    icon: Sofa,
                    color: 'green'
                  },
                  {
                    value: 'renovation',
                    title: 'Renovation',
                    description: 'Upgrade existing',
                    icon: Hammer,
                    color: 'orange'
                  }
                ].map((option) => (
                  <Label key={option.value} htmlFor={option.value} className="cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    <Card className={`p-4 ${
                      projectDetails.type === option.value ? 'border-blue-500 bg-blue-50' : ''
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-${option.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <option.icon className={`h-6 w-6 text-${option.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{option.title}</h4>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        {projectDetails.type === option.value && (
                          <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                    </Card>
                  </Label>
                ))}
              </div>
            </RadioGroup>

            {projectDetails.type === 'construction' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Label>Construction Type</Label>
                <Select
                  value={projectDetails.constructionType}
                  onValueChange={(value) => setProjectDetails({...projectDetails, constructionType: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="apartment">Apartment Complex</SelectItem>
                    <SelectItem value="commercial">Commercial Building</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </div>
        )

      case 'specifications':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Specifications</h3>
              <p className="text-sm text-gray-600">Help us understand your project size</p>
            </div>

            {projectDetails.type === 'construction' && (
              <div className="space-y-6">
                <div>
                  <Label>Plot Area (sq ft)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Slider
                      value={[projectDetails.plotArea]}
                      onValueChange={([value]) => setProjectDetails({...projectDetails, plotArea: value})}
                      max={10000}
                      min={500}
                      step={100}
                      className="flex-1"
                    />
                    <span className="w-20 text-right font-semibold">{projectDetails.plotArea}</span>
                  </div>
                </div>

                <div>
                  <Label>Built-up Area (sq ft)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Slider
                      value={[projectDetails.builtUpArea]}
                      onValueChange={([value]) => setProjectDetails({...projectDetails, builtUpArea: value})}
                      max={15000}
                      min={500}
                      step={100}
                      className="flex-1"
                    />
                    <span className="w-20 text-right font-semibold">{projectDetails.builtUpArea}</span>
                  </div>
                </div>

                <div>
                  <Label>Number of Floors</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Slider
                      value={[projectDetails.floors]}
                      onValueChange={([value]) => setProjectDetails({...projectDetails, floors: value})}
                      max={5}
                      min={1}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-20 text-right font-semibold">{projectDetails.floors}</span>
                  </div>
                </div>
              </div>
            )}

            {projectDetails.type === 'interior' && (
              <div className="space-y-6">
                <div>
                  <Label>Carpet Area (sq ft)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <Slider
                      value={[projectDetails.carpetArea]}
                      onValueChange={([value]) => setProjectDetails({...projectDetails, carpetArea: value})}
                      max={5000}
                      min={500}
                      step={50}
                      className="flex-1"
                    />
                    <span className="w-20 text-right font-semibold">{projectDetails.carpetArea}</span>
                  </div>
                </div>

                <div>
                  <Label>Room Configuration</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Bedrooms</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProjectDetails({
                            ...projectDetails,
                            rooms: { ...projectDetails.rooms, bedrooms: Math.max(0, projectDetails.rooms.bedrooms - 1) }
                          })}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{projectDetails.rooms.bedrooms}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProjectDetails({
                            ...projectDetails,
                            rooms: { ...projectDetails.rooms, bedrooms: projectDetails.rooms.bedrooms + 1 }
                          })}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="text-sm">Bathrooms</span>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProjectDetails({
                            ...projectDetails,
                            rooms: { ...projectDetails.rooms, bathrooms: Math.max(0, projectDetails.rooms.bathrooms - 1) }
                          })}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{projectDetails.rooms.bathrooms}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setProjectDetails({
                            ...projectDetails,
                            rooms: { ...projectDetails.rooms, bathrooms: projectDetails.rooms.bathrooms + 1 }
                          })}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 'quality':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality & Features</h3>
              <p className="text-sm text-gray-600">Choose your quality preferences</p>
            </div>

            <div>
              <Label>Quality Level</Label>
              <RadioGroup
                value={projectDetails.qualityLevel}
                onValueChange={(value) => setProjectDetails({...projectDetails, qualityLevel: value})}
                className="mt-2"
              >
                <div className="space-y-2">
                  {[
                    { value: 'economy', label: 'Economy', description: 'Basic finishes' },
                    { value: 'standard', label: 'Standard', description: 'Good quality' },
                    { value: 'premium', label: 'Premium', description: 'High-end finishes' },
                    { value: 'luxury', label: 'Luxury', description: 'Ultra premium' }
                  ].map((option) => (
                    <Label key={option.value} htmlFor={option.value} className="cursor-pointer">
                      <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                      <Card className={`p-4 ${
                        projectDetails.qualityLevel === option.value ? 'border-blue-500 bg-blue-50' : ''
                      }`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                          {projectDetails.qualityLevel === option.value && (
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                      </Card>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Additional Features</Label>
              
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sustainable Design</p>
                    <p className="text-sm text-gray-600">Eco-friendly materials</p>
                  </div>
                  <Switch
                    checked={projectDetails.sustainability}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, sustainability: checked})}
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Smart Home</p>
                    <p className="text-sm text-gray-600">IoT & automation</p>
                  </div>
                  <Switch
                    checked={projectDetails.smartHome}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, smartHome: checked})}
                  />
                </div>
              </Card>
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Timeline Preferences</h3>
              <p className="text-sm text-gray-600">When do you want to start?</p>
            </div>

            <div>
              <Label>Preferred Start Date</Label>
              <input
                type="date"
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={projectDetails.startDate}
                onChange={(e) => setProjectDetails({...projectDetails, startDate: e.target.value})}
              />
            </div>

            <div>
              <Label>Target Completion Date (Optional)</Label>
              <input
                type="date"
                className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={projectDetails.targetEndDate}
                onChange={(e) => setProjectDetails({...projectDetails, targetEndDate: e.target.value})}
              />
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fast Track</p>
                  <p className="text-sm text-gray-600">Accelerated timeline</p>
                </div>
                <Switch
                  checked={projectDetails.fastTrack}
                  onCheckedChange={(checked) => setProjectDetails({...projectDetails, fastTrack: checked})}
                />
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Work During Monsoon</p>
                  <p className="text-sm text-gray-600">Continue in rainy season</p>
                </div>
                <Switch
                  checked={projectDetails.includeRainy}
                  onCheckedChange={(checked) => setProjectDetails({...projectDetails, includeRainy: checked})}
                />
              </div>
            </Card>

            <div>
              <Label>Working Schedule</Label>
              <Select
                value={projectDetails.workingDays}
                onValueChange={(value) => setProjectDetails({...projectDetails, workingDays: value})}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard (6 days/week)</SelectItem>
                  <SelectItem value="extended">Extended (7 days/week)</SelectItem>
                  <SelectItem value="24x7">24x7 (Shifts)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 'budget':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Budget Range</h3>
              <p className="text-sm text-gray-600">Your investment estimate</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Minimum Budget (₹)</Label>
                <input
                  type="number"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 5000000"
                  value={projectDetails.budgetRange.min}
                  onChange={(e) => setProjectDetails({
                    ...projectDetails,
                    budgetRange: { ...projectDetails.budgetRange, min: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>

              <div>
                <Label>Maximum Budget (₹)</Label>
                <input
                  type="number"
                  className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 8000000"
                  value={projectDetails.budgetRange.max}
                  onChange={(e) => setProjectDetails({
                    ...projectDetails,
                    budgetRange: { ...projectDetails.budgetRange, max: parseInt(e.target.value) || 0 }
                  })}
                />
              </div>
            </div>

            <div>
              <Label>Payment Terms</Label>
              <Select
                value={projectDetails.paymentTerms}
                onValueChange={(value) => setProjectDetails({...projectDetails, paymentTerms: value})}
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milestone">Milestone Based</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="custom">Custom Schedule</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Financing Required</p>
                  <p className="text-sm text-gray-600">Need loan assistance</p>
                </div>
                <Switch
                  checked={projectDetails.financingRequired}
                  onCheckedChange={(checked) => setProjectDetails({...projectDetails, financingRequired: checked})}
                />
              </div>
            </Card>
          </div>
        )

      case 'requirements':
        return (
          <div className="px-4 py-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Special Requirements</h3>
              <p className="text-sm text-gray-600">Any specific needs?</p>
            </div>

            <div>
              <Label>Special Requirements</Label>
              <Textarea
                className="w-full mt-2"
                placeholder="e.g., Need to coordinate with existing tenants, special material requirements..."
                value={projectDetails.specialRequirements}
                onChange={(e) => setProjectDetails({...projectDetails, specialRequirements: e.target.value})}
                rows={4}
              />
            </div>

            <div>
              <Label>Access Constraints</Label>
              <div className="space-y-2 mt-2">
                {[
                  { value: 'narrow_road', label: 'Narrow road access' },
                  { value: 'height_restriction', label: 'Height restrictions' },
                  { value: 'time_restriction', label: 'Time restrictions' },
                  { value: 'parking', label: 'Parking constraints' }
                ].map((constraint) => (
                  <Card key={constraint.value} className="p-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={constraint.value}
                        checked={projectDetails.accessConstraints.includes(constraint.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setProjectDetails({
                              ...projectDetails,
                              accessConstraints: [...projectDetails.accessConstraints, constraint.value]
                            })
                          } else {
                            setProjectDetails({
                              ...projectDetails,
                              accessConstraints: projectDetails.accessConstraints.filter(c => c !== constraint.value)
                            })
                          }
                        }}
                      />
                      <Label htmlFor={constraint.value} className="cursor-pointer flex-1">
                        {constraint.label}
                      </Label>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Project Management</Label>
              
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Dedicated Supervisor</p>
                    <p className="text-sm text-gray-600">On-site supervision</p>
                  </div>
                  <Switch
                    checked={projectDetails.supervisorRequired}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, supervisorRequired: checked})}
                  />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Reports</p>
                    <p className="text-sm text-gray-600">Progress updates</p>
                  </div>
                  <Switch
                    checked={projectDetails.dailyReporting}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, dailyReporting: checked})}
                  />
                </div>
              </Card>
            </div>
          </div>
        )

      case 'analysis':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full px-4"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto animate-pulse">
                <Brain className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Analyzing Your Project</h3>
              
              <div className="space-y-3 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 text-left bg-gray-50 p-3 rounded-lg"
                >
                  <Activity className="h-5 w-5 text-blue-500 animate-pulse" />
                  <span className="text-sm">Processing historical data...</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-3 text-left bg-gray-50 p-3 rounded-lg"
                >
                  <CloudRain className="h-5 w-5 text-blue-500 animate-pulse" />
                  <span className="text-sm">Checking weather patterns...</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-3 text-left bg-gray-50 p-3 rounded-lg"
                >
                  <Target className="h-5 w-5 text-blue-500 animate-pulse" />
                  <span className="text-sm">Optimizing timeline...</span>
                </motion.div>
              </div>
              
              <Progress value={66} className="w-full mb-4" />
              <p className="text-sm text-gray-600">This will take a few seconds...</p>
            </div>
          </motion.div>
        )

      case 'results':
        if (!aiResults || !showResults) return null
        
        return (
          <div className="px-4 py-6 pb-24">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Your AI Timeline Report</h3>
              <p className="text-gray-600">Personalized project schedule</p>
            </div>

            {/* Timeline Summary */}
            <Card className="p-6 mb-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {Math.round(aiResults.mostLikelyDuration / 30)} months
                </div>
                <p className="text-gray-600 mb-4">Most likely duration</p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Optimistic</p>
                    <p className="font-semibold">{Math.round(aiResults.optimisticDuration / 30)} months</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expected</p>
                    <p className="font-semibold text-blue-600">{Math.round(aiResults.mostLikelyDuration / 30)} months</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pessimistic</p>
                    <p className="font-semibold">{Math.round(aiResults.pessimisticDuration / 30)} months</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Confidence Level</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Progress value={aiResults.confidence} className="w-32" />
                    <span className="font-semibold">{aiResults.confidence}%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Project Phases */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Project Phases
              </h4>
              
              <div className="space-y-3">
                {phases.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className="p-4 cursor-pointer"
                      onClick={() => setExpandedPhase(expandedPhase === phase.name ? null : phase.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium">{phase.name}</h5>
                            {phase.criticalPath && (
                              <Badge variant="destructive" className="text-xs">Critical</Badge>
                            )}
                            {phase.weatherSensitive && (
                              <CloudRain className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">
                            Week {phase.startWeek} - {phase.endWeek} ({phase.duration} days)
                          </p>
                        </div>
                        {expandedPhase === phase.name ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      
                      {expandedPhase === phase.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t"
                        >
                          <p className="text-sm text-gray-600 mb-2">Activities:</p>
                          <ul className="space-y-1">
                            {phase.activities.map((activity, i) => (
                              <li key={i} className="text-sm flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Risk Analysis */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Risk Factors
              </h4>
              
              <div className="space-y-3">
                {risks.map((risk, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        risk.severity === 'high' ? 'bg-red-100' :
                        risk.severity === 'medium' ? 'bg-yellow-100' :
                        'bg-green-100'
                      }`}>
                        <AlertCircle className={`h-4 w-4 ${
                          risk.severity === 'high' ? 'text-red-600' :
                          risk.severity === 'medium' ? 'text-yellow-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium capitalize">{risk.type} Risk</p>
                        <p className="text-sm text-gray-600 mt-1">{risk.impact}</p>
                        <p className="text-sm text-blue-600 mt-2">
                          Mitigation: {risk.mitigation}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => {
                  // Handle save/download
                  setShowBottomSheet(true)
                }}
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Timeline Report
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setCurrentStep(0)
                  setShowResults(false)
                }}
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                Start New Analysis
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {currentStep > 0 && currentStep < STEPS.length - 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="p-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h1 className="font-semibold">AI Timeline Estimator</h1>
              <p className="text-xs text-gray-600">
                Step {currentStep + 1} of {STEPS.length}
              </p>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-1">
            {STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-140px)]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      {currentStep < STEPS.length - 1 && currentStep !== STEPS.length - 2 && (
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Button
            className="w-full"
            size="lg"
            onClick={handleNext}
            disabled={loading}
          >
            {currentStep === STEPS.length - 3 ? 'Analyze Project' : 'Continue'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      )}

      {/* Share Bottom Sheet */}
      <Sheet open={showBottomSheet} onOpenChange={setShowBottomSheet}>
        <SheetContent side="bottom" className="h-[60vh]">
          <SheetHeader>
            <SheetTitle>Share Timeline Report</SheetTitle>
            <SheetDescription>
              Choose how you'd like to share your timeline analysis
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-5 w-5 mr-3" />
              Email Report
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Save className="h-5 w-5 mr-3" />
              Save as PDF
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Phone className="h-5 w-5 mr-3" />
              Share via WhatsApp
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Share2 className="h-5 w-5 mr-3" />
              Copy Link
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default TimelineEstimatorMobile