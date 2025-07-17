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
import { toast } from '@/hooks/use-toast'
import { 
  CheckCircle, 
  Shield,
  Star,
  Clock,
  Phone,
  TrendingUp,
  Users,
  Award,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Building,
  Home,
  Paintbrush,
  Hammer,
  Sparkles,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useViewportHeight } from '@/hooks/use-mobile'

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

// Simple schema for quick conversion
const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  serviceType: z.enum(['construction', 'interior', 'renovation']),
})

type FormData = z.infer<typeof formSchema>

// Testimonials data
const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Whitefield",
    rating: 5,
    text: "Exceptional craftsmanship and attention to detail. The team delivered exactly what we envisioned.",
    project: "4 BHK Villa Construction"
  },
  {
    name: "Priya Sharma",
    location: "Koramangala",
    rating: 5,
    text: "Outstanding interior design work. They transformed our space into something truly special.",
    project: "3 BHK Interior Design"
  },
  {
    name: "Arun Nair",
    location: "HSR Layout",
    rating: 5,
    text: "Professional service with transparent pricing. No surprises, just quality work delivered on time.",
    project: "Commercial Building"
  }
]

// FAQ data
const faqs = [
  {
    question: "How quickly can I get a quote?",
    answer: "We provide instant quotes! Fill the form and our team will call you within 2 hours with a detailed estimate."
  },
  {
    question: "What areas do you serve in Bangalore?",
    answer: "We serve all areas in Bangalore including Whitefield, Koramangala, HSR Layout, BTM, Jayanagar, Indiranagar, and surrounding areas."
  },
  {
    question: "Are your prices competitive?",
    answer: "Yes! We offer the best value for money with transparent pricing. No hidden costs, and we match any genuine quote."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary: Interiors (4-8 weeks), Renovation (6-10 weeks), New Construction (4-8 months). We guarantee on-time delivery."
  },
  {
    question: "Do you provide warranty?",
    answer: "Yes, we provide 5-year structural warranty on construction and 2-year warranty on interior work and materials."
  }
]

// Service benefits
const serviceBenefits = {
  construction: [
    "Vastu-compliant designs",
    "Premium materials only",
    "5-year structural warranty",
    "Zero deviation from plan"
  ],
  interior: [
    "3D design visualization",
    "45-day completion",
    "10-year warranty on woodwork",
    "500+ design options"
  ],
  renovation: [
    "Minimal disruption",
    "Dust-free execution",
    "Same-day quote",
    "Licensed contractors"
  ]
}

