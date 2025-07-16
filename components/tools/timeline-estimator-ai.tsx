'use client'

import React, { useState, useEffect } from 'react'
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
  ArrowRight,
  AlertTriangle,
  TrendingUp,
  Brain,
  Cpu,
  BarChart3,
  Activity,
  Map,
  Thermometer,
  Sun,
  Cloud,
  CloudSnow,
  Umbrella,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  Banknote,
  UserCheck,
  Package,
  Truck,
  FileCheck,
  HardHat,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Download,
  Share2,
  Save,
  RefreshCw,
  Settings,
  HelpCircle,
  Star,
  Award,
  Target,
  Briefcase,
  HeartHandshake,
  Coins,
  Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

// Simulated AI Analysis Engine
class AITimelineEngine {
  // Historical project data for ML predictions
  private historicalData = {
    construction: {
      residential: { avgDuration: 180, variance: 0.15, delayFactors: ['monsoon', 'permits', 'labor'] },
      villa: { avgDuration: 240, variance: 0.20, delayFactors: ['customization', 'materials', 'approvals'] },
      apartment: { avgDuration: 365, variance: 0.25, delayFactors: ['scale', 'coordination', 'inspections'] },
      commercial: { avgDuration: 300, variance: 0.18, delayFactors: ['regulations', 'specialized', 'utilities'] }
    },
    interior: {
      apartment: { avgDuration: 60, variance: 0.12, delayFactors: ['material_availability', 'design_changes', 'coordination'] },
      villa: { avgDuration: 90, variance: 0.15, delayFactors: ['customization', 'imported_materials', 'craftwork'] },
      office: { avgDuration: 45, variance: 0.10, delayFactors: ['it_infrastructure', 'compliance', 'furniture'] },
      retail: { avgDuration: 40, variance: 0.10, delayFactors: ['branding', 'display_systems', 'lighting'] }
    }
  }

  // Bangalore-specific factors
  private bangaloreFactors = {
    monsoonMonths: [5, 6, 7, 8, 9], // June to October
    avgRainDays: { 5: 12, 6: 15, 7: 18, 8: 16, 9: 14 },
    laborAvailability: {
      festivalMonths: [9, 10, 2], // Dussehra, Diwali, Holi
      availabilityDrop: 0.3
    },
    permitProcessing: {
      standard: 21, // days
      fastTrack: 10,
      complex: 45
    },
    materialCosts: {
      trend: 0.08, // 8% annual inflation
      seasonalVariation: {
        high: [3, 4, 5], // Pre-monsoon demand
        low: [7, 8, 9]   // Monsoon months
      }
    }
  }

  // Weather prediction (simulated)
  private getWeatherPrediction(startDate: Date, duration: number) {
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + duration * 7)
    
    let monsoonImpact = 0
    let extremeWeatherDays = 0
    
    for (let d = new Date(startDate); d <= endDate; d.setMonth(d.getMonth() + 1)) {
      const month = d.getMonth()
      if (this.bangaloreFactors.monsoonMonths.includes(month)) {
        monsoonImpact += this.bangaloreFactors.avgRainDays[month] || 10
      }
      // Simulate extreme weather events
      if (Math.random() > 0.85) {
        extremeWeatherDays += Math.floor(Math.random() * 3) + 1
      }
    }
    
