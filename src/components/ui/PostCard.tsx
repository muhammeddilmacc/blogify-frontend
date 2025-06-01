'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/features/blogs/types/blog.types';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { PostService } from '@/services/PostService';

interface PostCardProps {
  post: Blog;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80';

export default function PostCard({ post }: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const imageUrl = (!imageError && post.image?.url) ? post.image.url : PLACEHOLDER_IMAGE;
  const imageAlt = post.image?.alt || post.title;
  
  // PostService instance'ını memoize et
  const postService = useMemo(() => new PostService(), []);

  const fetchPostDetails = useCallback(async () => {
    try {
      const postDetails = await postService.getPostById(post.id);
      if (postDetails) {
        setLikeCount(postDetails.likes || 0);
      } else {
        // Post detayları alınamazsa props'tan gelen değeri kullan
        setLikeCount(post.likes || 0);
      }

      const likeStatus = await postService.isPostLiked(post.id);
      setIsLiked(likeStatus.isLiked);
    } catch (error) {
      console.error('Post detayları alınırken hata:', error);
      setLikeCount(post.likes || 0);
      setIsLiked(false);
    }
  }, [post.id, post.likes, postService]);

  useEffect(() => {
    fetchPostDetails();
  }, [fetchPostDetails]);

  const handleLike = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      if (isLiked) {
        await postService.unlikePost(post.id);
        setLikeCount(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      } else {
        await postService.likePost(post.id);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
      
      await fetchPostDetails();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('giriş yapmanız gerekiyor')) {
          alert('Bu işlem için giriş yapmanız gerekiyor');
        } else {
          console.error('Beğeni işlemi sırasında hata:', error);
          await fetchPostDetails();
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, isLoading, post.id, fetchPostDetails, postService]);

  return (
    <Link href={`/blogs/${post.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            priority={false}
            blurDataURL={PLACEHOLDER_IMAGE}
            placeholder="blur"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 h-7">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2 h-10">
            {post.excerpt}
          </p>
          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                disabled={isLoading}
                className={`flex items-center gap-1 transition-colors ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={isLiked ? 'Beğeniyi Kaldır' : 'Beğen'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  className={`w-5 h-5 transition-colors ${isLiked ? 'fill-current' : ''}`}
                  strokeWidth={isLiked ? '0' : '2'}
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <span>{likeCount}</span>
              </button>
              <span className="text-blue-600 font-medium">Devamını Oku →</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
} 