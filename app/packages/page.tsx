"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check, Star, ArrowRight, Download, Shield, Clock, Award, Users, Building, Home, Palette, Wrench, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

const packages = [
  {
    id: "essential",
    title: "Essential",
    subtitle: "Quality Foundation",
    price: "₹1,599",
    originalPrice: "₹1,799",
    unit: "per sq.ft",
    description: "Perfect for first-time homeowners seeking quality construction with reliable materials and professional craftsmanship.",
    detailedDescription: "Our Essential package provides a solid foundation for your dream home with carefully selected materials that offer durability and value. This package includes all the fundamental elements needed for a comfortable living space, ensuring quality construction without compromising on safety or structural integrity.",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    features: [
      "RCC Structure with M20 Grade Concrete",
      "Standard Bathroom Fittings (Hindware/Cera)",
      "Basic Electrical Layout with Anchor Roma",
      "Vitrified Tiles Flooring (60x60cm)",
      "Basic Kitchen Setup with Granite Platform",
      "Emulsion Paint (Asian Paints)",
      "Standard Doors & Windows",
      "Basic Plumbing with CPVC Pipes"
    ],
    inclusions: [
      "Architectural Planning",
      "Structural Design",
      "Basic Interior Layout",
      "Quality Assurance",
      "1 Year Warranty"
    ],
    examples: [
      {
        title: "2 BHK Apartment",
        area: "1,200 sq.ft",
        cost: "₹19.2 Lakhs",
        image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg"
      },
      {
        title: "3 BHK Villa",
        area: "1,800 sq.ft",
        cost: "₹28.8 Lakhs",
        image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
      }
    ],
    popular: false,
    savings: "₹2.4 Lakhs",
    timeline: "8-12 months"
  },
  {
    id: "premium",
    title: "Premium",
    subtitle: "Superior Excellence",
    price: "₹2,299",
    originalPrice: "₹2,599",
    unit: "per sq.ft",
    description: "Enhanced construction with premium materials, modern amenities, and sophisticated interior design elements.",
    detailedDescription: "Step up to premium living with our most popular package that combines superior construction quality with modern design aesthetics. This comprehensive package includes premium materials, advanced electrical systems, and thoughtful interior design elements that create a sophisticated living environment.",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    features: [
      "Enhanced RCC Structure with M25 Grade",
      "Premium Bathroom Fittings (Kohler/Grohe)",
      "Comprehensive Electrical with Legrand",
      "Premium Vitrified/Wooden Flooring",
      "Modular Kitchen with Quartz Countertop",
      "Premium Paint & Texture (Dulux)",
      "Designer Doors & UPVC Windows",
      "Advanced Plumbing Systems",
      "Basic Home Automation",
      "False Ceiling in Living Areas"
    ],
    inclusions: [
      "3D Architectural Visualization",
      "Interior Design Consultation",
      "Premium Material Selection",
      "Project Management",
      "2 Year Comprehensive Warranty",
      "Vastu Consultation"
    ],
    examples: [
      {
        title: "3 BHK Luxury Apartment",
        area: "1,500 sq.ft",
        cost: "₹34.5 Lakhs",
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg"
      },
      {
        title: "4 BHK Villa",
        area: "2,500 sq.ft",
        cost: "₹57.5 Lakhs",
        image: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg"
      }
    ],
    popular: true,
    savings: "₹7.5 Lakhs",
    timeline: "10-14 months"
  },
  {
    id: "luxury",
    title: "Luxury",
    subtitle: "Ultimate Sophistication",
    price: "₹3,499",
    originalPrice: "₹3,999",
    unit: "per sq.ft",
    description: "Exclusive construction with high-end materials, smart home integration, and bespoke interior design.",
    detailedDescription: "Experience the pinnacle of luxury living with our premium package that features the finest materials, cutting-edge technology, and bespoke design elements. Every detail is meticulously crafted to create an extraordinary living experience that reflects sophistication and elegance.",
    image: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg",
    features: [
      "Superior RCC with M30 Grade Concrete",
      "Luxury Bathroom Fittings (Hansgrohe/Duravit)",
      "Smart Electrical with Schneider",
      "Imported Marble/Hardwood Flooring",
      "Designer Modular Kitchen (German)",
      "Premium Texture & Imported Paint",
      "Solid Wood Doors & Imported Windows",
      "Luxury Plumbing & Fixtures",
      "Complete Home Automation",
      "Designer False Ceiling Throughout",
      "Landscape Design",
      "Swimming Pool Ready Infrastructure"
    ],
    inclusions: [
      "Complete Architectural Design",
      "Full Interior Design Service",
      "Premium Material Sourcing",
      "Dedicated Project Manager",
      "5 Year Comprehensive Warranty",
      "Vastu & Feng Shui Consultation",
      "Post-Completion Support"
    ],
    examples: [
      {
        title: "4 BHK Penthouse",
        area: "3,000 sq.ft",
        cost: "₹1.05 Crores",
        image: "https://images.pexels.com/photos/6585750/pexels-photo-6585750.jpeg"
      },
      {
        title: "5 BHK Luxury Villa",
        area: "4,500 sq.ft",
        cost: "₹1.57 Crores",
        image: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg"
      }
    ],
    popular: false,
    savings: "₹22.5 Lakhs",
    timeline: "12-18 months"
  }
]

