'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Blog, CategoryType } from '@/features/blogs/types/blog.types';
import { usePostService } from '@/features/blogs/services/usePostService';
import { HiFilter } from 'react-icons/hi';
import { useNotification } from '@/context/NotificationContext';
import { getCategoryLabel } from '@/utils/categoryUtils';

export default function PostsPage() {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { showQuestion, showNotification } = useNotification();
  const postService = usePostService();

  const [postsPerPage] = useState(10);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await postService.getPosts(
        currentPage,
        postsPerPage
      );
      setPosts(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error('Posts yüklenirken hata:', error);
      setPosts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, postsPerPage, postService]);

  useEffect(() => {
    setMounted(true);
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    loadPosts();
  }, [currentPage, debouncedSearchTerm, selectedCategory, selectedStatus, loadPosts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Update search input handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Update category select handler


  const handleDelete = async (postId: string) => {
    showQuestion(
      'Bu yazıyı silmek istediğinizden emin misiniz?',
      async () => {
        try {
          await postService.deletePost(postId);
          await loadPosts();
          showNotification('Yazı başarıyla silindi', 'success');
        } catch (error) {
          console.error('Yazı silinirken hata oluştu:', error);
          showNotification('Yazı silinirken bir hata oluştu', 'error');
        }
      },
      () => {
        // İptal edildiğinde bir şey yapmaya gerek yok
      }
    );
  };

  if (!mounted) {
    return null;
  }
  console.log(posts);

  return (
    <div className="space-y-4 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yazılar</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Yeni Yazı Ekle
        </Link>
      </div>

      {/* Mobil için optimize edilmiş arama ve filtre alanı */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            placeholder="Yazılarda ara..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Mobil filtre butonu */}
          <button
            className="lg:hidden p-2 border rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <HiFilter size={20} />
          </button>
        </div>

        {/* Desktop filtreler */}
        <div className="hidden lg:flex gap-4">
          <select 
            className="px-4 py-2 border rounded-lg"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              loadPosts();
            }}
          >
            <option value="">Tüm Kategoriler</option>
            <option value="writing">Yazı</option>
            <option value="article">Makale</option>
            <option value="poem">Şiir</option>
          </select>
          <select 
            className="px-4 py-2 border rounded-lg"
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              loadPosts();
            }}
          >
            <option value="">Tüm Durumlar</option>
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
            <option value="archived">Arşiv</option>
          </select>
        </div>

        {/* Mobil filtreler - Açılır panel */}
        {showFilters && (
          <div className="lg:hidden space-y-2">
            <select 
              className="w-full px-4 py-2 border rounded-lg"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                loadPosts();
              }}
            >
              <option value="">Tüm Kategoriler</option>
              <option value="writing">Yazı</option>
              <option value="article">Makale</option>
              <option value="poem">Şiir</option>
            </select>
            <select 
              className="w-full px-4 py-2 border rounded-lg"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                loadPosts();
              }}
            >
              <option value="">Tüm Durumlar</option>
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
              <option value="archived">Arşiv</option>
            </select>
          </div>
        )}
      </div>

      {/* Responsive tablo */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Başlık
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Görüntülenme
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paylaşım
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  Yükleniyor...
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center">
                  Henüz yazı bulunmuyor.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={post.title}>
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {post.shareCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {getCategoryLabel(post.category as CategoryType)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : post.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {post.status === 'published'
                        ? 'Yayında'
                        : post.status === 'draft'
                        ? 'Taslak'
                        : 'Arşiv'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {!loading && posts.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-gray-100 active:bg-gray-200 disabled:hover:bg-transparent"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Önceki</span>
            </button>

            <div className="flex items-center gap-2 mx-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`min-w-[2.5rem] h-10 rounded-lg text-sm font-medium transition-all duration-200
                            ${currentPage === page
                      ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:scale-105 active:bg-gray-200'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-gray-100 active:bg-gray-200 disabled:hover:bg-transparent"
            >
              <span>Sonraki</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
      {/* Posts per page info */}
      {!loading && posts.length > 0 && totalPages > 1 && (
        <div className="mt-2 text-center text-sm text-gray-500">
          Toplam {(currentPage - 1) * postsPerPage + 1} - {Math.min(currentPage * postsPerPage, (totalPages - 1) * postsPerPage + posts.length)} / {(totalPages - 1) * postsPerPage + posts.length} yazı gösteriliyor
        </div>
      )}
    </div>
  );
}