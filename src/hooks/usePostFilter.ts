import { useState, useMemo } from 'react';
import { Post, CategoryType } from '@/types/blog';

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

interface UsePostFilterProps {
  posts: Post[];
  postsPerPage: number;
  showAllStatuses?: boolean;
  initialCategory?: CategoryType | null;
}

export function usePostFilter({ 
  posts, 
  postsPerPage, 
  showAllStatuses = false,
  initialCategory = null 
}: UsePostFilterProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Status filtresi
    if (!showAllStatuses) {
      result = result.filter(post => post.status === 'published');
    }

    // Kategori filtresi
    if (selectedCategory) {
      console.log('Filtering by category:', selectedCategory);
      result = result.filter(post => post.category === selectedCategory);
      console.log('Filtered result:', result);
    }

    // Arama filtresi
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    // Sıralama
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [posts, selectedCategory, searchQuery, sortBy, showAllStatuses]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSortBy('date-desc');
    setCurrentPage(1);
  };

  return {
    paginatedPosts,
    filteredPosts,
    currentPage,
    totalPages,
    selectedCategory,
    searchQuery,
    sortBy,
    setCurrentPage,
    setSelectedCategory,
    setSearchQuery,
    setSortBy,
    resetFilters,
  };
} 