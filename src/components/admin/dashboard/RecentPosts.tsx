'use client';

import React from 'react';
import Link from 'next/link';
import { Blog } from '@/features/blogs/types/blog.types';
import { formatDate } from '@/utils/date';
import Image from "next/image";

interface RecentPostsProps {
  posts: Blog[];
  loading: boolean;
}

export default function RecentPosts({ posts, loading }: RecentPostsProps) {
  const fallbackImageUrl = "https://images.unsplash.com/photo-1547555999-14e818e09e33?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-900">Son Yazılar</h3>
          {posts.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {posts.length === 5
                ? 'Son eklenen 5 yazı'
                : `Son eklenen ${posts.length} yazı`
              }
            </p>
          )}
        </div>
        {posts.length > 0 && (
          <Link
            href="/admin/posts"
            className="text-sm text-gray-500 hover:text-blue-600 font-medium flex items-center gap-1 transition-colors"
          >
            Tümünü Gör
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>

      {loading ? (
        <div className="p-4 sm:p-6 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {posts.map((post) => (
            <div key={post.id} className="p-4 sm:p-6">
              <Link href={`/admin/posts/edit/${post.id}`} className="group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="relative w-20 sm:w-16 h-20 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                      <Image
                        src={post.image?.url || fallbackImageUrl}
                        alt={post.image?.alt || post.title}
                        className="object-cover w-full h-full"
                        width={100}
                        height={100}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = fallbackImageUrl;
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="h-[50px]">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-base">{post.title}</h4>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className={`text-sm px-2 py-0.5 rounded-full ${post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : post.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}>
                          {post.status === 'published' ? 'Yayında' : post.status === 'draft' ? 'Taslak' : 'Arşivlenmiş'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{post.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                          <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.367A2.52 2.52 0 0113 4.5z" />
                        </svg>
                        <span className="text-sm">{post.shareCount || 0}</span>
                      </div>
                    </div>
                    <div className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      Düzenle
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
              <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM9.75 17.25a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-.75zm2.25-3a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0V18a.75.75 0 001.5 0v-5.25z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">Henüz yazı bulunmuyor</p>
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
      )}
    </div>
  );
} 