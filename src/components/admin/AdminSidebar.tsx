'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';
import { HiMenu, HiX } from 'react-icons/hi';
import { AuthService } from '@/services/AuthService';

const menuItems = [
  { href: '/admin', label: 'Genel Bakış', pattern: /^\/admin$/ },
  { href: '/admin/posts', label: 'Yazılar', pattern: /^\/admin\/posts/ },
  { href: '/admin/about', label: 'Hakkımızda', pattern: /^\/admin\/about/ },
  { href: '/admin/contact', label: 'İletişim', pattern: /^\/admin\/contact/ },
  { href: '/admin/settings', label: 'Ayarlar', pattern: /^\/admin\/settings/ },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();
  const authService = new AuthService();

  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Butonu devre dışı bırak
      const button = e.currentTarget as HTMLButtonElement;
      button.disabled = true;
      button.textContent = 'Çıkış yapılıyor...';

      await authService.logout();
    } catch (error) {
      console.error('Logout hatası:', error);
      alert('Çıkış yapılırken bir hata oluştu!');
    }
  };

  return (
    <>
      {/* Hamburger Menü - sağa taşındı */}
      <button
        onClick={toggle}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggle();
                  }
                }}
                className={`block px-4 py-2 rounded-lg ${item.pattern.test(pathname)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg text-center transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 