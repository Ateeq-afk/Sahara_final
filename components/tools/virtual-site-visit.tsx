'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { 
  Video, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Camera,
  Mic,
  Monitor,
  FileText,
  CheckCircle2,
  Info,
  AlertCircle,
  ChevronRight,
  Smartphone
} from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface VirtualVisitBooking {
  date: Date | undefined
  time: string
  name: string
  email: string
  phone: string
  projectAddress: string
  visitType: string
  specificAreas: string[]
  additionalNotes: string
  preferredPlatform: string
}

const timeSlots: TimeSlot[] = [
  { time: '09:00 AM', available: true },
  { time: '09:30 AM', available: true },
  { time: '10:00 AM', available: false },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '11:30 AM', available: true },
  { time: '02:00 PM', available: true },
  { time: '02:30 PM', available: false },
  { time: '03:00 PM', available: true },
  { time: '03:30 PM', available: true },
  { time: '04:00 PM', available: true },
  { time: '04:30 PM', available: true },
  { time: '05:00 PM', available: true },
]

const visitTypes = [
  { id: 'initial-consultation', label: 'Initial Project Consultation', duration: '30 mins', icon: Video },
  { id: 'progress-review', label: 'Construction Progress Review', duration: '45 mins', icon: Camera },
  { id: 'material-selection', label: 'Material & Finish Selection', duration: '60 mins', icon: FileText },
  { id: 'final-inspection', label: 'Final Inspection', duration: '45 mins', icon: CheckCircle2 },
  { id: 'issue-resolution', label: 'Issue Resolution', duration: '30 mins', icon: AlertCircle },
  { id: 'design-review', label: 'Design Review & Changes', duration: '60 mins', icon: FileText },
]

const areasOfFocus = [
  'Foundation & Structure',
  'Exterior Facade',
  'Living Areas',
  'Kitchen',
  'Bedrooms',
  'Bathrooms',
  'Electrical Work',
  'Plumbing',
  'Flooring',
  'Painting & Finishes',
  'Outdoor/Landscape',
  'Specific Issue Area'
]

const platforms = [
  { id: 'zoom', label: 'Zoom', icon: Video },
  { id: 'google-meet', label: 'Google Meet', icon: Monitor },
  { id: 'whatsapp', label: 'WhatsApp', icon: Smartphone },
  { id: 'teams', label: 'Teams', icon: Monitor },
]

