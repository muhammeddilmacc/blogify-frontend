'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/features/blogs/types/blog.types';
import { useState } from 'react';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1547555999-14e818e09e33?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

interface RelatedPostCardProps {
  post: Blog;
}

export function RelatedPostCard({ post }: RelatedPostCardProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = (!imageError && post.image?.url && post.image.url !== '') ? post.image.url : PLACEHOLDER_IMAGE;
  const imageAlt = post.image?.alt || post.title;

  return (
    <Link 
      href={`/blogs/${post.slug}`}
      className="group block w-full h-[400px]"
    >
      <article className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] h-full flex flex-col">
        <div className="relative w-full h-[240px] overflow-hidden bg-gray-100 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={400}
            height={240}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <time className="text-sm text-gray-500 mt-auto" dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </div>
      </article>
    </Link>
  );
} 