'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Blog } from '@/features/blogs/types/blog.types';
import { formatDate } from '@/utils/date';
import Image from "next/image";
import { postService } from '@/services/PostService';

export default function MostVisitedPost() {
  const [post, setPost] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostVisitedPost = async () => {
      try {
        const data = await postService.getMostVisitedPost();
        setPost(data);
      } catch (error) {
        console.error('En çok ziyaret edilen post getirilirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMostVisitedPost();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-medium text-gray-900">En Çok Ziyaret Edilen Yazı</h3>
            <p className="text-sm text-gray-500 mt-1">Son 30 günün en popüler yazısı</p>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">0</span>
          </div>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
              <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
              <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">Henüz hiç yazı görüntülenmemiş</p>
          <Link
            href="/admin/posts/new"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
          >
            Yeni Yazı Ekle
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  const fallbackImageUrl = "https://images.unsplash.com/photo-1547555999-14e818e09e33?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium text-gray-900">En Çok Ziyaret Edilen Yazı</h3>
          <p className="text-sm text-gray-500 mt-1">en çok ziyaret edilen yazı </p>
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden h-48 mb-4">
        <Image
          src={post.image?.url || fallbackImageUrl}
          alt={post.image?.alt || post.title}
          width={100}
          height={100}
          className="object-cover w-full h-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImageUrl;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Link
            href={`/admin/posts/edit/${post.id}`}
            className="group block"
          >
            <h4 className="font-medium text-white group-hover:text-blue-200 transition-colors text-lg line-clamp-2 mb-2">{post.title}</h4>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-200">{formatDate(post.date)}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className={`text-sm px-2 py-0.5 rounded-full ${post.status === 'published'
                ? 'bg-green-400/20 text-green-100'
                : post.status === 'draft'
                  ? 'bg-yellow-400/20 text-yellow-100'
                  : 'bg-gray-400/20 text-gray-100'
                }`}>
                {post.status === 'published' ? 'Yayında' : post.status === 'draft' ? 'Taslak' : 'Arşivlenmiş'}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt || 'Bu yazı için henüz bir açıklama eklenmemiş.'}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">
                <span className="sm:hidden">{post.views || 0}</span>
                <span className="hidden sm:inline">{post.views || 0} görüntülenme</span>
              </span>
            </div>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <div className="flex items-center gap-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.367A2.52 2.52 0 0113 4.5z" />
              </svg>
              <span className="text-sm">
                <span className="sm:hidden">{post.shareCount || 0}</span>
                <span className="hidden sm:inline">{post.shareCount || 0} paylaşım</span>
              </span>
            </div>
          </div>
        </div>
        <Link
          href={`/admin/posts/edit/${post.id}`}
          className="text-gray-400 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 