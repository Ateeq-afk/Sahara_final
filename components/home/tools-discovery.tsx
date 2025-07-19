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
  MessageSquare,
  Sparkles,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const allTools = [
  {
    id: 'cost-calculator',
    title: 'Instant Cost Estimator',
    subtitle: 'Get accurate pricing in seconds',
    description: 'Our AI-powered calculator provides detailed cost breakdowns for your project.',
    icon: Calculator,
    color: 'from-blue-500 to-cyan-500',
    link: '/tools#cost-calculator',
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
    link: '/tools#timeline-estimator',
    demo: '4-18 months typical',
    features: ['Weather impact', 'Fast-track options', 'Gantt charts']
  },
  {
    id: 'material-selector',
    title: 'Material Selector',
    subtitle: 'Browse premium materials',
    description: 'Explore our curated collection of high-quality construction materials.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    link: '/marketplace',
    demo: 'Compare 500+ materials',
    features: ['Price comparison', 'Quality ratings', 'Supplier info']
  },
  {
    id: 'compliance-check',
    title: 'Compliance Check',
    subtitle: 'BBMP regulations guide',
    description: 'Ensure your project meets all Bangalore building regulations.',
    icon: CheckCircle,
    color: 'from-orange-500 to-red-500',
    link: '/tools#compliance-checker',
    demo: 'Instant compliance report',
    features: ['BBMP rules', 'Document checklist', 'Approval timeline']
  },
  {
    id: 'virtual-site-visit',
    title: 'Virtual Site Visit',
    subtitle: 'Remote inspections',
    description: 'Get real-time updates with video walkthroughs of your project.',
    icon: Video,
    color: 'from-indigo-500 to-purple-500',
    link: '/tools#virtual-site-visit',
    demo: 'Live video tours',
    features: ['360° views', 'Progress tracking', 'Expert commentary']
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    subtitle: 'Get instant answers 24/7',
    description: 'Our intelligent chatbot helps with questions about your project anytime.',
    icon: MessageSquare,
    color: 'from-teal-500 to-cyan-500',
    link: '#',
    demo: '2 min response time',
    features: ['24/7 availability', 'Project insights', 'Expert knowledge'],
    action: () => {
      // Trigger FAQ chatbot
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('openChatbot')
        window.dispatchEvent(event)
      }
    }
  }
]

export default function ToolsDiscovery() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const [showScrollHint, setShowScrollHint] = useState(true)
  
  // Hide scroll hint after user interacts
  const handleScroll = () => {
    setShowScrollHint(false)
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sahara-primary/10 to-sahara-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="container mx-auto px-4">
        {/* Section Header - Apple Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 text-center mb-16"
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
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Plan smarter.
            <span className="bg-gradient-to-r from-sahara-primary to-sahara-secondary bg-clip-text text-transparent block sm:inline"> Build better.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industry-leading AI-powered tools that revolutionize your construction experience.
          </p>
        </motion.div>

        {/* All Tools - Horizontal Scroll for Both Mobile and Desktop */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-4 mb-12 mt-16 relative" onScroll={handleScroll}>
          {/* Scroll Hint */}
          <AnimatePresence>
            {showScrollHint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-4 sm:right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              >
                <div className="bg-black/70 text-white px-3 py-1.5 rounded-full text-xs lg:text-sm flex items-center gap-1">
                  <span className="hidden lg:inline">Scroll for more</span>
                  <span className="lg:hidden">Swipe for more</span>
                  <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {allTools.map((tool, index) => {
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
                  <Link 
                    href={tool.link}
                    onClick={(e) => {
                      if (tool.action) {
                        e.preventDefault()
                        tool.action()
                      }
                    }}>
                    <Card className="relative h-full p-6 lg:p-8 border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden backdrop-blur-sm bg-white/95" style={{ width: '280px', minWidth: '280px' }}>
                      {/* Enhanced Background Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-all duration-700`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
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
                                className="flex items-center gap-1 text-sm text-sahara-primary px-4 py-2"
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
                        
                        {/* Enhanced Demo Preview */}
                        <motion.div 
                          className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl px-4 py-3 mb-4 border border-gray-200/50"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-xs text-gray-500 mb-1">Quick preview</p>
                          <p className="font-semibold text-gray-900">{tool.demo}</p>
                        </motion.div>
                        
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
        </div>

        {/* View All Tools CTA */}
        <div className="flex justify-center mt-8">
          <Link href="/tools">
            <Button variant="outline" size="lg" className="gap-2">
              Explore All Tools
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

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
            <p className="text-sm sm:text-base text-gray-700">
              <span className="font-semibold">2,847 professionals</span> used our tools this week
            </p>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-x-auto::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-x-auto {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </section>
  )
}