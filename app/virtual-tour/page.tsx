import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Headphones, Eye, Clock, MapPin, Home, Building, Palette } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Virtual Tours | Sahara Developers',
  description: 'Experience our completed projects through immersive virtual tours and 3D walkthroughs.',
}

const virtualTours = [
  {
    id: 1,
    title: 'Modern Villa in Whitefield',
    description: 'A contemporary 4-bedroom villa with modern amenities and luxury finishes.',
    category: 'Villa',
    duration: '8 minutes',
    views: 1250,
    location: 'Whitefield, Bangalore',
    featured: true,
    thumbnail: '/api/placeholder/400/300',
    highlights: ['Modern Kitchen', 'Swimming Pool', 'Home Theater', 'Garden']
  },
  {
    id: 2,
    title: 'Luxury Apartment Interior',
    description: 'Elegant 3-bedroom apartment with premium interior design and smart home features.',
    category: 'Apartment',
    duration: '6 minutes',
    views: 890,
    location: 'Koramangala, Bangalore',
    featured: false,
    thumbnail: '/api/placeholder/400/300',
    highlights: ['Smart Home', 'Premium Finishes', 'City View', 'Modern Amenities']
  },
  {
    id: 3,
    title: 'Traditional Home Renovation',
    description: 'Complete transformation of a traditional home with modern conveniences.',
    category: 'Renovation',
    duration: '10 minutes',
    views: 675,
    location: 'Jayanagar, Bangalore',
    featured: false,
    thumbnail: '/api/placeholder/400/300',
    highlights: ['Heritage Preservation', 'Modern Upgrades', 'Space Optimization', 'Natural Light']
  },
  {
    id: 4,
    title: 'Commercial Office Space',
    description: 'Modern office design with open spaces, meeting rooms, and collaborative areas.',
    category: 'Commercial',
    duration: '12 minutes',
    views: 445,
    location: 'Electronic City, Bangalore',
    featured: false,
    thumbnail: '/api/placeholder/400/300',
    highlights: ['Open Office', 'Meeting Rooms', 'Cafeteria', 'Modern Design']
  },
  {
    id: 5,
    title: 'Duplex Penthouse',
    description: 'Stunning duplex penthouse with panoramic city views and luxury amenities.',
    category: 'Penthouse',
    duration: '15 minutes',
    views: 1580,
    location: 'UB City, Bangalore',
    featured: true,
    thumbnail: '/api/placeholder/400/300',
    highlights: ['City Views', 'Terrace Garden', 'Luxury Finishes', 'Private Elevator']
  },
  {
    id: 6,
    title: 'Farmhouse Design',
    description: 'Rustic farmhouse with modern amenities nestled in natural surroundings.',
    category: 'Farmhouse',
    duration: '18 minutes',
    views: 920,
    location: 'Kanakapura Road, Bangalore',
    featured: false,
    thumbnail: '/api/placeholder/400/300',
    highlights: ['Natural Setting', 'Rustic Design', 'Swimming Pool', 'Outdoor Living']
  }
]

const categories = ['All', 'Villa', 'Apartment', 'Renovation', 'Commercial', 'Penthouse', 'Farmhouse']

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Villa':
    case 'Farmhouse':
      return Home
    case 'Apartment':
    case 'Penthouse':
      return Building
    case 'Commercial':
      return Building
    case 'Renovation':
      return Palette
    default:
      return Home
  }
}

export default function VirtualTourPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Headphones className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Virtual Tours</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our completed projects through immersive virtual tours and 3D walkthroughs.
              See our craftsmanship and attention to detail from the comfort of your home.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'default' : 'outline'}
                size="sm"
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Featured Tour */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Tour</h2>
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={virtualTours[0].thumbnail}
                    alt={virtualTours[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Button size="lg" className="bg-white bg-opacity-90 text-gray-900 hover:bg-white">
                      <Play className="h-6 w-6 mr-2" />
                      Start Virtual Tour
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4" variant="secondary">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline">{virtualTours[0].category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      {virtualTours[0].duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="h-4 w-4" />
                      {virtualTours[0].views} views
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{virtualTours[0].title}</h3>
                  <p className="text-gray-600 mb-4">{virtualTours[0].description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <MapPin className="h-4 w-4" />
                    {virtualTours[0].location}
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {virtualTours[0].highlights.map((highlight, index) => (
                        <Badge key={index} variant="secondary">{highlight}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Start Tour
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* All Tours Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Virtual Tours</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {virtualTours.slice(1).map((tour) => {
                const IconComponent = getCategoryIcon(tour.category)
                return (
                  <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={tour.thumbnail}
                        alt={tour.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="secondary">
                          <Play className="h-4 w-4 mr-2" />
                          Start Tour
                        </Button>
                      </div>
                      {tour.featured && (
                        <Badge className="absolute top-4 left-4" variant="secondary">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                          <Badge variant="outline" className="text-xs">{tour.category}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {tour.duration}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tour.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tour.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <MapPin className="h-3 w-3" />
                        {tour.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="h-3 w-3" />
                          {tour.views} views
                        </div>
                        <Button size="sm" variant="outline">
                          View Tour
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* CTA Section */}
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Want to See Your Dream Home in 3D?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our team can create detailed 3D visualizations and virtual tours of your project 
                before construction begins, helping you make informed decisions about design and finishes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote">
                  <Button size="lg">
                    Request 3D Visualization
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Schedule Consultation
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