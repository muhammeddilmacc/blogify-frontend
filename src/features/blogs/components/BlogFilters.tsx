import { useRouter } from 'next/navigation';
import { BlogFilters as BlogFiltersType, CategoryType, SortOption } from '../types/blog.types';
import { SearchAndSort } from '@/features/blogs/components/SearchAndSort';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface BlogFiltersProps {
  filters: BlogFiltersType;
  onFilterChange: (filters: Partial<BlogFiltersType>) => void;
}

export function BlogFilters({ filters, onFilterChange }: BlogFiltersProps) {
  const router = useRouter();
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showSortFilter, setShowSortFilter] = useState(false);

  const handleCategoryChange = (category: CategoryType | null) => {
    if (category) {
      router.push(`/?category=${category}`);
    } else {
      router.push('/');
    }
    onFilterChange({ category });
    setShowCategoryFilter(false);
  };

  const handleSortChange = (value: SortOption) => {
    onFilterChange({ sortBy: value });
    setShowSortFilter(false);
  };

  const getCategoryText = () => {
    if (!filters.category) return 'Tümü';
    switch (filters.category) {
      case 'writing': return 'Yazı';
      case 'poem': return 'Şiir';
      case 'article': return 'Makale';
      default: return 'Tümü';
    }
  };

  const getSortText = () => {
    switch (filters.sortBy) {
      case 'date-desc': return 'En Yeni';
      case 'date-asc': return 'En Eski';
      case 'views-desc': return 'En Çok Okunan';
      case 'views-asc': return 'En Az Okunan';
      default: return 'En Yeni';
    }
  };

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'date-desc', label: 'En Yeni' },
    { value: 'date-asc', label: 'En Eski' },
    { value: 'views-desc', label: 'En Çok Okunan' },
    { value: 'views-asc', label: 'En Az Okunan' }
  ];

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {/* Search Bar */}
      <div className="w-full max-w-2xl">
        <SearchAndSort
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-4">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <span>Tür: {getCategoryText()}</span>
            {showCategoryFilter ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {showCategoryFilter && (
            <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${!filters.category ? 'text-blue-600 font-medium' : ''}`}
              >
                Tümü
              </button>
              {['writing', 'poem', 'article'].map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category as CategoryType)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${filters.category === category ? 'text-blue-600 font-medium' : ''}`}
                >
                  {category === 'writing' && 'Yazı'}
                  {category === 'poem' && 'Şiir'}
                  {category === 'article' && 'Makale'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortFilter(!showSortFilter)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <span>Sıralama: {getSortText()}</span>
            {showSortFilter ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          
          {showSortFilter && (
            <div className="absolute z-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${filters.sortBy === option.value ? 'text-blue-600 font-medium' : ''}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 