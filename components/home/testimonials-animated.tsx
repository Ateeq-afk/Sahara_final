"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    text: "Sahara Developers transformed our home beyond our wildest dreams. Their attention to detail and commitment to quality is unmatched. Every corner reflects sophistication and functionality.",
    image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg",
    name: "Priya Sharma",
    role: "Homeowner, Whitefield"
  },
  {
    text: "Working with Sahara for our office renovation was seamless. They understood our vision perfectly and delivered a space that inspires productivity and creativity.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    name: "Vikram Mehta",
    role: "CEO, Tech Startup"
  },
  {
    text: "The interior design expertise at Sahara is exceptional. They created a perfect balance of elegance and comfort in our apartment. Highly recommended!",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    name: "Ananya Reddy",
    role: "Interior Design Client"
  },
  {
    text: "From concept to completion, Sahara Developers exceeded expectations. Their innovative solutions and timely delivery made our construction journey stress-free.",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    name: "Rajesh Kumar",
    role: "Villa Owner, JP Nagar"
  },
  {
    text: "The team's professionalism and craftsmanship are outstanding. They turned our outdated space into a modern masterpiece while staying within budget.",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    name: "Neha Patel",
    role: "Renovation Client"
  },
  {
    text: "Sahara's turnkey solutions made our commercial project effortless. Their project management and quality control are truly world-class.",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    name: "Arjun Singh",
    role: "Business Owner"
  }
]

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: typeof testimonials
  duration?: number
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 max-w-sm w-full group" 
                  key={i}
                >
                  <div className="relative">
                    {/* Quote mark */}
                    <span className="absolute -top-2 -left-2 text-4xl text-primary/20 font-serif select-none">
                      "
                    </span>
                    
                    <p className="text-gray-700 leading-relaxed mb-6 relative pt-4">
                      {text}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                      <Image
                        width={48}
                        height={48}
                        src={image}
                        alt={name}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-gray-900 leading-tight">{name}</div>
                      <div className="text-sm text-primary leading-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  )
}

export default function TestimonialsAnimated() {
  const firstColumn = testimonials.slice(0, 3)
  const secondColumn = testimonials.slice(3, 6)
  const thirdColumn = testimonials.slice(0, 2).concat(testimonials.slice(4, 5))

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-primary-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 text-sm font-medium mb-4">
            <span>★</span>
            Client Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from satisfied clients who trusted us with their dreams. 
            Their success is our greatest achievement.
          </p>
        </motion.div>

        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <TestimonialsColumn
              testimonials={firstColumn}
              duration={15}
              className="hidden lg:block"
            />
            <TestimonialsColumn
              testimonials={secondColumn}
              duration={19}
              className="block"
            />
            <TestimonialsColumn
              testimonials={thirdColumn}
              duration={17}
              className="hidden md:block"
            />
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif text-gray-900 mb-4">
              Ready to Join Our Happy Clients?
            </h3>
            <p className="text-gray-600 mb-6">
              Let's discuss your project and create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/quote"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Your Free Quote
              </motion.a>
              <motion.a
                href="/gallery"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-medium transition-all duration-200"
              >
                View Our Portfolio
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}