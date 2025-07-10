import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import CRMSidebar from '@/components/crm/sidebar';
import CRMHeader from '@/components/crm/header';

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/login?callbackUrl=/crm')
  }
  
  if (session.user.role !== 'admin') {
    redirect('/unauthorized')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <CRMSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CRMHeader user={session.user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}