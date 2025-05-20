'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Blog } from '@/features/blogs/types/blog.types';
import { useState } from 'react';

interface PostCardProps {
  post: Blog;
}

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80';

export default function PostCard({ post }: PostCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = (!imageError && post.image?.url) ? post.image.url : PLACEHOLDER_IMAGE;
  const imageAlt = post.image?.alt || post.title;

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
            <span className="text-blue-600 font-medium">Devamını Oku →</span>
          </div>
        </div>
      </article>
    </Link>
  );
} 