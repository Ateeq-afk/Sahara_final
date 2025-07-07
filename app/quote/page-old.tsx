"use client"

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/hooks/use-toast'
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Home, 
  Ruler, 
  DollarSign, 
  Clock, 
  MessageSquare,
  Sparkles,
  Zap,
  Calendar,
  MapPin,
  Briefcase,
  Shield,
  Award,
  Palette,
  Camera,
  FileText,
  TrendingUp,
  Maximize,
  Users,
  Settings
} from 'lucide-react'
import Image from 'next/image'

const formSchema = z.object({
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
  serviceType: z.string({
    required_error: "Please select a service type.",
  }),
  projectType: z.string({
    required_error: "Please select a project type.",
  }),
  propertySize: z.string({
    required_error: "Please select a property size.",
  }),
  budget: z.string({
    required_error: "Please select a budget range.",
  }),
  timeline: z.string({
    required_error: "Please select a timeline.",
  }),
  location: z.string().optional(),
  designStyle: z.array(z.string()).optional(),
  keyFeatures: z.array(z.string()).optional(),
  message: z.string().optional(),
})

const steps = [
  { id: 1, title: "Contact", subtitle: "Tell us about yourself", icon: User },
  { id: 2, title: "Project", subtitle: "What are you building?", icon: Building },
  { id: 3, title: "Specifications", subtitle: "Project requirements", icon: Settings },
  { id: 4, title: "Design", subtitle: "Style preferences", icon: Palette },
  { id: 5, title: "Timeline", subtitle: "When to start?", icon: Calendar }
]

