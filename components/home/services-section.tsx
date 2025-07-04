"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Building2, Palette, Wrench } from 'lucide-react';

const services = [
  {
    title: 'Residential Construction',
    icon: Home,
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    description: 'Premium home construction with architectural excellence, quality materials, and meticulous attention to detail for your dream residence.',
    features: ['Custom Home Design', 'Quality Materials', 'Expert Craftsmanship', 'Timely Delivery'],
    href: '/services/construction',
  },
  {
    title: 'Commercial Construction',
    icon: Building2,
    image: 'https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg',
    description: 'Professional commercial spaces designed for success. From offices to retail, we build environments that inspire productivity and growth.',
    features: ['Office Buildings', 'Retail Spaces', 'Industrial Projects', 'Modern Infrastructure'],
    href: '/services/construction',
  },
  {
    title: 'Interior Design',
    icon: Palette,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    description: 'Transform spaces with our award-winning interior design. Creating environments that reflect your personality and enhance your lifestyle.',
    features: ['Space Planning', 'Custom Furniture', 'Lighting Design', 'Material Selection'],
    href: '/services/interior-decor',
  },
  {
    title: 'Renovation & Remodeling',
    icon: Wrench,
    image: 'https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg',
    description: 'Breathe new life into existing spaces. Our renovation experts modernize and optimize your property with innovative solutions.',
    features: ['Kitchen Remodeling', 'Bathroom Renovation', 'Space Optimization', 'Modern Upgrades'],
    href: '/services/renovations',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Building2 className="h-4 w-4" />
            Our Expertise
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            Comprehensive Construction &<br />Interior Design Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From concept to completion, we deliver exceptional results that exceed expectations. 
            Our integrated approach ensures seamless execution across all project phases.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:gap-12 grid-cols-1 lg:grid-cols-2">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  href={service.href}
                  className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} by Sahara Developers`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-2xl font-serif font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary font-semibold group-hover:text-primary-dark transition-colors">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 sm:p-12 text-white shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-serif mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let our experts help you bring your vision to life with our comprehensive construction and interior design services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-50 transition-colors"
              >
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}