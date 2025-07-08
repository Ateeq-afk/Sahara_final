'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  Clock,
  CloudRain,
  Zap,
  Info,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Layers,
  Gauge,
  Home,
  Building2,
  Hammer,
  BedDouble,
  Bath,
  Sofa,
  ChefHat,
  Users,
  TreePine,
  Car,
  Droplets,
  Lightbulb,
  Wind,
  Shield,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

interface TimelinePhase {
  name: string
  duration: number
  startWeek: number
  endWeek: number
  description: string
  icon: React.ReactNode
  subtasks?: string[]
}

interface ProjectDetails {
  // Common
  type: 'construction' | 'interior' | 'renovation'
  startDate: string
  fastTrack: boolean
  includeRainy: boolean
  
  // Construction specific
  constructionType?: 'residential' | 'commercial' | 'villa' | 'apartment'
  floors?: number
  plotSize?: number
  builtUpArea?: number
  structureType?: 'rcc' | 'steel' | 'hybrid'
  
  // Interior specific
  propertyType?: 'apartment' | 'villa' | 'office' | 'retail'
  rooms?: {
    bedrooms: number
    bathrooms: number
    livingRooms: number
    kitchen: number
    balconies: number
  }
  workScope?: string[]
  furnitureWork?: string[]
  
  // Renovation specific
  renovationType?: 'structural' | 'cosmetic' | 'complete'
  age?: number
  renovationAreas?: string[]
  
  // Advanced options
  qualityLevel?: 'standard' | 'premium' | 'luxury'
  sustainability?: boolean
  smartHome?: boolean
  customWork?: number
}

const STEPS = {
  construction: [
    'type',
    'specifications',
    'quality',
    'timeline',
    'summary'
  ],
  interior: [
    'property',
    'rooms',
    'scope',
    'quality',
    'timeline',
    'summary'
  ],
  renovation: [
    'assessment',
    'areas',
    'quality',
    'timeline',
    'summary'
  ]
}