export default function QuoteLandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState<'construction' | 'interior' | 'renovation'>('construction')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [showFloatingCta, setShowFloatingCta] = useState(false)
  
  useViewportHeight()
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      serviceType: 'construction',
    },
  })

  // Show floating CTA on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Google Ads conversion tracking
  const trackConversion = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
        'value': 1.0,
        'currency': 'INR'
      })
    }
  }

  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quote-landing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source: 'google-ads-landing',
          timestamp: new Date().toISOString()
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      // Track conversion
      trackConversion()
      
      // Track in GA4
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'google_ads_landing',
          value: 1
        })
      }

      toast({
        title: "Success! 🎉",
        description: "Our team will call you within 2 hours.",
      })
      
      // Redirect to thank you page
      window.location.href = '/thank-you?source=google-ads'
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please call us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleServiceChange = (service: 'construction' | 'interior' | 'renovation') => {
    setSelectedService(service)
    form.setValue('serviceType', service)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Form */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Bangalore's Premier Contractor</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
                    Build Your
                    <span className="block text-blue-600">Dream Space</span>
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Experience premium construction with Apple-like attention to detail. 
                    Trusted by 500+ families across Bangalore.
                  </p>
                </div>

                {/* Trust Metrics */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">500+</div>
                    <div className="text-sm text-gray-500 tracking-wide">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">4.9</div>
                    <div className="text-sm text-gray-500 tracking-wide">Client Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">20+</div>
                    <div className="text-sm text-gray-500 tracking-wide">Years Experience</div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Free Site Visit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Transparent Pricing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">5 Year Warranty</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Licensed & Insured</span>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="lg:hidden">
                  <a 
                    href="tel:+919591837216" 
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now: +91 9591-837216
                  </a>
                </div>
              </div>

              {/* Right Form */}
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                <div className="space-y-6 mb-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Free Quote</h2>
                    <p className="text-gray-600">Join 500+ satisfied customers</p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <div className="flex items-center justify-center gap-2 text-orange-700">
                      <Zap className="h-5 w-5" />
                      <span className="font-medium">Limited Time: 10% Off This Month!</span>
                    </div>
                  </div>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Service Selection */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'construction', label: 'Construction', icon: Building },
                        { value: 'interior', label: 'Interior', icon: Paintbrush },
                        { value: 'renovation', label: 'Renovation', icon: Hammer }
                      ].map((service) => (
                        <button
                          key={service.value}
                          type="button"
                          onClick={() => handleServiceChange(service.value as any)}
                          className={cn(
                            "p-4 rounded-xl border transition-all duration-200 text-center group",
                            selectedService === service.value
                              ? "border-blue-600 bg-blue-50 shadow-sm"
                              : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          )}
                        >
                          <service.icon className={cn(
                            "h-6 w-6 mx-auto mb-2 transition-colors",
                            selectedService === service.value 
                              ? "text-blue-600" 
                              : "text-gray-400 group-hover:text-gray-600"
                          )} />
                          <span className="text-sm font-medium text-gray-900">{service.label}</span>
                        </button>
                      ))}
                    </div>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Enter your name" 
                              className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-0"
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
                          <FormLabel className="text-sm font-medium text-gray-700">Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                +91
                              </span>
                              <Input 
                                type="tel" 
                                placeholder="98765 43210" 
                                className="h-12 pl-14 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-0"
                                maxLength={10}
                                {...field}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '')
                                  field.onChange(value)
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Service Benefits */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p className="font-medium text-sm text-gray-800 mb-3">What you'll get:</p>
                      <ul className="space-y-2">
                        {serviceBenefits[selectedService].map((benefit, index) => (
                          <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Get Free Quote Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                      <Shield className="h-4 w-4 inline mr-1" />
                      100% Safe & Secure • No Spam
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-2xl mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="text-white font-semibold mb-1">Best Contractor 2023</div>
                <div className="text-sm text-gray-400">Times Property Award</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-white font-semibold mb-1">500+ Projects</div>
                <div className="text-sm text-gray-400">Successfully Completed</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-white font-semibold mb-1">4.9/5 Rating</div>
                <div className="text-sm text-gray-400">150+ Google Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Sahara Developers</h2>
              <p className="text-xl text-gray-600">The premium choice for discerning homeowners</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-3xl">
                  <Clock className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">On-Time Delivery</h3>
                  <p className="text-gray-600 leading-relaxed">100% projects delivered on schedule. We value your time and stick to committed timelines.</p>
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-3xl">
                  <Shield className="h-10 w-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Guaranteed</h3>
                  <p className="text-gray-600 leading-relaxed">Premium materials, skilled craftsmen, and 5-year warranty on all construction work.</p>
                </div>
              </div>
              
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-100 rounded-3xl">
                  <TrendingUp className="h-10 w-10 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparent Pricing</h3>
                  <p className="text-gray-600 leading-relaxed">No hidden costs. Detailed quotations with clear breakdowns. Best value for money.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600">Trusted by families across Bangalore</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 p-8 rounded-2xl"
                >
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{testimonial.location} • {testimonial.project}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-100">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-300 mb-8">Get your free quote now and save 10% this month!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium rounded-xl"
              >
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <a 
                href="tel:+919591837216" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white rounded-xl hover:bg-white hover:text-gray-900 transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call: +91 9591-837216
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA for Mobile */}
      <AnimatePresence>
        {showFloatingCta && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-4 lg:hidden z-50"
          >
            <div className="flex gap-3">
              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-xl h-12 font-medium"
              >
                Get Quote
              </Button>
              <a 
                href="tel:+919591837216" 
                className="flex-1 flex items-center justify-center bg-gray-900 text-white rounded-xl h-12 font-medium hover:bg-gray-800 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}