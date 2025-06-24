import Image from 'next/image'

const partners = [
  { name: "Modern Materials", logo: "https://placehold.co/200x80/f3f4f6/64748b?text=Modern+Materials" },
  { name: "Premium Fittings", logo: "https://placehold.co/200x80/f3f4f6/64748b?text=Premium+Fittings" },
  { name: "Quality Paints", logo: "https://placehold.co/200x80/f3f4f6/64748b?text=Quality+Paints" },
  { name: "Luxury Interiors", logo: "https://placehold.co/200x80/f3f4f6/64748b?text=Luxury+Interiors" },
  { name: "Smart Home", logo: "https://placehold.co/200x80/f3f4f6/64748b?text=Smart+Home" },
  { name: "Design Studio", logo: "https://placehold.co/200x80/f3f4f6/64748b?text=Design+Studio" }
]

const TrustedPartners = () => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Our Trusted Partners</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            We collaborate with the best in the industry to deliver premium quality
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-3 sm:p-4 flex items-center justify-center h-16 sm:h-20 lg:h-24 hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedPartners