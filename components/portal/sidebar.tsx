'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  CreditCard,
  MessageSquare,
  User,
  Settings
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { name: 'My Projects', href: '/portal/projects', icon: FolderKanban },
  { name: 'Documents', href: '/portal/documents', icon: FileText },
  { name: 'Payments', href: '/portal/payments', icon: CreditCard },
  { name: 'Support', href: '/portal/support', icon: MessageSquare },
  { name: 'Profile', href: '/portal/profile', icon: User },
  { name: 'Settings', href: '/portal/settings', icon: Settings },
]

export default function PortalSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 bg-white border-r min-h-screen" aria-label="Portal Navigation">
      <nav className="p-4 space-y-1" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/portal' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}