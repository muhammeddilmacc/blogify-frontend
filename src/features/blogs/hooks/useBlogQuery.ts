import { useQuery } from '@tanstack/react-query';
import { getBlogPosts } from '../api/blogApi';
import { CategoryType, SortOption } from '../types/blog.types';

interface UseBlogQueryOptions {
  page?: number;
  limit?: number;
  category?: CategoryType | null;
  sortBy?: SortOption;
  search?: string;
}

export function useBlogQuery({ page = 1, limit = 12, category, sortBy = 'date-desc', search }: UseBlogQueryOptions = {}) {
  return useQuery({
    queryKey: ['blogs', { page, limit, category, sortBy, search }],
    queryFn: () => getBlogPosts({ page, limit, category, sortBy, search }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5 // 5 dakika
  });
} 