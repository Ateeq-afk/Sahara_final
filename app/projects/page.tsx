import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Eye, Calendar, MapPin, Users, ArrowRight, Filter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Our Projects | Sahara Developers',
  description: 'Explore our portfolio of completed construction and interior design projects across Bangalore.',
}

const projects = [
  {
    id: 1,
    title: 'Modern Villa in Whitefield',
    description: 'A contemporary 4-bedroom villa featuring clean lines, large windows, and sustainable design elements.',
    category: 'Residential',
    type: 'Villa',
    location: 'Whitefield, Bangalore',
    completedDate: '2024-01-15',
    area: '3,500 sq ft',
    bedrooms: 4,
    client: 'Mr. & Mrs. Sharma',
    image: '/api/placeholder/600/400',
    featured: true,
    tags: ['Modern', 'Sustainable', 'Luxury']
  },
  {
    id: 2,
    title: 'Luxury Apartment Interior',
    description: 'Premium interior design for a 3-bedroom apartment with smart home integration and elegant finishes.',
    category: 'Interior Design',
    type: 'Apartment',
    location: 'Koramangala, Bangalore',
    completedDate: '2023-12-10',
    area: '2,200 sq ft',
    bedrooms: 3,
    client: 'Tech Executive',
    image: '/api/placeholder/600/400',
    featured: false,
    tags: ['Smart Home', 'Premium', 'Contemporary']
  },
  {
    id: 3,
    title: 'Heritage Home Renovation',
    description: 'Complete restoration of a 1950s heritage home while preserving its original character and charm.',
    category: 'Renovation',
    type: 'Heritage',
    location: 'Basavanagudi, Bangalore',
    completedDate: '2023-11-20',
    area: '2,800 sq ft',
    bedrooms: 3,
    client: 'Heritage Foundation',
    image: '/api/placeholder/600/400',
    featured: true,
    tags: ['Heritage', 'Restoration', 'Traditional']
  },
  {
    id: 4,
    title: 'Corporate Office Design',
    description: 'Modern office space design for a tech company with collaborative areas and ergonomic workspaces.',
    category: 'Commercial',
    type: 'Office',
    location: 'Electronic City, Bangalore',
    completedDate: '2023-10-05',
    area: '12,000 sq ft',
    bedrooms: null,
    client: 'Tech Solutions Ltd.',
    image: '/api/placeholder/600/400',
    featured: false,
    tags: ['Modern', 'Collaborative', 'Tech']
  },
  {
    id: 5,
    title: 'Duplex Penthouse',
    description: 'Stunning duplex penthouse with panoramic city views, private terrace, and luxury amenities.',
    category: 'Residential',
    type: 'Penthouse',
    location: 'UB City, Bangalore',
    completedDate: '2023-09-15',
    area: '4,200 sq ft',
    bedrooms: 4,
    client: 'Business Owner',
    image: '/api/placeholder/600/400',
    featured: true,
    tags: ['Luxury', 'Penthouse', 'City Views']
  },
  {
    id: 6,
    title: 'Sustainable Farmhouse',
    description: 'Eco-friendly farmhouse design with solar panels, rainwater harvesting, and natural materials.',
    category: 'Residential',
    type: 'Farmhouse',
    location: 'Kanakapura Road, Bangalore',
    completedDate: '2023-08-30',
    area: '5,000 sq ft',
    bedrooms: 5,
    client: 'Environmental Activist',
    image: '/api/placeholder/600/400',
    featured: false,
    tags: ['Sustainable', 'Eco-friendly', 'Rural']
  }
]

const categories = ['All', 'Residential', 'Commercial', 'Interior Design', 'Renovation']
const projectTypes = ['All', 'Villa', 'Apartment', 'Office', 'Heritage', 'Penthouse', 'Farmhouse']

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured)
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of completed construction and interior design projects. 
              Each project showcases our commitment to quality, innovation, and client satisfaction.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm font-medium text-gray-600">Projects Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">20+</div>
                <div className="text-sm font-medium text-gray-600">Years Experience</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
                <div className="text-sm font-medium text-gray-600">Client Satisfaction</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-sm font-medium text-gray-600">Awards Won</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Projects */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Projects</h2>
              <Link href="/showcase">
                <Button variant="outline">
                  View All <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4" variant="secondary">
                      Featured
                    </Badge>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{project.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        {new Date(project.completedDate).getFullYear()}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{project.area}</span>
                        {project.bedrooms && (
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {project.bedrooms} BHK
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Gallery
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filter Projects</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={category === 'All' ? 'default' : 'outline'}
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Project Type</p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((type) => (
                    <Button
                      key={type}
                      variant={type === 'All' ? 'default' : 'outline'}
                      size="sm"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{project.type}</Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.completedDate).getFullYear()}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <MapPin className="h-3 w-3" />
                      {project.location}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">{project.area}</div>
                      <Button size="sm" variant="outline">
                        View Project
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
                Ready to Start Your Dream Project?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who have trusted us with their construction 
                and interior design projects. Let's bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button size="lg">
                    Get Free Quote
                  </Button>
                </Link>
                <Link href="/consultation">
                  <Button variant="outline" size="lg">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}