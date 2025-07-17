'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ShoppingBag, 
  MessageSquare, 
  FileCheck,
} from 'lucide-react'

export default function SmartToolsBanner() {
  const tools = [
    {
      title: 'Material Marketplace',
      description: 'Compare 500+ premium materials',
      icon: ShoppingBag,
      link: '/marketplace',
      stat: '₹50K+ saved on average',
      ariaLabel: 'Access Material Marketplace - Compare over 500 premium materials'
    },
    {
      title: 'AI Assistant',
      description: 'Get instant answers 24/7',
      icon: MessageSquare,
      link: '#',
      stat: '2 min response time',
      ariaLabel: 'Launch AI Assistant - Get instant answers 24/7',
      action: () => {
        // Trigger FAQ chatbot
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('openChatbot')
          window.dispatchEvent(event)
        }
      }
    },
    {
      title: 'Compliance Checker',
      description: 'BBMP regulations simplified',
      icon: FileCheck,
      link: '/tools',
      stat: '100% approval rate',
      ariaLabel: 'Open Compliance Checker - BBMP regulations simplified'
    }
  ]

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            More Helpful Tools
          </h2>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              
              const handleClick = (e: React.MouseEvent) => {
                if (tool.action) {
                  e.preventDefault()
                  tool.action()
                }
              }
              
              return (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  whileHover={{ scale: 1.01 }}
                  className="h-full"
                >
                  <Link 
                    href={tool.link}
                    onClick={handleClick}
                    aria-label={tool.ariaLabel}
                    className="block h-full"
                  >
                    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="rounded-full bg-neutral-100 p-2 flex-shrink-0">
                          <Icon className="w-5 h-5 text-neutral-700" />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-neutral-900 mb-1">
                            {tool.title}
                          </h3>
                          <p className="text-sm text-neutral-600 mb-3">
                            {tool.description}
                          </p>
                          <p className="text-sm text-[#D26700] font-medium">
                            {tool.stat}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}