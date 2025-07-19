"use client"

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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
  ArrowRight,
  Sparkles,
  Building,
  Users,
  Award,
  MessageSquare,
  Globe,
  Star,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Navigation,
  PhoneCall,
  MessageCircle,
  Zap,
  Briefcase,
  ChevronRight
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
  company: z.string().optional(),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  preferredContact: z.enum(["email", "phone", "whatsapp"]).optional(),
})

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Villa Owner, Whitefield",
    content: "The attention to detail and quality of work exceeded our expectations. Sahara transformed our vision into a stunning reality.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=95",
    project: "5BHK Luxury Villa"
  },
  {
    name: "Priya Sharma",
    role: "CEO, TechStart",
    content: "Professional, innovative, and delivered on time. Our office space now perfectly reflects our brand identity.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=95",
    project: "Corporate Office"
  },
  {
    name: "Amit Patel",
    role: "Restaurant Owner",
    content: "They understood our vision and created a space that our customers absolutely love. Best investment we made.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=95",
    project: "Fine Dining Restaurant"
  }
]

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" }
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  
  const { scrollY } = useScroll()
  const yTransform = useTransform(scrollY, [0, 500], [0, 100])
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
      preferredContact: "email",
    },
  })

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log('=== Contact Page Form Submission ===')
    console.log('Form values:', values)
    setIsLoading(true)
    
    try {
      console.log('Sending request to /api/contact...')
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)
      
      if (response.ok && data.success) {
        console.log('✅ Form submitted successfully')
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        })
        setIsSubmitted(true)
        form.reset()
      } else {
        console.error('❌ Server returned error:', data.message || 'Failed to submit form')
        throw new Error(data.message || 'Failed to submit form')
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: PhoneCall,
      title: "Phone",
      details: ["+91 95918 37216"],
      action: "tel:+919591837216",
      color: "from-blue-500 to-indigo-600",
      description: "Mon-Sat 9AM-6PM"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["Contact Us"],
      action: "#",
      color: "from-purple-500 to-pink-600",
      description: "24/7 Support",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        window.location.href = 'mailto:' + 'contact' + '@' + window.location.hostname.replace('www.', '');
      }
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["+91 95918 37216"],
      action: "https://wa.me/919591837216",
      color: "from-green-500 to-emerald-600",
      description: "Quick Response"
    },
    {
      icon: MapPin,
      title: "Studio",
      details: ["100-feet Ring Road, 8th Main Road", "BTM Layout 1st Stage, Bangalore - 560029"],
      action: null,
      color: "from-amber-500 to-orange-600",
      description: "Visit Us"
    }
  ]

  const stats = [
    { icon: Building, value: "500+", label: "Projects Delivered", description: "Across Bangalore" },
    { icon: Users, value: "1000+", label: "Happy Families", description: "Trust Us" },
    { icon: Award, value: "50+", label: "Design Awards", description: "Excellence" },
    { icon: Globe, value: "20+", label: "Years Legacy", description: "Since 2003" }
  ]

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      {/* Hero Section - Enhanced Apple Style */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
          
          {/* Animated Gradient Mesh */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${smoothMouseX.get() * 100 + 50}% ${smoothMouseY.get() * 100 + 50}%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)`,
            }}
          />
          
          {/* Floating Orbs */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-300/10 to-orange-300/10 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/10 to-indigo-300/10 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative container mx-auto px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ opacity: opacityTransform }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Apple-style Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 inline-flex"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/5 backdrop-blur-xl border border-gray-200/50">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">Get in Touch</span>
              </div>
            </motion.div>

            {/* Enhanced Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]"
            >
              <span className="block">Let's create</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-300% animate-gradient">
                something amazing
              </span>
              <span className="block">together.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light"
            >
              Ready to transform your space? Our award-winning team is here to bring 
              your vision to life with unparalleled craftsmanship.
            </motion.p>

            {/* Enhanced Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24 max-w-5xl mx-auto"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-6 rounded-3xl">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 group-hover:from-amber-200 group-hover:to-amber-100 transition-all duration-300 mb-4">
                        <Icon className="w-7 h-7 text-amber-600" />
                      </div>
                      <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stat.description}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-gray-300 flex justify-center"
          >
            <motion.div
              animate={{ y: [2, 16, 2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section - Premium Apple Style */}
      <section ref={formRef} className="py-20 md:py-32 relative bg-white">
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
                Get in touch
              </h2>
              <p className="text-xl text-gray-600 mb-12 font-light">
                We're here to help bring your vision to life. Choose your preferred way to connect.
              </p>
              
              {/* Premium Contact Cards */}
              <div className="grid gap-4 mb-12">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      onHoverStart={() => setHoveredCard(index)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="group cursor-pointer"
                    >
                      <div className="relative">
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
                        
                        <div className="relative bg-gray-50 hover:bg-white rounded-3xl p-6 transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-xl">
                          <div className="flex items-start gap-5">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                              <Icon className="h-7 w-7 text-white" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                              {item.action ? (
                                <a 
                                  href={item.action}
                                  onClick={item.onClick}
                                  className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium transition-colors"
                                >
                                  {item.details.map((detail, idx) => (
                                    <span key={idx} className="block">{detail}</span>
                                  ))}
                                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </a>
                              ) : (
                                <div className="text-gray-700">
                                  {item.details.map((detail, idx) => (
                                    <div key={idx}>{detail}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gray-50 rounded-3xl p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Follow our journey
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, i) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={i}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center hover:border-gray-300 hover:shadow-md transition-all"
                      >
                        <Icon className="w-5 h-5 text-gray-700" />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="relative w-24 h-24 mx-auto mb-8"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse" />
                      <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-green-600" />
                      </div>
                    </motion.div>
                    <h2 className="text-4xl font-semibold text-gray-900 mb-4">Message Sent!</h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                      Thank you for reaching out. Our team will respond within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        form.reset()
                      }}
                      className="bg-gray-900 text-white rounded-full px-8 py-4 text-lg hover:bg-gray-800 transition-all"
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
                    className="relative"
                  >
                    {/* Glass Card Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl shadow-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-transparent rounded-3xl" />
                    
                    <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 p-10 md:p-12">
                      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
                        Send us a message
                      </h2>
                      
                      <Form {...form}>
                        <form 
                          name="contact"
                          onSubmit={form.handleSubmit(onSubmit)} 
                          className="space-y-6"
                        >
                          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="John Doe" 
                                      className="h-11 sm:h-12 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm text-base"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="company"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">Company (Optional)</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Acme Corp" 
                                      className="h-11 sm:h-12 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm text-base"
                                      {...field} 
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email"
                                      placeholder="john@example.com" 
                                      className="h-11 sm:h-12 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm text-base"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="tel"
                                      placeholder="+91 98765 43210" 
                                      className="h-11 sm:h-12 px-3 sm:px-4 rounded-xl sm:rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm text-base"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Subject</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Tell us about your project" 
                                    className="h-12 px-4 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />

                          {/* Preferred Contact Method */}
                          <FormField
                            control={form.control}
                            name="preferredContact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">Preferred Contact Method</FormLabel>
                                <FormControl>
                                  <div className="grid grid-cols-3 gap-3">
                                    {[
                                      { value: "email", label: "Email", icon: Mail },
                                      { value: "phone", label: "Phone", icon: Phone },
                                      { value: "whatsapp", label: "WhatsApp", icon: MessageCircle }
                                    ].map((option) => {
                                      const Icon = option.icon
                                      return (
                                        <label
                                          key={option.value}
                                          className={`relative flex items-center justify-center gap-2 p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                                            field.value === option.value
                                              ? 'border-gray-900 bg-gray-900 text-white'
                                              : 'border-gray-200 bg-white hover:border-gray-400'
                                          }`}
                                        >
                                          <input
                                            type="radio"
                                            value={option.value}
                                            checked={field.value === option.value}
                                            onChange={field.onChange}
                                            className="sr-only"
                                          />
                                          <Icon className={`w-4 h-4 ${
                                            field.value === option.value ? 'text-white' : 'text-gray-600'
                                          }`} />
                                          <span className={`text-sm font-medium ${
                                            field.value === option.value ? 'text-white' : 'text-gray-700'
                                          }`}>
                                            {option.label}
                                          </span>
                                        </label>
                                      )
                                    })}
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-700">Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us about your dream project..."
                                    className="min-h-32 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm resize-none"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage className="text-xs mt-1" />
                              </FormItem>
                            )}
                          />
                          
                          <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-gray-900 text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                        </form>
                      </Form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Premium Apple Style */}
      <section ref={testimonialsRef} className="py-20 md:py-32 relative bg-gray-50">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              Client testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Hear from the families and businesses we've had the privilege to work with.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative h-full bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    {/* Quote Mark */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <span className="text-white text-2xl font-serif">"</span>
                    </div>
                    
                    <div className="flex gap-1 mb-6 mt-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                      {testimonial.content}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={64}
                            height={64}
                            className="rounded-2xl object-cover"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-4 ring-white" />
                        </div>
                        <div>
                          <h4 className="text-gray-900 font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">
                          Project: <span className="text-gray-700 font-medium">{testimonial.project}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300 group"
            >
              View Our Portfolio
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Map Section - Premium Apple Style */}
      <section ref={mapRef} className="py-20 md:py-32 relative bg-white">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6">
              Visit our studio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Experience our design philosophy firsthand at our state-of-the-art studio in Bangalore.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative rounded-3xl overflow-hidden h-[700px] shadow-2xl max-w-7xl mx-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085452149588!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1647851449644!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Premium Overlay Card */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                className="relative"
              >
                {/* Glass Effect Background */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent rounded-3xl" />
                
                <div className="relative p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-200/50 max-w-md">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                      <Navigation className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-2xl text-gray-900">Sahara Design Studio</h3>
                      <p className="text-gray-500">Experience Center</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-gray-700">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <p className="font-medium">100-feet Ring Road, 8th Main Road</p>
                        <p className="text-sm text-gray-500">BTM Layout 1st Stage, Bangalore - 560029</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="font-medium">Monday - Saturday</p>
                        <p className="text-sm text-gray-500">9:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-amber-600" />
                      <a href="tel:+919591837216" className="font-medium hover:text-amber-600 transition-colors">
                        +91 95918 37216
                      </a>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <motion.a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
                  >
                    Get Directions
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}