export default function TimelineEstimatorAdvanced() {
  const [currentStep, setCurrentStep] = useState(0)
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    type: 'construction',
    startDate: new Date().toISOString().split('T')[0],
    fastTrack: false,
    includeRainy: true,
    qualityLevel: 'standard',
    sustainability: false,
    smartHome: false,
    customWork: 0
  })

  const steps = STEPS[projectDetails.type]
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const calculateDetailedTimeline = (): { weeks: number, phases: TimelinePhase[] } => {
    let baseWeeks = 0
    let phases: TimelinePhase[] = []

    if (projectDetails.type === 'construction') {
      // Construction calculation
      const area = projectDetails.builtUpArea || 2000
      const floors = projectDetails.floors || 1
      
      baseWeeks = Math.ceil((area / 150) + (floors * 8))
      
      if (projectDetails.constructionType === 'villa') baseWeeks *= 1.2
      if (projectDetails.constructionType === 'commercial') baseWeeks *= 0.9
      
      // Generate construction phases
      phases = [
        {
          name: 'Design & Approvals',
          duration: Math.ceil(baseWeeks * 0.1),
          startWeek: 0,
          endWeek: Math.ceil(baseWeeks * 0.1),
          description: 'Architectural plans, structural design, and BBMP approvals',
          icon: <Layers className="h-5 w-5" />,
          subtasks: ['Site survey', 'Soil testing', 'Architectural drawings', 'BBMP approval']
        },
        {
          name: 'Foundation Work',
          duration: Math.ceil(baseWeeks * 0.15),
          startWeek: Math.ceil(baseWeeks * 0.1),
          endWeek: Math.ceil(baseWeeks * 0.25),
          description: 'Excavation, PCC, and foundation laying',
          icon: <Building2 className="h-5 w-5" />,
          subtasks: ['Excavation', 'Anti-termite treatment', 'PCC work', 'RCC foundation']
        },
        {
          name: 'Structural Work',
          duration: Math.ceil(baseWeeks * 0.25),
          startWeek: Math.ceil(baseWeeks * 0.25),
          endWeek: Math.ceil(baseWeeks * 0.5),
          description: 'Columns, beams, slabs, and roof structure',
          icon: <Building2 className="h-5 w-5" />,
          subtasks: ['Column casting', 'Beam & slab work', 'Staircase', 'Roof slab']
        },
        {
          name: 'Masonry & Plastering',
          duration: Math.ceil(baseWeeks * 0.2),
          startWeek: Math.ceil(baseWeeks * 0.5),
          endWeek: Math.ceil(baseWeeks * 0.7),
          description: 'Brick work, internal and external plastering',
          icon: <Hammer className="h-5 w-5" />,
          subtasks: ['Brick work', 'Internal plastering', 'External plastering', 'Waterproofing']
        },
        {
          name: 'MEP Installation',
          duration: Math.ceil(baseWeeks * 0.15),
          startWeek: Math.ceil(baseWeeks * 0.7),
          endWeek: Math.ceil(baseWeeks * 0.85),
          description: 'Electrical, plumbing, and HVAC systems',
          icon: <Gauge className="h-5 w-5" />,
          subtasks: ['Electrical wiring', 'Plumbing lines', 'HVAC ducting', 'Fire safety systems']
        },
        {
          name: 'Finishing Works',
          duration: Math.ceil(baseWeeks * 0.15),
          startWeek: Math.ceil(baseWeeks * 0.85),
          endWeek: baseWeeks,
          description: 'Flooring, painting, fixtures, and final touches',
          icon: <CheckCircle2 className="h-5 w-5" />,
          subtasks: ['Flooring', 'Painting', 'Doors & windows', 'Final fixtures']
        }
      ]
    } else if (projectDetails.type === 'interior') {
      // Interior calculation
      const totalRooms = Object.values(projectDetails.rooms || {}).reduce((a, b) => a + b, 0)
      baseWeeks = Math.ceil(totalRooms * 2.5)
      
      if (projectDetails.propertyType === 'villa') baseWeeks *= 1.3
      if (projectDetails.workScope?.includes('structural')) baseWeeks *= 1.4
      
      // Generate interior phases
      phases = [
        {
          name: 'Design & Planning',
          duration: Math.ceil(baseWeeks * 0.15),
          startWeek: 0,
          endWeek: Math.ceil(baseWeeks * 0.15),
          description: '3D designs, mood boards, and material selection',
          icon: <Layers className="h-5 w-5" />,
          subtasks: ['Space planning', '3D visualization', 'Material selection', 'Cost estimation']
        },
        {
          name: 'Civil & Electrical',
          duration: Math.ceil(baseWeeks * 0.25),
          startWeek: Math.ceil(baseWeeks * 0.15),
          endWeek: Math.ceil(baseWeeks * 0.4),
          description: 'False ceiling, electrical modifications, and civil work',
          icon: <Gauge className="h-5 w-5" />,
          subtasks: ['False ceiling', 'Electrical rewiring', 'Plumbing modifications', 'Wall modifications']
        },
        {
          name: 'Woodwork & Furniture',
          duration: Math.ceil(baseWeeks * 0.3),
          startWeek: Math.ceil(baseWeeks * 0.4),
          endWeek: Math.ceil(baseWeeks * 0.7),
          description: 'Custom furniture, wardrobes, and modular units',
          icon: <Sofa className="h-5 w-5" />,
          subtasks: ['Modular kitchen', 'Wardrobes', 'TV units', 'Study tables']
        },
        {
          name: 'Finishing & Decor',
          duration: Math.ceil(baseWeeks * 0.2),
          startWeek: Math.ceil(baseWeeks * 0.7),
          endWeek: Math.ceil(baseWeeks * 0.9),
          description: 'Painting, wallpapers, and decorative elements',
          icon: <Sparkles className="h-5 w-5" />,
          subtasks: ['Painting', 'Wallpapers', 'Curtains & blinds', 'Decorative lighting']
        },
        {
          name: 'Final Setup',
          duration: Math.ceil(baseWeeks * 0.1),
          startWeek: Math.ceil(baseWeeks * 0.9),
          endWeek: baseWeeks,
          description: 'Furniture placement, accessories, and handover',
          icon: <CheckCircle2 className="h-5 w-5" />,
          subtasks: ['Furniture arrangement', 'Accessories placement', 'Deep cleaning', 'Final walkthrough']
        }
      ]
    } else {
      // Renovation calculation
      const areas = projectDetails.renovationAreas?.length || 1
      baseWeeks = areas * 4
      
      if (projectDetails.renovationType === 'structural') baseWeeks *= 1.5
      if (projectDetails.renovationType === 'complete') baseWeeks *= 2
      
      // Generate renovation phases
      phases = [
        {
          name: 'Assessment & Planning',
          duration: Math.ceil(baseWeeks * 0.15),
          startWeek: 0,
          endWeek: Math.ceil(baseWeeks * 0.15),
          description: 'Structural assessment and renovation planning',
          icon: <Shield className="h-5 w-5" />,
          subtasks: ['Structural audit', 'Design planning', 'Permit applications', 'Contractor selection']
        },
        {
          name: 'Demolition & Prep',
          duration: Math.ceil(baseWeeks * 0.2),
          startWeek: Math.ceil(baseWeeks * 0.15),
          endWeek: Math.ceil(baseWeeks * 0.35),
          description: 'Controlled demolition and site preparation',
          icon: <Hammer className="h-5 w-5" />,
          subtasks: ['Protective measures', 'Demolition work', 'Debris removal', 'Site preparation']
        },
        {
          name: 'Structural Repairs',
          duration: Math.ceil(baseWeeks * 0.25),
          startWeek: Math.ceil(baseWeeks * 0.35),
          endWeek: Math.ceil(baseWeeks * 0.6),
          description: 'Foundation strengthening and structural modifications',
          icon: <Building2 className="h-5 w-5" />,
          subtasks: ['Foundation repair', 'Wall modifications', 'Roof repairs', 'Waterproofing']
        },
        {
          name: 'MEP Updates',
          duration: Math.ceil(baseWeeks * 0.2),
          startWeek: Math.ceil(baseWeeks * 0.6),
          endWeek: Math.ceil(baseWeeks * 0.8),
          description: 'Updating electrical, plumbing, and HVAC systems',
          icon: <Gauge className="h-5 w-5" />,
          subtasks: ['Electrical upgrades', 'Plumbing updates', 'HVAC modernization', 'Safety systems']
        },
        {
          name: 'Finishing & Restoration',
          duration: Math.ceil(baseWeeks * 0.2),
          startWeek: Math.ceil(baseWeeks * 0.8),
          endWeek: baseWeeks,
          description: 'Final finishes and restoration work',
          icon: <CheckCircle2 className="h-5 w-5" />,
          subtasks: ['Flooring', 'Painting', 'Fixture installation', 'Final touches']
        }
      ]
    }

    // Quality adjustments
    if (projectDetails.qualityLevel === 'premium') baseWeeks *= 1.15
    if (projectDetails.qualityLevel === 'luxury') baseWeeks *= 1.3
    
    // Fast track reduction
    if (projectDetails.fastTrack) baseWeeks *= 0.85
    
    // Custom work addition
    baseWeeks += projectDetails.customWork * 0.1
    
    // Monsoon buffer for Bangalore
    if (projectDetails.includeRainy && projectDetails.type !== 'interior') {
      const start = new Date(projectDetails.startDate)
      const end = new Date(start)
      end.setDate(end.getDate() + baseWeeks * 7)
      
      const monsoonMonths = [5, 6, 7, 8] // June to September
      let monsoonWeeks = 0
      
      for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
        if (monsoonMonths.includes(d.getMonth())) {
          monsoonWeeks += 1.5
        }
      }
      
      baseWeeks += monsoonWeeks
    }

    return { weeks: Math.ceil(baseWeeks), phases }
  }

  const renderStepContent = () => {
    const step = steps[currentStep]

    switch (projectDetails.type) {
      case 'construction':
        return renderConstructionStep(step)
      case 'interior':
        return renderInteriorStep(step)
      case 'renovation':
        return renderRenovationStep(step)
    }
  }

  const renderConstructionStep = (step: string) => {
    switch (step) {
      case 'type':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">What type of construction?</h3>
              <p className="text-gray-600">Choose your construction project type</p>
            </div>
            
            <RadioGroup
              value={projectDetails.constructionType}
              onValueChange={(value) => setProjectDetails({...projectDetails, constructionType: value as any})}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'residential', label: 'Residential House', icon: Home, description: 'Independent house construction' },
                  { value: 'villa', label: 'Luxury Villa', icon: Home, description: 'Premium villa with amenities' },
                  { value: 'apartment', label: 'Apartment Complex', icon: Building2, description: 'Multi-unit residential building' },
                  { value: 'commercial', label: 'Commercial Building', icon: Building2, description: 'Office or retail space' }
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={option.value}
                    className="cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    <Card className={`p-6 hover:border-blue-500 transition-all ${
                      projectDetails.constructionType === option.value ? 'border-blue-500 bg-blue-50' : ''
                    }`}>
                      <option.icon className="h-8 w-8 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-1">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </Card>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )

      case 'specifications':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Project Specifications</h3>
              <p className="text-gray-600">Help us understand your project size and requirements</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Number of Floors</Label>
                <RadioGroup
                  value={projectDetails.floors?.toString()}
                  onValueChange={(value) => setProjectDetails({...projectDetails, floors: parseInt(value)})}
                >
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <Label key={num} htmlFor={`floors-${num}`} className="cursor-pointer">
                        <RadioGroupItem value={num.toString()} id={`floors-${num}`} className="sr-only" />
                        <div className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                          projectDetails.floors === num 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          {num === 5 ? '5+' : num}
                        </div>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-medium">Plot Size</Label>
                  <span className="text-sm font-semibold">{(projectDetails.plotSize || 2400).toLocaleString()} sq ft</span>
                </div>
                <Slider
                  value={[projectDetails.plotSize || 2400]}
                  onValueChange={([value]) => setProjectDetails({...projectDetails, plotSize: value})}
                  max={20000}
                  min={600}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>600 sq ft</span>
                  <span>20,000 sq ft</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-medium">Built-up Area</Label>
                  <span className="text-sm font-semibold">{(projectDetails.builtUpArea || 2000).toLocaleString()} sq ft</span>
                </div>
                <Slider
                  value={[projectDetails.builtUpArea || 2000]}
                  onValueChange={([value]) => setProjectDetails({...projectDetails, builtUpArea: value})}
                  max={15000}
                  min={500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>500 sq ft</span>
                  <span>15,000 sq ft</span>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-3 block">Structure Type</Label>
                <RadioGroup
                  value={projectDetails.structureType}
                  onValueChange={(value) => setProjectDetails({...projectDetails, structureType: value as any})}
                >
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'rcc', label: 'RCC Frame', description: 'Reinforced Concrete' },
                      { value: 'steel', label: 'Steel Frame', description: 'Structural Steel' },
                      { value: 'hybrid', label: 'Hybrid', description: 'RCC + Steel' }
                    ].map((option) => (
                      <Label key={option.value} htmlFor={option.value} className="cursor-pointer">
                        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                        <Card className={`p-4 text-center hover:border-blue-500 transition-all ${
                          projectDetails.structureType === option.value ? 'border-blue-500 bg-blue-50' : ''
                        }`}>
                          <h4 className="font-medium mb-1">{option.label}</h4>
                          <p className="text-xs text-gray-600">{option.description}</p>
                        </Card>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 'quality':
        return renderQualityStep()
      case 'timeline':
        return renderTimelineStep()
      case 'summary':
        return renderSummary()
    }
  }

  const renderInteriorStep = (step: string) => {
    switch (step) {
      case 'property':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Property Details</h3>
              <p className="text-gray-600">Tell us about your property</p>
            </div>
            
            <RadioGroup
              value={projectDetails.propertyType}
              onValueChange={(value) => setProjectDetails({...projectDetails, propertyType: value as any})}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'apartment', label: 'Apartment', icon: Building2, description: 'Flat or condominium' },
                  { value: 'villa', label: 'Villa', icon: Home, description: 'Independent house' },
                  { value: 'office', label: 'Office', icon: Building2, description: 'Commercial workspace' },
                  { value: 'retail', label: 'Retail Space', icon: Building2, description: 'Shop or showroom' }
                ].map((option) => (
                  <Label
                    key={option.value}
                    htmlFor={`property-${option.value}`}
                    className="cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`property-${option.value}`} className="sr-only" />
                    <Card className={`p-6 hover:border-blue-500 transition-all ${
                      projectDetails.propertyType === option.value ? 'border-blue-500 bg-blue-50' : ''
                    }`}>
                      <option.icon className="h-8 w-8 mb-3 text-blue-600" />
                      <h4 className="font-semibold mb-1">{option.label}</h4>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </Card>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        )

      case 'rooms':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Room Configuration</h3>
              <p className="text-gray-600">Specify the number of rooms in your property</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { key: 'bedrooms', label: 'Bedrooms', icon: BedDouble, max: 6 },
                { key: 'bathrooms', label: 'Bathrooms', icon: Bath, max: 6 },
                { key: 'livingRooms', label: 'Living Rooms', icon: Sofa, max: 3 },
                { key: 'kitchen', label: 'Kitchen', icon: ChefHat, max: 2 },
                { key: 'balconies', label: 'Balconies', icon: TreePine, max: 4 }
              ].map((room) => (
                <div key={room.key} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <room.icon className="h-5 w-5 text-gray-600" />
                    <Label className="text-base font-medium">{room.label}</Label>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(room.max + 1)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setProjectDetails({
                          ...projectDetails,
                          rooms: {
                            ...projectDetails.rooms,
                            [room.key]: i
                          } as any
                        })}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          (projectDetails.rooms as any)?.[room.key] === i
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 'scope':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Work Scope</h3>
              <p className="text-gray-600">Select all the work you need</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Interior Work Required</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'falseCeiling', label: 'False Ceiling', icon: Layers },
                    { value: 'electrical', label: 'Electrical Work', icon: Lightbulb },
                    { value: 'plumbing', label: 'Plumbing Updates', icon: Droplets },
                    { value: 'flooring', label: 'New Flooring', icon: Layers },
                    { value: 'painting', label: 'Painting', icon: Sparkles },
                    { value: 'structural', label: 'Wall Modifications', icon: Building2 },
                    { value: 'hvac', label: 'AC Installation', icon: Wind },
                    { value: 'security', label: 'Security Systems', icon: Shield }
                  ].map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={`scope-${item.value}`}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-blue-500 transition-all">
                        <Checkbox
                          id={`scope-${item.value}`}
                          checked={projectDetails.workScope?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            const current = projectDetails.workScope || []
                            if (checked) {
                              setProjectDetails({...projectDetails, workScope: [...current, item.value]})
                            } else {
                              setProjectDetails({...projectDetails, workScope: current.filter(v => v !== item.value)})
                            }
                          }}
                        />
                        <item.icon className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Furniture & Fixtures</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'modularKitchen', label: 'Modular Kitchen' },
                    { value: 'wardrobes', label: 'Wardrobes' },
                    { value: 'tvUnit', label: 'TV Units' },
                    { value: 'studyTable', label: 'Study Tables' },
                    { value: 'crockeryUnit', label: 'Crockery Units' },
                    { value: 'shoerack', label: 'Shoe Racks' },
                    { value: 'vanity', label: 'Bathroom Vanities' },
                    { value: 'storage', label: 'Storage Units' }
                  ].map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={`furniture-${item.value}`}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-blue-500 transition-all">
                        <Checkbox
                          id={`furniture-${item.value}`}
                          checked={projectDetails.furnitureWork?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            const current = projectDetails.furnitureWork || []
                            if (checked) {
                              setProjectDetails({...projectDetails, furnitureWork: [...current, item.value]})
                            } else {
                              setProjectDetails({...projectDetails, furnitureWork: current.filter(v => v !== item.value)})
                            }
                          }}
                        />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'quality':
        return renderQualityStep()
      case 'timeline':
        return renderTimelineStep()
      case 'summary':
        return renderSummary()
    }
  }

  const renderRenovationStep = (step: string) => {
    switch (step) {
      case 'assessment':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Renovation Assessment</h3>
              <p className="text-gray-600">Help us understand your renovation needs</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-3 block">Type of Renovation</Label>
                <RadioGroup
                  value={projectDetails.renovationType}
                  onValueChange={(value) => setProjectDetails({...projectDetails, renovationType: value as any})}
                >
                  <div className="space-y-3">
                    {[
                      { value: 'cosmetic', label: 'Cosmetic Update', description: 'Paint, fixtures, and minor updates' },
                      { value: 'structural', label: 'Structural Changes', description: 'Wall modifications, layout changes' },
                      { value: 'complete', label: 'Complete Overhaul', description: 'Full property renovation' }
                    ].map((option) => (
                      <Label key={option.value} htmlFor={`reno-${option.value}`} className="cursor-pointer">
                        <RadioGroupItem value={option.value} id={`reno-${option.value}`} className="sr-only" />
                        <Card className={`p-4 hover:border-blue-500 transition-all ${
                          projectDetails.renovationType === option.value ? 'border-blue-500 bg-blue-50' : ''
                        }`}>
                          <h4 className="font-semibold mb-1">{option.label}</h4>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </Card>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-base font-medium">Property Age</Label>
                  <span className="text-sm font-semibold">{projectDetails.age || 10} years</span>
                </div>
                <Slider
                  value={[projectDetails.age || 10]}
                  onValueChange={([value]) => setProjectDetails({...projectDetails, age: value})}
                  max={50}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 year</span>
                  <span>50 years</span>
                </div>
              </div>
            </div>
          </div>
        )

      case 'areas':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Areas to Renovate</h3>
              <p className="text-gray-600">Select all areas that need renovation</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'livingRoom', label: 'Living Room', icon: Sofa },
                { value: 'bedroom', label: 'Bedrooms', icon: BedDouble },
                { value: 'kitchen', label: 'Kitchen', icon: ChefHat },
                { value: 'bathroom', label: 'Bathrooms', icon: Bath },
                { value: 'balcony', label: 'Balcony', icon: TreePine },
                { value: 'terrace', label: 'Terrace', icon: Home },
                { value: 'parking', label: 'Parking', icon: Car },
                { value: 'exterior', label: 'Exterior', icon: Building2 }
              ].map((area) => (
                <Label
                  key={area.value}
                  htmlFor={`area-${area.value}`}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-blue-500 transition-all">
                    <Checkbox
                      id={`area-${area.value}`}
                      checked={projectDetails.renovationAreas?.includes(area.value)}
                      onCheckedChange={(checked) => {
                        const current = projectDetails.renovationAreas || []
                        if (checked) {
                          setProjectDetails({...projectDetails, renovationAreas: [...current, area.value]})
                        } else {
                          setProjectDetails({...projectDetails, renovationAreas: current.filter(v => v !== area.value)})
                        }
                      }}
                    />
                    <area.icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium">{area.label}</span>
                  </div>
                </Label>
              ))}
            </div>
          </div>
        )

      case 'quality':
        return renderQualityStep()
      case 'timeline':
        return renderTimelineStep()
      case 'summary':
        return renderSummary()
    }
  }

  const renderQualityStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Quality & Features</h3>
        <p className="text-gray-600">Choose your quality level and additional features</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Quality Level</Label>
          <RadioGroup
            value={projectDetails.qualityLevel}
            onValueChange={(value) => setProjectDetails({...projectDetails, qualityLevel: value as any})}
          >
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'standard', label: 'Standard', description: 'Quality materials, good finish', price: '₹1,800-2,200/sqft' },
                { value: 'premium', label: 'Premium', description: 'Premium materials, excellent finish', price: '₹2,500-3,000/sqft' },
                { value: 'luxury', label: 'Luxury', description: 'Luxury materials, bespoke finish', price: '₹3,500+/sqft' }
              ].map((option) => (
                <Label key={option.value} htmlFor={`quality-${option.value}`} className="cursor-pointer">
                  <RadioGroupItem value={option.value} id={`quality-${option.value}`} className="sr-only" />
                  <Card className={`p-6 hover:border-blue-500 transition-all ${
                    projectDetails.qualityLevel === option.value ? 'border-blue-500 bg-blue-50' : ''
                  }`}>
                    <h4 className="font-semibold mb-1">{option.label}</h4>
                    <p className="text-xs text-gray-600 mb-2">{option.description}</p>
                    <p className="text-sm font-semibold text-blue-600">{option.price}</p>
                  </Card>
                </Label>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium block">Additional Features</Label>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <TreePine className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">Sustainable Building</p>
                <p className="text-xs text-gray-500">Solar, rainwater harvesting, etc.</p>
              </div>
            </div>
            <Switch
              checked={projectDetails.sustainability}
              onCheckedChange={(checked) => setProjectDetails({...projectDetails, sustainability: checked})}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-sm">Smart Home Features</p>
                <p className="text-xs text-gray-500">Automation, IoT devices, etc.</p>
              </div>
            </div>
            <Switch
              checked={projectDetails.smartHome}
              onCheckedChange={(checked) => setProjectDetails({...projectDetails, smartHome: checked})}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <Label className="text-base font-medium">Custom Work Complexity</Label>
            <span className="text-sm font-semibold">{projectDetails.customWork}%</span>
          </div>
          <Slider
            value={[projectDetails.customWork]}
            onValueChange={([value]) => setProjectDetails({...projectDetails, customWork: value})}
            max={100}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Standard</span>
            <span>Highly Custom</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTimelineStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold mb-2">Timeline Preferences</h3>
        <p className="text-gray-600">Set your project schedule and preferences</p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Preferred Start Date</Label>
          <input
            type="date"
            value={projectDetails.startDate}
            onChange={(e) => setProjectDetails({...projectDetails, startDate: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-sm">Fast Track Execution</p>
                <p className="text-xs text-gray-500">15% faster with parallel work</p>
              </div>
            </div>
            <Switch
              checked={projectDetails.fastTrack}
              onCheckedChange={(checked) => setProjectDetails({...projectDetails, fastTrack: checked})}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <CloudRain className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-sm">Monsoon Buffer</p>
                <p className="text-xs text-gray-500">Account for Bangalore weather</p>
              </div>
            </div>
            <Switch
              checked={projectDetails.includeRainy}
              onCheckedChange={(checked) => setProjectDetails({...projectDetails, includeRainy: checked})}
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderSummary = () => {
    const { weeks, phases } = calculateDetailedTimeline()
    const endDate = new Date(projectDetails.startDate)
    endDate.setDate(endDate.getDate() + weeks * 7)

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-2xl font-semibold mb-2">Your Project Timeline</h3>
          <p className="text-gray-600">Based on your requirements, here's your detailed timeline</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
            <p className="text-sm text-gray-600 mb-1">Total Duration</p>
            <p className="text-3xl font-bold text-gray-900">{Math.floor(weeks / 4)} months</p>
            <p className="text-sm text-gray-500">{weeks} weeks</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <p className="text-sm text-gray-600 mb-1">Start Date</p>
            <p className="text-xl font-semibold text-gray-900">
              {new Date(projectDetails.startDate).toLocaleDateString('en-IN', { 
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
            <p className="text-sm text-gray-600 mb-1">Completion</p>
            <p className="text-xl font-semibold text-gray-900">
              {endDate.toLocaleDateString('en-IN', { 
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </p>
          </Card>
        </div>

        {/* AI Insights */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-blue-900">AI Timeline Insights</p>
              <ul className="space-y-1 text-sm text-blue-800">
                {projectDetails.includeRainy && (
                  <li>• Monsoon buffer added for June-September periods</li>
                )}
                {projectDetails.fastTrack && (
                  <li>• Fast track enabled: 15% time reduction with optimized resources</li>
                )}
                {projectDetails.qualityLevel === 'luxury' && (
                  <li>• Luxury finish requires additional time for custom work</li>
                )}
                {projectDetails.sustainability && (
                  <li>• Sustainable features add 2-3 weeks for specialized installations</li>
                )}
              </ul>
            </div>
          </div>
        </Card>

        {/* Detailed Phases */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Project Phases</h4>
          <div className="space-y-4">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-blue-100 text-blue-700">
                      {phase.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{phase.name}</h4>
                        <span className="text-sm text-gray-500">{phase.duration} weeks</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                      
                      {phase.subtasks && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {phase.subtasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <Progress value={0} className="h-2" />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">Week {phase.startWeek + 1}</span>
                          <span className="text-xs text-gray-500">Week {phase.endWeek}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {index < phases.length - 1 && (
                  <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <Button size="lg" className="flex-1">
            Save Timeline
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="flex-1">
            Download Report
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">AI-Powered Timeline Engine</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Project Timeline Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get precise timelines tailored to your specific project requirements
          </p>
        </motion.div>

        {/* Project Type Selection */}
        {currentStep === 0 && (
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Select Your Project Type</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'construction', label: 'New Construction', icon: Building2, description: 'Build from ground up' },
                { value: 'interior', label: 'Interior Design', icon: Sofa, description: 'Transform your space' },
                { value: 'renovation', label: 'Renovation', icon: Hammer, description: 'Upgrade existing property' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setProjectDetails({...projectDetails, type: option.value as any})
                    setCurrentStep(1)
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all hover:border-blue-500 hover:bg-blue-50 ${
                    projectDetails.type === option.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <option.icon className="h-12 w-12 mb-4 mx-auto text-blue-600" />
                  <h3 className="font-semibold mb-1">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Step Content */}
        {currentStep > 0 && (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Step {currentStep} of {steps.length}</span>
                <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Main Content */}
            <Card className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentStep < steps.length - 1 && (
                <div className="flex justify-between mt-12">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  )
}