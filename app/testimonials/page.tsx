import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Quote, User, MapPin, Calendar, Video, Play } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Client Testimonials | Sahara Developers',
  description: 'Read what our clients say about their experience with Sahara Developers construction and interior design services.',
}

const testimonials = [
  {
    id: 1,
    name: 'Rajesh & Priya Sharma',
    project: 'Modern Villa Construction',
    location: 'Whitefield, Bangalore',
    rating: 5,
    date: '2024-01-15',
    image: '/api/placeholder/100/100',
    projectImage: '/api/placeholder/400/300',
    testimonial: 'Sahara Developers exceeded our expectations in every way. From the initial design phase to the final handover, their team was professional, transparent, and delivered exactly what they promised. Our dream villa is now a reality, and we couldn\'t be happier with the quality of work.',
    highlights: ['On-time delivery', 'Quality materials', 'Professional team', 'Transparent pricing'],
    featured: true,
    hasVideo: true
  },
  {
    id: 2,
    name: 'Ankit Mehta',
    project: 'Apartment Interior Design',
    location: 'Koramangala, Bangalore',
    rating: 5,
    date: '2023-12-10',
    image: '/api/placeholder/100/100',
    projectImage: '/api/placeholder/400/300',
    testimonial: 'The interior design team at Sahara Developers transformed our apartment into a modern, functional space that perfectly reflects our style. Their attention to detail and creative solutions for space optimization were impressive.',
    highlights: ['Creative design', 'Space optimization', 'Quality finishes', 'Great communication'],
    featured: false,
    hasVideo: false
  },
  {
    id: 3,
    name: 'Deepa & Suresh Kumar',
    project: 'Heritage Home Renovation',
    location: 'Basavanagudi, Bangalore',
    rating: 5,
    date: '2023-11-20',
    image: '/api/placeholder/100/100',
    projectImage: '/api/placeholder/400/300',
    testimonial: 'Renovating our heritage home was a complex project, but Sahara Developers handled it with expertise and care. They preserved the original character while adding modern conveniences. The result is beyond our expectations.',
    highlights: ['Heritage preservation', 'Modern upgrades', 'Expert craftsmanship', 'Respectful approach'],
    featured: true,
    hasVideo: false
  },
  {
    id: 4,
    name: 'Corporate Client - Tech Solutions Ltd.',
    project: 'Office Space Design',
    location: 'Electronic City, Bangalore',
    rating: 5,
    date: '2023-10-05',
    image: '/api/placeholder/100/100',
    projectImage: '/api/placeholder/400/300',
    testimonial: 'Sahara Developers designed our new office space with perfect balance of functionality and aesthetics. The open collaborative areas and ergonomic workstations have significantly improved our team\'s productivity and satisfaction.',
    highlights: ['Functional design', 'Employee satisfaction', 'Timely completion', 'Budget adherence'],
    featured: false,
    hasVideo: true
  },
  {
    id: 5,
    name: 'Kavitha Reddy',
    project: 'Duplex Penthouse',
    location: 'UB City, Bangalore',
    rating: 5,
    date: '2023-09-15',
    image: '/api/placeholder/100/100',
    projectImage: '/api/placeholder/400/300',
    testimonial: 'The luxury penthouse designed by Sahara Developers is absolutely stunning. Every detail has been carefully thought out, from the panoramic city views to the premium finishes. It\'s truly a masterpiece.',
    highlights: ['Luxury finishes', 'Stunning views', 'Premium materials', 'Exceptional service'],
    featured: true,
    hasVideo: true
  },
  {
    id: 6,
    name: 'Environmentalist - Dr. Greens',
    project: 'Sustainable Farmhouse',
    location: 'Kanakapura Road, Bangalore',
    rating: 5,
    date: '2023-08-30',
    image: '/api/placeholder/100/100',
    projectImage: '/api/placeholder/400/300',
    testimonial: 'As an environmental advocate, I was impressed by Sahara Developers\' commitment to sustainable construction. They incorporated solar panels, rainwater harvesting, and eco-friendly materials without compromising on design or comfort.',
    highlights: ['Sustainable design', 'Eco-friendly materials', 'Energy efficient', 'Environmental consciousness'],
    featured: false,
    hasVideo: false
  }
]

const stats = {
  totalClients: 500,
  averageRating: 4.8,
  completedProjects: 520,
  yearsExperience: 20
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className={`h-5 w-5 ${
        index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
      }`}
    />
  ))
}

export default function TestimonialsPage() {
  const featuredTestimonials = testimonials.filter(t => t.featured)
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Quote className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Client Testimonials</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what our clients say about their experience with Sahara Developers. 
              Real stories from real people who trusted us with their dream projects.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalClients}+</div>
                <div className="text-sm font-medium text-gray-600">Happy Clients</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2 flex items-center justify-center gap-1">
                  {stats.averageRating} <Star className="h-6 w-6 fill-current" />
                </div>
                <div className="text-sm font-medium text-gray-600">Average Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.completedProjects}+</div>
                <div className="text-sm font-medium text-gray-600">Projects Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.yearsExperience}+</div>
                <div className="text-sm font-medium text-gray-600">Years Experience</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Testimonials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
            <div className="space-y-8">
              {featuredTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <Image
                        src={testimonial.projectImage}
                        alt={testimonial.project}
                        fill
                        className="object-cover"
                      />
                      {testimonial.hasVideo && (
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <Button size="lg" className="bg-white bg-opacity-90 text-gray-900 hover:bg-white">
                            <Play className="h-6 w-6 mr-2" />
                            Watch Video Testimonial
                          </Button>
                        </div>
                      )}
                      <Badge className="absolute top-4 left-4" variant="secondary">
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6 lg:p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600">{testimonial.project}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-500">{testimonial.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        {renderStars(testimonial.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(testimonial.date).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <blockquote className="text-gray-700 mb-6 italic">
                        "{testimonial.testimonial}"
                      </blockquote>
                      
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Project Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {testimonial.highlights.map((highlight, index) => (
                            <Badge key={index} variant="secondary">{highlight}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      {testimonial.hasVideo && (
                        <Button className="w-full">
                          <Video className="h-4 w-4 mr-2" />
                          Watch Full Video
                        </Button>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Client Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h3>
                        <p className="text-xs text-gray-600">{testimonial.project}</p>
                      </div>
                      {testimonial.hasVideo && (
                        <Video className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <blockquote className="text-gray-700 text-sm mb-4 line-clamp-4">
                      "{testimonial.testimonial}"
                    </blockquote>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <MapPin className="h-3 w-3" />
                      {testimonial.location}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(testimonial.date).toLocaleDateString()}
                      </div>
                      <Button size="sm" variant="outline">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Join Our Happy Clients?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Experience the same level of quality, professionalism, and satisfaction that our clients rave about. 
                Let's start building your dream project today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button size="lg">
                    Get Your Free Quote
                  </Button>
                </Link>
                <Link href="/consultation">
                  <Button variant="outline" size="lg">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-12">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Clients Trust Us</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="p-4 bg-blue-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">Transparent Communication</h4>
                <p className="text-sm text-gray-600">Regular updates and clear communication throughout the project</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-green-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Quality Assurance</h4>
                <p className="text-sm text-gray-600">Premium materials and expert craftsmanship in every project</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-purple-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Timely Delivery</h4>
                <p className="text-sm text-gray-600">Commitment to deadlines with efficient project management</p>
              </div>
              
              <div className="text-center">
                <div className="p-4 bg-orange-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Quote className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">Post-Project Support</h4>
                <p className="text-sm text-gray-600">Ongoing support and warranty coverage for peace of mind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}