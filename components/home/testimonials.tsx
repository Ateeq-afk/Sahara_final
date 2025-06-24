"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    content: "The interior design expertise at Sahara Builders is unmatched. They transformed our apartment into a sophisticated space that perfectly balances elegance and functionality.",
    author: "Ananya Reddy",
    project: "Residential Interior",
    location: "Koramangala",
    image: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg"
  },
  {
    content: "Working with Sahara for our office renovation was a seamless experience. Their understanding of modern workspace design and commitment to timelines helped us create an inspiring environment for our team.",
    author: "Vikram Mehta",
    project: "Corporate Office Design",
    location: "Indiranagar",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
  },
  {
    content: "From concept to completion, Sahara Builders exceeded our expectations. Their attention to detail and innovative solutions transformed our outdated space into a modern masterpiece.",
    author: "Priya Sharma",
    project: "Home Renovation",
    location: "Whitefield",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
  },
  {
    content: "The team's expertise in luxury interiors is evident in every detail. They created a space that perfectly reflects our style while maintaining functionality.",
    author: "Rajesh Kumar",
    project: "Penthouse Design",
    location: "JP Nagar",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
  }
]

export default function Testimonials() {
  return (
    <section className="bg-[#F8F6F2] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-[#232323] font-normal mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 font-sans">
            Words that inspire us to build better
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                {/* Large Quote Mark */}
                <span className="absolute -top-4 -left-2 text-6xl text-[#B29263]/20 font-serif select-none">
                  "
                </span>
                
                {/* Testimonial Content */}
                <blockquote className="relative pt-6">
                  <p className="text-lg italic text-gray-800 leading-relaxed mb-8">
                    {testimonial.content}
                  </p>

                  <div className="flex items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-[#B29263]/20">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#232323]">
                        {testimonial.author}
                      </p>
                      <p className="text-[#B29263] font-medium text-sm">
                        {testimonial.project}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}