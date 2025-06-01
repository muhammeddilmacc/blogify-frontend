'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { PostService } from '@/services/PostService';

interface LikeButtonProps {
  postId: string;
  initialLikes?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ postId, initialLikes = 0, className = '', size = 'md' }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  const postService = useMemo(() => new PostService(), []);

  const fetchLikeStatus = useCallback(async () => {
    try {
      const postDetails = await postService.getPostById(postId);
      if (postDetails) {
        setLikeCount(postDetails.likes || 0);
      }

      const likeStatus = await postService.isPostLiked(postId);
      setIsLiked(likeStatus.isLiked);
    } catch (error) {
      console.error('Beğeni durumu kontrol edilemedi:', error);
    }
  }, [postId, postService]);

  useEffect(() => {
    fetchLikeStatus();
  }, [fetchLikeStatus]);

  const handleLike = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    try {
      if (isLiked) {
        await postService.unlikePost(postId);
        setLikeCount(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      } else {
        await postService.likePost(postId);
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
      }
      
      await fetchLikeStatus();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('giriş yapmanız gerekiyor')) {
          alert('Bu işlem için giriş yapmanız gerekiyor');
        } else {
          console.error('Beğeni işlemi sırasında hata:', error);
          await fetchLikeStatus();
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLiked, isLoading, postId, fetchLikeStatus, postService]);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`flex items-center gap-1.5 transition-colors ${
        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      title={isLiked ? 'Beğeniyi Kaldır' : 'Beğen'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        className={`transition-colors ${sizeClasses[size]} ${isLiked ? 'fill-current' : ''}`}
        strokeWidth={isLiked ? '0' : '2'}
      >
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
      <span className="font-medium">{likeCount}</span>
    </button>
  );
} 