'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, FileText, CheckCircle, X, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { generateCostGuideContent } from '@/lib/generate-cost-guide'
import { generateInteriorGuideContent } from '@/lib/generate-interior-guide'
import { generateRenovationGuideContent } from '@/lib/generate-renovation-guide'

const guides = [
  {
    id: 'construction-cost-guide',
    title: '2025 Bangalore Construction Cost Guide',
    description: 'Complete pricing breakdown for residential construction',
    pages: 28,
    fileSize: '2.4 MB',
    icon: '🏗️',
    highlights: [
      'Area-wise cost analysis',
      'Material pricing trends',
      'Labor cost estimates',
      'Hidden costs revealed'
    ]
  },
  {
    id: 'interior-design-guide',
    title: 'Interior Design Budget Planner',
    description: 'Room-by-room cost estimates and design ideas',
    pages: 35,
    fileSize: '3.1 MB',
    icon: '🎨',
    highlights: [
      'Style-wise pricing',
      'Furniture cost ranges',
      'Designer vs DIY costs',
      'Savings tips included'
    ]
  },
  {
    id: 'renovation-checklist',
    title: 'Home Renovation Checklist',
    description: 'Step-by-step guide to planning your renovation',
    pages: 18,
    fileSize: '1.8 MB',
    icon: '🔨',
    highlights: [
      'Pre-renovation prep',
      'Contractor selection',
      'Timeline planning',
      'Quality checkpoints'
    ]
  }
]

export default function LeadMagnet() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<typeof guides[0] | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleDownload = async () => {
    if (!email || !name || !phone || !selectedGuide) return

    setIsSubmitting(true)

    try {
      // Send lead data to API
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          phone,
          guide: selectedGuide.id,
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setIsSuccess(true)
        
        // Create downloadable content based on selected guide
        let content = ''
        let filename = ''
        
        switch (selectedGuide.id) {
          case 'construction-cost-guide':
            content = generateCostGuideContent(name)
            filename = 'sahara-construction-cost-guide-2025.txt'
            break
          case 'interior-design-guide':
            content = generateInteriorGuideContent(name)
            filename = 'sahara-interior-design-guide-2025.txt'
            break
          case 'renovation-checklist':
            content = generateRenovationGuideContent(name)
            filename = 'sahara-renovation-checklist-2025.txt'
            break
          default:
            content = generateCostGuideContent(name)
            filename = 'sahara-guide-2025.txt'
        }

        // Download file (only on client)
        if (typeof window !== 'undefined') {
          const blob = new Blob([content], { type: 'text/plain; charset=utf-8' })
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = filename
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
        }

        // Reset after delay
        setTimeout(() => {
          setIsSuccess(false)
          setIsOpen(false)
          setEmail('')
          setName('')
          setPhone('')
          setSelectedGuide(null)
        }, 3000)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Professional Floating Button - Apple Style */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-white border border-gray-200 text-gray-900 px-3 py-4 rounded-r-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5 text-gray-700" />
            </div>
            <span className="text-xs font-medium tracking-wider text-gray-700" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              FREE GUIDES
            </span>
          </div>
        </motion.button>

        {/* Subtle indicator */}
        <div className="absolute -right-1 top-4 w-2 h-2 bg-green-500 rounded-full" />
      </motion.div>

      {/* Apple-Style Modal */}
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-50 border-0">
              {!selectedGuide ? (
                <>
                  <DialogHeader className="text-center pb-0">
                    <DialogTitle asChild>
                      <div>
                        <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">Free Guides</h2>
                        <p className="text-lg text-gray-500 mt-2 font-normal">
                          Professional resources to plan your project
                        </p>
                      </div>
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-8">
                    {/* Stats Bar */}
                    <div className="flex items-center justify-center gap-12 py-6 mb-8">
                      <div className="text-center">
                        <p className="text-3xl font-semibold text-gray-900">10K+</p>
                        <p className="text-sm text-gray-500 mt-1">Downloads</p>
                      </div>
                      <div className="h-12 w-px bg-gray-200" />
                      <div className="text-center">
                        <p className="text-3xl font-semibold text-gray-900">4.9⭐</p>
                        <p className="text-sm text-gray-500 mt-1">Rating</p>
                      </div>
                      <div className="h-12 w-px bg-gray-200" />
                      <div className="text-center">
                        <p className="text-3xl font-semibold text-gray-900">2025</p>
                        <p className="text-sm text-gray-500 mt-1">Updated</p>
                      </div>
                    </div>

                    {/* Guide Cards - Apple Style */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {guides.map((guide) => (
                        <motion.div
                          key={guide.id}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setSelectedGuide(guide)}
                          className="cursor-pointer"
                        >
                          <div className="bg-white rounded-2xl p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                              <span className="text-2xl">{guide.icon}</span>
                            </div>
                            
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{guide.title}</h3>
                            <p className="text-sm text-gray-500 mb-4 flex-grow">{guide.description}</p>
                            
                            <div className="space-y-2 mb-6">
                              {guide.highlights.slice(0, 2).map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-sm text-gray-600">{highlight}</span>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                              <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {guide.pages} pages
                              </span>
                              <span>{guide.fileSize}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Offer Banner */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Sparkles className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Limited Time Offer</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Download any guide and get a FREE 30-minute consultation with our experts!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : !isSuccess ? (
                <>
                  <DialogHeader className="pb-0">
                    <button
                      onClick={() => setSelectedGuide(null)}
                      className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ← Back
                    </button>
                    <DialogTitle className="text-2xl font-semibold text-center text-gray-900 pt-2">
                      Get Your Free Guide
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-8">
                    {/* Selected Guide Card */}
                    <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{selectedGuide.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-900">{selectedGuide.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{selectedGuide.description}</p>
                          
                          <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {selectedGuide.pages} pages
                            </span>
                            <span>{selectedGuide.fileSize}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <form 
                      name="lead-magnet"
                      onSubmit={(e) => { e.preventDefault(); handleDownload(); }} 
                      className="space-y-6"
                    >
                      <input type="hidden" name="guide" value={selectedGuide?.title || ''} />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <Input
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                          className="h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mobile Number
                        </label>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                          className="h-12 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting || !email || !name || !phone}
                          className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 rounded-xl font-medium transition-colors"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Processing...
                            </div>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" />
                              Download Free Guide
                            </div>
                          )}
                        </Button>
                        
                        <p className="text-xs text-gray-500 text-center mt-4">
                          By downloading, you agree to receive occasional updates. Unsubscribe anytime.
                        </p>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className="py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Success!</h3>
                  <p className="text-gray-500 mb-8">
                    Your guide is downloading. Check your downloads folder.
                  </p>

                  <div className="bg-gray-100 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-gray-600">
                      <strong>What's next?</strong> Our expert will call you within 24 hours to schedule 
                      your free consultation.
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}