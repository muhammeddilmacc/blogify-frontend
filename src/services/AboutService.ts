import { About } from '../features/blogs/types/blog.types';

class AboutService {
  private baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/about`;

  async getAbout(): Promise<About> {
    const response = await fetch(this.baseUrl);

    if (!response.ok) {
      throw new Error('Hakkımda bilgileri getirilirken bir hata oluştu');
    }

    const data = await response.json();
    
    // Eğer imageUrl varsa, tam URL'i oluştur
    if (data && data.imageUrl && !data.imageUrl.startsWith('http')) {
      data.imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`;
    }

    return data;
  }

  async updateAbout(formData: FormData): Promise<About> {
    const response = await fetch(this.baseUrl, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Hakkımda bilgileri güncellenirken bir hata oluştu');
    }

    const data = await response.json();
    
    // Eğer imageUrl varsa, tam URL'i oluştur
    if (data && data.imageUrl && !data.imageUrl.startsWith('http')) {
      data.imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`;
    }

    return data;
  }
}

export const aboutService = new AboutService(); 