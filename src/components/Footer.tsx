'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Contact } from '@/types/contact';
import { contactService } from '@/services/contactService';

export default function Footer() {
  const categories = ['writing', 'poem', 'article'];
  const currentYear = new Date().getFullYear();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await contactService.getContact();
        setContact(data);
      } catch (error) {
        console.error('İletişim bilgileri yüklenirken hata:', error);
      }
    };

    loadContactData();
  }, []);

  const getSocialMediaUrl = (username: string | undefined, platform: string) => {
    if (!username) return undefined;
    
    const platforms = {
      facebook: `https://facebook.com/${username}`,
      twitter: `https://twitter.com/${username}`,
      instagram: `https://instagram.com/${username}`,
    };

    return platforms[platform as keyof typeof platforms];
  };

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hakkında Bölümü */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Hakkımda
            </h3>
            <p className="text-base text-gray-500">
              Bu site, düşünceleri, duyguları ve fikirleri paylaşmak için oluşturulmuş kişisel bir sitedir.
            </p>
          </div>

          {/* Kategoriler */}
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Kategoriler</h2>
            <ul className="text-gray-600">
              {categories.map((category) => (
                <li key={category} className="mb-4">
                  <Link
                    href={`/?category=${category}`}
                    className="hover:underline"
                  >
                    {category === 'writing' && 'Yazı'}
                    {category === 'poem' && 'Şiir'}
                    {category === 'article' && 'Makale'}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              İletişim
            </h3>
            <ul className="space-y-4">
              {contact?.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
              
              {contact?.twitter && (
                <li>
                  <a
                    href={getSocialMediaUrl(contact.twitter, 'twitter')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Twitter
                  </a>
                </li>
              )}

              {contact?.instagram && (
                <li>
                  <a
                    href={getSocialMediaUrl(contact.instagram, 'instagram')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Instagram
                  </a>
                </li>
              )}

              {contact?.facebook && (
                <li>
                  <a
                    href={getSocialMediaUrl(contact.facebook, 'facebook')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {currentYear} Blogify | Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 