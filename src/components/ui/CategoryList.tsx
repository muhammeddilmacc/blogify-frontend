import Link from 'next/link';
import { CategoryType } from '@/types/blog';
import { capitalizeFirstLetter } from '@/utils/textUtils';

interface CategoryListProps {
  variant?: 'nav' | 'footer';
  activeCategory?: CategoryType;
}

const categories: CategoryType[] = ['writing', 'poem', 'article'];

export default function CategoryList({ variant = 'nav', activeCategory }: CategoryListProps) {
  if (variant === 'nav') {
    return (
      <div className="flex space-x-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/?category=${category}`}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeCategory === category
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category === 'writing' && 'Yazı'}
            {category === 'poem' && 'Şiir'}
            {category === 'article' && 'Makale'}
            {!(category === 'writing' || category === 'poem' || category === 'article') && capitalizeFirstLetter(category)}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {categories.map((category) => (
        <li key={category}>
          <Link
            href={`/?category=${category}`}
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            {category === 'writing' && 'Yazı'}
            {category === 'poem' && 'Şiir'}
            {category === 'article' && 'Makale'}
            {!(category === 'writing' || category === 'poem' || category === 'article') && capitalizeFirstLetter(category)}
          </Link>
        </li>
      ))}
    </ul>
  );
} 