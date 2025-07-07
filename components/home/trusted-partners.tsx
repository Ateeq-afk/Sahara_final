"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Banknote, Package2, HomeIcon } from 'lucide-react'

const bankingPartners = [
  { 
    name: "Emirates NBD", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Emirates_NBD_logo.svg/2560px-Emirates_NBD_logo.svg.png",
    category: "banking"
  },
  { 
    name: "ADIB", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Abu_Dhabi_Islamic_Bank_logo.svg/2560px-Abu_Dhabi_Islamic_Bank_logo.svg.png",
    category: "banking"
  },
  { 
    name: "Dubai Islamic Bank", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Dubai_Islamic_Bank_logo.svg/2560px-Dubai_Islamic_Bank_logo.svg.png",
    category: "banking"
  },
  { 
    name: "Mashreq Bank", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Mashreq_logo.svg/2560px-Mashreq_logo.svg.png",
    category: "banking"
  }
]

const materialPartners = [
  { 
    name: "RAK Ceramics", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/RAK_Ceramics_logo.svg/2560px-RAK_Ceramics_logo.svg.png",
    category: "materials"
  },
  { 
    name: "Jotun Paints", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Jotun_logo.svg/2560px-Jotun_logo.svg.png",
    category: "materials"
  },
  { 
    name: "Saint-Gobain", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Saint-Gobain_logo.svg/2560px-Saint-Gobain_logo.svg.png",
    category: "materials"
  },
  { 
    name: "Danube", 
    logo: "https://danubehome.com/media/logo/default/danube-logo.png",
    category: "materials"
  }
]

const TrustedPartners = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  }

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Trusted Partners
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Collaborating with industry leaders to bring you premium quality and flexible financing solutions
          </p>
        </motion.div>

        {/* Banking Partners */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Banknote className="w-6 h-6 text-gray-600" />
            <h3 className="text-2xl font-medium text-gray-800">Banking Partners</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bankingPartners.map((partner, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 h-32 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 hover:border-gray-200">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Material Partners */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-10">
            <Package2 className="w-6 h-6 text-gray-600" />
            <h3 className="text-2xl font-medium text-gray-800">Material Partners</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {materialPartners.map((partner, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 h-32 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 hover:border-gray-200">
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div>
            <div className="text-4xl font-semibold text-gray-900 mb-2">15+</div>
            <p className="text-gray-600">Years of Partnership</p>
          </div>
          <div>
            <div className="text-4xl font-semibold text-gray-900 mb-2">100%</div>
            <p className="text-gray-600">Financing Approval Rate</p>
          </div>
          <div>
            <div className="text-4xl font-semibold text-gray-900 mb-2">A+</div>
            <p className="text-gray-600">Quality Materials Only</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedPartners