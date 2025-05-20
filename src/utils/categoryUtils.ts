import { CategoryType } from '@/features/blogs/types/blog.types';

export const getCategoryLabel = (category: CategoryType): string => {
  const categoryMap: Record<CategoryType, string> = {
    writing: 'Yazı',
    poem: 'Şiir',
    article: 'Makale'
  };

  return categoryMap[category] || category;
}; 