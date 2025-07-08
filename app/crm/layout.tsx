import { requireAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import CRMSidebar from '@/components/crm/sidebar';
import CRMHeader from '@/components/crm/header';
import AuthSessionProvider from '@/components/providers/session-provider';

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth().catch(() => null);

  if (!user) {
    redirect('/crm/login');
  }

  return (
    <AuthSessionProvider>
      <div className="flex h-screen bg-gray-50">
        <CRMSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <CRMHeader user={user} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthSessionProvider>
  );
}