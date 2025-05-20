'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { aboutService } from '@/services/AboutService';
import { About } from '@/types/blog';

export default function HakkimizdaPage() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await aboutService.getAbout();
        setAbout(data);
      } catch (error) {
        console.error('Veriler yüklenirken hata oluştu:', error);
        setError('Veriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-red-50 rounded-lg p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto bg-yellow-50 rounded-lg p-6 text-yellow-700">
          Henüz hakkımda bilgisi girilmemiş.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row items-start p-8 gap-12">
          {/* Sol Taraf - Profil Resmi */}
          <div className="w-full md:w-2/5 shrink-0">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
              {about.imageUrl ? (
                <Image
                  src={about.imageUrl}
                  alt={about.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">Resim yok</span>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Taraf - Hakkımda İçeriği */}
          <div className="w-full md:w-3/5">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
               {about.name}
            </h1>
            
            <div className="prose prose-lg text-gray-600 max-w-none">
              {about.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 