'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Zap, 
  ShoppingBag, 
  MessageSquare, 
  FileCheck,
  ArrowRight,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SmartToolsBanner() {
  const quickTools = [
    {
      title: 'Material Marketplace',
      description: 'Compare 500+ premium materials',
      icon: ShoppingBag,
      link: '/marketplace',
      color: 'from-blue-500 to-cyan-500',
      stat: '₹50K+ saved on average'
    },
    {
      title: 'AI Assistant',
      description: 'Get instant answers 24/7',
      icon: MessageSquare,
      link: '#',
      color: 'from-green-500 to-emerald-500',
      stat: '2 min response time',
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
      color: 'from-purple-500 to-pink-500',
      stat: '100% approval rate'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full mb-4">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">Smart Tools</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Everything you need. All in one place.
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Powerful tools that save time, money, and eliminate guesswork from your construction journey.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quickTools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div 
                    className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 h-full hover:border-gray-600 transition-all cursor-pointer"
                    onClick={tool.action}
                  >
                    <Link href={tool.link} onClick={(e) => tool.action && e.preventDefault()}>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${tool.color} shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {tool.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-300">{tool.stat}</span>
                      </div>
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-8 py-4">
              <div className="text-left">
                <p className="text-white font-semibold">Want to explore all our tools?</p>
                <p className="text-sm text-gray-400">Discover 10+ smart features designed for you</p>
              </div>
              <Link href="/tools">
                <Button className="bg-white text-gray-900 hover:bg-gray-100">
                  Explore Tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}