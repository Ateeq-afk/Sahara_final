'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Home, Building2, Factory, CheckCircle2, AlertCircle, Info, FileText, Clock, IndianRupee, ChevronRight } from 'lucide-react'

interface ComplianceItem {
  id: string
  category: string
  requirement: string
  description: string
  authority: string
  documentRequired: string
  fee?: string
  timeline?: string
  mandatory: boolean
  applicableFor: string[]
}

const bangaloreCompliances: ComplianceItem[] = [
  {
    id: 'bbmp-plan-approval',
    category: 'Building Plan Approval',
    requirement: 'BBMP Building Plan Sanction',
    description: 'Mandatory approval from BBMP for construction plans including architectural, structural, and MEP drawings',
    authority: 'Bruhat Bengaluru Mahanagara Palike (BBMP)',
    documentRequired: 'Site plan, Building plan, Structural drawings, NOCs',
    fee: '₹50-100 per sq.ft based on property type',
    timeline: '30-45 days',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'khata-certificate',
    category: 'Property Documentation',
    requirement: 'A-Khata Certificate',
    description: 'Property ownership document issued by BBMP for properties within BBMP limits',
    authority: 'BBMP Revenue Department',
    documentRequired: 'Sale deed, Tax paid receipts, ID proof',
    timeline: '15-30 days',
    mandatory: true,
    applicableFor: ['residential', 'commercial']
  },
  {
    id: 'setback-norms',
    category: 'Building Regulations',
    requirement: 'Setback Requirements',
    description: 'Mandatory open spaces around the building as per plot size',
    authority: 'BBMP Town Planning',
    documentRequired: 'Site plan with dimensions',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'far-compliance',
    category: 'Building Regulations',
    requirement: 'Floor Area Ratio (FAR) Compliance',
    description: 'Maximum buildable area based on plot size and zone',
    authority: 'BBMP Town Planning',
    documentRequired: 'Building plan with area calculations',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'environmental-clearance',
    category: 'Environmental',
    requirement: 'Environmental Clearance',
    description: 'Required for projects above 20,000 sq.m built-up area',
    authority: 'Karnataka State Pollution Control Board',
    documentRequired: 'EIA report, Building plan, Project details',
    timeline: '90-120 days',
    mandatory: true,
    applicableFor: ['commercial', 'industrial']
  },
  {
    id: 'fire-noc',
    category: 'Safety',
    requirement: 'Fire Department NOC',
    description: 'Mandatory for buildings above 15m height or commercial buildings',
    authority: 'Karnataka Fire and Emergency Services',
    documentRequired: 'Fire safety plan, Building plan',
    fee: 'Based on building area',
    timeline: '15-30 days',
    mandatory: true,
    applicableFor: ['commercial', 'residential', 'industrial']
  },
  {
    id: 'water-connection',
    category: 'Utilities',
    requirement: 'BWSSB Water Connection',
    description: 'Water and sewerage connection approval',
    authority: 'Bangalore Water Supply and Sewerage Board',
    documentRequired: 'Property documents, Building plan approval',
    fee: '₹2,950 for domestic, varies for commercial',
    timeline: '30-45 days',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'electricity-connection',
    category: 'Utilities',
    requirement: 'BESCOM Power Connection',
    description: 'Electricity connection approval and sanctioned load',
    authority: 'Bangalore Electricity Supply Company',
    documentRequired: 'Property documents, Building plan approval',
    fee: 'Based on sanctioned load',
    timeline: '7-15 days',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'rainwater-harvesting',
    category: 'Environmental',
    requirement: 'Rainwater Harvesting System',
    description: 'Mandatory for plots above 60x40 ft or 2400 sq.ft',
    authority: 'BBMP',
    documentRequired: 'RWH plan, Implementation certificate',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'occupancy-certificate',
    category: 'Completion',
    requirement: 'Occupancy Certificate (OC)',
    description: 'Certificate confirming building is constructed as per approved plan',
    authority: 'BBMP',
    documentRequired: 'Completion certificate, NOCs from various departments',
    timeline: '30-60 days',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  },
  {
    id: 'trade-license',
    category: 'Commercial',
    requirement: 'Trade License',
    description: 'Required for commercial establishments',
    authority: 'BBMP Health Department',
    documentRequired: 'Property documents, Business details',
    fee: '₹100-25,000 based on business type',
    timeline: '7-15 days',
    mandatory: true,
    applicableFor: ['commercial']
  },
  {
    id: 'groundwater-noc',
    category: 'Environmental',
    requirement: 'Groundwater Extraction NOC',
    description: 'Required for borewells in critical/overexploited areas',
    authority: 'Central Ground Water Authority',
    documentRequired: 'Site details, Water requirement calculations',
    timeline: '45-60 days',
    mandatory: true,
    applicableFor: ['residential', 'commercial', 'industrial']
  }
]

