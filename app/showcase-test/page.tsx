'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Building2, Ruler, Bath } from 'lucide-react'

export default function ShowcaseTestPage() {
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = [
    {
      id: '1',
      title: 'Luxury Villa',
      subtitle: '4BHK in Whitefield',
      price: '₹2.5 Cr',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop'
    },
    {
      id: '2', 
      title: 'Commercial Complex',
      subtitle: 'MG Road',
      price: '₹15 Cr',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Project Showcase Test</h1>
        
        {/* Simple Project Display */}
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <img 
              src={projects[activeIndex].image} 
              alt={projects[activeIndex].title}
              className="w-full h-96 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{projects[activeIndex].title}</h2>
              <p className="text-gray-600 mb-4">{projects[activeIndex].subtitle}</p>
              <p className="text-3xl font-bold text-sahara-primary">{projects[activeIndex].price}</p>
              
              <div className="flex gap-4 mt-6">
                <Button 
                  onClick={() => setActiveIndex(0)}
                  variant={activeIndex === 0 ? 'default' : 'outline'}
                >
                  Project 1
                </Button>
                <Button 
                  onClick={() => setActiveIndex(1)}
                  variant={activeIndex === 1 ? 'default' : 'outline'}
                >
                  Project 2
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
          <Card className="p-4 text-center">
            <Home className="h-8 w-8 mx-auto mb-2 text-sahara-primary" />
            <p className="text-sm text-gray-600">Built-up Area</p>
            <p className="font-bold">3,500 sq.ft</p>
          </Card>
          <Card className="p-4 text-center">
            <Ruler className="h-8 w-8 mx-auto mb-2 text-sahara-primary" />
            <p className="text-sm text-gray-600">Plot Size</p>
            <p className="font-bold">5,000 sq.ft</p>
          </Card>
          <Card className="p-4 text-center">
            <Bath className="h-8 w-8 mx-auto mb-2 text-sahara-primary" />
            <p className="text-sm text-gray-600">Bathrooms</p>
            <p className="font-bold">5 Luxury</p>
          </Card>
          <Card className="p-4 text-center">
            <Building2 className="h-8 w-8 mx-auto mb-2 text-sahara-primary" />
            <p className="text-sm text-gray-600">Floors</p>
            <p className="font-bold">2 Floors</p>
          </Card>
        </div>
      </div>
    </div>
  )
}