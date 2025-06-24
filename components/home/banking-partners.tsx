"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: "HDFC Bank", logo: "https://placehold.co/160x60/f8f9fa/6c757d?text=HDFC+Bank" },
  { name: "State Bank of India", logo: "https://placehold.co/160x60/f8f9fa/6c757d?text=SBI" },
  { name: "ICICI Bank", logo: "https://placehold.co/160x60/f8f9fa/6c757d?text=ICICI+Bank" },
  { name: "Axis Bank", logo: "https://placehold.co/160x60/f8f9fa/6c757d?text=Axis+Bank" },
  { name: "Kotak Mahindra Bank", logo: "https://placehold.co/160x60/f8f9fa/6c757d?text=Kotak+Bank" },
  { name: "HDFC Bank", logo: "https://placehold.co/160x60/f8f9fa/6c757d?text=HDFC+Bank" },
]

export default function BankingPartners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-serif text-gray-900 mb-4">
            Trusted Financial Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading banks to offer flexible financing options for your dream project
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-12 w-32 relative">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Financial Partner`}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}