'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Cookies from 'js-cookie';
import { User } from 'firebase/auth';

interface FirebaseError {
  code: string;
  message: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { authService } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user: User = await authService.login(formData.email, formData.password);
      // Session cookie'sini ayarla (24 saat geçerli)
      Cookies.set('session', user.uid, { expires: 1 });
      router.push('/admin');
    } catch (err: unknown) {
      console.error(err);
      const error = err as FirebaseError;
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('E-posta veya şifre hatalı');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin');
      } else {
        setError('Giriş yapılırken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-[480px] rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-8">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full">
                {/* Arka plan daire */}
                <div className="absolute inset-0 rounded-full bg-blue-100"></div>
                {/* İç daire */}
                <div className="absolute inset-2 rounded-full bg-blue-50 shadow-inner"></div>
                {/* Kalem ikonu */}
                <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-12 w-12"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </div>
                {/* Dekoratif çizgiler */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-200"></div>
                <div className="absolute inset-[3px] rounded-full border border-blue-100"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Başlık */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="text-sm text-gray-600">Lütfen giriş yapın</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="E-posta"
                required
                disabled={loading}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Şifre"
                required
                disabled={loading}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
} 