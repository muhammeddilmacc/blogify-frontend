import { CategoryType } from '../types/blog.types';

const CATEGORIES: CategoryType[] = ['writing', 'poem', 'article'];

interface CategoryFiltersProps {
    selectedCategory: CategoryType | null;
    onCategoryChange: (category: CategoryType | null) => void;
}

export function CategoryFilters({ selectedCategory, onCategoryChange }: CategoryFiltersProps) {
    return (
        <div className="flex flex-wrap gap-2">
            <button
                onClick={() => onCategoryChange(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!selectedCategory
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
            >
                Tümü
            </button>
            {CATEGORIES.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                >
                    {category === 'writing' && 'Yazı'}
                    {category === 'poem' && 'Şiir'}
                    {category === 'article' && 'Makale'}
                </button>
            ))}
        </div>
    );
} 