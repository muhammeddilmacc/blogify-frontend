'use client';

import { Blog } from '@/features/blogs/types/blog.types';
import { RelatedPostCard } from './RelatedPostCard';

interface RelatedPostsProps {
  posts: Blog[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-12 border-t border-gray-100 pt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Benzer Yazılar
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <RelatedPostCard key={`${post.slug}-${post.id}`} post={post} />
        ))}
      </div>
    </div>
  );
}