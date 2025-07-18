"use client"

import { useState } from 'react'
import NavbarMinimal from '@/components/navbar-minimal'
import FooterMinimal from '@/components/footer-minimal'
import MobileBottomNav from '@/components/mobile-bottom-nav'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-screen flex-col relative">
        <NavbarMinimal 
          isMobileMenuOpen={isMobileMenuOpen} 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
        />
        <main className="flex-1 pt-16 pb-16 md:pb-0 overflow-x-hidden">{children}</main>
        <FooterMinimal />
        <MobileBottomNav onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      </div>
    </>
  )
}