const zoneRegulations: Record<string, any> = {
  'residential': {
    name: 'Residential Zone',
    maxFAR: 1.75,
    maxGroundCoverage: 50,
    maxHeight: '15m (G+3)',
    minSetback: {
      front: 3,
      sides: 1.5,
      rear: 1.5
    }
  },
  'commercial': {
    name: 'Commercial Zone',
    maxFAR: 2.0,
    maxGroundCoverage: 60,
    maxHeight: '24m',
    minSetback: {
      front: 6,
      sides: 3,
      rear: 3
    }
  },
  'industrial': {
    name: 'Industrial Zone',
    maxFAR: 1.5,
    maxGroundCoverage: 45,
    maxHeight: '15m',
    minSetback: {
      front: 9,
      sides: 4.5,
      rear: 4.5
    }
  }
}

export function ComplianceChecker() {
  const [projectType, setProjectType] = useState<string>('')
  const [propertyType, setPropertyType] = useState<string>('')
  const [plotSize, setPlotSize] = useState<string>('')
  const [builtUpArea, setBuiltUpArea] = useState<string>('')
  const [floors, setFloors] = useState<string>('')
  const [complianceResults, setComplianceResults] = useState<ComplianceItem[]>([])
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('checker')

  const checkCompliance = () => {
    const applicable = bangaloreCompliances.filter(compliance => 
      compliance.applicableFor.includes(propertyType)
    )
    
    const results = [...applicable]
    
    if (plotSize && parseInt(plotSize) < 2400) {
      results.splice(results.findIndex(c => c.id === 'rainwater-harvesting'), 1)
    }
    
    if (propertyType === 'residential' && floors && parseInt(floors) <= 3) {
      const fireIndex = results.findIndex(c => c.id === 'fire-noc')
      if (fireIndex > -1) {
        results[fireIndex] = {
          ...results[fireIndex],
          mandatory: false,
          description: 'Optional for residential buildings up to G+3'
        }
      }
    }
    
    if (builtUpArea && parseInt(builtUpArea) < 20000) {
      const envIndex = results.findIndex(c => c.id === 'environmental-clearance')
      if (envIndex > -1) {
        results.splice(envIndex, 1)
      }
    }
    
    setComplianceResults(results)
    setShowResults(true)
  }

  const calculateSetbacks = () => {
    if (!propertyType || !plotSize) return null
    
    const zone = zoneRegulations[propertyType]
    const plotSizeNum = parseInt(plotSize)
    
    let setbacks = { ...zone.minSetback }
    
    if (plotSizeNum > 4000) {
      setbacks.front = Math.max(setbacks.front * 1.5, 6)
      setbacks.sides = Math.max(setbacks.sides * 1.5, 3)
      setbacks.rear = Math.max(setbacks.rear * 1.5, 3)
    }
    
    return setbacks
  }

  const calculateMaxBuildable = () => {
    if (!propertyType || !plotSize) return null
    
    const zone = zoneRegulations[propertyType]
    const plotSizeNum = parseInt(plotSize)
    const maxBuildable = plotSizeNum * zone.maxFAR
    const maxGroundCoverage = plotSizeNum * (zone.maxGroundCoverage / 100)
    
    return {
      maxBuildable,
      maxGroundCoverage,
      maxHeight: zone.maxHeight
    }
  }

  const propertyTypes = [
    { id: 'residential', label: 'Residential', icon: Home },
    { id: 'commercial', label: 'Commercial', icon: Building2 },
    { id: 'industrial', label: 'Industrial', icon: Factory }
  ]

  const projectTypes = [
    { id: 'construction', label: 'New Construction' },
    { id: 'renovation', label: 'Renovation' },
    { id: 'addition', label: 'Addition/Extension' }
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
          Compliance Checker
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 font-light"
        >
          Navigate Bangalore's building regulations with confidence
        </motion.p>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8"
          >
            <button
              onClick={() => setActiveTab('checker')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'checker' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Compliance Checker
            </button>
            <button
              onClick={() => setActiveTab('regulations')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'regulations' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Zone Regulations
            </button>
          </motion.div>
          
          {activeTab === 'checker' ? (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Input Panel */}
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Project Type</h3>
                  <div className="space-y-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          projectType === type.id 
                            ? 'border-gray-900 bg-gray-900 text-white' 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Property Type</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setPropertyType(type.id)}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center ${
                          propertyType === type.id 
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
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Property Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Plot Size (sq.ft)</label>
                      <input
                        type="number"
                        value={plotSize}
                        onChange={(e) => setPlotSize(e.target.value)}
                        placeholder="e.g., 2400"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Built-up Area (sq.ft)</label>
                      <input
                        type="number"
                        value={builtUpArea}
                        onChange={(e) => setBuiltUpArea(e.target.value)}
                        placeholder="e.g., 1800"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Number of Floors</label>
                      <input
                        type="number"
                        value={floors}
                        onChange={(e) => setFloors(e.target.value)}
                        placeholder="e.g., 2"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <button
                    onClick={checkCompliance}
                    disabled={!projectType || !propertyType}
                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 transition-all font-medium"
                  >
                    Check Compliance Requirements
                  </button>
                </motion.div>
              </div>
              
              {/* Results Panel */}
              <div className="lg:col-span-2">
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    {calculateMaxBuildable() && (
                      <div className="bg-gray-900 text-white rounded-2xl p-6">
                        <h3 className="text-lg font-medium mb-4">Building Constraints</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Max Buildable Area</p>
                            <p className="text-2xl font-light">{calculateMaxBuildable()?.maxBuildable.toLocaleString()} sq.ft</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Max Ground Coverage</p>
                            <p className="text-2xl font-light">{calculateMaxBuildable()?.maxGroundCoverage.toLocaleString()} sq.ft</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400 mb-1">Max Height</p>
                            <p className="text-2xl font-light">{calculateMaxBuildable()?.maxHeight}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {calculateSetbacks() && (
                      <div className="bg-blue-50 rounded-2xl p-6">
                        <h3 className="text-lg font-medium mb-4 flex items-center">
                          <Info className="w-5 h-5 mr-2 text-blue-600" />
                          Minimum Setback Requirements
                        </h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Front</p>
                            <p className="text-xl font-medium">{calculateSetbacks()?.front}m</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Sides</p>
                            <p className="text-xl font-medium">{calculateSetbacks()?.sides}m</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Rear</p>
                            <p className="text-xl font-medium">{calculateSetbacks()?.rear}m</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Required Compliances & Approvals</h3>
                      <div className="grid gap-4">
                        {complianceResults.map((compliance) => (
                          <motion.div 
                            key={compliance.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-all"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-lg flex items-center">
                                  {compliance.requirement}
                                  {compliance.mandatory ? (
                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                                      Mandatory
                                    </span>
                                  ) : (
                                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                      Optional
                                    </span>
                                  )}
                                </h4>
                                <p className="text-sm text-gray-500 mt-0.5">{compliance.category}</p>
                              </div>
                              {compliance.mandatory ? (
                                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                              ) : (
                                <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
                              )}
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-4">{compliance.description}</p>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start">
                                <span className="font-medium text-gray-700 w-32">Authority:</span>
                                <span className="text-gray-600">{compliance.authority}</span>
                              </div>
                              <div className="flex items-start">
                                <span className="font-medium text-gray-700 w-32">Documents:</span>
                                <span className="text-gray-600">{compliance.documentRequired}</span>
                              </div>
                              {compliance.timeline && (
                                <div className="flex items-start">
                                  <span className="font-medium text-gray-700 w-32">Timeline:</span>
                                  <span className="text-gray-600 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {compliance.timeline}
                                  </span>
                                </div>
                              )}
                              {compliance.fee && (
                                <div className="flex items-start">
                                  <span className="font-medium text-gray-700 w-32">Fee:</span>
                                  <span className="text-gray-600 flex items-center">
                                    <IndianRupee className="w-3 h-3 mr-0.5" />
                                    {compliance.fee.replace('₹', '')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-900">Important Notice</p>
                          <p className="text-sm text-amber-700 mt-1">
                            This is a general guide. Specific requirements may vary based on location within Bangalore, 
                            plot characteristics, and current regulations. Always consult with BBMP and relevant authorities 
                            for the most up-to-date requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {Object.entries(zoneRegulations).map(([zone, regulations]) => (
                <div key={zone} className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h3 className="text-lg font-medium mb-4">{regulations.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Maximum FAR</span>
                      <span className="font-medium">{regulations.maxFAR}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Ground Coverage</span>
                      <span className="font-medium">{regulations.maxGroundCoverage}%</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Maximum Height</span>
                      <span className="font-medium">{regulations.maxHeight}</span>
                    </div>
                    <div className="pt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Minimum Setbacks</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Front</span>
                          <span>{regulations.minSetback.front}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sides</span>
                          <span>{regulations.minSetback.sides}m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rear</span>
                          <span>{regulations.minSetback.rear}m</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="md:col-span-3">
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h4 className="font-medium mb-3 flex items-center">
                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                    Additional Regulations
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <span>FAR may be increased for green buildings with appropriate certifications</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <span>Premium FAR available for purchase in certain zones</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <span>Heritage and sensitive zones have additional restrictions</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                      <span>Setbacks increase proportionally for larger plots</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}