const constructionTypes = [
  {
    icon: Home,
    title: "Residential Construction",
    description: "Custom homes, apartments, and villas designed for modern living",
    features: ["Individual Houses", "Apartment Complexes", "Luxury Villas", "Townhouses"]
  },
  {
    icon: Building,
    title: "Commercial Construction",
    description: "Office buildings, retail spaces, and commercial complexes",
    features: ["Office Buildings", "Retail Spaces", "Warehouses", "Mixed-Use Developments"]
  },
  {
    icon: Palette,
    title: "Interior Design",
    description: "Complete interior solutions from concept to execution",
    features: ["Space Planning", "Furniture Design", "Lighting Solutions", "Décor Consultation"]
  },
  {
    icon: Wrench,
    title: "Renovation & Remodeling",
    description: "Transform existing spaces with modern upgrades",
    features: ["Kitchen Remodeling", "Bathroom Renovation", "Space Optimization", "Structural Changes"]
  }
]

const testimonials = [
  {
    name: "Priya Sharma",
    project: "Premium Package - 3 BHK Villa",
    rating: 5,
    comment: "Exceptional quality and attention to detail. The team delivered exactly what was promised.",
    image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg"
  },
  {
    name: "Rajesh Kumar",
    project: "Luxury Package - 4 BHK Penthouse",
    rating: 5,
    comment: "Outstanding craftsmanship and premium materials. Worth every penny invested.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  }
]

export default function PackagesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-50 via-white to-primary-100/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 text-sm font-medium mb-6 shadow-sm">
              <Award className="h-4 w-4" />
              Premium Construction Packages
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Transparent Pricing for Your Dream Project
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Choose from our carefully curated packages designed to meet every budget and requirement. 
              All packages include premium materials, expert craftsmanship, and comprehensive warranties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" asChild>
                <Link href="/quote">Get Custom Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 shadow-md hover:shadow-lg transition-all duration-300">
                <Download className="mr-2 h-5 w-5" />
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Construction Types Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
              Our Construction Expertise
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From residential homes to commercial complexes, we deliver excellence across all construction types
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {constructionTypes.map((type, index) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">{type.title}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
              Choose Your Perfect Package
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each package is designed to deliver exceptional value with transparent pricing and comprehensive inclusions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 border ${
                  pkg.popular 
                    ? 'ring-4 ring-primary/30 shadow-2xl border-primary/20' 
                    : 'ring-1 ring-gray-200 shadow-xl hover:shadow-2xl border-gray-100'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white text-center py-3">
                    <span className="text-sm font-semibold flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 fill-current" />
                      Most Popular Choice
                    </span>
                  </div>
                )}
                
                {/* Package Image */}
                <div className={`relative h-48 ${pkg.popular ? 'mt-12' : ''}`}>
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-serif font-bold">{pkg.title}</h3>
                    <p className="text-sm opacity-90">{pkg.subtitle}</p>
                  </div>
                  {pkg.savings && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Save {pkg.savings}
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  {/* Pricing */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-lg text-gray-500 line-through">{pkg.originalPrice}</span>
                      <span className="text-gray-600">{pkg.unit}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {pkg.timeline}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4" />
                        Warranty Included
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="font-serif font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {pkg.features.slice(0, 6).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 6 && (
                        <li className="text-sm text-primary font-medium">
                          +{pkg.features.length - 6} more features included
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div className="mb-6">
                    <h4 className="font-serif font-semibold text-gray-900 mb-3">Project Examples</h4>
                    <div className="space-y-3">
                      {pkg.examples.map((example, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div>
                            <div className="font-medium text-sm text-gray-900">{example.title}</div>
                            <div className="text-xs text-gray-600">{example.area}</div>
                          </div>
                          <div className="text-sm font-semibold text-primary">{example.cost}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className={`w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                      pkg.popular 
                        ? 'bg-primary hover:bg-primary-dark text-white' 
                        : 'bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    }`}
                    size="lg"
                    asChild
                  >
                    <Link href="/quote">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Package Comparison */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
              Detailed Package Comparison
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Compare all features and inclusions to make the best choice for your project
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <thead className="bg-gradient-to-r from-primary/90 to-primary-dark text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-serif">Features</th>
                  <th className="px-6 py-4 text-center font-serif">Essential</th>
                  <th className="px-6 py-4 text-center font-serif">Premium</th>
                  <th className="px-6 py-4 text-center font-serif">Luxury</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: "Concrete Grade", essential: "M20", premium: "M25", luxury: "M30" },
                  { feature: "Flooring", essential: "Vitrified Tiles", premium: "Premium Tiles/Wood", luxury: "Imported Marble/Hardwood" },
                  { feature: "Bathroom Fittings", essential: "Standard (Hindware)", premium: "Premium (Kohler)", luxury: "Luxury (Hansgrohe)" },
                  { feature: "Kitchen", essential: "Basic Granite", premium: "Quartz Countertop", luxury: "German Modular" },
                  { feature: "Electrical", essential: "Anchor Roma", premium: "Legrand", luxury: "Schneider Smart" },
                  { feature: "Paint", essential: "Asian Paints", premium: "Dulux Premium", luxury: "Imported Premium" },
                  { feature: "Warranty", essential: "1 Year", premium: "2 Years", luxury: "5 Years" },
                  { feature: "Home Automation", essential: "❌", premium: "Basic", luxury: "Complete" }
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.essential}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.premium}</td>
                    <td className="px-6 py-4 text-center text-gray-700">{row.luxury}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from satisfied clients who chose our packages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-serif font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.project}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our construction packages
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              {
                question: "What's included in each package?",
                answer: "Each package includes different levels of materials, finishes, and services. The Essential package covers basic construction needs with quality materials, Premium adds sophisticated options and better finishes, while Luxury includes high-end materials, smart features, and bespoke design elements."
              },
              {
                question: "Can packages be customized?",
                answer: "Absolutely! All packages can be customized to meet your specific requirements. Our team will work with you to adjust features, materials, and finishes while maintaining the core benefits and value proposition of your chosen package."
              },
              {
                question: "How are the costs calculated?",
                answer: "Costs are calculated per square foot and include materials, labor, project management, and overhead. The final price may vary based on site conditions, customizations, and current material rates. We provide detailed estimates with transparent breakdowns."
              },
              {
                question: "What warranty do you provide?",
                answer: "We provide comprehensive warranties ranging from 1 year (Essential) to 5 years (Luxury). This covers structural work, electrical systems, plumbing, and finishing work. We also provide ongoing maintenance support."
              },
              {
                question: "How long does construction take?",
                answer: "Timeline varies by package and project size. Essential projects typically take 8-12 months, Premium 10-14 months, and Luxury 12-18 months. We provide detailed project schedules and milestone tracking."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Ready to Start Your Dream Project?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Get in touch with our experts to discuss your requirements and find the perfect package for your needs. 
              We'll help you create a space that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/quote">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 shadow-md hover:shadow-lg transition-all duration-300"
                asChild
              >
                <Link href="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                500+ Happy Clients
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                20+ Years Experience
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Comprehensive Warranty
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}