"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Building2, Banknote, Package2, HomeIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import './trusted-partners.css'

const bankingPartners = [
  { 
    name: "State Bank of India", 
    logo: "/partner-logos/sbi-clearbit.png",
    fallback: "/partner-logos/sbi-logo.png",
    category: "banking",
    link: "https://www.sbi.co.in/web/personal-banking/loans/home-loans",
    description: "Home loan rates starting from 8.5% p.a."
  },
  { 
    name: "HDFC Bank", 
    logo: "/partner-logos/hdfc-clearbit.png",
    fallback: "/partner-logos/hdfc-bank-logo.png",
    category: "banking",
    link: "https://www.hdfcbank.com/personal/borrow/home-loans",
    description: "Quick loan approval with attractive rates"
  },
  { 
    name: "ICICI Bank", 
    logo: "/partner-logos/icici-clearbit.png",
    fallback: "/partner-logos/icici-bank-logo.png",
    category: "banking",
    link: "https://www.icicibank.com/personal-banking/loans/home-loan",
    description: "Instant loan pre-approval available"
  },
  { 
    name: "Axis Bank", 
    logo: "/partner-logos/axis-clearbit.png",
    fallback: "/partner-logos/axis-bank-logo.png",
    category: "banking",
    link: "https://www.axisbank.com/retail/loans/home-loan",
    description: "Flexible repayment options"
  },
  { 
    name: "Punjab National Bank", 
    logo: "/partner-logos/pnb-clearbit.png",
    fallback: "/partner-logos/pnb-logo.png",
    category: "banking",
    link: "https://www.pnbindia.in/home-loan.html",
    description: "Special rates for government employees"
  },
  { 
    name: "Bank of Baroda", 
    logo: "/partner-logos/bob-clearbit.png",
    fallback: "/partner-logos/bob-logo.png",
    category: "banking",
    link: "https://www.bankofbaroda.in/personal-banking/loans/home-loans",
    description: "Competitive interest rates"
  },
  { 
    name: "Kotak Mahindra Bank", 
    logo: "/partner-logos/kotak-clearbit.png",
    fallback: "/partner-logos/kotak-logo.png",
    category: "banking",
    link: "https://www.kotak.com/en/personal-banking/loans/home-loans.html",
    description: "Digital loan processing"
  },
  { 
    name: "Canara Bank", 
    logo: "/partner-logos/canara-clearbit.png",
    fallback: "/partner-logos/canara-bank-logo.png",
    category: "banking",
    link: "https://www.canarabank.com/personal-banking/loans/home-loans",
    description: "Trusted banking partner"
  }
]

const materialPartners = [
  { 
    name: "UltraTech Cement", 
    logo: "/partner-logos/ultratech-clearbit.png",
    fallback: "/partner-logos/ultratech-logo.png",
    category: "materials",
    link: "https://www.ultratechcement.com/",
    description: "India's largest cement manufacturer"
  },
  { 
    name: "Asian Paints", 
    logo: "/partner-logos/asian-paints-clearbit.png",
    fallback: "/partner-logos/asian-paints-logo.png",
    category: "materials",
    link: "https://www.asianpaints.com/",
    description: "Premium paint solutions"
  },
  { 
    name: "Kajaria Ceramics", 
    logo: "/partner-logos/kajaria-clearbit.png",
    fallback: "/partner-logos/kajaria-actual.png",
    category: "materials",
    link: "https://www.kajariaceramics.com/",
    description: "Quality tiles and ceramics"
  },
  { 
    name: "Jindal Steel", 
    logo: "/partner-logos/jindal-clearbit.png",
    fallback: "/partner-logos/jindal-steel-logo.png",
    category: "materials",
    link: "https://www.jindalsteel.com/",
    description: "High-grade steel products"
  },
  { 
    name: "Somany Ceramics", 
    logo: "/partner-logos/somany-clearbit.png",
    fallback: "/partner-logos/somany-logo.png",
    category: "materials",
    link: "https://www.somany.com/",
    description: "Innovative ceramic solutions"
  },
  { 
    name: "Berger Paints", 
    logo: "/partner-logos/berger-clearbit.png",
    fallback: "/partner-logos/berger-paints-logo.png",
    category: "materials",
    link: "https://www.bergerpaints.com/",
    description: "Trusted paint brand"
  },
  { 
    name: "Tata Steel", 
    logo: "/partner-logos/tata-clearbit.png",
    fallback: "/partner-logos/tata-steel-logo.png",
    category: "materials",
    link: "https://www.tatasteel.com/",
    description: "World-class steel solutions"
  },
  { 
    name: "ACC Cement", 
    logo: "/partner-logos/acc-clearbit.png",
    fallback: "/partner-logos/acc-logo.png",
    category: "materials",
    link: "https://www.acclimited.com/",
    description: "Building stronger India"
  }
]

