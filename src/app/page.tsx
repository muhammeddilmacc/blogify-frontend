'use client';

import { BlogList } from '@/features/blogs/components/BlogList';
import { BlogFilters } from '@/features/blogs/components/BlogFilters';
import { useBlogQuery } from '@/features/blogs/hooks/useBlogQuery';
import { PageHeader } from '@/shared/components/PageHeader';
import { useState, useEffect, Suspense } from 'react';
import { BlogFilters as BlogFiltersType, CategoryType } from '@/features/blogs/types/blog.types';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') as CategoryType | null;

  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<BlogFiltersType>({
    category: categoryParam,
    search: '',
    sortBy: 'date-desc',
    page: 1,
    limit: 12
  });

  useEffect(() => {
    if (categoryParam !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
      setCurrentPage(1);
    }
  }, [categoryParam, filters.category]);

  const { data, isLoading, error } = useBlogQuery({
    page: currentPage,
    limit: filters.limit,
    category: filters.category || undefined,
    sortBy: filters.sortBy,
    search: filters.search
  });

  const handleFilterChange = (newFilters: Partial<BlogFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pagination = data ? {
    currentPage: data.currentPage,
    totalPages: data.totalPages,
    totalItems: data.total,
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage
  } : {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-24 max-w-[1400px] mx-auto">
      <PageHeader
        description="Düşünceler, duygular ve fikirler..."
      />

      <div className="w-full">
        <BlogFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>

      <BlogList
        blogs={data?.data || []}
        isLoading={isLoading}
        error={error?.message || null}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
