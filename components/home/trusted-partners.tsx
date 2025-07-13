"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Banknote, Package2, HomeIcon } from 'lucide-react'
import { useState } from 'react'

const bankingPartners = [
  { 
    name: "State Bank of India", 
    logo: "/partner-logos/sbi-clearbit.png",
    fallback: "/partner-logos/sbi-logo.png",
    category: "banking"
  },
  { 
    name: "HDFC Bank", 
    logo: "/partner-logos/hdfc-clearbit.png",
    fallback: "/partner-logos/hdfc-bank-logo.png",
    category: "banking"
  },
  { 
    name: "ICICI Bank", 
    logo: "/partner-logos/icici-clearbit.png",
    fallback: "/partner-logos/icici-bank-logo.png",
    category: "banking"
  },
  { 
    name: "Axis Bank", 
    logo: "/partner-logos/axis-clearbit.png",
    fallback: "/partner-logos/axis-bank-logo.png",
    category: "banking"
  },
  { 
    name: "Punjab National Bank", 
    logo: "/partner-logos/pnb-clearbit.png",
    fallback: "/partner-logos/pnb-logo.png",
    category: "banking"
  },
  { 
    name: "Bank of Baroda", 
    logo: "/partner-logos/bob-clearbit.png",
    fallback: "/partner-logos/bob-logo.png",
    category: "banking"
  },
  { 
    name: "Kotak Mahindra Bank", 
    logo: "/partner-logos/kotak-clearbit.png",
    fallback: "/partner-logos/kotak-logo.png",
    category: "banking"
  },
  { 
    name: "Canara Bank", 
    logo: "/partner-logos/canara-clearbit.png",
    fallback: "/partner-logos/canara-bank-logo.png",
    category: "banking"
  }
]

const materialPartners = [
  { 
    name: "UltraTech Cement", 
    logo: "/partner-logos/ultratech-clearbit.png",
    fallback: "/partner-logos/ultratech-logo.png",
    category: "materials"
  },
  { 
    name: "Asian Paints", 
    logo: "/partner-logos/asian-paints-clearbit.png",
    fallback: "/partner-logos/asian-paints-logo.png",
    category: "materials"
  },
  { 
    name: "Kajaria Ceramics", 
    logo: "/partner-logos/kajaria-clearbit.png",
    fallback: "/partner-logos/kajaria-actual.png",
    category: "materials"
  },
  { 
    name: "Jindal Steel", 
    logo: "/partner-logos/jindal-clearbit.png",
    fallback: "/partner-logos/jindal-steel-logo.png",
    category: "materials"
  },
  { 
    name: "Somany Ceramics", 
    logo: "/partner-logos/somany-clearbit.png",
    fallback: "/partner-logos/somany-logo.png",
    category: "materials"
  },
  { 
    name: "Berger Paints", 
    logo: "/partner-logos/berger-clearbit.png",
    fallback: "/partner-logos/berger-paints-logo.png",
    category: "materials"
  },
  { 
    name: "Tata Steel", 
    logo: "/partner-logos/tata-clearbit.png",
    fallback: "/partner-logos/tata-steel-logo.png",
    category: "materials"
  },
  { 
    name: "ACC Cement", 
    logo: "/partner-logos/acc-clearbit.png",
    fallback: "/partner-logos/acc-logo.png",
    category: "materials"
  }
]

const TrustedPartners = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (partnerName: string, fallbackUrl: string) => {
    setImageErrors(prev => ({ ...prev, [partnerName]: true }))
  }

  const getImageSrc = (partner: any) => {
    return imageErrors[partner.name] ? partner.fallback : partner.logo
  }

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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bankingPartners.map((partner, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 h-40 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 hover:border-gray-200">
                  <div className="relative w-full h-full">
                    <Image
                      src={getImageSrc(partner)}
                      alt={partner.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:scale-110"
                      onError={() => handleImageError(partner.name, partner.fallback)}
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {materialPartners.map((partner, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 h-40 flex items-center justify-center shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 hover:border-gray-200">
                  <div className="relative w-full h-full">
                    <Image
                      src={getImageSrc(partner)}
                      alt={partner.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:scale-110"
                      onError={() => handleImageError(partner.name, partner.fallback)}
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
            <div className="text-4xl font-semibold text-gray-900 mb-2">95%</div>
            <p className="text-gray-600">Home Loan Approval Rate</p>
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