const designStyles = [
  { id: 'modern', name: 'Modern Minimalist', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80' },
  { id: 'contemporary', name: 'Contemporary', image: 'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&q=80' },
  { id: 'traditional', name: 'Traditional', image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400&q=80' },
  { id: 'industrial', name: 'Industrial', image: 'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=400&q=80' },
  { id: 'scandinavian', name: 'Scandinavian', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80' },
  { id: 'luxury', name: 'Luxury Premium', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80' }
]

const keyFeatures = [
  { id: 'smart-home', name: 'Smart Home Integration', icon: Zap },
  { id: 'sustainable', name: 'Sustainable Materials', icon: Shield },
  { id: 'custom-furniture', name: 'Custom Furniture', icon: Briefcase },
  { id: 'outdoor-spaces', name: 'Outdoor Living', icon: Home },
  { id: 'home-theater', name: 'Home Theater', icon: Camera },
  { id: 'wine-cellar', name: 'Wine Cellar', icon: Award },
  { id: 'gym', name: 'Home Gym', icon: TrendingUp },
  { id: 'office', name: 'Home Office', icon: FileText }
]

const estimateRanges = {
  'construction': {
    'residential': { min: 1599, max: 3499 },
    'commercial': { min: 1899, max: 4299 },
    'office': { min: 2199, max: 3899 },
    'retail': { min: 1799, max: 3299 },
    'other': { min: 1699, max: 3799 }
  },
  'interior-decor': {
    'residential': { min: 899, max: 2499 },
    'commercial': { min: 1199, max: 2899 },
    'office': { min: 1099, max: 2699 },
    'retail': { min: 999, max: 2399 },
    'other': { min: 1049, max: 2599 }
  },
  'renovation': {
    'residential': { min: 699, max: 1899 },
    'commercial': { min: 899, max: 2299 },
    'office': { min: 799, max: 2099 },
    'retail': { min: 749, max: 1999 },
    'other': { min: 799, max: 2149 }
  },
  'turnkey': {
    'residential': { min: 2199, max: 4999 },
    'commercial': { min: 2599, max: 5999 },
    'office': { min: 2399, max: 5499 },
    'retail': { min: 2299, max: 5299 },
    'other': { min: 2399, max: 5699 }
  }
}

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState<{min: number, max: number} | null>(null)
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
  
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
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      location: "",
      message: "",
      designStyle: [],
      keyFeatures: [],
    },
  })

  const watchedValues = form.watch()

  useEffect(() => {
    const { serviceType, projectType, propertySize } = watchedValues
    if (serviceType && projectType && propertySize) {
      const baseRates = estimateRanges[serviceType as keyof typeof estimateRanges]?.[projectType as keyof typeof estimateRanges['construction']]
      
      if (baseRates) {
        const sizeMultiplier = {
          'under-1000': 800,
          '1000-2000': 1500,
          '2000-3000': 2500,
          'above-3000': 3500
        }[propertySize] || 1500

        setEstimatedCost({
          min: Math.round((baseRates.min * sizeMultiplier) / 1000) * 1000,
          max: Math.round((baseRates.max * sizeMultiplier) / 1000) * 1000
        })
      }
    }
  }, [watchedValues.serviceType, watchedValues.projectType, watchedValues.propertySize])

  const validateCurrentStep = async () => {
    let fieldsToValidate: any[] = []
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'email', 'phone']
        break
      case 2:
        fieldsToValidate = ['serviceType', 'projectType']
        break
      case 3:
        fieldsToValidate = ['propertySize', 'budget']
        break
      case 4:
        // Design preferences step - no required fields
        break
      case 5:
        fieldsToValidate = ['timeline']
        break
    }
    
    return fieldsToValidate.length > 0 ? await form.trigger(fieldsToValidate) : true
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        toast({
          title: "Quote Request Submitted",
          description: "We'll get back to you within 2 hours with a detailed estimate.",
        })
        setIsSubmitted(true)
      } else {
        throw new Error(data.message || 'Failed to submit quote request')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl w-full"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="h-16 w-16 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-semibold mb-6 tracking-[-0.03em]"
            >
              Thank you!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto"
            >
              Your quote request has been received. Our team will prepare a detailed 
              proposal and contact you within 2 hours.
            </motion.p>

            {estimatedCost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-50 rounded-3xl p-8 mb-12 max-w-md mx-auto"
              >
                <p className="text-sm text-gray-500 mb-3">Estimated Investment</p>
                <p className="text-4xl font-semibold text-amber-700">
                  ₹{(estimatedCost.min / 100000).toFixed(1)}L - ₹{(estimatedCost.max / 100000).toFixed(1)}L
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/"
                className="px-8 py-4 bg-gray-100 text-gray-900 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-medium hover:from-amber-700 hover:to-amber-800 transition-all"
              >
                View Our Work
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#fbfbfd]">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50" />
          
          {/* Animated Gradient Mesh */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${smoothMouseX.get() * 100 + 50}% ${smoothMouseY.get() * 100 + 50}%, rgba(251, 191, 36, 0.15) 0%, transparent 50%)`,
            }}
          />
          
          {/* Floating Orbs */}
          <motion.div 
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl"
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
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative container mx-auto px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12 inline-flex"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/5 backdrop-blur-xl border border-gray-200/50">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">Premium Quote Experience</span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-[-0.04em] leading-[0.95]">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                Transform your
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 bg-300% animate-gradient"
              >
                vision to reality
              </motion.span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-8 text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light"
          >
            Get a detailed, personalized quote for your dream project in minutes.
            <span className="block mt-2 text-base md:text-lg text-gray-500">
              No obligations. Just expert guidance.
            </span>
          </motion.p>
          
          {/* Progress Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-8"
          >
            {steps.map((step, index) => (
              <div key={step.id} className="hidden md:flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    index === 0 ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2 text-gray-500">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-16 h-[2px] bg-gray-200 mx-2" />
                )}
              </div>
            ))}
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
      </motion.section>

      {/* Form Section */}
      <section ref={formRef} className="py-20 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="flex-1 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          if (step.id <= currentStep) setCurrentStep(step.id)
                        }}
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                          step.id === currentStep 
                            ? 'bg-gray-900 text-white shadow-lg scale-110' 
                            : step.id < currentStep
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        <step.icon className="w-5 h-5" />
                        {step.id === currentStep && (
                          <motion.div
                            className="absolute inset-0 rounded-full bg-gray-900"
                            layoutId="activeStep"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </button>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-[2px] transition-all duration-500 ${
                          step.id < currentStep ? 'bg-gray-900' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                    <div className="mt-3">
                      <p className={`text-sm font-medium transition-all ${
                        step.id === currentStep ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{step.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative"
            >
              {/* Glass Card Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl shadow-2xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/20 to-transparent rounded-3xl" />
              
              <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
                <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="p-12"
                >
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Step 1: Personal Details */}
                      {currentStep === 1 && (
                        <div className="space-y-8">
                          <div className="text-center">
                            <motion.h2 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-3xl md:text-4xl font-semibold mb-3"
                            >
                              Let's start with your details
                            </motion.h2>
                            <motion.p 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="text-lg text-gray-600"
                            >
                              We'll use this information to personalize your quote
                            </motion.p>
                          </div>
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
                          >
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Full Name</FormLabel>
                                  <FormControl>
                                    <motion.div 
                                      whileTap={{ scale: 0.995 }}
                                      className="relative"
                                    >
                                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        placeholder="John Doe" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm"
                                        {...field} 
                                      />
                                    </motion.div>
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
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Company (Optional)</FormLabel>
                                  <FormControl>
                                    <motion.div 
                                      whileTap={{ scale: 0.995 }}
                                      className="relative"
                                    >
                                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        placeholder="Acme Corp" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm"
                                        {...field} 
                                      />
                                    </motion.div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Email Address</FormLabel>
                                  <FormControl>
                                    <motion.div 
                                      whileTap={{ scale: 0.995 }}
                                      className="relative"
                                    >
                                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        type="email"
                                        placeholder="john@example.com" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm"
                                        {...field} 
                                      />
                                    </motion.div>
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
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</FormLabel>
                                  <FormControl>
                                    <motion.div 
                                      whileTap={{ scale: 0.995 }}
                                      className="relative"
                                    >
                                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        type="tel"
                                        placeholder="+91 98765 43210" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm"
                                        {...field} 
                                      />
                                    </motion.div>
                                  </FormControl>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                          
                          {/* Trust Indicators */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center justify-center gap-8 pt-8 border-t border-gray-100"
                          >
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Shield className="w-4 h-4" />
                              <span>100% Secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>2hr Response</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Users className="w-4 h-4" />
                              <span>500+ Projects</span>
                            </div>
                          </motion.div>
                        </div>
                      )}

                      {/* Step 2: Project Type */}
                      {currentStep === 2 && (
                        <div className="space-y-8">
                          <div className="text-center">
                            <motion.h2 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-3xl md:text-4xl font-semibold mb-3"
                            >
                              What type of project is this?
                            </motion.h2>
                            <motion.p 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                              className="text-lg text-gray-600"
                            >
                              Select the services that best match your needs
                            </motion.p>
                          </div>
                          
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8 max-w-3xl mx-auto"
                          >
                            <FormField
                              control={form.control}
                              name="serviceType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-4 block">Service Type</FormLabel>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                      { value: "construction", label: "Construction", icon: Building, desc: "New builds" },
                                      { value: "interior-decor", label: "Interior Design", icon: Palette, desc: "Space styling" },
                                      { value: "renovation", label: "Renovation", icon: Settings, desc: "Upgrades" },
                                      { value: "turnkey", label: "Turnkey", icon: Zap, desc: "Complete solution" }
                                    ].map((option, index) => (
                                      <motion.label
                                        key={option.value}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`relative flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                                          field.value === option.value
                                            ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                                            : 'border-gray-200 bg-white hover:border-gray-400 hover:shadow-md'
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          value={option.value}
                                          checked={field.value === option.value}
                                          onChange={field.onChange}
                                          className="sr-only"
                                        />
                                        <option.icon className={`h-8 w-8 mb-3 transition-colors ${
                                          field.value === option.value ? 'text-white' : 'text-gray-600'
                                        }`} />
                                        <span className={`font-semibold text-sm ${
                                          field.value === option.value ? 'text-white' : 'text-gray-900'
                                        }`}>
                                          {option.label}
                                        </span>
                                        <span className={`text-xs mt-1 ${
                                          field.value === option.value ? 'text-gray-300' : 'text-gray-500'
                                        }`}>
                                          {option.desc}
                                        </span>
                                      </motion.label>
                                    ))}
                                  </div>
                                  <FormMessage className="text-xs mt-2" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="projectType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Property Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm">
                                        <SelectValue placeholder="Select property type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="residential">Residential Home</SelectItem>
                                      <SelectItem value="commercial">Commercial Space</SelectItem>
                                      <SelectItem value="office">Office Building</SelectItem>
                                      <SelectItem value="retail">Retail Store</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-xs mt-1" />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">Project Location</FormLabel>
                                  <FormControl>
                                    <motion.div 
                                      whileTap={{ scale: 0.995 }}
                                      className="relative"
                                    >
                                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        placeholder="Bangalore, Karnataka" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-white/50 backdrop-blur-sm focus:bg-white focus:border-gray-400 transition-all duration-200 shadow-sm"
                                        {...field} 
                                      />
                                    </motion.div>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>
                      )}

                      {/* Step 3: Project Details */}
                      {currentStep === 3 && (
                        <div>
                          <div className="text-center mb-12">
                            <h2 className="text-4xl font-semibold mb-4">Project specifications</h2>
                            <p className="text-lg text-gray-600">Help us understand your requirements</p>
                          </div>
                          
                          <div className="space-y-8 max-w-2xl mx-auto">
                            <FormField
                              control={form.control}
                              name="propertySize"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base font-medium mb-4 block">Property Size</FormLabel>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid grid-cols-2 gap-4"
                                  >
                                    {[
                                      { value: "under-1000", label: "Under 1,000", desc: "sq.ft" },
                                      { value: "1000-2000", label: "1,000 - 2,000", desc: "sq.ft" },
                                      { value: "2000-3000", label: "2,000 - 3,000", desc: "sq.ft" },
                                      { value: "above-3000", label: "Above 3,000", desc: "sq.ft" }
                                    ].map((option) => (
                                      <FormItem key={option.value}>
                                        <FormControl>
                                          <label className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                            field.value === option.value
                                              ? 'border-amber-600 bg-amber-50'
                                              : 'border-gray-200 hover:border-gray-300'
                                          }`}>
                                            <RadioGroupItem value={option.value} className="sr-only" />
                                            <div className="text-center w-full">
                                              <span className="font-medium block">{option.label}</span>
                                              <span className="text-sm text-gray-500">{option.desc}</span>
                                            </div>
                                          </label>
                                        </FormControl>
                                      </FormItem>
                                    ))}
                                  </RadioGroup>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="budget"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base font-medium mb-2 block">Budget Range</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white">
                                        <SelectValue placeholder="Select your budget" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="under-20-lakh">Under ₹20 Lakhs</SelectItem>
                                      <SelectItem value="20-40-lakh">₹20 - 40 Lakhs</SelectItem>
                                      <SelectItem value="40-60-lakh">₹40 - 60 Lakhs</SelectItem>
                                      <SelectItem value="60-80-lakh">₹60 - 80 Lakhs</SelectItem>
                                      <SelectItem value="80-1-crore">₹80 Lakhs - 1 Crore</SelectItem>
                                      <SelectItem value="above-1-crore">Above ₹1 Crore</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 4: Timeline & Notes */}
                      {currentStep === 4 && (
                        <div>
                          <div className="text-center mb-12">
                            <h2 className="text-4xl font-semibold mb-4">When do you want to start?</h2>
                            <p className="text-lg text-gray-600">And any special requirements</p>
                          </div>
                          
                          <div className="space-y-6 max-w-md mx-auto">
                            <FormField
                              control={form.control}
                              name="timeline"
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white">
                                        <SelectValue placeholder="Select timeline" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="urgent">Immediately</SelectItem>
                                      <SelectItem value="1-3-months">1-3 Months</SelectItem>
                                      <SelectItem value="3-6-months">3-6 Months</SelectItem>
                                      <SelectItem value="6-12-months">6-12 Months</SelectItem>
                                      <SelectItem value="flexible">Flexible</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Any special requirements or questions? (Optional)"
                                      className="min-h-32 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white resize-none"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </form>
                  </Form>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="rounded-full px-6 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-black text-white rounded-full px-8 hover:bg-gray-900"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                        className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full px-8 hover:from-amber-700 hover:to-amber-800"
                      >
                        Submit
                        <Sparkles className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>

                  {/* Live Estimate */}
                  {estimatedCost && currentStep >= 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center p-6 bg-amber-50 rounded-2xl"
                    >
                      <p className="text-sm text-gray-600 mb-2">Estimated Investment</p>
                      <p className="text-2xl font-semibold text-amber-700">
                        ₹{(estimatedCost.min / 100000).toFixed(1)}L - ₹{(estimatedCost.max / 100000).toFixed(1)}L
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}