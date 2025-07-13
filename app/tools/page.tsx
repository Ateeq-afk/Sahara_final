'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Palette, Clock, ArrowRight, Shield, Video } from 'lucide-react'
import CostCalculator from '@/components/tools/cost-calculator'
import MaterialSelector from '@/components/tools/material-selector'
import TimelineEstimatorAI from '@/components/tools/timeline-estimator-ai'
import { ComplianceChecker } from '@/components/tools/compliance-checker'
import { VirtualSiteVisit } from '@/components/tools/virtual-site-visit'

const tools = [
  {
    id: 'cost-calculator',
    title: 'Cost Calculator',
    subtitle: 'Precision Estimates',
    description: 'Get instant, accurate cost estimates powered by real-time Bangalore market data.',
    icon: Calculator,
    gradient: 'from-blue-500 to-blue-600',
    lightGradient: 'from-blue-50 to-blue-100',
    component: CostCalculator
  },
  {
    id: 'material-selector',
    title: 'Material Library',
    subtitle: 'Curated Selection',
    description: 'Browse premium materials from trusted brands with transparent pricing.',
    icon: Palette,
    gradient: 'from-emerald-500 to-emerald-600',
    lightGradient: 'from-emerald-50 to-emerald-100',
    component: MaterialSelector
  },
  {
    id: 'timeline-estimator',
    title: 'Timeline Planner',
    subtitle: 'Smart Scheduling',
    description: 'AI-powered project timelines that adapt to monsoons and complexity.',
    icon: Clock,
    gradient: 'from-orange-500 to-orange-600',
    lightGradient: 'from-orange-50 to-orange-100',
    component: TimelineEstimatorAI
  },
  {
    id: 'compliance-checker',
    title: 'Compliance Checker',
    subtitle: 'Bangalore Regulations',
    description: 'Navigate BBMP approvals and building regulations with our comprehensive compliance guide.',
    icon: Shield,
    gradient: 'from-red-500 to-red-600',
    lightGradient: 'from-red-50 to-red-100',
    component: ComplianceChecker
  },
  {
    id: 'virtual-site-visit',
    title: 'Virtual Site Visits',
    subtitle: 'Remote Consultations',
    description: 'Schedule video consultations for real-time site inspections and progress reviews.',
    icon: Video,
    gradient: 'from-indigo-500 to-indigo-600',
    lightGradient: 'from-indigo-50 to-indigo-100',
    component: VirtualSiteVisit
  }
]

export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const SelectedComponent = tools.find(t => t.id === selectedTool)?.component

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative z-10 pt-32 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-6 tracking-tight">
              Professional Tools
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Industry-leading planning tools designed for the modern construction professional.
            </p>
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedTool ? (
          <motion.div
            key="tools-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="px-6 pb-20"
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    onClick={() => setSelectedTool(tool.id)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-500">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.lightGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      {/* Content */}
                      <div className="relative p-12">
                        {/* Icon */}
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                          <tool.icon className="w-10 h-10 text-white" />
                        </div>
                        
                        {/* Text */}
                        <div className="mb-8">
                          <h3 className="text-3xl font-light text-gray-900 mb-2">
                            {tool.title}
                          </h3>
                          <p className="text-lg text-gray-500 mb-4">
                            {tool.subtitle}
                          </p>
                          <p className="text-gray-600 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                        
                        {/* CTA */}
                        <div className="flex items-center text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          <span className="text-lg font-light">Launch Tool</span>
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                      
                      {/* Hover Effect */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className={`h-full bg-gradient-to-r ${tool.gradient}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selected-tool"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="px-6 pb-20"
          >
            <div className="max-w-7xl mx-auto">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedTool(null)}
                className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-light">Back to Tools</span>
              </motion.button>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
              >
                {SelectedComponent && <SelectedComponent />}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}