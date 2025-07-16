'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  Calendar,
  Mail,
  Image,
  UserCheck,
  Gift,
  DollarSign,
  FolderKanban,
  X,
} from 'lucide-react';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/crm', icon: LayoutDashboard },
  { name: 'Projects', href: '/crm/projects', icon: FolderKanban },
  { name: 'Leads', href: '/crm/leads', icon: Users },
  { name: 'Quotes', href: '/crm/quotes', icon: DollarSign },
  { name: 'Messages', href: '/crm/messages', icon: MessageSquare },
  { name: 'Blog Posts', href: '/crm/blog', icon: FileText },
  { name: 'Media Library', href: '/crm/media', icon: Image },
  { name: 'Calendar', href: '/crm/calendar', icon: Calendar },
  { name: 'Campaigns', href: '/crm/campaigns', icon: Mail },
  { name: 'Referrals', href: '/crm/referrals', icon: Gift },
  { name: 'Analytics', href: '/crm/analytics', icon: BarChart3 },
  { name: 'Employees', href: '/crm/employees', icon: UserCheck },
  { name: 'Settings', href: '/crm/settings', icon: Settings },
];

interface CRMSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/crm" onClick={handleLinkClick}>
          <Logo className="h-8 w-auto" />
        </Link>
      </header>
      
      <nav className="flex-1 overflow-y-auto" aria-label="Main navigation">
        <ul className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/crm' && pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Sahara CRM v1.0</p>
          <p className="mt-1">© 2024 Sahara Developers</p>
        </div>
      </footer>
    </div>
  );
}

export default function CRMSidebar({ isOpen, onClose }: CRMSidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop sidebar - always visible
  if (!isMobile) {
    return (
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200" aria-label="CRM Navigation">
        <SidebarContent />
      </aside>
    );
  }

  // Mobile sidebar - sheet/drawer
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-64">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Logo className="h-8 w-auto" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarContent onClose={onClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}