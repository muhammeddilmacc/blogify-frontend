import { Blog } from '../types/blog.types';
import PostCard from '@/components/ui/PostCard';
import  Pagination  from '@/components/Pagination';
import Image from 'next/image';

interface BlogListProps {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  onPageChange?: (page: number) => void;
}

export function BlogList({ 
  blogs = [], 
  isLoading, 
  error, 
  pagination,
  onPageChange 
}: BlogListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center p-4">
        <div className="w-full max-w-lg mx-auto text-center">
          {/* İllüstrasyon */}
          <div className="mb-8 relative mx-auto" style={{ width: '240px', height: '160px' }}>
            <Image
              src="https://illustrations.popsy.co/white/taking-notes.svg"
              alt="Henüz Yazı Yok"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Başlık ve Açıklama */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Henüz Yazı Yok
            </h2>
            
            <p className="text-gray-600 text-base max-w-md mx-auto">
              Şu an için yayınlanmış bir yazı bulunmuyor. Daha sonra tekrar ziyaret etmeyi unutmayın.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {blogs.map((blog) => (
          <PostCard key={`${blog.slug}-${blog.id}`} post={blog} />
        ))}
      </div>

      {pagination && onPageChange && pagination.totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
            className="bg-white shadow-sm rounded-xl"
          />
          <div className="mt-4 text-center text-sm text-gray-500">
            Toplam {pagination.totalItems} yazıdan {(pagination.currentPage - 1) * 12 + 1} - {Math.min(pagination.currentPage * 12, pagination.totalItems)} arası gösteriliyor
          </div>
        </div>
      )}
    </div>
  );
} 