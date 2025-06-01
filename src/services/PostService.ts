import { Blog, BlogFormData, CategoryType, BlogStatus } from '@/features/blogs/types/blog.types';

interface PaginationResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export class PostService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;
  }

  async createPost(formData: BlogFormData): Promise<Blog> {
    // Önce resmi yükleyelim (eğer varsa)
    let imageUrl = '';
    let imageAlt = '';
    let imagePublicId = '';

    if (formData.image) {
      try {
        const imageData = new FormData();
        imageData.append('image', formData.image);

        const uploadResponse = await fetch(`${this.baseUrl}/upload`, {
          method: 'POST',
          credentials: 'include',
          body: imageData,
        });

        const responseData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(responseData.error || 'Resim yüklenirken bir hata oluştu');
        }

        imageUrl = responseData.url;
        imageAlt = responseData.alt || formData.title;
        imagePublicId = responseData.publicId;
      } catch (error) {
        console.error('Resim yükleme hatası:', error);
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Resim yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      }
    }

    const response = await fetch(`${this.baseUrl}/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        category: formData.category as CategoryType,
        excerpt: formData.excerpt,
        status: formData.status as BlogStatus,
        author: 'admin',
        image: imageUrl ? {
          url: imageUrl,
          alt: imageAlt,
          publicId: imagePublicId
        } : undefined
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Post oluşturma hatası:', responseData);
      throw new Error(responseData.error || 'Post oluşturulurken bir hata oluştu');
    }

    return responseData.post;
  }

  async updatePost(id: string, formData: Partial<BlogFormData>): Promise<Blog> {
    // Önce resmi yükleyelim (eğer varsa)
    let imageUrl = '';
    let imageAlt = '';

    if (formData.image instanceof File) {
      try {
        const imageData = new FormData();
        imageData.append('image', formData.image);

        const uploadResponse = await fetch(`${this.baseUrl}/upload`, {
          method: 'POST',
          credentials: 'include',
          body: imageData,
        });

        const responseData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(responseData.error || 'Resim yüklenirken bir hata oluştu');
        }

        imageUrl = responseData.url;
        imageAlt = responseData.alt || formData.title || '';
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error('Resim yüklenirken bir hata oluştu');
      }
    }

    // Post verilerini hazırla
    const updateData = {
      title: formData.title,
      content: formData.content,
      category: formData.category,
      excerpt: formData.excerpt,
      status: formData.status,
      // Eğer yeni resim yüklendiyse onu kullan
      ...(imageUrl && {
        image: {
          url: imageUrl,
          alt: imageAlt
        }
      })
    };

    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Post güncellenirken bir hata oluştu');
    }

    return response.json();
  }

  async deletePost(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Post silinirken bir hata oluştu');
    }
  }

  async getPostById(id: string): Promise<Blog | null> {
    const response = await fetch(`${this.baseUrl}/id/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Post detayları alınırken bir hata oluştu');
    }

    return response.json();
  }

  async getPosts(page: number = 1, limit: number = 300): Promise<PaginationResult<Blog>> {
    const response = await fetch(`${this.baseUrl}?page=${page}&limit=${limit}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Postlar getirilirken bir hata oluştu');
    }

    return response.json();
  }

  async getPublishedPosts(page: number = 1, limit: number = 10): Promise<PaginationResult<Blog>> {
    const response = await fetch(`${this.baseUrl}/published?page=${page}&limit=${limit}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Yayınlanan postlar getirilirken bir hata oluştu');
    }

    return response.json();
  }

  async getMostSharedPosts(): Promise<PaginationResult<Blog>> {
    const response = await fetch(`${this.baseUrl}/most-shared`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('En çok paylaşılan postlar getirilirken bir hata oluştu');
    }

    return response.json();
  }

  async getMostVisitedPost(): Promise<Blog> {
    const response = await fetch(`${this.baseUrl}/most-visited`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('En çok ziyaret edilen post getirilirken bir hata oluştu');
    }

    return response.json();
  }

  async updateShareCount(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/share`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Paylaşım sayısı güncellenirken bir hata oluştu');
    }
  }

  async incrementViewCount(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/view`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Görüntülenme sayısı güncellenirken bir hata oluştu');
    }
  }

  async getPostBySlug(slug: string): Promise<Blog> {
    const response = await fetch(`${this.baseUrl}/${slug}`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Post bulunamadı');
    }
    return response.json();
  }

  async getPostsByCategory(category: CategoryType): Promise<Blog[]> {
    const response = await fetch(`${this.baseUrl}/published?category=${category}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Kategoriye ait postlar getirilirken bir hata oluştu');
    }

    const result = await response.json();
    return result.data;
  }

  async likePost(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/like`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Post beğenilirken bir hata oluştu');
    }
  }

  async unlikePost(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${id}/unlike`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Post beğenisi kaldırılırken bir hata oluştu');
    }
  }

  async isPostLiked(id: string): Promise<{ isLiked: boolean }> {
    const response = await fetch(`${this.baseUrl}/${id}/is-liked`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Beğeni durumu kontrol edilirken bir hata oluştu');
    }

    return response.json();
  }
}

export const postService = new PostService();

export default PostService; 