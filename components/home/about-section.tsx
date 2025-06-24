"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Award, Users, Building, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const achievements = [
  {
    icon: Building,
    number: "500+",
    label: "Projects Completed",
    description: "Successful construction and interior projects across Bangalore"
  },
  {
    icon: Users,
    number: "20+",
    label: "Years Experience",
    description: "Two decades of experience in construction and interior design"
  },
  {
    icon: Award,
    number: "4.8★",
    label: "Client Rating",
    description: "Consistently high ratings from satisfied clients"
  },
  {
    icon: MapPin,
    number: "100%",
    label: "Bangalore Focused",
    description: "Deep understanding of local regulations and market"
  }
]

const AboutSection = () => {
  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-6">
              <Building className="h-4 w-4" />
              About Sahara Developers
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
              Leading Contractors in Bangalore Since 2003
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Sahara Developers stands as Bangalore's most trusted name in construction and interior design. 
                As premier contractors in Bangalore, we have been transforming visions into reality for over two decades, 
                delivering exceptional residential and commercial projects across the city.
              </p>
              
              <p>
                Our expertise as construction contractors in Bangalore encompasses everything from luxury villa construction 
                to sophisticated commercial spaces and innovative interior design solutions. We understand the unique challenges of 
                building in Bangalore's dynamic environment and leverage our deep local market knowledge to deliver projects that 
                exceed expectations.
              </p>
              
              <p>
                What sets us apart as building contractors in Bangalore is our unwavering commitment to quality, 
                transparency, and timely delivery. Every project reflects our core values, 
                making us the preferred choice for discerning clients across the city.
              </p>
            </div>

            {/* Mission & Values */}
            <div className="mt-8 p-6 bg-primary-50 rounded-2xl">
              <h3 className="text-xl font-serif font-semibold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted construction and interior design partner in Bangalore, delivering innovative, 
                sustainable, and high-quality solutions that enhance lives and create lasting value for our clients and communities.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-3"
              >
                <Link href="/quote">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-3"
              >
                <Link href="/gallery">View Our Projects</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg"
                alt="Sahara Developers - Premier Construction Company in Bangalore"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              
              {/* Floating Achievement Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">20+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">4.8★</div>
                    <div className="text-sm text-gray-600">Client Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <div className="text-xl font-bold text-gray-900 mb-1">{achievement.number}</div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">{achievement.label}</div>
                    <div className="text-xs text-gray-600 leading-relaxed">{achievement.description}</div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection