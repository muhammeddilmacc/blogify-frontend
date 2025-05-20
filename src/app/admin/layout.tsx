'use client';

import { Inter } from 'next/font/google';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';
import { NotificationProvider } from '@/context/NotificationContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return (
      <div className={`${inter.className} min-h-screen bg-gray-100 w-full`} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Toaster position="top-right" />
      <NotificationProvider>
        <div className={`${inter.className} min-h-screen bg-gray-100`} suppressHydrationWarning>
          <AdminSidebar />
          <main className="lg:ml-64 transition-all duration-300">
            <div className="lg:hidden h-14"></div>
            {children}
          </main>
        </div>
      </NotificationProvider>
    </SidebarProvider>
  );
} 