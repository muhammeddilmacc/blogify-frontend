'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </AuthProvider>
  );
}
