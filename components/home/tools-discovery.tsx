'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Calculator, 
  Clock, 
  Palette, 
  CheckCircle, 
  Video,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const toolsData = [
  {
    id: 'cost-calculator',
    title: 'Instant Cost Estimator',
    subtitle: 'Get accurate pricing in seconds',
    description: 'Our AI-powered calculator provides detailed cost breakdowns for your project.',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    link: '/tools',
    demo: '₹1,650 - ₹6,000 per sq ft',
    features: ['Quality levels', 'Add-ons pricing', 'Download estimates']
  },
  {
    id: 'timeline',
    title: 'Smart Timeline Planner',
    subtitle: 'Know exactly when you\'ll move in',
    description: 'AI predicts project completion dates considering Bangalore weather patterns.',
    icon: Clock,
    color: 'from-green-500 to-emerald-500',
    link: '/tools',
    demo: '4-18 months typical',
    features: ['Weather impact', 'Fast-track options', 'Gantt charts']
  }
]

const miniTools = [
  {
    title: 'Material Selector',
    description: 'Browse premium materials',
    icon: Palette,
    link: '/marketplace'
  },
  {
    title: 'Compliance Check',
    description: 'BBMP regulations guide',
    icon: CheckCircle,
    link: '/tools'
  },
  {
    title: 'Virtual Site Visit',
    description: 'Remote inspections',
    icon: Video,
    link: '/tools'
  }
]

export default function ToolsDiscovery() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sahara-primary/10 to-sahara-secondary/10 px-4 py-2 rounded-full mb-4"
          >
            <Sparkles className="h-4 w-4 text-sahara-primary" />
            <span className="text-sm font-medium text-sahara-primary">Powerful Tools at Your Fingertips</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Plan smarter.
            <span className="text-sahara-primary"> Build better.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-leading tools that make your construction journey effortless and transparent.
          </p>
        </motion.div>

        {/* Main Tools Grid - Bento Style */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {toolsData.map((tool, index) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                className="group"
              >
                <Link href={tool.link}>
                  <Card className="relative h-full p-8 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${tool.color} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <AnimatePresence>
                          {hoveredTool === tool.id && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="flex items-center gap-1 text-sm text-sahara-primary"
                            >
                              <span>Try it</span>
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 mb-1">
                        {tool.subtitle}
                      </p>
                      <p className="text-gray-500 text-sm mb-4">
                        {tool.description}
                      </p>
                      
                      {/* Demo Preview */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-xs text-gray-500 mb-1">Quick preview</p>
                        <p className="font-semibold text-gray-900">{tool.demo}</p>
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {tool.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Hover Effect Line */}
                    <motion.div
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${tool.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredTool === tool.id ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Mini Tools Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">More helpful tools</h3>
            <Link href="/tools">
              <Button variant="ghost" size="sm" className="gap-2">
                View all tools
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {miniTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Link key={index} href={tool.link}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-gray-300 transition-all cursor-pointer"
                  >
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <Icon className="h-5 w-5 text-gray-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{tool.title}</h4>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </motion.div>

        {/* Interactive Demo CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-sahara-primary/5 rounded-full">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-sahara-primary to-sahara-secondary flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">2,847 professionals</span> used our tools this week
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}