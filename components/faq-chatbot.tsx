'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, HelpCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { generateId } from '@/lib/generate-id'

const faqs = [
  {
    category: 'Pricing',
    questions: [
      {
        q: 'What is the cost per sq ft for construction?',
        a: 'Our construction costs range from ₹1,650-₹6,000 per sq ft depending on the package:\n• Essential: ₹1,650-₹1,950/sq ft\n• Professional: ₹2,100-₹2,500/sq ft\n• Premium: ₹2,800-₹3,500/sq ft\n• Luxury: ₹4,000-₹6,000/sq ft'
      },
      {
        q: 'Are there any hidden costs?',
        a: 'No hidden costs! Our quotes include all materials, labor, and project management. Additional costs only apply for scope changes or premium upgrades you specifically request.'
      },
      {
        q: 'Do you offer EMI options?',
        a: 'Yes! We offer flexible EMI options through our banking partners with tenures from 6-60 months at competitive interest rates.'
      }
    ]
  },
  {
    category: 'Timeline',
    questions: [
      {
        q: 'How long does construction take?',
        a: 'Timeline depends on project size:\n• 1-2 BHK: 4-6 months\n• 3-4 BHK: 6-9 months\n• Villas: 9-12 months\n• Commercial: 6-18 months\nWe provide detailed timelines with milestones.'
      },
      {
        q: 'What about monsoon delays?',
        a: 'We factor in monsoon seasons in our planning. Interior work continues during rains, and we use weather-resistant techniques to minimize delays.'
      }
    ]
  },
  {
    category: 'Services',
    questions: [
      {
        q: 'Do you handle plan approvals?',
        a: 'Yes! We handle all approvals including:\n• BBMP plan sanctions\n• Building permits\n• Completion certificates\n• Khata transfer\nOur legal team ensures 100% compliance.'
      },
      {
        q: 'Can you work with my architect?',
        a: 'Absolutely! We collaborate with external architects and can also recommend from our panel of award-winning architects if needed.'
      },
      {
        q: 'Do you provide interior design?',
        a: 'Yes! We offer complete interior design services including:\n• 3D visualization\n• Furniture selection\n• Custom carpentry\n• Complete execution'
      }
    ]
  },
  {
    category: 'Quality',
    questions: [
      {
        q: 'What materials do you use?',
        a: 'We use only ISI-marked, branded materials:\n• Cement: ACC/Ultratech\n• Steel: TATA/JSW\n• Paint: Asian/Dulux\n• Sanitaryware: Kohler/Jaguar\n• Electricals: Havells/Schneider'
      },
      {
        q: 'Do you provide warranty?',
        a: 'Yes! We provide:\n• 10-year structural warranty\n• 2-year warranty on interiors\n• 1-year warranty on fixtures\n• Lifetime support for minor issues'
      }
    ]
  }
]

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      setTimeout(() => {
        addBotMessage("Hi! I'm your FAQ assistant 🤖 I can instantly answer questions about pricing, timelines, services, and quality. What would you like to know?")
        
        // Show category buttons
        setTimeout(() => {
          addBotMessage("Choose a category or type your question:", 'categories')
        }, 1000)
      }, 500)
    }
  }, [isOpen, messages.length])

  // Listen for external trigger events
  useEffect(() => {
    const handleOpenChatbot = () => setIsOpen(true)
    window.addEventListener('openChatbot', handleOpenChatbot)
    return () => window.removeEventListener('openChatbot', handleOpenChatbot)
  }, [])

  const addBotMessage = (text: string, type?: string) => {
    const newMessage: Message = {
      id: generateId('faq'),
      text,
      isBot: true,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: generateId('faq'),
      text,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    
    // Process the message
    processUserInput(text)
  }

  const processUserInput = (input: string) => {
    setIsTyping(true)
    
    const lowerInput = input.toLowerCase()
    let foundAnswer = false

    // Search through all FAQs
    for (const category of faqs) {
      for (const faq of category.questions) {
        const keywords = faq.q.toLowerCase().split(' ')
        const matches = keywords.filter(keyword => 
          keyword.length > 3 && lowerInput.includes(keyword)
        )
        
        if (matches.length >= 2 || lowerInput.includes(faq.q.toLowerCase().substring(0, 20))) {
          setTimeout(() => {
            addBotMessage(faq.a)
            setIsTyping(false)
            
            // Suggest related questions
            setTimeout(() => {
              addBotMessage("Would you like to know more about pricing, timelines, or services?")
            }, 1000)
          }, 1500)
          foundAnswer = true
          break
        }
      }
      if (foundAnswer) break
    }

    if (!foundAnswer) {
      setTimeout(() => {
        addBotMessage("I couldn't find a specific answer to that question. Would you like to speak with our expert? Call +91 9591-837216 or I can help you with these topics:")
        setIsTyping(false)
        
        setTimeout(() => {
          addBotMessage("Choose a category:", 'categories')
        }, 500)
      }, 1500)
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    addUserMessage(`Show me ${category} questions`)
    
    setIsTyping(true)
    setTimeout(() => {
      const categoryFaqs = faqs.find(c => c.category === category)
      if (categoryFaqs) {
        const questionsList = categoryFaqs.questions
          .map((q, i) => `${i + 1}. ${q.q}`)
          .join('\n')
        
        addBotMessage(`Here are common ${category} questions:\n\n${questionsList}\n\nClick any question number or ask your own!`)
      }
      setIsTyping(false)
    }, 1000)
  }

  const handleQuestionClick = (question: string, answer: string) => {
    addUserMessage(question)
    
    setIsTyping(true)
    setTimeout(() => {
      addBotMessage(answer)
      setIsTyping(false)
      
      setTimeout(() => {
        addBotMessage("Is there anything else you'd like to know?")
      }, 1000)
    }, 1000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      addUserMessage(inputValue)
      setInputValue('')
    }
  }

  return (
    <>
      {/* FAQ Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 3, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-2 px-6 py-3">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Quick FAQ</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        </div>
        
        {/* Pulse effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse opacity-30" />
      </motion.button>

      {/* FAQ Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed bottom-24 left-6 w-96 h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200 z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">FAQ Assistant</h3>
                  <p className="text-xs text-white/80">Instant answers 24/7</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Category buttons */}
              {messages.some(m => m.text.includes('Choose a category')) && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {faqs.map((category) => (
                    <motion.button
                      key={category.category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCategorySelect(category.category)}
                      className="bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition-colors"
                    >
                      {category.category}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Show specific FAQ questions */}
              {selectedCategory && (
                <div className="space-y-2 mt-4">
                  {faqs
                    .find(c => c.category === selectedCategory)
                    ?.questions.map((faq, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => handleQuestionClick(faq.q, faq.a)}
                        className="w-full text-left bg-blue-50 hover:bg-blue-100 rounded-xl p-3 transition-colors"
                      >
                        <p className="text-sm font-medium text-blue-900">{index + 1}. {faq.q}</p>
                      </motion.button>
                    ))}
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 rounded-full"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}