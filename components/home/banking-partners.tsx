"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

const partners = [
  { name: "HDFC Bank", logo: "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg" },
  { name: "State Bank of India", logo: "https://images.pexels.com/photos/296883/pexels-photo-296883.jpeg" },
  { name: "ICICI Bank", logo: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg" },
  { name: "Axis Bank", logo: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg" },
  { name: "Kotak Mahindra Bank", logo: "https://images.pexels.com/photos/1082355/pexels-photo-1082355.jpeg" },
  { name: "Punjab National Bank", logo: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg" },
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
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-24 sm:h-32 w-32 sm:w-40 relative overflow-hidden">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} - Financial Partner`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg text-center px-2">
                    {partner.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}