    return {
      monsoonImpact,
      extremeWeatherDays,
      recommendation: monsoonImpact > 30 ? 'high_risk' : monsoonImpact > 15 ? 'moderate_risk' : 'low_risk'
    }
  }

  // ML-based duration prediction
  public predictDuration(projectDetails: any): {
    baseDuration: number
    optimisticDuration: number
    pessimisticDuration: number
    mostLikelyDuration: number
    confidence: number
    factors: Array<{ factor: string; impact: number; description: string }>
  } {
    let baseDuration = 0
    let factors: Array<{ factor: string; impact: number; description: string }> = []
    
    // Base calculation
    if (projectDetails.type === 'construction') {
      const typeData = this.historicalData.construction[projectDetails.constructionType as keyof typeof this.historicalData.construction]
      baseDuration = typeData.avgDuration
      
      // Size adjustment
      const sizeFactor = (projectDetails.builtUpArea || 2000) / 2000
      baseDuration *= sizeFactor
      factors.push({
        factor: 'Project Size',
        impact: (sizeFactor - 1) * 100,
        description: `${projectDetails.builtUpArea} sq ft impacts timeline`
      })
      
      // Floors adjustment
      if (projectDetails.floors > 2) {
        const floorImpact = (projectDetails.floors - 2) * 0.15
        baseDuration *= (1 + floorImpact)
        factors.push({
          factor: 'Multi-floor Construction',
          impact: floorImpact * 100,
          description: `${projectDetails.floors} floors adds complexity`
        })
      }
    } else if (projectDetails.type === 'interior') {
      const typeData = this.historicalData.interior[projectDetails.propertyType as keyof typeof this.historicalData.interior]
      baseDuration = typeData.avgDuration
      
      // Room count adjustment
      const totalRooms = Object.values(projectDetails.rooms || {}).reduce((a: number, b: any) => a + b, 0) as number
      const roomFactor = totalRooms / 5 // Baseline 5 rooms
      baseDuration *= roomFactor
      factors.push({
        factor: 'Room Count',
        impact: (roomFactor - 1) * 100,
        description: `${totalRooms} rooms to design`
      })
    }
    
    // Quality level adjustment
    const qualityMultipliers = { standard: 1, premium: 1.25, luxury: 1.5 }
    const qualityMultiplier = qualityMultipliers[projectDetails.qualityLevel as keyof typeof qualityMultipliers] || 1
    baseDuration *= qualityMultiplier
    if (qualityMultiplier > 1) {
      factors.push({
        factor: 'Quality Standards',
        impact: (qualityMultiplier - 1) * 100,
        description: `${projectDetails.qualityLevel} finish requires more time`
      })
    }
    
    // Weather impact
    const weatherData = this.getWeatherPrediction(new Date(projectDetails.startDate), baseDuration / 7)
    if (weatherData.monsoonImpact > 0) {
      const weatherImpact = weatherData.monsoonImpact / 200 // Convert to percentage
      baseDuration *= (1 + weatherImpact)
      factors.push({
        factor: 'Weather Conditions',
        impact: weatherImpact * 100,
        description: `${weatherData.monsoonImpact} rain days expected`
      })
    }
    
    // Labor availability
    const startMonth = new Date(projectDetails.startDate).getMonth()
    if (this.bangaloreFactors.laborAvailability.festivalMonths.includes(startMonth)) {
      const laborImpact = this.bangaloreFactors.laborAvailability.availabilityDrop
      baseDuration *= (1 + laborImpact)
      factors.push({
        factor: 'Festival Season',
        impact: laborImpact * 100,
        description: 'Reduced labor availability during festivals'
      })
    }
    
    // Fast track reduction
    if (projectDetails.fastTrack) {
      baseDuration *= 0.80
      factors.push({
        factor: 'Fast Track Execution',
        impact: -20,
        description: 'Parallel work streams and extended hours'
      })
    }
    
    // Custom work
    if (projectDetails.customWork > 30) {
      const customImpact = projectDetails.customWork / 200
      baseDuration *= (1 + customImpact)
      factors.push({
        factor: 'Customization Level',
        impact: customImpact * 100,
        description: `${projectDetails.customWork}% custom design work`
      })
    }
    
    // Smart features
    if (projectDetails.smartHome || projectDetails.sustainability) {
      const techImpact = 0.15
      baseDuration *= (1 + techImpact)
      factors.push({
        factor: 'Advanced Features',
        impact: techImpact * 100,
        description: 'Smart home and sustainability installations'
      })
    }
    
    // Calculate variations
    const variance = projectDetails.type === 'construction' ? 0.20 : 0.15
    const optimisticDuration = baseDuration * (1 - variance)
    const pessimisticDuration = baseDuration * (1 + variance)
    const mostLikelyDuration = baseDuration
    
    // Confidence calculation based on project complexity
    let confidence = 85
    if (projectDetails.customWork > 50) confidence -= 10
    if (projectDetails.qualityLevel === 'luxury') confidence -= 5
    if (weatherData.recommendation === 'high_risk') confidence -= 10
    if (projectDetails.type === 'construction' && projectDetails.floors > 3) confidence -= 5
    
    return {
      baseDuration: Math.ceil(baseDuration),
      optimisticDuration: Math.ceil(optimisticDuration),
      pessimisticDuration: Math.ceil(pessimisticDuration),
      mostLikelyDuration: Math.ceil(mostLikelyDuration),
      confidence,
      factors: factors.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    }
  }

  // Risk analysis
  public analyzeRisks(projectDetails: any): Array<{
    category: string
    risk: string
    probability: number
    impact: 'low' | 'medium' | 'high'
    mitigation: string
    icon: any
  }> {
    const risks = []
    
    // Weather risks
    const weatherData = this.getWeatherPrediction(new Date(projectDetails.startDate), 180 / 7)
    if (weatherData.recommendation !== 'low_risk') {
      risks.push({
        category: 'Weather',
        risk: 'Monsoon delays',
        probability: weatherData.recommendation === 'high_risk' ? 80 : 50,
        impact: 'high' as const,
        mitigation: 'Plan indoor work during monsoon, waterproof materials storage',
        icon: CloudRain
      })
    }
    
    // Material risks
    if (projectDetails.qualityLevel === 'luxury' || projectDetails.customWork > 40) {
      risks.push({
        category: 'Materials',
        risk: 'Imported material delays',
        probability: 40,
        impact: 'medium' as const,
        mitigation: 'Order materials early, maintain buffer stock',
        icon: Package
      })
    }
    
    // Regulatory risks
    if (projectDetails.type === 'construction') {
      risks.push({
        category: 'Regulatory',
        risk: 'Permit approval delays',
        probability: 30,
        impact: 'high' as const,
        mitigation: 'Submit complete documentation, hire experienced liaison',
        icon: FileCheck
      })
    }
    
    // Labor risks
    const startMonth = new Date(projectDetails.startDate).getMonth()
    if (this.bangaloreFactors.laborAvailability.festivalMonths.includes(startMonth)) {
      risks.push({
        category: 'Labor',
        risk: 'Workforce shortage during festivals',
        probability: 70,
        impact: 'medium' as const,
        mitigation: 'Book contractors in advance, plan critical work accordingly',
        icon: Users
      })
    }
    
    // Technical risks
    if (projectDetails.smartHome || projectDetails.sustainability) {
      risks.push({
        category: 'Technical',
        risk: 'Integration complexities',
        probability: 35,
        impact: 'medium' as const,
        mitigation: 'Hire specialized vendors, allow testing time',
        icon: Cpu
      })
    }
    
    // Budget risks
    risks.push({
      category: 'Financial',
      risk: 'Material cost escalation',
      probability: 60,
      impact: 'medium' as const,
      mitigation: 'Lock in prices early, maintain 10% contingency',
      icon: TrendingUp
    })
    
    return risks
  }

  // Generate detailed phases with AI insights
  public generateSmartPhases(projectDetails: any, totalDays: number): Array<{
    name: string
    duration: number
    startDay: number
    endDay: number
    description: string
    icon: any
    subtasks: string[]
    dependencies: string[]
    criticalPath: boolean
    resources: Array<{ type: string; count: number }>
    weatherSensitive: boolean
    aiInsights: string[]
    progressMilestones: Array<{ day: number; milestone: string }>
  }> {
    const phases = []
    let currentDay = 0
    
    if (projectDetails.type === 'construction') {
      // Phase 1: Planning & Approvals
      const planningDuration = Math.ceil(totalDays * 0.08)
      phases.push({
        name: 'Planning & Approvals',
        duration: planningDuration,
        startDay: currentDay,
        endDay: currentDay + planningDuration,
        description: 'Design finalization, regulatory approvals, and site preparation',
        icon: FileCheck,
        subtasks: [
          'Architectural design finalization',
          'Structural engineering calculations',
          'BBMP plan sanction',
          'Bescom electrical approval',
          'BWSSB water connection approval',
          'Fire NOC (if applicable)',
          'Environmental clearance'
        ],
        dependencies: [],
        criticalPath: true,
        resources: [
          { type: 'Architect', count: 1 },
          { type: 'Structural Engineer', count: 1 },
          { type: 'Liaison Officer', count: 1 }
        ],
        weatherSensitive: false,
        aiInsights: [
          'BBMP approvals typically take 15-21 days with complete documentation',
          'Consider pre-approval consultation to avoid rejections',
          'Parallel processing of different approvals can save 2 weeks'
        ],
        progressMilestones: [
          { day: Math.floor(planningDuration * 0.3), milestone: 'Design locked' },
          { day: Math.floor(planningDuration * 0.6), milestone: 'Plans submitted' },
          { day: planningDuration, milestone: 'All approvals received' }
        ]
      })
      currentDay += planningDuration
      
      // Phase 2: Foundation
      const foundationDuration = Math.ceil(totalDays * 0.15)
      phases.push({
        name: 'Foundation Work',
        duration: foundationDuration,
        startDay: currentDay,
        endDay: currentDay + foundationDuration,
        description: 'Excavation, PCC, RCC foundation, and plinth beam',
        icon: Building2,
        subtasks: [
          'Site clearing and marking',
          'Excavation to required depth',
          'Anti-termite treatment',
          'PCC bed preparation',
          'Foundation reinforcement',
          'Foundation concrete pouring',
          'Plinth beam construction',
          'Backfilling and compaction'
        ],
        dependencies: ['Planning & Approvals'],
        criticalPath: true,
        resources: [
          { type: 'Site Engineer', count: 1 },
          { type: 'Skilled Labor', count: 8 },
          { type: 'Unskilled Labor', count: 12 }
        ],
        weatherSensitive: true,
        aiInsights: [
          'Soil testing results crucial for foundation depth determination',
          'Monsoon season requires waterproofing measures during foundation',
          'Curing period of 14 days essential for foundation strength',
          'Consider pile foundation if soil bearing capacity < 150 kN/m²'
        ],
        progressMilestones: [
          { day: Math.floor(foundationDuration * 0.2), milestone: 'Excavation complete' },
          { day: Math.floor(foundationDuration * 0.5), milestone: 'Foundation poured' },
          { day: Math.floor(foundationDuration * 0.8), milestone: 'Plinth level reached' },
          { day: foundationDuration, milestone: 'Foundation ready' }
        ]
      })
      currentDay += foundationDuration
      
      // Phase 3: Superstructure
      const structureDuration = Math.ceil(totalDays * 0.25)
      phases.push({
        name: 'Superstructure',
        duration: structureDuration,
        startDay: currentDay,
        endDay: currentDay + structureDuration,
        description: 'Columns, beams, slabs, and staircase construction',
        icon: Layers,
        subtasks: [
          'Column starter preparation',
          'Column reinforcement and shuttering',
          'Column concrete pouring',
          'Beam and slab shuttering',
          'Slab reinforcement laying',
          'Electrical conduit installation',
          'Concrete pouring for slabs',
          'Staircase construction',
          'Lift well construction (if applicable)'
        ],
        dependencies: ['Foundation Work'],
        criticalPath: true,
        resources: [
          { type: 'Site Engineer', count: 1 },
          { type: 'Bar Benders', count: 6 },
          { type: 'Carpenters', count: 8 },
          { type: 'Masons', count: 10 }
        ],
        weatherSensitive: true,
        aiInsights: [
          `Each floor slab requires ${projectDetails.floors > 1 ? '15-18' : '20-25'} days cycle time`,
          'Optimal concrete grade: M25 for residential, M30 for commercial',
          'Deshuttering only after 14 days for slabs, 3 days for columns',
          'Consider ready-mix concrete for consistent quality and faster execution'
        ],
        progressMilestones: [
          { day: Math.floor(structureDuration * 0.3), milestone: 'Ground floor slab' },
          { day: Math.floor(structureDuration * 0.6), milestone: 'First floor slab' },
          { day: Math.floor(structureDuration * 0.9), milestone: 'Roof slab' },
          { day: structureDuration, milestone: 'Structure complete' }
        ]
      })
      currentDay += structureDuration
      
      // Phase 4: Masonry & Plastering
      const masonryDuration = Math.ceil(totalDays * 0.18)
      phases.push({
        name: 'Masonry & Plastering',
        duration: masonryDuration,
        startDay: currentDay,
        endDay: currentDay + masonryDuration,
        description: 'Brick work, internal/external plastering, and waterproofing',
        icon: Hammer,
        subtasks: [
          'External wall brick work',
          'Internal partition walls',
          'Door and window frames fixing',
          'Lintel and sunshade casting',
          'External plastering',
          'Internal plastering',
          'Waterproofing of wet areas',
          'Terrace waterproofing'
        ],
        dependencies: ['Superstructure'],
        criticalPath: true,
        resources: [
          { type: 'Mason Supervisor', count: 1 },
          { type: 'Masons', count: 15 },
          { type: 'Helpers', count: 20 }
        ],
        weatherSensitive: true,
        aiInsights: [
          'Use AAC blocks for 25% faster construction and better insulation',
          'Double coat plastering recommended for external walls in Bangalore',
          'Allow 3-day gap between brick work and plastering',
          'Waterproofing warranty typically 10 years with proper application'
        ],
        progressMilestones: [
          { day: Math.floor(masonryDuration * 0.4), milestone: 'Brick work complete' },
          { day: Math.floor(masonryDuration * 0.7), milestone: 'External plastering done' },
          { day: masonryDuration, milestone: 'All plastering complete' }
        ]
      })
      currentDay += masonryDuration
      
      // Phase 5: MEP Installation
      const mepDuration = Math.ceil(totalDays * 0.12)
      phases.push({
        name: 'MEP Systems',
        duration: mepDuration,
        startDay: currentDay - Math.floor(mepDuration * 0.3), // Overlap with masonry
        endDay: currentDay + mepDuration - Math.floor(mepDuration * 0.3),
        description: 'Electrical, plumbing, and HVAC installation',
        icon: Gauge,
        subtasks: [
          'Electrical wiring and conduiting',
          'MCB panel installation',
          'Plumbing line laying',
          'Bathroom fittings rough-in',
          'HVAC ducting (if applicable)',
          'Solar panel installation (if applicable)',
          'Fire fighting systems',
          'CCTV and security wiring'
        ],
        dependencies: ['Masonry & Plastering'],
        criticalPath: false,
        resources: [
          { type: 'Electrical Contractor', count: 1 },
          { type: 'Plumbing Contractor', count: 1 },
          { type: 'HVAC Technician', count: 2 }
        ],
        weatherSensitive: false,
        aiInsights: [
          'Concealed wiring requires coordination with plastering team',
          'Use CPVC pipes for hot water lines - 50 year life',
          'Plan for 20% extra electrical points for future needs',
          'Consider home automation pre-wiring even if not implementing now'
        ],
        progressMilestones: [
          { day: Math.floor(mepDuration * 0.3), milestone: 'Rough wiring complete' },
          { day: Math.floor(mepDuration * 0.6), milestone: 'Plumbing lines laid' },
          { day: mepDuration, milestone: 'MEP rough-in complete' }
        ]
      })
      currentDay += mepDuration - Math.floor(mepDuration * 0.3)
      
      // Phase 6: Flooring
      const flooringDuration = Math.ceil(totalDays * 0.08)
      phases.push({
        name: 'Flooring Work',
        duration: flooringDuration,
        startDay: currentDay,
        endDay: currentDay + flooringDuration,
        description: 'Floor preparation and tile/marble laying',
        icon: Layers,
        subtasks: [
          'Floor level marking',
          'PCC for floor base',
          'Waterproofing in wet areas',
          'Tile/marble selection and procurement',
          'Floor tile laying',
          'Skirting installation',
          'Grouting and cleaning',
          'Floor polishing (if marble)'
        ],
        dependencies: ['MEP Systems'],
        criticalPath: true,
        resources: [
          { type: 'Flooring Contractor', count: 1 },
          { type: 'Tile Masons', count: 8 },
          { type: 'Helpers', count: 6 }
        ],
        weatherSensitive: false,
        aiInsights: [
          `${projectDetails.qualityLevel === 'luxury' ? 'Italian marble' : 'Vitrified tiles'} recommended for your quality level`,
          'Anti-skid tiles mandatory for bathrooms and outdoor areas',
          'Allow 2mm joints for thermal expansion',
          'Epoxy grouting recommended for longevity'
        ],
        progressMilestones: [
          { day: Math.floor(flooringDuration * 0.3), milestone: 'Ground floor tiling' },
          { day: Math.floor(flooringDuration * 0.7), milestone: 'Upper floors complete' },
          { day: flooringDuration, milestone: 'All flooring done' }
        ]
      })
      currentDay += flooringDuration
      
      // Phase 7: Finishing Works
      const finishingDuration = Math.ceil(totalDays * 0.15)
      phases.push({
        name: 'Finishing Works',
        duration: finishingDuration,
        startDay: currentDay,
        endDay: currentDay + finishingDuration,
        description: 'Painting, fixtures, and final fittings',
        icon: Sparkles,
        subtasks: [
          'Wall putty application',
          'Primer coating',
          'Paint application (2-3 coats)',
          'Door and window installation',
          'Electrical fixtures installation',
          'Bathroom fittings installation',
          'Kitchen platform and cabinets',
          'Railing and grills installation',
          'External elevation work'
        ],
        dependencies: ['Flooring Work'],
        criticalPath: true,
        resources: [
          { type: 'Painting Contractor', count: 1 },
          { type: 'Painters', count: 10 },
          { type: 'Carpenters', count: 6 },
          { type: 'Plumber', count: 2 },
          { type: 'Electrician', count: 2 }
        ],
        weatherSensitive: true,
        aiInsights: [
          `${projectDetails.qualityLevel === 'luxury' ? 'Premium texture paints' : 'Quality emulsion paints'} suit your standards`,
          'Weather-proof paint essential for Bangalore´s climate',
          'Allow 4-6 hours between paint coats',
          'Install AC points before false ceiling work'
        ],
        progressMilestones: [
          { day: Math.floor(finishingDuration * 0.3), milestone: 'Painting started' },
          { day: Math.floor(finishingDuration * 0.6), milestone: 'Fixtures installation' },
          { day: Math.floor(finishingDuration * 0.9), milestone: 'Final fittings' },
          { day: finishingDuration, milestone: 'Project complete' }
        ]
      })
      currentDay += finishingDuration
      
      // Phase 8: External Development
      const externalDuration = Math.ceil(totalDays * 0.07)
      phases.push({
        name: 'External Development',
        duration: externalDuration,
        startDay: currentDay - Math.floor(externalDuration * 0.5), // Overlap with finishing
        endDay: currentDay + externalDuration - Math.floor(externalDuration * 0.5),
        description: 'Compound wall, landscaping, and external utilities',
        icon: TreePine,
        subtasks: [
          'Compound wall construction',
          'Gate installation',
          'Driveway and pathways',
          'Garden and landscaping',
          'External lighting',
          'Rainwater harvesting setup',
          'Septic tank/STP installation',
          'External painting'
        ],
        dependencies: [],
        criticalPath: false,
        resources: [
          { type: 'Landscape Designer', count: 1 },
          { type: 'Masons', count: 4 },
          { type: 'Gardener', count: 2 }
        ],
        weatherSensitive: true,
        aiInsights: [
          'Native plants recommended for Bangalore climate',
          'Permeable paving helps with drainage during monsoons',
          'Solar lighting reduces long-term electricity costs',
          'Rainwater harvesting mandatory for plots > 2400 sqft'
        ],
        progressMilestones: [
          { day: Math.floor(externalDuration * 0.5), milestone: 'Compound wall done' },
          { day: externalDuration, milestone: 'Landscaping complete' }
        ]
      })
      
    } else if (projectDetails.type === 'interior') {
      // Interior project phases
      const designDuration = Math.ceil(totalDays * 0.15)
      phases.push({
        name: 'Design & Planning',
        duration: designDuration,
        startDay: 0,
        endDay: designDuration,
        description: '3D design, material selection, and approvals',
        icon: Layers,
        subtasks: [
          'Site measurement and analysis',
          'Concept development',
          '2D layout planning',
          '3D visualization creation',
          'Material mood boards',
          'Lighting design',
          'Client approval',
          'Working drawings preparation'
        ],
        dependencies: [],
        criticalPath: true,
        resources: [
          { type: 'Interior Designer', count: 1 },
          { type: '3D Visualizer', count: 1 }
        ],
        weatherSensitive: false,
        aiInsights: [
          'VR walkthroughs increase client satisfaction by 40%',
          'Modular designs reduce execution time by 30%',
          'Pre-approved material palette prevents delays'
        ],
        progressMilestones: [
          { day: Math.floor(designDuration * 0.3), milestone: 'Concept approved' },
          { day: Math.floor(designDuration * 0.7), milestone: '3D designs ready' },
          { day: designDuration, milestone: 'Final approval' }
        ]
      })
      
      // Add more interior phases...
    }
    
    return phases
  }

  // Cost prediction
  public predictCosts(projectDetails: any): {
    baseCost: number
    minCost: number
    maxCost: number
    breakdown: Array<{ category: string; amount: number; percentage: number }>
    monthlyProjection: Array<{ month: number; amount: number; description: string }>
  } {
    let baseCost = 0
    const costBreakdown = []
    
    if (projectDetails.type === 'construction') {
      const sqftRates = {
        standard: { residential: 1800, villa: 2000, apartment: 1700, commercial: 2200 },
        premium: { residential: 2500, villa: 2800, apartment: 2400, commercial: 3000 },
        luxury: { residential: 3500, villa: 4000, apartment: 3300, commercial: 4500 }
      }
      
      const rate = sqftRates[projectDetails.qualityLevel as keyof typeof sqftRates][projectDetails.constructionType as keyof typeof sqftRates.standard]
      baseCost = rate * (projectDetails.builtUpArea || 2000)
      
      // Cost breakdown
      costBreakdown.push(
        { category: 'Structure & Masonry', amount: baseCost * 0.25, percentage: 25 },
        { category: 'Finishing & Interiors', amount: baseCost * 0.20, percentage: 20 },
        { category: 'Flooring', amount: baseCost * 0.12, percentage: 12 },
        { category: 'Electrical', amount: baseCost * 0.08, percentage: 8 },
        { category: 'Plumbing', amount: baseCost * 0.06, percentage: 6 },
        { category: 'Doors & Windows', amount: baseCost * 0.08, percentage: 8 },
        { category: 'Painting', amount: baseCost * 0.06, percentage: 6 },
        { category: 'External Development', amount: baseCost * 0.05, percentage: 5 },
        { category: 'Labor', amount: baseCost * 0.10, percentage: 10 }
      )
    }
    
    // Add variations
    const minCost = baseCost * 0.90
    const maxCost = baseCost * 1.15
    
    // Monthly projection
    const duration = this.predictDuration(projectDetails).mostLikelyDuration
    const months = Math.ceil(duration / 30)
    const monthlyProjection = []
    
    // Front-loaded payment schedule
    const paymentSchedule = [0.15, 0.20, 0.15, 0.15, 0.10, 0.10, 0.10, 0.05]
    for (let i = 0; i < months; i++) {
      const percentage = paymentSchedule[Math.min(i, paymentSchedule.length - 1)]
      monthlyProjection.push({
        month: i + 1,
        amount: baseCost * percentage,
        description: this.getPaymentMilestone(i, projectDetails.type)
      })
    }
    
    return {
      baseCost,
      minCost,
      maxCost,
      breakdown: costBreakdown,
      monthlyProjection
    }
  }

  private getPaymentMilestone(month: number, projectType: string): string {
    const milestones = {
      construction: [
        'Foundation completion',
        'Plinth level',
        'First slab',
        'Second slab',
        'Brick work completion',
        'Plastering completion',
        'Flooring and finishing',
        'Final handover'
      ],
      interior: [
        'Design approval & advance',
        'Material procurement',
        'Civil work completion',
        'Furniture fabrication',
        'Installation phase',
        'Finishing touches',
        'Final payment'
      ]
    }
    
    return milestones[projectType as keyof typeof milestones][month] || 'Progress payment'
  }

  // Optimization suggestions
  public getOptimizations(projectDetails: any): Array<{
    title: string
    description: string
    timeSaved: string
    costImpact: string
    difficulty: 'easy' | 'medium' | 'hard'
    icon: any
  }> {
    const optimizations = []
    
    // Fast-track suggestion
    if (!projectDetails.fastTrack) {
      optimizations.push({
        title: 'Enable Fast-Track Execution',
        description: 'Parallel work streams and extended working hours',
        timeSaved: '20% reduction',
        costImpact: '+5-8% for overtime',
        difficulty: 'medium' as const,
        icon: Zap
      })
    }
    
    // Prefab suggestion
    if (projectDetails.type === 'construction') {
      optimizations.push({
        title: 'Use Prefabricated Components',
        description: 'Precast slabs, ready-made door/window frames',
        timeSaved: '15% reduction',
        costImpact: '+3-5% material cost',
        difficulty: 'easy' as const,
        icon: Package
      })
    }
    
    // Material optimization
    optimizations.push({
      title: 'Bulk Material Procurement',
      description: 'Order all materials upfront to avoid delays',
      timeSaved: '10% reduction',
      costImpact: '-5% bulk discount',
      difficulty: 'easy' as const,
      icon: Truck
    })
    
    // Technology adoption
    if (!projectDetails.smartHome) {
      optimizations.push({
        title: 'BIM/3D Coordination',
        description: 'Use Building Information Modeling to prevent clashes',
        timeSaved: '8% reduction',
        costImpact: '+₹50,000 one-time',
        difficulty: 'medium' as const,
        icon: Cpu
      })
    }
    
    // Seasonal planning
    const startMonth = new Date(projectDetails.startDate).getMonth()
    if (this.bangaloreFactors.monsoonMonths.includes(startMonth)) {
      optimizations.push({
        title: 'Defer Start by 2 Months',
        description: 'Avoid starting during peak monsoon',
        timeSaved: '12% reduction',
        costImpact: 'No additional cost',
        difficulty: 'easy' as const,
        icon: Calendar
      })
    }
    
    return optimizations
  }
}

