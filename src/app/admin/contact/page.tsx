'use client';

import React, { useState, useEffect } from 'react';
import { Contact } from '@/types/contact';
import { contactService } from '@/services/contactService';
import { useNotification } from '@/context/NotificationContext';
import { ContactSettingsForm } from '@/components/admin/contact/ContactSettingsForm';

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState<Contact | null>(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadContactData();
  }, []);

  const loadContactData = async () => {
    try {
      setLoading(true);
      const data = await contactService.getContact();
      setContact(data);
    } catch (error) {
      console.error('İletişim bilgileri yüklenirken hata:', error);
      showNotification('İletişim bilgileri yüklenirken bir hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">İletişim Bilgileri</h1>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-sm font-medium text-blue-800 mb-2">Bilgilendirme</h2>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>  Burada girdiğiniz iletişim bilgileri sitenin footer bölümünde görüntülenecektir. 
            E-posta adresi zorunludur, diğer sosyal medya bilgileri isteğe bağlıdır.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <ContactSettingsForm 
            initialData={contact} 
            onSuccess={() => {
              loadContactData();
              showNotification('İletişim bilgileri başarıyla güncellendi', 'success');
            }}
          />
        </div>
      </div>
    </div>
  );
}