import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    title: "Construction",
    slug: "construction",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    description: "Premium residential and commercial construction with quality materials and expert craftsmanship.",
    features: [
      "Residential Construction",
      "Commercial Buildings",
      "Architectural Planning",
      "Structural Engineering",
      "Project Management"
    ]
  },
  {
    title: "Interior Decor",
    slug: "interior-decor",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    description: "Transform your space with our innovative interior design solutions and premium finishes.",
    features: [
      "Residential Interiors",
      "Commercial Spaces",
      "Space Planning",
      "Custom Furniture",
      "Decor Consultation"
    ]
  },
  {
    title: "Renovations",
    slug: "renovations",
    image: "https://images.pexels.com/photos/2098624/pexels-photo-2098624.jpeg",
    description: "Revitalize your existing spaces with our comprehensive renovation services.",
    features: [
      "Structural Renovations",
      "Kitchen Remodeling",
      "Bathroom Renovations",
      "Space Optimization",
      "Façade Upgrades"
    ]
  },
  {
    title: "Turnkey Projects",
    slug: "turnkey",
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    description: "End-to-end project management from concept to completion with a single point of contact.",
    features: [
      "Complete Project Management",
      "Design & Construction",
      "Material Procurement",
      "Quality Assurance",
      "Timely Delivery"
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive construction and interior solutions tailored to your needs. From initial concept to final handover, we deliver excellence at every step.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="relative h-72 mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  asChild
                >
                  <Link href={`/services/${service.slug}`} className="group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold mb-4">Not sure which service is right for you?</h3>
                <p className="text-gray-700">
                  Our experts can help you determine the best approach for your project. Schedule a free consultation to discuss your needs and vision.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Button 
                  size="lg" 
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  asChild
                >
                  <Link href="/quote">Request a Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}