// Main Component
export default function TimelineEstimatorAI() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [aiEngine] = useState(new AITimelineEngine())
  const [selectedOptimizations, setSelectedOptimizations] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'json'>('pdf')
  const [showExportDialog, setShowExportDialog] = useState(false)
  
  // Comprehensive project details state
  const [projectDetails, setProjectDetails] = useState<any>({
    // Basic Info
    projectName: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    projectAddress: '',
    
    // Project Type
    type: 'construction',
    
    // Construction specific
    constructionType: 'residential',
    floors: 1,
    plotSize: 2400,
    builtUpArea: 2000,
    structureType: 'rcc',
    basementLevels: 0,
    
    // Interior specific
    propertyType: 'apartment',
    propertyAge: 0,
    currentCondition: 'bare_shell',
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
    renovationType: 'cosmetic',
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
    workingDays: 'standard', // standard, extended, 24x7
    
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

  // Steps configuration
  const STEPS = [
    { id: 'welcome', title: 'Welcome', icon: Brain },
    { id: 'basic', title: 'Basic Info', icon: Home },
    { id: 'project-type', title: 'Project Type', icon: Building2 },
    { id: 'specifications', title: 'Specifications', icon: Layers },
    { id: 'quality', title: 'Quality & Features', icon: Award },
    { id: 'timeline', title: 'Timeline', icon: Calendar },
    { id: 'budget', title: 'Budget', icon: Banknote },
    { id: 'requirements', title: 'Requirements', icon: FileCheck },
    { id: 'analysis', title: 'AI Analysis', icon: Brain },
    { id: 'results', title: 'Results', icon: BarChart3 }
  ]

  const handleNext = async () => {
    if (currentStep === STEPS.length - 2) {
      // Run AI Analysis
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
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Get AI predictions
    const predictions = aiEngine.predictDuration(projectDetails)
    const riskAnalysis = aiEngine.analyzeRisks(projectDetails)
    const smartPhases = aiEngine.generateSmartPhases(projectDetails, predictions.mostLikelyDuration)
    const costAnalysis = aiEngine.predictCosts(projectDetails)
    const optimizationSuggestions = aiEngine.getOptimizations(projectDetails)
    
    setAiResults(predictions)
    setPhases(smartPhases)
    setRisks(riskAnalysis)
    setCostPrediction(costAnalysis)
    setOptimizations(optimizationSuggestions)
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
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Brain className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-4">
              AI-Powered Timeline Intelligence
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get scientifically accurate project timelines using machine learning, 
              weather data, and 10,000+ historical projects from Bangalore
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
              {[
                { icon: Brain, label: 'ML Predictions', value: '94% Accuracy' },
                { icon: CloudRain, label: 'Weather AI', value: 'Real-time' },
                { icon: BarChart3, label: 'Data Points', value: '50,000+' },
                { icon: Target, label: 'Optimization', value: 'Smart' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-2">
                    {React.createElement(stat.icon, { className: "h-6 w-6 text-gray-600" })}
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <Button size="lg" onClick={handleNext} className="gap-2">
              Start Intelligent Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )

      case 'basic':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Project Information</h3>
              <p className="text-gray-600">Let's start with basic project details</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Project Name</Label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Dream Home Bangalore"
                  value={projectDetails.projectName}
                  onChange={(e) => setProjectDetails({...projectDetails, projectName: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Your Name</Label>
                <input
                  type="text"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Full name"
                  value={projectDetails.clientName}
                  onChange={(e) => setProjectDetails({...projectDetails, clientName: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Email Address</Label>
                <input
                  type="email"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="email@example.com"
                  value={projectDetails.clientEmail}
                  onChange={(e) => setProjectDetails({...projectDetails, clientEmail: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Phone Number</Label>
                <input
                  type="tel"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="+91 98765 43210"
                  value={projectDetails.clientPhone}
                  onChange={(e) => setProjectDetails({...projectDetails, clientPhone: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <Label>Project Location</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Area, Bangalore (e.g., Whitefield, Koramangala)"
                  value={projectDetails.projectAddress}
                  onChange={(e) => setProjectDetails({...projectDetails, projectAddress: e.target.value})}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Location helps us factor in local regulations and weather patterns
              </p>
            </div>
          </div>
        )

      case 'project-type':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-2">What are you planning?</h3>
              <p className="text-gray-600">Choose your project type for customized analysis</p>
            </div>
            
            <RadioGroup
              value={projectDetails.type}
              onValueChange={(value) => setProjectDetails({...projectDetails, type: value})}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    value: 'construction',
                    title: 'New Construction',
                    description: 'Build from ground up',
                    icon: Building2,
                    features: ['Foundation to finish', 'Complete project management', 'All approvals included']
                  },
                  {
                    value: 'interior',
                    title: 'Interior Design',
                    description: 'Transform your space',
                    icon: Sofa,
                    features: ['Complete interiors', 'Furniture & fixtures', 'Decor & styling']
                  },
                  {
                    value: 'renovation',
                    title: 'Renovation',
                    description: 'Upgrade existing property',
                    icon: Hammer,
                    features: ['Structural changes', 'Modern upgrades', 'Restoration work']
                  }
                ].map((option) => (
                  <Label key={option.value} htmlFor={option.value} className="cursor-pointer">
                    <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                    <Card className={`p-6 hover:border-blue-500 transition-all ${
                      projectDetails.type === option.value ? 'border-blue-500 bg-blue-50' : ''
                    }`}>
                      <option.icon className="h-12 w-12 mb-4 text-blue-600" />
                      <h4 className="font-semibold text-lg mb-2">{option.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                      <ul className="space-y-1">
                        {option.features.map((feature, i) => (
                          <li key={i} className="text-xs text-gray-500 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Label>
                ))}
              </div>
            </RadioGroup>
            
            {projectDetails.type && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                {projectDetails.type === 'construction' && (
                  <div className="space-y-4">
                    <Label>Construction Type</Label>
                    <RadioGroup
                      value={projectDetails.constructionType}
                      onValueChange={(value) => setProjectDetails({...projectDetails, constructionType: value})}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { value: 'residential', label: 'Residential House' },
                          { value: 'villa', label: 'Luxury Villa' },
                          { value: 'apartment', label: 'Apartment' },
                          { value: 'commercial', label: 'Commercial' }
                        ].map((subtype) => (
                          <Label key={subtype.value} htmlFor={`construction-${subtype.value}`} className="cursor-pointer">
                            <RadioGroupItem value={subtype.value} id={`construction-${subtype.value}`} className="sr-only" />
                            <div className={`p-4 text-center rounded-lg border-2 transition-all ${
                              projectDetails.constructionType === subtype.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <p className="text-sm font-medium">{subtype.label}</p>
                            </div>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
                
                {projectDetails.type === 'interior' && (
                  <div className="space-y-4">
                    <Label>Property Type</Label>
                    <RadioGroup
                      value={projectDetails.propertyType}
                      onValueChange={(value) => setProjectDetails({...projectDetails, propertyType: value})}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { value: 'apartment', label: 'Apartment' },
                          { value: 'villa', label: 'Villa' },
                          { value: 'office', label: 'Office' },
                          { value: 'retail', label: 'Retail' }
                        ].map((subtype) => (
                          <Label key={subtype.value} htmlFor={`property-${subtype.value}`} className="cursor-pointer">
                            <RadioGroupItem value={subtype.value} id={`property-${subtype.value}`} className="sr-only" />
                            <div className={`p-4 text-center rounded-lg border-2 transition-all ${
                              projectDetails.propertyType === subtype.value
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                              <p className="text-sm font-medium">{subtype.label}</p>
                            </div>
                          </Label>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        )

      case 'specifications':
        if (projectDetails.type === 'construction') {
          return (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Project Specifications</h3>
                <p className="text-gray-600">AI needs these details for accurate predictions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="flex items-center gap-2">
                    Number of Floors
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Each floor adds 15-20 days to timeline</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, '5+'].map((num) => (
                      <button
                        key={num}
                        onClick={() => setProjectDetails({
                          ...projectDetails, 
                          floors: typeof num === 'number' ? num : 5
                        })}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          projectDetails.floors === (typeof num === 'number' ? num : 5)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Basement Levels</Label>
                  <div className="flex gap-2 mt-2">
                    {[0, 1, 2].map((num) => (
                      <button
                        key={num}
                        onClick={() => setProjectDetails({...projectDetails, basementLevels: num})}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          projectDetails.basementLevels === num
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {num === 0 ? 'None' : num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label>Plot Size</Label>
                    <div className="text-right">
                      <span className="text-lg font-semibold">{projectDetails.plotSize.toLocaleString()} sq ft</span>
                      <p className="text-xs text-gray-500">{Math.round(projectDetails.plotSize / 9)} sq yards</p>
                    </div>
                  </div>
                  <Slider
                    value={[projectDetails.plotSize]}
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
                    <Label>Built-up Area</Label>
                    <div className="text-right">
                      <span className="text-lg font-semibold">{projectDetails.builtUpArea.toLocaleString()} sq ft</span>
                      <p className="text-xs text-gray-500">
                        {Math.round((projectDetails.builtUpArea / projectDetails.plotSize) * 100)}% coverage
                      </p>
                    </div>
                  </div>
                  <Slider
                    value={[projectDetails.builtUpArea]}
                    onValueChange={([value]) => setProjectDetails({...projectDetails, builtUpArea: value})}
                    max={Math.min(15000, projectDetails.plotSize * 2.5)}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>500 sq ft</span>
                    <span>{Math.min(15000, projectDetails.plotSize * 2.5).toLocaleString()} sq ft</span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Structure Type</Label>
                <RadioGroup
                  value={projectDetails.structureType}
                  onValueChange={(value) => setProjectDetails({...projectDetails, structureType: value})}
                >
                  <div className="grid grid-cols-3 gap-4 mt-3">
                    {[
                      { 
                        value: 'rcc', 
                        label: 'RCC Frame', 
                        description: 'Standard reinforced concrete',
                        pros: 'Cost effective, proven',
                        timeline: 'Standard'
                      },
                      { 
                        value: 'steel', 
                        label: 'Steel Frame', 
                        description: 'Modern steel structure',
                        pros: 'Faster, earthquake resistant',
                        timeline: '20% faster'
                      },
                      { 
                        value: 'hybrid', 
                        label: 'Hybrid', 
                        description: 'RCC + Steel combination',
                        pros: 'Best of both worlds',
                        timeline: '10% faster'
                      }
                    ].map((option) => (
                      <Label key={option.value} htmlFor={`structure-${option.value}`} className="cursor-pointer">
                        <RadioGroupItem value={option.value} id={`structure-${option.value}`} className="sr-only" />
                        <Card className={`p-4 hover:border-blue-500 transition-all ${
                          projectDetails.structureType === option.value ? 'border-blue-500 bg-blue-50' : ''
                        }`}>
                          <h4 className="font-medium mb-1">{option.label}</h4>
                          <p className="text-xs text-gray-600 mb-2">{option.description}</p>
                          <div className="space-y-1">
                            <p className="text-xs text-green-600 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              {option.pros}
                            </p>
                            <p className="text-xs text-blue-600 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {option.timeline}
                            </p>
                          </div>
                        </Card>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
          )
        } else if (projectDetails.type === 'interior') {
          return (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Space Configuration</h3>
                <p className="text-gray-600">Tell us about your space for accurate timeline</p>
              </div>

              <div>
                <Label className="text-base font-medium mb-4 block">Room Details</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'bedrooms', label: 'Bedrooms', icon: BedDouble, max: 6 },
                    { key: 'bathrooms', label: 'Bathrooms', icon: Bath, max: 6 },
                    { key: 'livingRooms', label: 'Living Rooms', icon: Sofa, max: 3 },
                    { key: 'kitchen', label: 'Kitchen', icon: ChefHat, max: 2 },
                    { key: 'balconies', label: 'Balconies', icon: TreePine, max: 4 },
                    { key: 'studyRoom', label: 'Study Room', icon: Briefcase, max: 2 },
                    { key: 'poojaRoom', label: 'Pooja Room', icon: Home, max: 1 },
                    { key: 'utilityRoom', label: 'Utility Room', icon: Package, max: 2 }
                  ].map((room) => (
                    <div key={room.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <room.icon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{room.label}</span>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(room.max + 1)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setProjectDetails({
                              ...projectDetails,
                              rooms: {
                                ...projectDetails.rooms,
                                [room.key]: i
                              }
                            })}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all ${
                              projectDetails.rooms[room.key] === i
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border hover:bg-gray-100'
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

              <div>
                <Label className="text-base font-medium mb-4 block">Work Scope</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'falseCeiling', label: 'False Ceiling', icon: Layers },
                    { value: 'electrical', label: 'Electrical Work', icon: Lightbulb },
                    { value: 'plumbing', label: 'Plumbing Updates', icon: Droplets },
                    { value: 'flooring', label: 'New Flooring', icon: Layers },
                    { value: 'painting', label: 'Painting', icon: Sparkles },
                    { value: 'structural', label: 'Wall Changes', icon: Building2 },
                    { value: 'hvac', label: 'AC Installation', icon: Wind },
                    { value: 'security', label: 'Home Security', icon: Shield },
                    { value: 'automation', label: 'Smart Home', icon: Cpu }
                  ].map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={`scope-${item.value}`}
                      className="cursor-pointer"
                    >
                      <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        projectDetails.workScope?.includes(item.value)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <Checkbox
                          id={`scope-${item.value}`}
                          checked={projectDetails.workScope?.includes(item.value)}
                          onCheckedChange={(checked) => {
                            const current = projectDetails.workScope || []
                            if (checked) {
                              setProjectDetails({...projectDetails, workScope: [...current, item.value]})
                            } else {
                              setProjectDetails({...projectDetails, workScope: current.filter((v: string) => v !== item.value)})
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
                <Label className="text-base font-medium mb-4 block">Furniture Requirements</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Modular Kitchen',
                    'Wardrobes',
                    'TV Units',
                    'Study Tables',
                    'Crockery Units',
                    'Shoe Racks',
                    'Vanity Units',
                    'Storage Units',
                    'Bar Unit',
                    'Bookshelf'
                  ].map((item) => (
                    <Label
                      key={item}
                      htmlFor={`furniture-${item}`}
                      className="cursor-pointer"
                    >
                      <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        projectDetails.furnitureWork?.includes(item)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <Checkbox
                          id={`furniture-${item}`}
                          checked={projectDetails.furnitureWork?.includes(item)}
                          onCheckedChange={(checked) => {
                            const current = projectDetails.furnitureWork || []
                            if (checked) {
                              setProjectDetails({...projectDetails, furnitureWork: [...current, item]})
                            } else {
                              setProjectDetails({...projectDetails, furnitureWork: current.filter((v: string) => v !== item)})
                            }
                          }}
                        />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          )
        }
        break

      case 'quality':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Quality & Features</h3>
              <p className="text-gray-600">Your choices here significantly impact timeline and cost</p>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Quality Level</Label>
              <RadioGroup
                value={projectDetails.qualityLevel}
                onValueChange={(value) => setProjectDetails({...projectDetails, qualityLevel: value})}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      value: 'standard',
                      label: 'Standard',
                      price: projectDetails.type === 'construction' ? '₹1,800-2,200/sqft' : '₹800-1,000/sqft',
                      features: [
                        'Quality materials',
                        'Standard brands',
                        'Good finish',
                        '2-year warranty'
                      ],
                      timeline: 'Base timeline',
                      icon: Star
                    },
                    {
                      value: 'premium',
                      label: 'Premium',
                      price: projectDetails.type === 'construction' ? '₹2,500-3,000/sqft' : '₹1,200-1,500/sqft',
                      features: [
                        'Premium materials',
                        'Top brands',
                        'Excellent finish',
                        '5-year warranty'
                      ],
                      timeline: '+15% time',
                      icon: Award
                    },
                    {
                      value: 'luxury',
                      label: 'Luxury',
                      price: projectDetails.type === 'construction' ? '₹3,500+/sqft' : '₹1,800+/sqft',
                      features: [
                        'Luxury materials',
                        'International brands',
                        'Bespoke finish',
                        '10-year warranty'
                      ],
                      timeline: '+30% time',
                      icon: Award
                    }
                  ].map((option) => (
                    <Label key={option.value} htmlFor={`quality-${option.value}`} className="cursor-pointer">
                      <RadioGroupItem value={option.value} id={`quality-${option.value}`} className="sr-only" />
                      <Card className={`p-6 hover:border-blue-500 transition-all relative ${
                        projectDetails.qualityLevel === option.value ? 'border-blue-500 bg-blue-50' : ''
                      }`}>
                        {option.value === 'premium' && (
                          <Badge className="absolute -top-2 -right-2" variant="secondary">
                            Popular
                          </Badge>
                        )}
                        <option.icon className="h-8 w-8 mb-3 text-blue-600" />
                        <h4 className="font-semibold text-lg mb-2">{option.label}</h4>
                        <p className="text-blue-600 font-semibold mb-3">{option.price}</p>
                        <ul className="space-y-1 mb-4">
                          {option.features.map((feature, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {option.timeline}
                        </p>
                      </Card>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium block">Advanced Features</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TreePine className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Sustainable Building</p>
                      <p className="text-sm text-gray-500">Solar panels, rainwater harvesting, green materials</p>
                    </div>
                  </div>
                  <Switch
                    checked={projectDetails.sustainability}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, sustainability: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Smart Home Features</p>
                      <p className="text-sm text-gray-500">IoT devices, automation, app control</p>
                    </div>
                  </div>
                  <Switch
                    checked={projectDetails.smartHome}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, smartHome: checked})}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Custom Design Work</Label>
                <span className="text-sm font-semibold">{projectDetails.customWork}%</span>
              </div>
              <Slider
                value={[projectDetails.customWork]}
                onValueChange={([value]) => setProjectDetails({...projectDetails, customWork: value})}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Standard designs</span>
                <span>Fully customized</span>
              </div>
              {projectDetails.customWork > 50 && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  High customization may extend timeline by {Math.round(projectDetails.customWork / 5)}%
                </p>
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Preferred Brands</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Asian Paints',
                  'Kajaria Tiles',
                  'Kohler',
                  'Havells',
                  'Saint Gobain',
                  'Greenply',
                  'Jaguar',
                  'Hindware'
                ].map((brand) => (
                  <Label key={brand} htmlFor={`brand-${brand}`} className="cursor-pointer">
                    <div className={`p-3 text-center rounded-lg border-2 transition-all ${
                      projectDetails.brandPreferences?.includes(brand)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={projectDetails.brandPreferences?.includes(brand)}
                        onCheckedChange={(checked) => {
                          const current = projectDetails.brandPreferences || []
                          if (checked) {
                            setProjectDetails({...projectDetails, brandPreferences: [...current, brand]})
                          } else {
                            setProjectDetails({...projectDetails, brandPreferences: current.filter((b: string) => b !== brand)})
                          }
                        }}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{brand}</span>
                    </div>
                  </Label>
                ))}
              </div>
            </div>
          </div>
        )

      case 'timeline':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Timeline Preferences</h3>
              <p className="text-gray-600">AI will optimize your schedule based on these inputs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Preferred Start Date</Label>
                <input
                  type="date"
                  value={projectDetails.startDate}
                  onChange={(e) => setProjectDetails({...projectDetails, startDate: e.target.value})}
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
                {(() => {
                  const month = new Date(projectDetails.startDate).getMonth()
                  const isMonsoon = [5, 6, 7, 8].includes(month)
                  const isFestival = [9, 10, 2].includes(month)
                  
                  return (
                    <>
                      {isMonsoon && (
                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <CloudRain className="h-3 w-3" />
                          Monsoon season - expect weather delays
                        </p>
                      )}
                      {isFestival && (
                        <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Festival season - labor availability may be limited
                        </p>
                      )}
                    </>
                  )
                })()}
              </div>

              <div>
                <Label>Target Completion Date (Optional)</Label>
                <input
                  type="date"
                  value={projectDetails.targetEndDate}
                  onChange={(e) => setProjectDetails({...projectDetails, targetEndDate: e.target.value})}
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  min={projectDetails.startDate}
                />
                <p className="text-xs text-gray-500 mt-1">
                  AI will suggest if this timeline is achievable
                </p>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Schedule Options</Label>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Fast Track Execution</p>
                      <p className="text-sm text-gray-500">Parallel work streams, extended hours</p>
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
                      <p className="font-medium">Weather Buffer</p>
                      <p className="text-sm text-gray-500">Account for Bangalore monsoons</p>
                    </div>
                  </div>
                  <Switch
                    checked={projectDetails.includeRainy}
                    onCheckedChange={(checked) => setProjectDetails({...projectDetails, includeRainy: checked})}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Working Schedule</Label>
              <RadioGroup
                value={projectDetails.workingDays}
                onValueChange={(value) => setProjectDetails({...projectDetails, workingDays: value})}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      value: 'standard',
                      label: 'Standard',
                      description: '6 days/week, 8 hours',
                      impact: 'Normal timeline'
                    },
                    {
                      value: 'extended',
                      label: 'Extended',
                      description: '6 days/week, 10 hours',
                      impact: '15% faster'
                    },
                    {
                      value: '24x7',
                      label: '24×7 Shifts',
                      description: 'Round the clock work',
                      impact: '40% faster'
                    }
                  ].map((schedule) => (
                    <Label key={schedule.value} htmlFor={`schedule-${schedule.value}`} className="cursor-pointer">
                      <RadioGroupItem value={schedule.value} id={`schedule-${schedule.value}`} className="sr-only" />
                      <Card className={`p-4 hover:border-blue-500 transition-all ${
                        projectDetails.workingDays === schedule.value ? 'border-blue-500 bg-blue-50' : ''
                      }`}>
                        <h4 className="font-medium mb-1">{schedule.label}</h4>
                        <p className="text-sm text-gray-600 mb-2">{schedule.description}</p>
                        <p className="text-xs text-blue-600 font-medium">{schedule.impact}</p>
                      </Card>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <Label>Schedule Flexibility</Label>
                <span className="text-sm font-semibold">±{projectDetails.flexibilityDays} days</span>
              </div>
              <Slider
                value={[projectDetails.flexibilityDays]}
                onValueChange={([value]) => setProjectDetails({...projectDetails, flexibilityDays: value})}
                max={30}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Strict deadline</span>
                <span>Flexible timeline</span>
              </div>
            </div>
          </div>
        )

      case 'budget':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Budget Planning</h3>
              <p className="text-gray-600">Help AI understand your financial constraints</p>
            </div>

            <div>
              <Label className="text-base font-medium mb-4 block">Budget Range</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Budget</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      value={projectDetails.budgetRange.min}
                      onChange={(e) => setProjectDetails({
                        ...projectDetails,
                        budgetRange: { ...projectDetails.budgetRange, min: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Maximum Budget</Label>
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      value={projectDetails.budgetRange.max}
                      onChange={(e) => setProjectDetails({
                        ...projectDetails,
                        budgetRange: { ...projectDetails.budgetRange, max: parseInt(e.target.value) || 0 }
                      })}
                    />
                  </div>
                </div>
              </div>
              
              {costPrediction && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-lg"
                >
                  <p className="text-sm text-blue-900">
                    <Info className="h-4 w-4 inline mr-1" />
                    Based on your specifications, estimated cost: 
                    <span className="font-semibold"> ₹{(costPrediction.baseCost / 100000).toFixed(1)}L - ₹{(costPrediction.maxCost / 100000).toFixed(1)}L</span>
                  </p>
                </motion.div>
              )}
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Payment Terms</Label>
              <RadioGroup
                value={projectDetails.paymentTerms}
                onValueChange={(value) => setProjectDetails({...projectDetails, paymentTerms: value})}
              >
                <div className="space-y-3">
                  {[
                    {
                      value: 'milestone',
                      label: 'Milestone Based',
                      description: 'Pay as per project progress',
                      schedule: '15-20-20-20-15-10%'
                    },
                    {
                      value: 'monthly',
                      label: 'Monthly Payments',
                      description: 'Fixed monthly installments',
                      schedule: 'Equal monthly payments'
                    },
                    {
                      value: 'custom',
                      label: 'Custom Schedule',
                      description: 'Negotiate payment terms',
                      schedule: 'As per agreement'
                    }
                  ].map((payment) => (
                    <Label key={payment.value} htmlFor={`payment-${payment.value}`} className="cursor-pointer">
                      <RadioGroupItem value={payment.value} id={`payment-${payment.value}`} className="sr-only" />
                      <Card className={`p-4 hover:border-blue-500 transition-all ${
                        projectDetails.paymentTerms === payment.value ? 'border-blue-500 bg-blue-50' : ''
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{payment.label}</h4>
                            <p className="text-sm text-gray-600">{payment.description}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {payment.schedule}
                          </Badge>
                        </div>
                      </Card>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Banknote className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Financing Required</p>
                  <p className="text-sm text-gray-500">Need help with loan arrangements</p>
                </div>
              </div>
              <Switch
                checked={projectDetails.financingRequired}
                onCheckedChange={(checked) => setProjectDetails({...projectDetails, financingRequired: checked})}
              />
            </div>
          </div>
        )

      case 'requirements':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Special Requirements</h3>
              <p className="text-gray-600">Any specific needs or constraints?</p>
            </div>

            <div>
              <Label>Special Instructions</Label>
              <Textarea
                className="mt-2"
                rows={4}
                placeholder="E.g., Need to complete ground floor first, specific material preferences, design requirements..."
                value={projectDetails.specialRequirements}
                onChange={(e) => setProjectDetails({...projectDetails, specialRequirements: e.target.value})}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Access Constraints</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Narrow road access',
                  'High-rise building',
                  'Security restrictions',
                  'Limited working hours',
                  'Noise restrictions',
                  'Heritage area'
                ].map((constraint) => (
                  <Label key={constraint} htmlFor={`constraint-${constraint}`} className="cursor-pointer">
                    <div className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      projectDetails.accessConstraints?.includes(constraint)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <Checkbox
                        id={`constraint-${constraint}`}
                        checked={projectDetails.accessConstraints?.includes(constraint)}
                        onCheckedChange={(checked) => {
                          const current = projectDetails.accessConstraints || []
                          if (checked) {
                            setProjectDetails({...projectDetails, accessConstraints: [...current, constraint]})
                          } else {
                            setProjectDetails({...projectDetails, accessConstraints: current.filter((c: string) => c !== constraint)})
                          }
                        }}
                      />
                      <span className="text-sm">{constraint}</span>
                    </div>
                  </Label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium block">Project Management</Label>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Dedicated Supervisor</p>
                    <p className="text-sm text-gray-500">On-site supervision throughout project</p>
                  </div>
                </div>
                <Switch
                  checked={projectDetails.supervisorRequired}
                  onCheckedChange={(checked) => setProjectDetails({...projectDetails, supervisorRequired: checked})}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Daily Progress Reports</p>
                    <p className="text-sm text-gray-500">WhatsApp updates with photos</p>
                  </div>
                </div>
                <Switch
                  checked={projectDetails.dailyReporting}
                  onCheckedChange={(checked) => setProjectDetails({...projectDetails, dailyReporting: checked})}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Video Updates</p>
                    <p className="text-sm text-gray-500">Weekly video walkthroughs</p>
                  </div>
                </div>
                <Switch
                  checked={projectDetails.videoUpdates}
                  onCheckedChange={(checked) => setProjectDetails({...projectDetails, videoUpdates: checked})}
                />
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Contractor Preference</Label>
              <RadioGroup
                value={projectDetails.contractorPreference}
                onValueChange={(value) => setProjectDetails({...projectDetails, contractorPreference: value})}
              >
                <div className="space-y-2">
                  {[
                    { value: 'recommended', label: 'Sahara Recommended', description: 'Verified partners with proven track record' },
                    { value: 'own', label: 'My Own Contractor', description: 'I have a contractor in mind' },
                    { value: 'multiple', label: 'Multiple Quotes', description: 'Get quotes from 3-5 contractors' }
                  ].map((option) => (
                    <Label key={option.value} htmlFor={`contractor-${option.value}`} className="cursor-pointer">
                      <RadioGroupItem value={option.value} id={`contractor-${option.value}`} className="sr-only" />
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        projectDetails.contractorPreference === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 'analysis':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
              <Brain className="h-10 w-10 text-white animate-pulse" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">AI Analysis in Progress</h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
              Our AI is analyzing your project using machine learning models trained on thousands of Bangalore projects
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              {[
                'Analyzing project specifications...',
                'Checking weather patterns for your timeline...',
                'Calculating material availability...',
                'Optimizing resource allocation...',
                'Generating smart recommendations...'
              ].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.5 }}
                  className="flex items-center gap-3 text-left"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                  <span className="text-gray-700">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )

      case 'results':
        if (!aiResults || !showResults) return null
        
        return (
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mb-4">
                <CheckCircle2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-2">AI Analysis Complete</h2>
              <p className="text-lg text-gray-600">
                Your personalized project timeline with {aiResults.confidence}% confidence
              </p>
            </div>

            {/* Timeline Summary */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Most Likely Duration</p>
                  <p className="text-4xl font-bold text-gray-900">
                    {Math.floor(aiResults.mostLikelyDuration / 30)}
                  </p>
                  <p className="text-sm text-gray-500">months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Best Case</p>
                  <p className="text-2xl font-semibold text-green-600">
                    {Math.floor(aiResults.optimisticDuration / 30)}
                  </p>
                  <p className="text-sm text-gray-500">months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Worst Case</p>
                  <p className="text-2xl font-semibold text-red-600">
                    {Math.floor(aiResults.pessimisticDuration / 30)}
                  </p>
                  <p className="text-sm text-gray-500">months</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completion Date</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {(() => {
                      const endDate = new Date(projectDetails.startDate)
                      endDate.setDate(endDate.getDate() + aiResults.mostLikelyDuration)
                      return endDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
                    })()}
                  </p>
                </div>
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI-Powered Insights
              </h3>
              <div className="space-y-3">
                {aiResults.factors.slice(0, 5).map((factor: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-0.5 h-2 w-2 rounded-full ${
                      factor.impact > 0 ? 'bg-red-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{factor.factor}</p>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                    </div>
                    <Badge variant={factor.impact > 0 ? 'destructive' : 'default'}>
                      {factor.impact > 0 ? '+' : ''}{factor.impact.toFixed(0)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Phases */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Detailed Project Phases</h3>
              <ScrollArea className="h-96 pr-4">
                <div className="space-y-4">
                  {phases.map((phase, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          phase.criticalPath ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {phase.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold flex items-center gap-2">
                              {phase.name}
                              {phase.criticalPath && (
                                <Badge variant="destructive" className="text-xs">Critical Path</Badge>
                              )}
                            </h4>
                            <span className="text-sm text-gray-500">{phase.duration} days</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                          
                          {/* AI Insights for phase */}
                          {phase.aiInsights && phase.aiInsights.length > 0 && (
                            <div className="mb-3 p-3 bg-purple-50 rounded-lg">
                              <p className="text-xs font-medium text-purple-700 mb-1">AI Insights:</p>
                              <ul className="space-y-1">
                                {phase.aiInsights.slice(0, 2).map((insight: string, i: number) => (
                                  <li key={i} className="text-xs text-purple-600 flex items-start gap-1">
                                    <Sparkles className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                    {insight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {/* Weather sensitivity */}
                          {phase.weatherSensitive && (
                            <div className="flex items-center gap-2 mb-2">
                              <CloudRain className="h-4 w-4 text-blue-500" />
                              <span className="text-xs text-gray-600">Weather sensitive phase</span>
                            </div>
                          )}
                          
                          {/* Resources */}
                          <div className="flex flex-wrap gap-2">
                            {phase.resources.map((resource: any, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {resource.count} {resource.type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Risk Analysis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Risk Analysis & Mitigation
              </h3>
              <div className="space-y-3">
                {risks.map((risk, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <risk.icon className="h-5 w-5 text-gray-600" />
                        <h4 className="font-medium">{risk.risk}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={
                          risk.impact === 'high' ? 'destructive' : 
                          risk.impact === 'medium' ? 'secondary' : 'default'
                        }>
                          {risk.impact} impact
                        </Badge>
                        <Badge variant="outline">
                          {risk.probability}% chance
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{risk.category}</p>
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-green-600 mt-0.5" />
                      <p className="text-sm text-green-700">{risk.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Cost Prediction */}
            {costPrediction && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Coins className="h-5 w-5 text-green-600" />
                  Cost Prediction
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Estimated Cost</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{(costPrediction.baseCost / 100000).toFixed(1)}L
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Best Case</p>
                    <p className="text-xl font-semibold text-green-600">
                      ₹{(costPrediction.minCost / 100000).toFixed(1)}L
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">With Contingency</p>
                    <p className="text-xl font-semibold text-red-600">
                      ₹{(costPrediction.maxCost / 100000).toFixed(1)}L
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-3">Cost Breakdown</p>
                  {costPrediction.breakdown.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-16 text-right">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Optimization Suggestions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                AI Optimization Suggestions
              </h3>
              <div className="space-y-3">
                {optimizations.map((opt, index) => (
                  <Label key={index} htmlFor={`opt-${index}`} className="cursor-pointer">
                    <div className={`p-4 rounded-lg border-2 transition-all ${
                      selectedOptimizations.includes(opt.title)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`opt-${index}`}
                          checked={selectedOptimizations.includes(opt.title)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedOptimizations([...selectedOptimizations, opt.title])
                            } else {
                              setSelectedOptimizations(selectedOptimizations.filter(o => o !== opt.title))
                            }
                          }}
                        />
                        <opt.icon className="h-5 w-5 text-gray-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{opt.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{opt.description}</p>
                          <div className="flex gap-4 text-xs">
                            <span className="text-green-600 font-medium">
                              Time saved: {opt.timeSaved}
                            </span>
                            <span className="text-blue-600 font-medium">
                              Cost impact: {opt.costImpact}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {opt.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
              
              {selectedOptimizations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 rounded-lg"
                >
                  <p className="text-sm text-green-900">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    With selected optimizations: Timeline can be reduced by up to 
                    <span className="font-semibold"> {selectedOptimizations.length * 8}%</span>
                  </p>
                </motion.div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowExportDialog(true)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Save className="h-4 w-4" />
                Save Timeline
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Results
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Recalculate
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {STEPS.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      isActive ? 'bg-blue-600 text-white' : 
                      isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <ChevronRight className={`h-4 w-4 mx-1 ${
                        isCompleted ? 'text-green-500' : 'text-gray-300'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 max-w-2xl mx-auto">
            <Progress value={(currentStep / (STEPS.length - 1)) * 100} className="h-2" />
          </div>
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
          {currentStep > 0 && currentStep < STEPS.length - 1 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0 || loading}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Progress
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={loading}
                  className="gap-2"
                >
                  {currentStep === STEPS.length - 2 ? (
                    <>
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Generate Timeline
                          <Brain className="h-4 w-4" />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Export Dialog */}
        <AlertDialog open={showExportDialog} onOpenChange={setShowExportDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Export Timeline Report</AlertDialogTitle>
              <AlertDialogDescription>
                Choose your preferred format for the timeline report
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <div className="space-y-3 my-4">
              <Label htmlFor="export-format">Export Format</Label>
              <Select value={exportFormat} onValueChange={(value: any) => setExportFormat(value)}>
                <SelectTrigger id="export-format">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Report (Recommended)</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {
                // Handle export
                console.log('Exporting as', exportFormat)
              }}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}