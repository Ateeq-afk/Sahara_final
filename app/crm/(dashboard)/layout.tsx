import CRMSidebar from '@/components/crm/sidebar';
import CRMHeader from '@/components/crm/header';

export default function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Mock user for public access
  const mockUser = {
    name: 'Admin User',
    email: 'admin@sahara-developers.com',
    role: 'admin'
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CRMSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <CRMHeader user={mockUser} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}