"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, Clock, User, Send, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { generateId } from '@/lib/generate-id'
import { formatTime } from '@/lib/format-time'

interface WhatsAppMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [step, setStep] = useState<'welcome' | 'details' | 'chat'>('welcome')
  const [isTyping, setIsTyping] = useState(false)
  const messageInputRef = useRef<HTMLInputElement>(null)

  // WhatsApp business number (replace with actual number)
  const whatsappNumber = "+919591837216"
  
  // Predefined quick responses
  const quickResponses = [
    "I need a construction quote",
    "Interior design consultation",
    "Renovation services",
    "View packages & pricing",
    "Schedule site visit"
  ]

  // Quick action buttons
  const quickActions = [
    {
      icon: "📋",
      label: "Get Instant Quote",
      action: "quote",
      color: "bg-blue-500"
    },
    {
      icon: "📅",
      label: "Book Site Visit",
      action: "visit",
      color: "bg-green-500"
    },
    {
      icon: "💰",
      label: "Check Packages",
      action: "packages",
      color: "bg-purple-500"
    },
    {
      icon: "🏠",
      label: "View Portfolio",
      action: "portfolio",
      color: "bg-orange-500"
    }
  ]

  // Auto-responses based on keywords
  const autoResponses = {
    "quote": "I'd be happy to help you with a quote! Let me connect you with our expert team who can provide detailed pricing based on your requirements.",
    "interior": "Our interior design team creates stunning spaces! We offer complete design solutions from concept to execution.",
    "renovation": "We specialize in home renovations that transform your space while preserving what you love about it.",
    "packages": "We have three main packages: Essential (₹1,599/sq.ft), Premium (₹2,299/sq.ft), and Luxury (₹3,499/sq.ft). Each includes different features and materials.",
    "visit": "We'd love to visit your site! Our team can schedule a free consultation at your convenience."
  }

  const teamMembers = [
    {
      name: "Neha Sharma",
      role: "Project Manager",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
      status: "online",
      phone: "+919591837216"
    },
    {
      name: "Farhan Shoaib",
      role: "Construction Lead",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      status: "online",
      phone: "+918095839587"
    },
    {
      name: "Priya Sharma", 
      role: "Interior Designer",
      avatar: "https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg",
      status: "online",
      phone: "+919591837216"
    }
  ]

  useEffect(() => {
    if (step === 'chat' && messages.length === 0) {
      // Initial welcome message from Neha
      setTimeout(() => {
        addBotMessage("Hi! I'm Neha Sharma, your Project Manager at Sahara Developers. I'm here to help you with your construction and interior design needs. How can I assist you today?")
      }, 1000)
    }
  }, [step, messages.length])

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: generateId('msg'),
        text,
        isUser: false,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 1500)
  }

  const addUserMessage = (text: string) => {
    const newMessage: WhatsAppMessage = {
      id: generateId('msg'),
      text,
      isUser: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    
    // Auto-respond based on keywords
    const lowerText = text.toLowerCase()
    for (const [keyword, response] of Object.entries(autoResponses)) {
      if (lowerText.includes(keyword)) {
        setTimeout(() => addBotMessage(response), 2000)
        return
      }
    }
    
    // Default response from Neha
    setTimeout(() => {
      addBotMessage("Thank you for your message! I'll personally ensure our team gets back to you shortly. For immediate assistance, you can also call me directly at +91 9591 837216.")
    }, 2000)
  }

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      addUserMessage(currentMessage)
      setCurrentMessage('')
    }
  }

  const handleQuickResponse = (response: string) => {
    addUserMessage(response)
  }

  const handleStartChat = () => {
    if (userName && userPhone) {
      setStep('chat')
      setShowChat(true)
    }
  }

  const openWhatsApp = (message?: string, memberPhone?: string) => {
    const phoneNumber = memberPhone || whatsappNumber
    const defaultMessage = `Hi! I'm interested in your construction services. My name is ${userName || 'Customer'}.`
    const encodedMessage = encodeURIComponent(message || defaultMessage)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  // formatTime is now imported from lib/format-time.ts

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-7 w-7 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-7 w-7 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Notification Badge */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-white text-xs font-bold">1</span>
          </motion.div>
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-20 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
            >
              Chat with Neha - Project Manager!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-l-8 border-l-gray-900 border-y-4 border-y-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-40"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                      alt="Neha Sharma"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-300 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold">Neha Sharma</h3>
                    <div className="flex items-center space-x-1 text-sm opacity-90">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span>Project Manager • Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="h-96 flex flex-col">
              {step === 'welcome' && (
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      How can we help you?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Choose a quick action or chat with our team
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          if (action.action === 'portfolio') {
                            window.location.href = '/gallery'
                          } else {
                            setStep('details')
                            setTimeout(() => {
                              if (action.action === 'quote') {
                                addUserMessage("I need a construction quote")
                              } else if (action.action === 'visit') {
                                addUserMessage("I'd like to schedule a site visit")
                              } else if (action.action === 'packages') {
                                addUserMessage("Show me your packages and pricing")
                              }
                            }, 100)
                          }
                        }}
                        className={`${action.color} text-white p-3 rounded-xl hover:opacity-90 transition-all flex flex-col items-center justify-center space-y-1`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl">{action.icon}</span>
                        <span className="text-xs font-medium">{action.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">or chat with team</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-3">
                    {teamMembers.map((member, index) => (
                      <motion.button
                        key={index}
                        onClick={() => openWhatsApp(`Hi ${member.name}! I'd like to speak with you about construction services.`, member.phone)}
                        className="w-full flex items-center space-x-3 p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="relative">
                          <Image
                            src={member.avatar}
                            alt={member.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-900 text-sm">{member.name}</div>
                          <div className="text-xs text-gray-600">{member.role}</div>
                        </div>
                        <MessageCircle className="h-4 w-4 text-green-600" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'details' && (
                <div className="flex-1 p-6">
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <Image
                        src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                        alt="Neha Sharma"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Chat with Neha
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Project Manager • Sahara Developers
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Help me serve you better with a quick introduction
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name
                      </label>
                      <Input
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="rounded-xl"
                      />
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <Button
                        onClick={() => setStep('welcome')}
                        variant="outline"
                        className="flex-1 rounded-xl"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleStartChat}
                        disabled={!userName || !userPhone}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {step === 'chat' && (
                <>
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-end space-x-2 max-w-xs">
                          {!message.isUser && (
                            <Image
                              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                              alt="Neha"
                              width={24}
                              height={24}
                              className="rounded-full mb-1"
                            />
                          )}
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              message.isUser
                                ? 'bg-green-500 text-white rounded-br-md'
                                : 'bg-gray-100 text-gray-900 rounded-bl-md'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.isUser ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-end space-x-2">
                          <Image
                            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                            alt="Neha"
                            width={24}
                            height={24}
                            className="rounded-full mb-1"
                          />
                          <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-bl-md">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Responses */}
                  {messages.length <= 1 && (
                    <div className="px-4 pb-2">
                      <div className="flex flex-wrap gap-2">
                        {quickResponses.slice(0, 3).map((response, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickResponse(response)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                          >
                            {response}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <Input
                        ref={messageInputRef}
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-full"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        aria-label="Type your message"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim()}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 p-0"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-3 flex justify-center">
                      <Button
                        onClick={() => openWhatsApp(`Hi Neha! I'm ${userName}. ${messages.map(m => m.isUser ? m.text : '').filter(Boolean).join('. ')}`)}
                        className="text-xs bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-1"
                      >
                        Continue on WhatsApp with Neha
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsAppWidget