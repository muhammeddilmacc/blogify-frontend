'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Blog } from '@/features/blogs/types/blog.types';
import { postService } from '@/services/PostService';
import MostVisitedPost from '@/components/admin/dashboard/MostVisitedPost';
import MostSharedPosts from '@/components/admin/dashboard/MostSharedPosts';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import RecentPosts from '@/components/admin/dashboard/RecentPosts';

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [mostSharedPosts, setMostSharedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRecentPosts = useCallback(async () => {
    try {
      const response = await postService.getPosts(1, 5);
      setRecentPosts(response.data || []);
    } catch (error) {
      console.error('Son yazılar yüklenirken hata:', error);
      setRecentPosts([]);
    }
  }, []);

  const loadMostSharedPosts = useCallback(async () => {
    try {
      const response = await postService.getMostSharedPosts();
      setMostSharedPosts(response.data || []);
    } catch (error) {
      console.error('En çok paylaşılan yazılar yüklenirken hata:', error);
      setMostSharedPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadRecentPosts();
    loadMostSharedPosts();
  }, [loadRecentPosts, loadMostSharedPosts]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="p-3 sm:p-4 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Genel Bakış</h1>

      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
       

        <QuickActions />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <MostVisitedPost />
          <MostSharedPosts posts={mostSharedPosts} loading={loading} />
        </div>

        <RecentPosts posts={recentPosts} loading={loading} />
      </div>
    </div>
  );
}