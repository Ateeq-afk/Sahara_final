"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Phone, MessageSquare, Mail, X, MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import UnifiedFAB from '@/components/unified-fab'

export default function ContactSectionMinimal() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    // Here you would normally send to backend
    alert('Thank you! We will call you back soon.')
    setIsModalOpen(false)
    setFormData({ fullName: '', phoneNumber: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="apple-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-5xl lg:text-6xl font-semibold text-gray-900 mb-4 tracking-tight">
            Let's Talk.
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to transform your space? Connect with us through your preferred channel.
          </p>
          
          {/* Contact Options - Apple Style Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">
            {/* Call Card */}
            <motion.a 
              href="tel:+919591837216"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="block rounded-2xl bg-gray-50 p-6 hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-gray-500 font-medium">PHONE</span>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Call us directly</h3>
              <p className="text-2xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                +91 95918 37216
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://wa.me/919591837216?text=Hi!%20I'm%20interested%20in%20starting%20a%20project%20with%20Sahara%20Developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.a>
            
            {/* Email Card */}
            <motion.a 
              href="mailto:info@saharadevelopers.in"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="block rounded-2xl bg-gray-50 p-6 hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Mail className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-gray-500 font-medium">EMAIL</span>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Send us an email</h3>
              <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-all">
                info@saharadevelopers.in
              </p>
              <p className="mt-3 text-sm text-gray-500">We usually reply within 30 mins</p>
            </motion.a>
            
            {/* Visit Card */}
            <motion.a 
              href="https://maps.google.com/?q=100-feet+Ring+Road+8th+Main+Road+BTM+Layout+1st+Stage+Bangalore+560029"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="block rounded-2xl bg-gray-50 p-6 hover:bg-gray-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <MapPin className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-xs text-gray-500 font-medium">LOCATION</span>
              </div>
              <h3 className="text-base font-medium text-gray-900 mb-1">Visit our office</h3>
              <p className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                BTM Layout, Bangalore
              </p>
              <p className="mt-3 text-sm text-gray-500">100-feet Ring Road, 8th Main</p>
            </motion.a>
          </div>
          
          {/* Primary CTA */}
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Ready to start? Choose your preferred option:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link 
                  href="/quote" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-xl"
                >
                  Start Your Project
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
                >
                  <Phone className="mr-2 w-4 h-4" />
                  Request a Callback
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Unified Floating Action Button */}
    <UnifiedFAB />

    {/* Request Callback Modal */}
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Request a Callback</DialogTitle>
          <Button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            variant="ghost"
            size="icon"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6 mt-6"
        >
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+91 98765 43210"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us briefly about your project..."
              className="w-full min-h-[100px]"
            />
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            >
              Submit Request
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
    </>
  )
}