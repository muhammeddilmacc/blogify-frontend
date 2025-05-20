import React, { useState, FormEvent, useEffect } from 'react';
import { Contact, ContactFormData } from '@/types/contact';
import { contactService } from '@/services/contactService';
import { FormInput } from '@/components/ui/FormInput';
import { FormButton } from '@/components/ui/FormButton';
import { HiMail } from 'react-icons/hi';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface ContactSettingsFormProps {
  initialData: Contact | null;
  onSuccess: () => void;
}

export const ContactSettingsForm: React.FC<ContactSettingsFormProps> = ({
  initialData,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    facebook: '',
    twitter: '',
    instagram: '',
  });

  // initialData değiştiğinde form verilerini güncelle
  useEffect(() => {
    if (initialData) {
      setFormData({
        email: initialData.email || '',
        facebook: initialData.facebook || '',
        twitter: initialData.twitter || '',
        instagram: initialData.instagram || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (initialData) {
        await contactService.updateContact(formData);
      } else {
        await contactService.createContact(formData);
      }
      onSuccess();
    } catch (error) {
      console.error('İletişim bilgileri kaydedilirken hata:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* E-posta Alanı */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <HiMail className="h-5 w-5 text-blue-500" />
        </div>
        <FormInput
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="ornek@email.com"
          required
          className="pl-10 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>

      {/* Facebook */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaFacebook className="h-5 w-5 text-[#1877F2]" />
        </div>
        <FormInput
          id="facebook"
          name="facebook"
          value={formData.facebook}
          onChange={handleChange}
          placeholder="facebook kullanıcı adı"
          className="pl-10 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>

      {/* Twitter (X) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaXTwitter className="h-5 w-5 text-black" />
        </div>
        <FormInput
          id="twitter"
          name="twitter"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="X (twitter) kullanıcı adı"
          className="pl-10 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>

      {/* Instagram */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaInstagram className="h-5 w-5 text-[#E4405F]" />
        </div>
        <FormInput
          id="instagram"
          name="instagram"
          value={formData.instagram}
          onChange={handleChange}
          placeholder="instagram kullanıcı adı"
          className="pl-10 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        />
      </div>

      <div className="flex justify-end">
        <FormButton 
          type="submit" 
          isLoading={isLoading}
          className="px-6 py-2.5 text-sm shadow-sm hover:shadow-md transition-all duration-200"
        >
          {initialData ? 'Güncelle' : 'Kaydet'}
        </FormButton>
      </div>
    </form>
  );
}; 