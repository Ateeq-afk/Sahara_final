"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'
import { 
  CheckCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Send,
  Clock,
  Building,
  Calendar,
  Users,
  ArrowRight,
  Sparkles,
  Globe
} from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(values)
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    })
    setIsLoading(false)
    setIsSubmitted(true)
  }

  const offices = [
    {
      city: "Bangalore HQ",
      address: "123 Sahara Towers, MG Road",
      phone: "+91 98765 43210",
      email: "bangalore@saharadevelopers.in",
      timing: "Mon-Sat: 9AM-7PM"
    },
    {
      city: "Site Office",
      address: "Whitefield, Bangalore",
      phone: "+91 98765 43211",
      email: "site@saharadevelopers.in",
      timing: "Mon-Sat: 8AM-6PM"
    }
  ]

  const stats = [
    { icon: Building, value: "500+", label: "Projects" },
    { icon: Users, value: "1000+", label: "Happy Families" },
    { icon: Clock, value: "24hr", label: "Response Time" },
    { icon: Calendar, value: "20+", label: "Years Experience" }
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-out'
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-amber-300/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Get in Touch
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 bg-clip-text text-transparent mb-6">
              Let's Build Your Dream Together
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with Bangalore's most trusted construction and interior design experts. 
              We're here to transform your vision into reality.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center group hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-200 transition-colors">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Office Locations */}
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Building className="w-5 h-5 text-amber-600" />
                      {office.city}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-amber-600 transition-colors">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{office.timing}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:bg-white"
                    asChild
                  >
                    <a href="/quote">
                      Get Instant Quote
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:bg-white"
                    asChild
                  >
                    <a href="/packages">
                      View Packages
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between hover:bg-white"
                    asChild
                  >
                    <a href="tel:+919876543210">
                      Call Now
                      <Phone className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-2"
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-2xl shadow-xl p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Your message has been successfully sent. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        form.reset()
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-8"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                  >
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                      <p className="text-gray-600">Fill out the form below and we'll get back to you promptly</p>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="john@example.com" 
                                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Phone Number</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="+91 98765 43210" 
                                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Subject</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Project Inquiry" 
                                    className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-medium">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about your project requirements..."
                                  className="min-h-[140px] border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 transition-all resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-6 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us Here</h2>
              <p className="text-gray-600">Located in the heart of Bangalore, easily accessible from all major areas</p>
            </div>
            
            <div className="relative rounded-2xl overflow-hidden h-[400px] shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085452149588!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1647851449644!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sahara Developers</h3>
                    <p className="text-sm text-gray-600">MG Road, Bangalore</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}