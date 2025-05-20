import { Blog, CategoryType, PaginatedResponse, SortOption } from '../types/blog.types';

interface GetBlogPostsParams {
  page?: number;
  limit?: number;
  category?: CategoryType | null;
  sortBy?: SortOption;
  search?: string;
}

export async function getBlogPosts({
  page = 1,
  limit = 12,
  category,
  sortBy = 'date-desc',
  search
}: GetBlogPostsParams = {}): Promise<PaginatedResponse<Blog>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    });

    if (category) {
      params.append('category', category);
    }

    if (sortBy) {
      params.append('sortBy', sortBy);
    }

    if (search) {
      params.append('search', search);
    }

    // Published posts endpoint'ini kullan
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/published?${params}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Blog gönderileri alınırken bir hata oluştu');
    }

    return response.json();
  } catch (error) {
    console.error('Blog posts fetch error:', error);
    throw new Error('Blog gönderileri alınırken bir hata oluştu');
  }
} 