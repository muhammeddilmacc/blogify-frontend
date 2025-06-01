'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { CategoryType } from '@/types/blog';
import { useAuth } from '@/contexts/AuthContext';

const categories: CategoryType[] = ['writing', 'poem', 'article'];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">Blogify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="flex flex-1 items-center justify-center">
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link
                href="/"
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Ana Sayfa
              </Link>
              {/* İçerikler Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 group-hover:text-gray-900">
                  İçerikler
                  <svg
                    className="ml-2 -mr-1 h-5 w-5 inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/?category=${category}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category === 'writing' && 'Yazı'}
                        {category === 'poem' && 'Şiir'}
                        {category === 'article' && 'Makale'}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href="/hakkimizda"
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/hakkimizda'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Hakkımda
              </Link>
              <Link
                href="/iletisim"
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === '/iletisim'
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                İletişim
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden sm:flex sm:items-center space-x-2 ml-auto">
            {user ? (
              <button
                onClick={() => logout()}
                className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Çıkış Yap
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`px-3 py-2 text-sm font-medium ${
                    pathname === '/auth/login'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className={`px-3 py-2 text-sm font-medium ${
                    pathname === '/auth/register'
                      ? 'text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Ana menüyü aç</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Ana Sayfa
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                href={`/?category=${category}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {category === 'writing' && 'Yazı'}
                {category === 'poem' && 'Şiir'}
                {category === 'article' && 'Makale'}
              </Link>
            ))}
            <Link
              href="/hakkimizda"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              İletişim
            </Link>
            {user ? (
              <button
                onClick={() => logout()}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                Çıkış Yap
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  Kayıt Ol
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}