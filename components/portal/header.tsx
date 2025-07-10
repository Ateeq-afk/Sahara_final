'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, User, Settings, LogOut, Home } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Logo from '@/components/logo'

interface PortalHeaderProps {
  user: {
    name?: string | null
    email: string
    image?: string | null
    role: string
  }
}

export default function PortalHeader({ user }: PortalHeaderProps) {
  const initials = user.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || user.email[0].toUpperCase()

  return (
    <header className="bg-white border-b">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/portal">
              <Logo className="h-8 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/portal" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Dashboard
              </Link>
              <Link href="/portal/projects" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                My Projects
              </Link>
              <Link href="/portal/documents" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Documents
              </Link>
              <Link href="/portal/payments" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Payments
              </Link>
              <Link href="/portal/support" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Support
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image || undefined} alt={user.name || ''} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/portal/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/portal/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Main Website</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}