const TrustedPartners = () => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})}
  const [isMobile, setIsMobile] = useState(false)
  const bankingScrollRef = useRef<HTMLDivElement>(null)
  const materialScrollRef = useRef<HTMLDivElement>(null)
  const [canScrollBankingLeft, setCanScrollBankingLeft] = useState(false)
  const [canScrollBankingRight, setCanScrollBankingRight] = useState(true)
  const [canScrollMaterialLeft, setCanScrollMaterialLeft] = useState(false)
  const [canScrollMaterialRight, setCanScrollMaterialRight] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const checkScrollButtons = (ref: React.RefObject<HTMLDivElement>, setCanScrollLeft: Function, setCanScrollRight: Function) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons(bankingScrollRef, setCanScrollBankingLeft, setCanScrollBankingRight)
    checkScrollButtons(materialScrollRef, setCanScrollMaterialLeft, setCanScrollMaterialRight)
  }, [isMobile])

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 200
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleImageError = (partnerName: string, fallbackUrl: string) => {
    setImageErrors(prev => ({ ...prev, [partnerName]: true }))
  }

  const getImageSrc = (partner: any) => {
    return imageErrors[partner.name] ? partner.fallback : partner.logo
  }

  const handlePartnerClick = (partner: any) => {
    if (partner.link) {
      window.open(partner.link, '_blank', 'noopener,noreferrer')
    }
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
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 tracking-tight">
            Our Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working with trusted industry leaders to deliver quality and financing solutions
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
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Banknote className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Banking Partners</h3>
          </div>
          
          {isMobile ? (
            <div className="relative">
              {/* Scroll Buttons */}
              {canScrollBankingLeft && (
                <button
                  onClick={() => scroll(bankingScrollRef, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {canScrollBankingRight && (
                <button
                  onClick={() => scroll(bankingScrollRef, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
              
              {/* Scrollable Container */}
              <div
                ref={bankingScrollRef}
                onScroll={() => checkScrollButtons(bankingScrollRef, setCanScrollBankingLeft, setCanScrollBankingRight)}
                className="flex overflow-x-auto scrollbar-hide gap-3 pb-2 -mx-6 px-6 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {bankingPartners.map((partner, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer flex-shrink-0 w-[160px]"
                    onClick={() => handlePartnerClick(partner)}
                  >
                    <div className="bg-gray-50 rounded-xl p-6 h-28 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:shadow-sm">
                      <div className="relative w-full max-w-[80px] h-6 flex items-center justify-center">
                        <Image
                          src={getImageSrc(partner)}
                          alt={partner.name}
                          fill
                          loading="lazy"
                          sizes="80px"
                          className="object-contain max-h-6 transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                          onError={() => handleImageError(partner.name, partner.fallback)}
                          style={{ maxHeight: '24px' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {bankingPartners.map((partner, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handlePartnerClick(partner)}
                >
                  <div className="bg-gray-50 rounded-xl p-8 h-32 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:shadow-sm">
                    <div className="relative w-full max-w-[100px] h-8 flex items-center justify-center">
                      <Image
                        src={getImageSrc(partner)}
                        alt={partner.name}
                        fill
                        loading="lazy"
                        sizes="100px"
                        className="object-contain max-h-8 transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                        onError={() => handleImageError(partner.name, partner.fallback)}
                        style={{ maxHeight: '32px' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Material Partners */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package2 className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Material Partners</h3>
          </div>
          
          {isMobile ? (
            <div className="relative">
              {/* Scroll Buttons */}
              {canScrollMaterialLeft && (
                <button
                  onClick={() => scroll(materialScrollRef, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {canScrollMaterialRight && (
                <button
                  onClick={() => scroll(materialScrollRef, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
              
              {/* Scrollable Container */}
              <div
                ref={materialScrollRef}
                onScroll={() => checkScrollButtons(materialScrollRef, setCanScrollMaterialLeft, setCanScrollMaterialRight)}
                className="flex overflow-x-auto scrollbar-hide gap-3 pb-2 -mx-6 px-6 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {materialPartners.map((partner, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer flex-shrink-0 w-[160px]"
                    onClick={() => handlePartnerClick(partner)}
                  >
                    <div className="bg-gray-50 rounded-xl p-6 h-28 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:shadow-sm">
                      <div className="relative w-full max-w-[80px] h-6 flex items-center justify-center">
                        <Image
                          src={getImageSrc(partner)}
                          alt={partner.name}
                          fill
                          loading="lazy"
                          sizes="80px"
                          className="object-contain max-h-6 transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                          onError={() => handleImageError(partner.name, partner.fallback)}
                          style={{ maxHeight: '24px' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {materialPartners.map((partner, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group cursor-pointer"
                  onClick={() => handlePartnerClick(partner)}
                >
                  <div className="bg-gray-50 rounded-xl p-8 h-32 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 hover:shadow-sm">
                    <div className="relative w-full max-w-[100px] h-8 flex items-center justify-center">
                      <Image
                        src={getImageSrc(partner)}
                        alt={partner.name}
                        fill
                        loading="lazy"
                        sizes="100px"
                        className="object-contain max-h-8 transition-all duration-500 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                        onError={() => handleImageError(partner.name, partner.fallback)}
                        style={{ maxHeight: '32px' }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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