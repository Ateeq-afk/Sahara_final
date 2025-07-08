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
        
        console.log('Generated content length:', content.length)
        console.log('Guide type:', selectedGuide.id)

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
      {/* Floating Lead Magnet Button */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 5, duration: 0.5 }}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-40"
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-6 rounded-r-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 writing-mode-vertical"
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            <span className="font-medium whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
              Free Cost Guides
            </span>
          </div>
        </motion.button>

        {/* Pulsing indicator */}
        <div className="absolute -right-2 top-4 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </motion.div>

      {/* Lead Magnet Modal */}
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {!selectedGuide ? (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-semibold text-center">
                      Free Construction Cost Guides
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-6">
                    <div className="text-center mb-8">
                      <p className="text-gray-600">
                        Download our comprehensive guides and save thousands on your project
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {guides.map((guide) => (
                        <motion.div
                          key={guide.id}
                          whileHover={{ y: -5 }}
                          className="cursor-pointer"
                        >
                          <Card className="border-2 hover:border-slate-900 transition-all duration-300 hover:shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h3 className="font-bold text-xl mb-1">{guide.title}</h3>
                                  <p className="text-slate-300 text-sm">{guide.subtitle}</p>
                                </div>
                                <Badge className="bg-green-500 text-white border-0">
                                  FREE
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-slate-300">
                                <span className="flex items-center gap-1">
                                  <FileText className="w-4 h-4" />
                                  {guide.pages} pages
                                </span>
                                <span>•</span>
                                <span>{guide.format}</span>
                                <span>•</span>
                                <span className="text-green-400 font-semibold">₹{guide.value} value</span>
                              </div>
                            </div>
                            
                            <div className="p-6">
                              <p className="text-gray-600 mb-6">{guide.description}</p>
                              
                              <div className="mb-6">
                                <h4 className="font-semibold text-sm mb-3 text-slate-900">What's Included:</h4>
                                <div className="grid gap-2">
                                  {guide.highlights.slice(0, 4).map((highlight, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm text-gray-700">{highlight}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <Button 
                                onClick={() => setSelectedGuide(guide)}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                              >
                                Get Instant Access
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-900">Limited Time Offer</h4>
                          <p className="text-sm text-amber-800 mt-1">
                            Download any guide and get a FREE 30-minute consultation with our experts!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : !isSuccess ? (
                <>
                  <DialogHeader>
                    <button
                      onClick={() => setSelectedGuide(null)}
                      className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
                    >
                      ← Back
                    </button>
                    <DialogTitle className="text-2xl font-semibold text-center pr-8">
                      Get Your Free Guide
                    </DialogTitle>
                  </DialogHeader>

                  <div className="mt-6">
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{selectedGuide.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{selectedGuide.title}</h3>
                          <p className="text-gray-600 text-sm mt-1">{selectedGuide.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mt-4">
                            {selectedGuide.highlights.map((highlight, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span className="text-xs text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleDownload(); }} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                          className="rounded-xl"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || !email || !name || !phone}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Free Guide
                          </div>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        We respect your privacy. Your information will only be used to send you the guide and 
                        occasional updates about our services.
                      </p>
                    </form>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>

                  <h3 className="text-2xl font-semibold mb-2">Download Started!</h3>
                  <p className="text-gray-600 mb-6">
                    Your guide is downloading. Check your downloads folder.
                  </p>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Next Step:</strong> Our expert will call you within 24 hours to schedule 
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