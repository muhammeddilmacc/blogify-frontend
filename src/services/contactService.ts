import { Contact, ContactFormData } from '@/types/contact';

class ContactService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/contact`;
  }

  async getContact(): Promise<Contact | null> {
    try {
      const response = await fetch(this.baseUrl, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('İletişim bilgileri getirilirken bir hata oluştu');
      }

      return response.json();
    } catch (error) {
      console.error('İletişim bilgileri getirme hatası:', error);
      return null;
    }
  }

  async updateContact(data: ContactFormData): Promise<Contact> {
    const response = await fetch(this.baseUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('İletişim bilgileri güncellenirken bir hata oluştu');
    }

    return response.json();
  }

  async createContact(data: ContactFormData): Promise<Contact> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('İletişim bilgileri oluşturulurken bir hata oluştu');
    }

    return response.json();
  }
}

export const contactService = new ContactService(); 