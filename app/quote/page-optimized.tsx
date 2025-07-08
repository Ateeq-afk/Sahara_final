"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MobileButton } from '@/components/ui/mobile-button'
import { MobileInput } from '@/components/ui/mobile-input'
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
  Shield,
  Star,
  Clock,
  Phone,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Simplified schema - 3 steps only
const formSchema = z.object({
  // Step 1: Contact Info
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  
  // Step 2: Project Details  
  serviceType: z.enum(['construction', 'interior', 'renovation']),
  projectType: z.string().min(1, 'Please select a project type'),
  propertySize: z.string().min(1, 'Please select property size'),
  timeline: z.string().min(1, 'Please select your timeline'),
  
  // Step 3: Budget & Message (optional)
  budget: z.string().min(1, 'Please select your budget range'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

// Trust indicators data
const trustIndicators = {
  clients: "500+",
  rating: "4.9",
  experience: "20+ Years"
}

// Recent activity for social proof
const recentActivities = [
  "Raj from Whitefield requested a quote 2 mins ago",
  "Priya from Koramangala started her project",
  "3 new projects in HSR Layout this week"
]

export default function OptimizedQuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showActivity, setShowActivity] = useState(false)
  const [currentActivity, setCurrentActivity] = useState(0)
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      serviceType: undefined,
      projectType: '',
      propertySize: '',
      timeline: '',
      budget: '',
      message: '',
    },
  })

  // Auto-save functionality
  useEffect(() => {
    const subscription = form.watch((values) => {
      localStorage.setItem('quote-form-draft', JSON.stringify(values))
    })
    return () => subscription.unsubscribe()
  }, [form])

  // Load saved form data
  useEffect(() => {
    const savedData = localStorage.getItem('quote-form-draft')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        Object.keys(parsed).forEach(key => {
          if (parsed[key]) {
            form.setValue(key as any, parsed[key])
          }
        })
        toast({
          title: "Welcome back!",
          description: "We've saved your progress.",
        })
      } catch (error) {
        console.error('Error loading saved form:', error)
      }
    }
  }, [form])

  // Show rotating activities
  useEffect(() => {
    const timer = setTimeout(() => setShowActivity(true), 3000)
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % recentActivities.length)
    }, 5000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Phone number formatting
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 10) {
      return cleaned.slice(0, 10)
    }
    return cleaned
  }

  const validateCurrentStep = async () => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      1: ['name', 'email', 'phone'],
      2: ['serviceType', 'projectType', 'propertySize', 'timeline'],
      3: ['budget']
    }
    
    return await form.trigger(stepFields[currentStep])
  }

  const nextStep = async () => {
    const isValid = await validateCurrentStep()
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to submit')

      // Clear saved draft
      localStorage.removeItem('quote-form-draft')
      
      // Track conversion
      if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'quote_form',
          value: 1
        })
      }

      toast({
        title: "Quote request sent!",
        description: "We'll contact you within 2 hours.",
      })
      
      // Redirect to thank you page
      window.location.href = '/thank-you'
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Trust Bar */}
      <div className="bg-gray-900 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{trustIndicators.clients} Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{trustIndicators.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{trustIndicators.experience} Experience</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">Get Your Free Quote</h1>
              <span className="text-sm text-gray-500">
                Step {currentStep} of 3 • 2 min
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-blue-600 to-blue-700 h-2 rounded-full"
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Contact Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                      <h2 className="text-2xl font-semibold mb-6">Let's get to know you</h2>
                      
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  className="h-12 text-base"
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
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email" 
                                  placeholder="john@example.com" 
                                  className="h-12 text-base"
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
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                    +91
                                  </span>
                                  <Input 
                                    type="tel" 
                                    placeholder="9876543210" 
                                    className="h-12 text-base pl-12"
                                    {...field}
                                    onChange={(e) => {
                                      const formatted = formatPhoneNumber(e.target.value)
                                      field.onChange(formatted)
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Trust Badge */}
                      <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                        <Shield className="h-4 w-4" />
                        <span>Your information is 100% secure & confidential</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Project Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                      <h2 className="text-2xl font-semibold mb-6">Tell us about your project</h2>
                      
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="serviceType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>What service do you need?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="grid grid-cols-1 gap-3"
                                >
                                  {[
                                    { value: 'construction', label: 'New Construction', icon: '🏗️' },
                                    { value: 'interior', label: 'Interior Design', icon: '🎨' },
                                    { value: 'renovation', label: 'Renovation', icon: '🔨' },
                                  ].map((option) => (
                                    <label
                                      key={option.value}
                                      className={cn(
                                        "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                                        field.value === option.value
                                          ? "border-blue-600 bg-blue-50"
                                          : "border-gray-200 hover:border-gray-300"
                                      )}
                                    >
                                      <RadioGroupItem value={option.value} className="sr-only" />
                                      <span className="text-2xl mr-3">{option.icon}</span>
                                      <span className="font-medium">{option.label}</span>
                                    </label>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Type</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="residential">Residential</SelectItem>
                                    <SelectItem value="commercial">Commercial</SelectItem>
                                    <SelectItem value="villa">Villa</SelectItem>
                                    <SelectItem value="apartment">Apartment</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="propertySize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Property Size (sq.ft)</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12">
                                      <SelectValue placeholder="Select size" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="under-1000">Under 1,000</SelectItem>
                                    <SelectItem value="1000-2000">1,000 - 2,000</SelectItem>
                                    <SelectItem value="2000-3000">2,000 - 3,000</SelectItem>
                                    <SelectItem value="above-3000">Above 3,000</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>When do you plan to start?</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select timeline" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="immediately">Immediately</SelectItem>
                                  <SelectItem value="1-month">Within 1 month</SelectItem>
                                  <SelectItem value="3-months">Within 3 months</SelectItem>
                                  <SelectItem value="6-months">Within 6 months</SelectItem>
                                  <SelectItem value="planning">Just planning</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Budget & Additional Info */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                      <h2 className="text-2xl font-semibold mb-6">Almost done!</h2>
                      
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Budget Range</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="grid grid-cols-1 gap-3"
                                >
                                  {[
                                    { value: 'under-10', label: 'Under ₹10 Lakhs' },
                                    { value: '10-25', label: '₹10 - 25 Lakhs' },
                                    { value: '25-50', label: '₹25 - 50 Lakhs' },
                                    { value: '50-100', label: '₹50 Lakhs - 1 Crore' },
                                    { value: 'above-100', label: 'Above ₹1 Crore' },
                                  ].map((option) => (
                                    <label
                                      key={option.value}
                                      className={cn(
                                        "flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all",
                                        field.value === option.value
                                          ? "border-blue-600 bg-blue-50"
                                          : "border-gray-200 hover:border-gray-300"
                                      )}
                                    >
                                      <RadioGroupItem value={option.value} className="sr-only" />
                                      <DollarSign className="h-5 w-5 mr-3 text-gray-400" />
                                      <span className="font-medium">{option.label}</span>
                                    </label>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Details (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us more about your project requirements..."
                                  className="min-h-[100px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Trust Indicators */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="font-medium">Quick Response Guarantee</p>
                              <p className="text-gray-600">We'll contact you within 2 hours</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="min-w-[120px] h-12"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="min-w-[120px] h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[160px] h-12 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        Get Free Quote
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Social Proof Notification */}
      <AnimatePresence>
        {showActivity && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-6 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-gray-700">
                {recentActivities[currentActivity]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}