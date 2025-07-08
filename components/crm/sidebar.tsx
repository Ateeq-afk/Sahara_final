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
} from 'lucide-react';
import Logo from '@/components/logo';

const navigation = [
  { name: 'Dashboard', href: '/crm', icon: LayoutDashboard },
  { name: 'Leads', href: '/crm/leads', icon: Users },
  { name: 'Blog Posts', href: '/crm/blog', icon: FileText },
  { name: 'Media Library', href: '/crm/media', icon: Image },
  { name: 'Messages', href: '/crm/messages', icon: MessageSquare },
  { name: 'Calendar', href: '/crm/calendar', icon: Calendar },
  { name: 'Email Campaigns', href: '/crm/campaigns', icon: Mail },
  { name: 'Analytics', href: '/crm/analytics', icon: BarChart3 },
  { name: 'Employees', href: '/crm/employees', icon: UserCheck },
  { name: 'Settings', href: '/crm/settings', icon: Settings },
];

export default function CRMSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <Link href="/crm">
          <Logo className="h-8 w-auto" />
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/crm' && pathname.startsWith(item.href));
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
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

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>Sahara CRM v1.0</p>
          <p className="mt-1">© 2024 Sahara Developers</p>
        </div>
      </div>
    </div>
  );
}