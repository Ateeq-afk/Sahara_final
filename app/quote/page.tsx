"use client"

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
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
  Zap
} from 'lucide-react'

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
  message: z.string().optional(),
})

const steps = [
  { id: 1, title: "Contact", icon: User },
  { id: 2, title: "Project", icon: Building },
  { id: 3, title: "Details", icon: Ruler },
  { id: 4, title: "Timeline", icon: Clock }
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
  
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
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
        fieldsToValidate = ['timeline']
        break
    }
    
    return await form.trigger(fieldsToValidate)
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
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
          <motion.div 
            className="absolute top-10 right-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"
            animate={floatingAnimation.animate}
            initial={floatingAnimation.initial}
          />
          <motion.div 
            className="absolute bottom-10 left-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl"
            animate={floatingAnimation.animate}
            initial={floatingAnimation.initial}
            transition={{ delay: 2 }}
          />
        </div>
        
        <div className="relative container mx-auto px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.05em] leading-[0.9]">
              Let's create
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                something
              </span>
              <br />
              amazing.
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-8 text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
          >
            Get your personalized quote in just a few steps.
          </motion.p>
        </div>
      </motion.section>

      {/* Form Section */}
      <section ref={formRef} className="py-24 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* Progress Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="flex justify-center gap-3 mb-16"
            >
              {steps.map((step) => (
                <motion.button
                  key={step.id}
                  onClick={() => {
                    if (step.id <= currentStep) setCurrentStep(step.id)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    step.id === currentStep 
                      ? 'w-8 bg-gradient-to-r from-amber-600 to-amber-700' 
                      : step.id < currentStep
                      ? 'bg-amber-600'
                      : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>

            {/* Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg backdrop-filter"
              style={{
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
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
                        <div>
                          <div className="text-center mb-12">
                            <h2 className="text-4xl font-semibold mb-4">Let's get to know you</h2>
                            <p className="text-lg text-gray-600">We'll use this to contact you about your project</p>
                          </div>
                          
                          <div className="space-y-6 max-w-md mx-auto">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        placeholder="Your name" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                                        {...field} 
                                      />
                                    </div>
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
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        placeholder="Your email" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="relative">
                                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                      <Input 
                                        placeholder="Your phone" 
                                        className="h-14 pl-12 pr-4 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
                                        {...field} 
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 2: Project Type */}
                      {currentStep === 2 && (
                        <div>
                          <div className="text-center mb-12">
                            <h2 className="text-4xl font-semibold mb-4">What are you building?</h2>
                            <p className="text-lg text-gray-600">Choose the services you need</p>
                          </div>
                          
                          <div className="space-y-8 max-w-2xl mx-auto">
                            <FormField
                              control={form.control}
                              name="serviceType"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="grid grid-cols-2 gap-4">
                                    {[
                                      { value: "construction", label: "Construction", icon: Building },
                                      { value: "interior-decor", label: "Interior Design", icon: Home },
                                      { value: "renovation", label: "Renovation", icon: Ruler },
                                      { value: "turnkey", label: "Turnkey", icon: Zap }
                                    ].map((option) => (
                                      <label
                                        key={option.value}
                                        className={`relative flex flex-col items-center p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                                          field.value === option.value
                                            ? 'border-amber-600 bg-amber-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                      >
                                        <input
                                          type="radio"
                                          value={option.value}
                                          checked={field.value === option.value}
                                          onChange={field.onChange}
                                          className="sr-only"
                                        />
                                        <option.icon className={`h-8 w-8 mb-3 ${
                                          field.value === option.value ? 'text-amber-600' : 'text-gray-400'
                                        }`} />
                                        <span className={`font-medium ${
                                          field.value === option.value ? 'text-amber-900' : 'text-gray-900'
                                        }`}>
                                          {option.label}
                                        </span>
                                      </label>
                                    ))}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="projectType"
                              render={({ field }) => (
                                <FormItem>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-14 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white">
                                        <SelectValue placeholder="Select property type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="residential">Residential</SelectItem>
                                      <SelectItem value="commercial">Commercial</SelectItem>
                                      <SelectItem value="office">Office</SelectItem>
                                      <SelectItem value="retail">Retail</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
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
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}