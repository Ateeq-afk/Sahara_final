"use client"

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
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
  Star
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

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Homeowner",
    content: "Exceptional service and attention to detail. They transformed our vision into reality.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=95"
  },
  {
    name: "Priya Sharma",
    role: "Business Owner",
    content: "Professional team that delivered our commercial project on time and within budget.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=95"
  }
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const mapRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })
  const mapInView = useInView(mapRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  
  const { scrollY } = useScroll()
  const yTransform = useTransform(scrollY, [0, 500], [0, 50])
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.6])
  
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

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        })
        setIsSubmitted(true)
        form.reset()
      } else {
        throw new Error(data.message || 'Failed to submit form')
      }
    } catch (error) {
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
      icon: Phone,
      title: "Call Us",
      details: ["+91 9591-837216", "+91 98450 54321"],
      action: "tel:+919591837216",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@saharadevelopers.com", "support@saharadevelopers.com"],
      action: "mailto:info@saharadevelopers.com",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["100-feet Ring Road, BTM Layout", "Bangalore 560029"],
      action: null,
      color: "from-green-500 to-green-600"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon-Sat: 9AM-6PM", "Sunday: By Appointment"],
      action: null,
      color: "from-amber-500 to-amber-600"
    }
  ]

  const stats = [
    { icon: Building, value: "500+", label: "Projects Completed" },
    { icon: Users, value: "1000+", label: "Happy Clients" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Globe, value: "20+", label: "Years Experience" }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Apple Style */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        {/* Subtle background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          style={{ y: yTransform }}
        >
          <div className="h-full w-full" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </motion.div>

        {/* Floating gradient orbs - Apple style */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-amber-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="relative container mx-auto px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ opacity: opacityTransform }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Apple-style Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <span className="text-amber-600 font-semibold text-lg">
                Contact Us
              </span>
            </motion.div>

            {/* Apple-style Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-[7rem] font-semibold tracking-tight mb-8 leading-[0.9]"
            >
              Let's create
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">
                something
              </span>
              <br />
              amazing.
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light"
            >
              Ready to transform your space? Our expert team is here to bring your 
              vision to life with unparalleled craftsmanship and attention to detail.
            </motion.p>

            {/* Stats Row - Apple Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center group cursor-pointer"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 group-hover:bg-amber-50 transition-colors duration-300 mb-4">
                      <Icon className="w-8 h-8 text-gray-700 group-hover:text-amber-600 transition-colors duration-300" />
                    </div>
                    <div className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Apple Style */}
      <section ref={formRef} className="py-24 md:py-32 relative bg-white">
        
        <div className="container mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left Side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
                Get in touch.
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                We're here to help and answer any questions you might have.
              </p>
              
              {/* Contact Cards - Apple Style */}
              <div className="grid sm:grid-cols-2 gap-4 mb-12">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setSelectedCard(selectedCard === index ? null : index)}
                      className="group cursor-pointer"
                    >
                      <div className="relative bg-gray-50 hover:bg-gray-100 rounded-2xl p-6 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                            {item.action ? (
                              <a 
                                href={item.action}
                                onClick={(e) => e.stopPropagation()}
                                className="text-gray-600 hover:text-amber-600 transition-colors"
                              >
                                {item.details.map((detail, idx) => (
                                  <div key={idx} className="text-sm">{detail}</div>
                                ))}
                              </a>
                            ) : (
                              <div className="text-gray-600 text-sm">
                                {item.details.map((detail, idx) => (
                                  <div key={idx}>{detail}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <AnimatePresence>
                          {selectedCard === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-gray-200"
                            >
                              <p className="text-sm text-gray-500">
                                Click to {item.action ? 'contact us directly' : 'view more details'}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Links - Apple Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-3xl p-8"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {[
                    { href: "/quote", label: "Get a Free Quote", icon: ArrowRight },
                    { href: "/packages", label: "Explore Packages", icon: ArrowRight },
                    { href: "/gallery", label: "View Our Work", icon: ArrowRight }
                  ].map((link, i) => (
                    <Link
                      key={i}
                      href={link.href}
                      className="flex items-center justify-between p-4 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <span className="font-medium text-gray-900">{link.label}</span>
                      <link.icon className="h-5 w-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                      <CheckCircle className="h-10 w-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">Thank You!</h2>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Your message has been received. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        form.reset()
                      }}
                      variant="premium"
                      size="lg"
                      className="rounded-full"
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
                    className="bg-gray-50 rounded-3xl p-10 md:p-12"
                  >
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Send us a message
                    </h2>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    className="apple-input"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
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
                                    className="apple-input"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-gray-700 font-medium">Phone</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="+91 98765 43210" 
                                    className="apple-input"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
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
                                    className="apple-input"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
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
                                  placeholder="Tell us about your dream project..."
                                  className="apple-textarea"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-red-500" />
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="submit"
                          disabled={isLoading}
                          variant="premium"
                          size="xl"
                          className="w-full rounded-full"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Apple Style */}
      <section ref={testimonialsRef} className="py-24 md:py-32 relative bg-gray-50">
        
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Client testimonials.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our satisfied clients have to say.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 text-lg leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="text-gray-900 font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Apple Style */}
      <section ref={mapRef} className="py-24 md:py-32 relative bg-white">
        
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
              Visit our studio.
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our work firsthand at our state-of-the-art design studio in Bangalore.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden h-[600px] shadow-xl"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085452149588!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1647851449644!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Overlay with info - Apple Style */}
            <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="apple-glass rounded-3xl p-8 max-w-md shadow-2xl"
              >
                <h3 className="font-semibold text-2xl mb-4 text-gray-900">Sahara Design Studio</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    100-feet Ring Road, BTM Layout, Bangalore 560029
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-600" />
                    Mon-Sat: 9AM-6PM
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-600" />
                    +91 9591-837216
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}