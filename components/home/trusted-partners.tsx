import Image from 'next/image'

const partners = [
  { name: "Modern Materials", logo: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg" },
  { name: "Premium Fittings", logo: "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg" },
  { name: "Quality Paints", logo: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg" },
  { name: "Luxury Interiors", logo: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg" },
  { name: "Smart Home", logo: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg" },
  { name: "Design Studio", logo: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg" }
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
              className="bg-white rounded-lg overflow-hidden flex items-center justify-center h-32 sm:h-40 lg:h-48 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg text-center px-2">
                    {partner.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustedPartners