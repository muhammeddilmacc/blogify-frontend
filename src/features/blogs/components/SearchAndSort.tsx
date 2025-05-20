import { BlogFilters as BlogFiltersType } from '../types/blog.types';
import { SearchInput } from '@/shared/components/SearchInput';
import { FiSearch } from 'react-icons/fi';

interface SearchAndSortProps {
    filters: BlogFiltersType;
    onFilterChange: (filters: Partial<BlogFiltersType>) => void;
}

export function SearchAndSort({ filters, onFilterChange }: SearchAndSortProps) {
    return (
        <div className="relative w-full">
            <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <FiSearch size={20} />
                </div>
                <SearchInput
                    value={filters.search}
                    onChange={(value) => onFilterChange({ search: value })}
                    placeholder="Yazılarda ara..."
                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
                />
            </div>
        </div>
    );
} 