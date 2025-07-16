'use client';

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import CRMSidebar from '@/components/crm/sidebar';
import CRMHeader from '@/components/crm/header';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!session) {
    redirect('/login?callbackUrl=/crm')
  }
  
  if (session.user.role !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <CRMSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <CRMHeader 
          user={session.user} 
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 py-4 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}