"use client"

import { ArrowLeft, ArrowRight, Building2, Calendar, MapPin, Users, Award, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  clientName: string;
  projectValue: string;
  duration: string;
  image: string;
  features: string[];
  status: "Completed" | "Ongoing" | "Upcoming";
}

interface ConstructionPortfolioProps {
  title?: string;
  subtitle?: string;
  projects?: PortfolioProject[];
}

const defaultProjects: PortfolioProject[] = [
  {
    id: "luxury-villa-whitefield",
    title: "Luxury Villa Complex",
    description: "Premium residential development featuring modern architecture with sustainable design elements and smart home integration.",
    category: "Residential",
    location: "Whitefield, Bangalore",
    completionDate: "March 2024",
    clientName: "Prestige Group",
    projectValue: "₹45 Crores",
    duration: "18 months",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    features: ["Smart Home Technology", "Rainwater Harvesting", "Solar Panels", "Landscaped Gardens"],
    status: "Completed"
  },
  {
    id: "tech-park-electronic-city",
    title: "Tech Park Development",
    description: "State-of-the-art commercial complex designed for IT companies with modern amenities and green building certification.",
    category: "Commercial",
    location: "Electronic City, Bangalore",
    completionDate: "August 2024",
    clientName: "Brigade Group",
    projectValue: "₹120 Crores",
    duration: "24 months",
    image: "https://images.pexels.com/photos/1098982/pexels-photo-1098982.jpeg",
    features: ["LEED Certified", "High-Speed Elevators", "Food Courts", "Parking for 2000+ vehicles"],
    status: "Completed"
  },
  {
    id: "affordable-housing-yelahanka",
    title: "Affordable Housing Project",
    description: "Government-approved affordable housing scheme providing quality homes for middle-income families with modern amenities.",
    category: "Residential",
    location: "Yelahanka, Bangalore",
    completionDate: "December 2024",
    clientName: "Karnataka Housing Board",
    projectValue: "₹85 Crores",
    duration: "20 months",
    image: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg",
    features: ["Community Center", "Children's Play Area", "24/7 Security", "Power Backup"],
    status: "Ongoing"
  },
  {
    id: "shopping-mall-koramangala",
    title: "Premium Shopping Mall",
    description: "Multi-level retail complex with entertainment zones, food courts, and premium brand outlets in the heart of Koramangala.",
    category: "Commercial",
    location: "Koramangala, Bangalore",
    completionDate: "June 2025",
    clientName: "Phoenix Mills",
    projectValue: "₹200 Crores",
    duration: "30 months",
    image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg",
    features: ["Multiplex Cinema", "Food Court", "Brand Outlets", "Entertainment Zone"],
    status: "Ongoing"
  },
  {
    id: "hospital-complex-hebbal",
    title: "Multi-Specialty Hospital",
    description: "Advanced healthcare facility with cutting-edge medical equipment and patient-centric design for comprehensive healthcare services.",
    category: "Healthcare",
    location: "Hebbal, Bangalore",
    completionDate: "September 2025",
    clientName: "Manipal Hospitals",
    projectValue: "₹150 Crores",
    duration: "28 months",
    image: "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg",
    features: ["ICU Facilities", "Emergency Services", "Diagnostic Center", "Pharmacy"],
    status: "Upcoming"
  },
  {
    id: "luxury-apartments-indiranagar",
    title: "Luxury Apartment Complex",
    description: "High-end residential towers with premium amenities, rooftop gardens, and state-of-the-art fitness facilities.",
    category: "Residential",
    location: "Indiranagar, Bangalore",
    completionDate: "November 2024",
    clientName: "Sobha Limited",
    projectValue: "₹95 Crores",
    duration: "22 months",
    image: "https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg",
    features: ["Rooftop Garden", "Gym & Spa", "Swimming Pool", "Concierge Service"],
    status: "Completed"
  }
];

const ConstructionPortfolio = ({
  title = "Our Portfolio",
  subtitle = "Transforming Bangalore's skyline with innovative construction solutions. From luxury residences to commercial complexes, we deliver excellence in every project.",
  projects = defaultProjects,
}: ConstructionPortfolioProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollToSlide = (index: number) => {
    setCurrentSlide(index);
    setCanScrollPrev(index > 0);
    setCanScrollNext(index < projects.length - 1);
  };

  const scrollPrev = () => {
    if (currentSlide > 0) {
      scrollToSlide(currentSlide - 1);
    }
  };

  const scrollNext = () => {
    if (currentSlide < projects.length - 1) {
      scrollToSlide(currentSlide + 1);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      case "Upcoming":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div className="flex flex-col gap-4 max-w-3xl">
            <motion.div 
              className="flex items-center gap-2 text-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Building2 className="w-6 h-6" />
              <span className="text-sm font-medium uppercase tracking-wider">Construction Excellence</span>
            </motion.div>
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentSlide * 420}px)`,
            paddingLeft: 'max(2rem, calc(50vw - 600px))',
            paddingRight: 'max(2rem, calc(50vw - 600px))'
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="flex-shrink-0 w-[400px] mr-5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="group h-full">
                <div className="relative h-full min-h-[600px] max-w-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium",
                        getStatusColor(project.status)
                      )}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-600 truncate">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-600 truncate">{project.completionDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-600 truncate">{project.clientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-gray-600 truncate">{project.duration}</span>
                      </div>
                    </div>

                    {/* Project Value */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <span className="text-sm font-medium text-gray-600">Project Value</span>
                      <span className="text-lg font-bold text-primary">{project.projectValue}</span>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Key Features
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                        {project.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            +{project.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full mt-auto bg-primary hover:bg-primary-dark text-white transition-colors group-hover:shadow-lg">
                      View Project Details
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                currentSlide === index ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/40"
              )}
              onClick={() => scrollToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex justify-center gap-4 mt-8 md:hidden">
          <Button
            size="sm"
            variant="outline"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="disabled:pointer-events-auto"
          >
            <ArrowLeft className="size-4 mr-2" />
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="disabled:pointer-events-auto"
          >
            Next
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ConstructionPortfolio;