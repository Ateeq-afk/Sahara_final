import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, CheckCircle, Users, Video, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Free Consultation | Sahara Developers',
  description: 'Book a free consultation with our construction and interior design experts.',
}

const consultationTypes = [
  {
    title: 'Project Planning Consultation',
    duration: '60 minutes',
    description: 'Discuss your project requirements, timeline, and get preliminary cost estimates.',
    includes: ['Site assessment', 'Design discussion', 'Budget planning', 'Timeline overview'],
    icon: Users,
    popular: true
  },
  {
    title: 'Design & Architecture Review',
    duration: '45 minutes',
    description: 'Review architectural plans, interior design concepts, and material selections.',
    includes: ['Plan review', 'Design suggestions', 'Material guidance', '3D visualization'],
    icon: Video,
    popular: false
  },
  {
    title: 'Site Visit & Assessment',
    duration: '90 minutes',
    description: 'On-site evaluation of your property with our technical team.',
    includes: ['Soil assessment', 'Site measurements', 'Feasibility study', 'Local regulations'],
    icon: MapPin,
    popular: false
  }
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
]

const availableDates = [
  { date: '2024-02-15', available: true },
  { date: '2024-02-16', available: true },
  { date: '2024-02-17', available: false },
  { date: '2024-02-18', available: true },
  { date: '2024-02-19', available: true },
  { date: '2024-02-20', available: true },
  { date: '2024-02-21', available: false },
  { date: '2024-02-22', available: true }
]

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Free Consultation</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book a free consultation with our construction and interior design experts. 
              Get professional advice and start planning your dream project.
            </p>
          </div>

          {/* Consultation Types */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Consultation Type</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {consultationTypes.map((type, index) => {
                const IconComponent = type.icon
                return (
                  <Card key={index} className={`relative hover:shadow-lg transition-shadow cursor-pointer ${
                    type.popular ? 'ring-2 ring-blue-500' : ''
                  }`}>
                    {type.popular && (
                      <Badge className="absolute -top-2 left-4" variant="default">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          {type.duration}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{type.title}</CardTitle>
                      <CardDescription>{type.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="font-medium text-sm text-gray-900">What's Included:</p>
                        {type.includes.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4" variant={type.popular ? 'default' : 'outline'}>
                        Select This Type
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Booking Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Tell us about yourself and your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Your last name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" placeholder="+91 98765 43210" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Project Location</Label>
                  <Input id="location" placeholder="Bangalore, Karnataka" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type *</Label>
                  <select 
                    id="projectType" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select project type</option>
                    <option value="villa">Villa Construction</option>
                    <option value="apartment">Apartment Construction</option>
                    <option value="renovation">Home Renovation</option>
                    <option value="interior">Interior Design</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget</Label>
                  <select 
                    id="budget" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select budget range</option>
                    <option value="10-25">₹10-25 Lakhs</option>
                    <option value="25-50">₹25-50 Lakhs</option>
                    <option value="50-100">₹50-100 Lakhs</option>
                    <option value="100+">₹100+ Lakhs</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="requirements">Project Requirements</Label>
                  <Textarea 
                    id="requirements" 
                    placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Date & Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date & Time</CardTitle>
                <CardDescription>Choose your preferred consultation slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Calendar */}
                <div>
                  <Label className="text-sm font-medium">Available Dates</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {availableDates.map((dateInfo, index) => {
                      const date = new Date(dateInfo.date)
                      const isAvailable = dateInfo.available
                      return (
                        <Button
                          key={index}
                          variant={isAvailable ? 'outline' : 'ghost'}
                          className={`h-auto p-2 flex flex-col ${
                            !isAvailable ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          disabled={!isAvailable}
                        >
                          <div className="text-xs font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="text-sm font-bold">
                            {date.getDate()}
                          </div>
                        </Button>
                      )
                    })}
                  </div>
                </div>
                
                {/* Time Slots */}
                <div>
                  <Label className="text-sm font-medium">Available Time Slots</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {timeSlots.map((time, index) => (
                      <Button key={index} variant="outline" size="sm">
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Consultation Mode */}
                <div>
                  <Label className="text-sm font-medium">Consultation Mode</Label>
                  <div className="space-y-2 mt-2">
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="mode" value="office" defaultChecked className="text-blue-600" />
                      <span className="text-sm">In-person at our office</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="mode" value="site" className="text-blue-600" />
                      <span className="text-sm">Site visit (additional charges may apply)</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="radio" name="mode" value="video" className="text-blue-600" />
                      <span className="text-sm">Video call consultation</span>
                    </label>
                  </div>
                </div>
                
                {/* Special Requests */}
                <div className="space-y-2">
                  <Label htmlFor="specialRequests">Special Requests</Label>
                  <Textarea 
                    id="specialRequests" 
                    placeholder="Any specific topics you'd like to discuss or special requirements..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Confirmation & Submit */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start space-x-3 mb-6">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <div className="text-sm text-gray-600">
                  By booking this consultation, you agree to our 
                  <Link href="/terms" className="text-blue-600 hover:underline">terms of service</Link> and 
                  <Link href="/privacy" className="text-blue-600 hover:underline">privacy policy</Link>.
                  You will receive a confirmation email with consultation details.
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" size="lg">
                  Book Free Consultation
                </Button>
                <Button variant="outline" className="flex-1" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us Instead
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Need Help Booking?</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="text-sm text-gray-600">+91 95918 37216</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="text-sm text-gray-600">Contact Email</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-sm text-gray-600">BTM Layout, Bangalore</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}