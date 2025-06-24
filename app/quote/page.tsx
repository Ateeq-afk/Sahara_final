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
  Star,
  Award,
  Shield,
  Calculator,
  Gift,
  Sparkles
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
  {
    id: 1,
    title: "Personal Details",
    description: "Tell us about yourself",
    icon: User,
    fields: ['name', 'email', 'phone']
  },
  {
    id: 2,
    title: "Project Vision",
    description: "What's your dream project?",
    icon: Building,
    fields: ['serviceType', 'projectType']
  },
  {
    id: 3,
    title: "Project Scope",
    description: "Size and investment details",
    icon: Ruler,
    fields: ['propertySize', 'budget']
  },
  {
    id: 4,
    title: "Final Details",
    description: "Timeline and special requirements",
    icon: Clock,
    fields: ['timeline', 'message']
  }
]

const motivationalMessages = [
  "Excellent start! Let's bring your vision to life.",
  "Perfect! We're understanding your dream project.",
  "Wonderful! Your project is taking shape beautifully.",
  "Outstanding! We're ready to create your custom proposal."
]

const benefits = [
  { icon: Gift, text: "Complimentary design consultation" },
  { icon: Award, text: "20+ years of craftsmanship excellence" },
  { icon: Shield, text: "Comprehensive project warranty" },
  { icon: Sparkles, text: "Exclusive client benefits program" }
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

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [estimatedCost, setEstimatedCost] = useState<{min: number, max: number} | null>(null)
  
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

  // Calculate estimated cost based on selections
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
    const currentStepFields = steps[currentStep - 1].fields
    const isValid = await form.trigger(currentStepFields as any)
    
    if (isValid && !completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    
    return isValid
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

  const progress = (currentStep / steps.length) * 100

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 2 hours with a detailed estimate.",
    })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen pt-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-dark p-8 text-white text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-serif font-bold mb-3"
                >
                  Thank You
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg opacity-90"
                >
                  Your quote request has been received
                </motion.p>
              </div>

              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-center mb-8"
                >
                  <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                    Our expert team will review your requirements and contact you within 
                    <span className="font-semibold text-primary"> 2 hours</span> with a detailed, 
                    personalized estimate tailored to your vision.
                  </p>

                  {estimatedCost && (
                    <div className="bg-neutral-50 rounded-2xl p-6 mb-6">
                      <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-3">
                        Preliminary Cost Estimate
                      </h3>
                      <div className="text-3xl font-bold text-primary mb-2">
                        ₹{(estimatedCost.min / 100000).toFixed(1)}L - ₹{(estimatedCost.max / 100000).toFixed(1)}L
                      </div>
                      <p className="text-sm text-neutral-600">
                        *Final quote will include detailed specifications
                      </p>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-4"
                >
                  <Button
                    onClick={() => {
                      setIsSubmitted(false)
                      setCurrentStep(1)
                      setCompletedSteps([])
                      form.reset()
                    }}
                    className="w-full bg-primary hover:bg-primary-dark text-white rounded-full py-3 font-medium"
                    size="lg"
                  >
                    Submit Another Request
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-full"
                      asChild
                    >
                      <a href="/gallery">View Portfolio</a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-full"
                      asChild
                    >
                      <a href="/contact">Contact Us</a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen pt-20 bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Elegant Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 text-sm font-medium mb-6">
              <Calculator className="h-4 w-4" />
              Complimentary Quote Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mb-6 leading-tight">
              Begin Your Journey to
              <span className="block text-primary">Exceptional Living</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Share your vision with us through this thoughtfully designed consultation. 
              Receive a detailed, personalized estimate crafted by our expert team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Form - Takes up more space */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden"
              >
                {/* Sophisticated Progress Section */}
                <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-8 border-b border-neutral-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-serif font-semibold text-neutral-900">
                        {steps[currentStep - 1].title}
                      </h2>
                      <p className="text-neutral-600 mt-1">
                        {steps[currentStep - 1].description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-neutral-500 mb-1">
                        Step {currentStep} of {steps.length}
                      </div>
                      <div className="text-lg font-semibold text-primary">
                        {Math.round(progress)}% Complete
                      </div>
                    </div>
                  </div>
                  
                  {/* Elegant Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-primary-dark h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex items-center justify-between mt-8">
                    {steps.map((step, index) => {
                      const Icon = step.icon
                      const isCompleted = completedSteps.includes(step.id)
                      const isCurrent = currentStep === step.id
                      
                      return (
                        <div key={step.id} className="flex flex-col items-center">
                          <motion.div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-500 ${
                              isCompleted 
                                ? 'bg-primary text-white shadow-lg' 
                                : isCurrent 
                                ? 'bg-primary text-white shadow-lg scale-110' 
                                : 'bg-neutral-200 text-neutral-500'
                            }`}
                            whileHover={{ scale: isCurrent ? 1.15 : 1.05 }}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              <Icon className="h-6 w-6" />
                            )}
                          </motion.div>
                          <span className={`text-xs font-medium text-center leading-tight ${
                            isCurrent ? 'text-primary' : 'text-neutral-600'
                          }`}>
                            {step.title}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                          {/* Step 1: Personal Details */}
                          {currentStep === 1 && (
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <User className="h-4 w-4 text-primary" />
                                      </div>
                                      Full Name
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter your full name" 
                                        className="h-14 rounded-xl border-neutral-200 focus:border-primary focus:ring-primary/20 text-base"
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
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Mail className="h-4 w-4 text-primary" />
                                      </div>
                                      Email Address
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="your.email@example.com" 
                                        className="h-14 rounded-xl border-neutral-200 focus:border-primary focus:ring-primary/20 text-base"
                                        {...field} 
                                      />
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
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Phone className="h-4 w-4 text-primary" />
                                      </div>
                                      Phone Number
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="+91 98765 43210" 
                                        className="h-14 rounded-xl border-neutral-200 focus:border-primary focus:ring-primary/20 text-base"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}

                          {/* Step 2: Project Type */}
                          {currentStep === 2 && (
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="serviceType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Building className="h-4 w-4 text-primary" />
                                      </div>
                                      Service Category
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-14 rounded-xl border-neutral-200 focus:border-primary text-base">
                                          <SelectValue placeholder="Select your service type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="construction">Construction Services</SelectItem>
                                        <SelectItem value="interior-decor">Interior Design</SelectItem>
                                        <SelectItem value="renovation">Renovation & Remodeling</SelectItem>
                                        <SelectItem value="turnkey">Complete Turnkey Solution</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="projectType"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Home className="h-4 w-4 text-primary" />
                                      </div>
                                      Project Category
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-14 rounded-xl border-neutral-200 focus:border-primary text-base">
                                          <SelectValue placeholder="Select your project type" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="residential">Residential Property</SelectItem>
                                        <SelectItem value="commercial">Commercial Space</SelectItem>
                                        <SelectItem value="office">Office Environment</SelectItem>
                                        <SelectItem value="retail">Retail Establishment</SelectItem>
                                        <SelectItem value="other">Other Requirement</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}

                          {/* Step 3: Project Details */}
                          {currentStep === 3 && (
                            <div className="space-y-8">
                              <FormField
                                control={form.control}
                                name="propertySize"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700 mb-4">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Ruler className="h-4 w-4 text-primary" />
                                      </div>
                                      Property Size
                                    </FormLabel>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="grid grid-cols-1 gap-4"
                                    >
                                      {[
                                        { value: "under-1000", label: "Under 1,000 sq.ft", desc: "Compact apartments and studios" },
                                        { value: "1000-2000", label: "1,000 - 2,000 sq.ft", desc: "2-3 bedroom homes and apartments" },
                                        { value: "2000-3000", label: "2,000 - 3,000 sq.ft", desc: "Spacious 3-4 bedroom residences" },
                                        { value: "above-3000", label: "Above 3,000 sq.ft", desc: "Luxury villas and large properties" }
                                      ].map((option) => (
                                        <FormItem key={option.value} className="flex items-start space-x-4 space-y-0 p-4 border border-neutral-200 rounded-xl hover:border-primary/50 transition-colors">
                                          <FormControl>
                                            <RadioGroupItem value={option.value} className="mt-1" />
                                          </FormControl>
                                          <div className="flex-1">
                                            <FormLabel className="font-medium cursor-pointer text-neutral-900">
                                              {option.label}
                                            </FormLabel>
                                            <p className="text-sm text-neutral-600 mt-1">{option.desc}</p>
                                          </div>
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
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <DollarSign className="h-4 w-4 text-primary" />
                                      </div>
                                      Investment Range
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-14 rounded-xl border-neutral-200 focus:border-primary text-base">
                                          <SelectValue placeholder="Select your budget range" />
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
                          )}

                          {/* Step 4: Timeline & Notes */}
                          {currentStep === 4 && (
                            <div className="space-y-6">
                              <FormField
                                control={form.control}
                                name="timeline"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <Clock className="h-4 w-4 text-primary" />
                                      </div>
                                      Project Timeline
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-14 rounded-xl border-neutral-200 focus:border-primary text-base">
                                          <SelectValue placeholder="When would you like to begin?" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="urgent">Immediate Start (ASAP)</SelectItem>
                                        <SelectItem value="1-3-months">Within 1-3 Months</SelectItem>
                                        <SelectItem value="3-6-months">Within 3-6 Months</SelectItem>
                                        <SelectItem value="6-12-months">Within 6-12 Months</SelectItem>
                                        <SelectItem value="flexible">Timeline is Flexible</SelectItem>
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
                                    <FormLabel className="flex items-center gap-3 text-base font-medium text-neutral-700">
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <MessageSquare className="h-4 w-4 text-primary" />
                                      </div>
                                      Additional Details
                                      <span className="text-sm text-neutral-500 font-normal">(Optional)</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Share any specific requirements, design preferences, or questions you have about your project..."
                                        className="min-h-32 rounded-xl border-neutral-200 focus:border-primary focus:ring-primary/20 resize-none text-base"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                        </form>
                      </Form>
                    </motion.div>
                  </AnimatePresence>

                  {/* Elegant Navigation */}
                  <div className="flex justify-between items-center pt-8 mt-8 border-t border-neutral-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 rounded-full px-6 border-neutral-300 text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        onClick={form.handleSubmit(onSubmit)}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
                      >
                        <Sparkles className="h-4 w-4" />
                        Submit Request
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Refined Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Progress Message */}
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">
                      {currentStep === 1 && "👋"}
                      {currentStep === 2 && "🏗️"}
                      {currentStep === 3 && "📐"}
                      {currentStep === 4 && "✨"}
                    </span>
                  </div>
                  <p className="text-lg font-medium text-neutral-800 leading-relaxed">
                    {motivationalMessages[currentStep - 1]}
                  </p>
                </div>
              </motion.div>

              {/* Cost Estimate */}
              {estimatedCost && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-3">
                      Estimated Investment
                    </h3>
                    <div className="text-3xl font-bold text-primary mb-2">
                      ₹{(estimatedCost.min / 100000).toFixed(1)}L - ₹{(estimatedCost.max / 100000).toFixed(1)}L
                    </div>
                    <p className="text-sm text-neutral-600">
                      Preliminary estimate based on your selections
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100">
                <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-6 flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Included Benefits
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-neutral-700 leading-relaxed">{benefit.text}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6 border border-neutral-200">
                <div className="text-center">
                  <h3 className="text-lg font-serif font-semibold text-neutral-900 mb-6">
                    Trusted Excellence
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Projects Completed</span>
                      <span className="text-xl font-bold text-primary">500+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Years of Experience</span>
                      <span className="text-xl font-bold text-primary">20+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Client Satisfaction</span>
                      <span className="text-xl font-bold text-primary">4.8★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}