export function VirtualSiteVisit() {
  const [booking, setBooking] = useState<VirtualVisitBooking>({
    date: undefined,
    time: '',
    name: '',
    email: '',
    phone: '',
    projectAddress: '',
    visitType: '',
    specificAreas: [],
    additionalNotes: '',
    preferredPlatform: 'zoom'
  })
  
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [activeTab, setActiveTab] = useState('schedule')
  const [selectedMonth, setSelectedMonth] = useState(new Date())

  const handleAreaToggle = (area: string) => {
    setBooking(prev => ({
      ...prev,
      specificAreas: prev.specificAreas.includes(area)
        ? prev.specificAreas.filter(a => a !== area)
        : [...prev.specificAreas, area]
    }))
  }

  const handleSubmit = () => {
    setShowConfirmation(true)
    setActiveTab('confirmation')
  }

  const isFormValid = () => {
    return booking.date && booking.time && booking.name && booking.email && 
           booking.phone && booking.projectAddress && booking.visitType
  }

  const getVisitDuration = () => {
    const visit = visitTypes.find(v => v.id === booking.visitType)
    return visit?.duration || '30 mins'
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedMonth.getFullYear()
    const month = selectedMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    const current = new Date(startDate)
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    
    return days
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 // Disable past dates and Sundays
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 py-12 md:px-12 md:py-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 mb-4"
        >
          Virtual Site Visits
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 font-light"
        >
          Schedule video consultations for remote inspections
        </motion.p>
      </div>

      <div className="px-6 md:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8"
          >
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'schedule' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Schedule Visit
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'guidelines' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-50'
              }`}
            >
              Guidelines
            </button>
            <button
              onClick={() => setActiveTab('confirmation')}
              disabled={!showConfirmation}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                activeTab === 'confirmation' 
                  ? 'bg-white shadow-sm' 
                  : 'hover:bg-gray-50 disabled:hover:bg-gray-100'
              } disabled:opacity-50`}
            >
              Confirmation
            </button>
          </motion.div>
          
          {activeTab === 'schedule' && (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column - Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Visit Type Selection */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Select Visit Type</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {visitTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.id}
                          onClick={() => setBooking({...booking, visitType: type.id})}
                          className={`p-4 rounded-xl border-2 transition-all text-left ${
                            booking.visitType === type.id 
                              ? 'border-gray-900 bg-gray-900 text-white' 
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className="flex items-start">
                            <Icon className={`w-5 h-5 mr-3 mt-0.5 ${
                              booking.visitType === type.id ? 'text-white' : 'text-gray-600'
                            }`} />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className={`text-sm mt-0.5 ${
                                booking.visitType === type.id ? 'text-gray-300' : 'text-gray-500'
                              }`}>
                                Duration: {type.duration}
                              </div>
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
                
                {/* Date & Time Selection */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Calendar */}
                    <div>
                      <div className="bg-white rounded-xl border border-gray-200 p-4">
                        <div className="flex items-center justify-between mb-4">
                          <button 
                            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1))}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                          </button>
                          <h4 className="font-medium">
                            {format(selectedMonth, 'MMMM yyyy')}
                          </h4>
                          <button 
                            onClick={() => setSelectedMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1))}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays().map((date, index) => {
                            const isDisabled = isDateDisabled(date)
                            const isSelected = booking.date && format(date, 'yyyy-MM-dd') === format(booking.date, 'yyyy-MM-dd')
                            const isCurrentMonth = date.getMonth() === selectedMonth.getMonth()
                            
                            return (
                              <button
                                key={index}
                                onClick={() => !isDisabled && setBooking({...booking, date})}
                                disabled={isDisabled}
                                className={`
                                  aspect-square rounded-lg text-sm transition-all
                                  ${isSelected ? 'bg-gray-900 text-white' : ''}
                                  ${!isSelected && !isDisabled ? 'hover:bg-gray-100' : ''}
                                  ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
                                  ${!isCurrentMonth ? 'text-gray-400' : ''}
                                  ${!isDisabled && !isSelected && isCurrentMonth ? 'text-gray-900' : ''}
                                `}
                              >
                                {date.getDate()}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Time Slots */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-3">Available Time Slots</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available || !booking.date}
                            onClick={() => setBooking({...booking, time: slot.time})}
                            className={`py-2 px-3 rounded-lg text-sm transition-all ${
                              booking.time === slot.time 
                                ? 'bg-gray-900 text-white' 
                                : slot.available && booking.date
                                  ? 'bg-white border border-gray-200 hover:border-gray-300'
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Contact Information */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Full Name</label>
                      <input
                        type="text"
                        value={booking.name}
                        onChange={(e) => setBooking({...booking, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Email</label>
                      <input
                        type="email"
                        value={booking.email}
                        onChange={(e) => setBooking({...booking, email: e.target.value})}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        value={booking.phone}
                        onChange={(e) => setBooking({...booking, phone: e.target.value})}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-600 mb-2 block">Project Address</label>
                      <input
                        type="text"
                        value={booking.projectAddress}
                        onChange={(e) => setBooking({...booking, projectAddress: e.target.value})}
                        placeholder="Site location"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Areas to Cover */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Areas to Cover</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {areasOfFocus.map((area) => (
                      <button
                        key={area}
                        onClick={() => handleAreaToggle(area)}
                        className={`py-2 px-3 rounded-lg text-sm transition-all ${
                          booking.specificAreas.includes(area)
                            ? 'bg-gray-900 text-white'
                            : 'bg-white border border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </motion.div>
                
                {/* Additional Notes */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-medium mb-4">Additional Notes</h3>
                  <textarea
                    value={booking.additionalNotes}
                    onChange={(e) => setBooking({...booking, additionalNotes: e.target.value})}
                    placeholder="Any specific concerns or areas you'd like us to focus on..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  />
                </motion.div>
              </div>
              
              {/* Right Column - Summary */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="sticky top-8"
                >
                  {/* Platform Selection */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-lg font-medium mb-4">Preferred Platform</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {platforms.map((platform) => {
                        const Icon = platform.icon
                        return (
                          <button
                            key={platform.id}
                            onClick={() => setBooking({...booking, preferredPlatform: platform.id})}
                            className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center ${
                              booking.preferredPlatform === platform.id 
                                ? 'border-gray-900 bg-gray-900 text-white' 
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                          >
                            <Icon className="w-5 h-5 mb-1" />
                            <span className="text-sm">{platform.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Booking Summary */}
                  {(booking.visitType || booking.date || booking.time) && (
                    <div className="bg-gray-900 text-white rounded-2xl p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4">Booking Summary</h3>
                      <div className="space-y-3 text-sm">
                        {booking.visitType && (
                          <div className="flex items-start">
                            <span className="text-gray-400 w-20">Type:</span>
                            <span>{visitTypes.find(v => v.id === booking.visitType)?.label}</span>
                          </div>
                        )}
                        {booking.date && (
                          <div className="flex items-start">
                            <span className="text-gray-400 w-20">Date:</span>
                            <span>{format(booking.date, 'EEEE, MMMM d, yyyy')}</span>
                          </div>
                        )}
                        {booking.time && (
                          <div className="flex items-start">
                            <span className="text-gray-400 w-20">Time:</span>
                            <span>{booking.time}</span>
                          </div>
                        )}
                        {booking.visitType && (
                          <div className="flex items-start">
                            <span className="text-gray-400 w-20">Duration:</span>
                            <span>{getVisitDuration()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-300 transition-all font-medium"
                  >
                    Schedule Virtual Visit
                  </button>
                </motion.div>
              </div>
            </div>
          )}
          
          {activeTab === 'guidelines' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <div className="bg-blue-50 rounded-2xl p-6">
                <h3 className="font-medium mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Before Your Virtual Visit
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <span>Ensure stable internet connection (minimum 10 Mbps recommended)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <span>Test your camera and microphone before the call</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <span>Have your project documents ready to share</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <span>Prepare a list of questions or concerns</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
                    <span>Ensure good lighting at the site for clear visibility</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h4 className="font-medium mb-4 flex items-center">
                    <Video className="w-5 h-5 mr-2 text-gray-600" />
                    What to Expect
                  </h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>Live video walkthrough with our project expert</p>
                    <p>Real-time discussion and clarifications</p>
                    <p>Screen sharing for plans and documents</p>
                    <p>Recording available upon request</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <h4 className="font-medium mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-gray-600" />
                    After the Visit
                  </h4>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>Detailed visit report within 24 hours</p>
                    <p>Action items and recommendations</p>
                    <p>Follow-up consultation if needed</p>
                    <p>Access to visit recording (if recorded)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h4 className="font-medium mb-4">Technical Requirements</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Internet Speed:</span>
                      <span className="font-medium">Minimum 10 Mbps</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Browser:</span>
                      <span className="font-medium">Chrome, Firefox, Safari</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Device:</span>
                      <span className="font-medium">Desktop, Laptop, or Mobile</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Camera:</span>
                      <span className="font-medium">HD webcam or phone camera</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 rounded-2xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900">Cancellation Policy</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Please cancel or reschedule at least 2 hours before the scheduled time. 
                      Late cancellations may result in rescheduling fees.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'confirmation' && showConfirmation && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-medium text-green-900">Virtual Visit Scheduled Successfully!</h3>
                    <p className="text-sm text-green-700 mt-0.5">
                      You will receive a confirmation email with meeting details shortly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
                <h4 className="font-medium mb-4">Booking Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <CalendarIcon className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-gray-600">
                        {booking.date && format(booking.date, 'EEEE, MMMM d, yyyy')} at {booking.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Video className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium">Visit Type</p>
                      <p className="text-gray-600">
                        {visitTypes.find(v => v.id === booking.visitType)?.label} ({getVisitDuration()})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Monitor className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium">Platform</p>
                      <p className="text-gray-600">
                        {platforms.find(p => p.id === booking.preferredPlatform)?.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 mr-3 mt-0.5 text-gray-400" />
                    <div>
                      <p className="font-medium">Project Location</p>
                      <p className="text-gray-600">{booking.projectAddress}</p>
                    </div>
                  </div>
                </div>
                
                {booking.specificAreas.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="font-medium mb-2 text-sm">Areas to Cover</p>
                    <div className="flex flex-wrap gap-2">
                      {booking.specificAreas.map((area) => (
                        <span key={area} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                <h4 className="font-medium mb-3 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Next Steps
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">1.</span>
                    <span>Check your email for confirmation and meeting link</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">2.</span>
                    <span>You'll receive a reminder 1 hour before the visit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">3.</span>
                    <span>Our project manager will call 5 minutes before to ensure connectivity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">4.</span>
                    <span>Keep your project documents and site access ready</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all font-medium">
                  Add to Calendar
                </button>
                <button className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all font-medium">
                  Download Confirmation
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}