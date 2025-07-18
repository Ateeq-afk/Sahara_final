"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Briefcase, Image, MessageSquare, Menu } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Briefcase },
  { href: '/gallery', label: 'Gallery', icon: Image },
  { href: '/quote', label: 'Quote', icon: MessageSquare },
  { href: '#menu', label: 'Menu', icon: Menu }
]

export default function MobileBottomNav({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!isMobile) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          if (item.href === '#menu') {
            return (
              <button
                key={item.label}
                onClick={onMenuClick}
                className="flex flex-col items-center justify-center gap-1 relative"
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="text-[10px] text-gray-600">
                  {item.label}
                </span>
              </button>
            )
          }
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 relative"
            >
              <Icon 
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-[#D26700]' : 'text-gray-600'
                }`} 
              />
              <span 
                className={`text-[10px] transition-colors ${
                  isActive ? 'text-[#D26700] font-medium' : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#D26700] rounded-full"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}