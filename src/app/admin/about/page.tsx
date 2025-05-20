'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { aboutService } from '@/services/AboutService';
import { About } from '../../../features/blogs/types/blog.types';
import Image from 'next/image';
import { useNotification } from '@/context/NotificationContext';

export default function AboutPage() {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState<About | null>(null);
  const [preview, setPreview] = useState<string>('');
  const { showNotification } = useNotification();

  const loadAboutData = useCallback(async () => {
    try {
      const data = await aboutService.getAbout();
      setAbout(data);
    } catch (error) {
      console.error('Veriler yüklenirken hata oluştu:', error);
      showNotification('Veriler yüklenirken bir hata oluştu', 'error');
    }
  }, [showNotification]);

  useEffect(() => {
    loadAboutData();
  }, [loadAboutData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await aboutService.updateAbout(formData);
      setAbout(response);
      setPreview(''); // Önizlemeyi temizle
      showNotification('Bilgiler başarıyla güncellendi!', 'success');
    } catch (error) {
      console.error('Güncelleme sırasında hata oluştu:', error);
      showNotification('Güncelleme sırasında bir hata oluştu!', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 ">Hakkımda Sayfası Düzenleme</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row items-start p-10 gap-16">
              {/* Sol Taraf - Profil Resmi */}
              <div className="w-full md:w-2/5 shrink-0 space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {(preview || about?.imageUrl) ? (
                    <Image
                      src={preview || about?.imageUrl || ''}
                      alt="Profil"
                      fill
                      className="object-cover"
                      unoptimized={!!preview} // Önizleme için optimizasyonu kapat
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">Resim yok</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block w-full">
                    <span className="sr-only">Profil fotoğrafını değiştir</span>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                </div>
              </div>

              {/* Sağ Taraf - İçerik */}
              <div className="w-full md:w-3/5 space-y-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={about?.name}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hakkımda Metni
                  </label>
                  <textarea
                    name="description"
                    defaultValue={about?.description}
                    rows={12}
                    className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Kendinizi tanıtan bir metin yazın..."
                    required
                  />
                </div>

                {about?.imageUrl && !preview && (
                  <input
                    type="hidden"
                    name="imageUrl"
                    value={about.imageUrl}
                  />
                )}

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  >
                    {loading ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
} 