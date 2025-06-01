'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Blog } from '@/features/blogs/types/blog.types';
import { useParams } from 'next/navigation';
import { ShareButtons } from '@/features/blogs/components/ShareButtons';
import { RelatedPosts } from '@/features/blogs/components/RelatedPosts';
import { BlogNotFound } from '@/features/blogs/components/BlogNotFound';
import { usePostService } from '@/features/blogs/services/usePostService';
import { CategoryType } from '@/features/blogs/types/blog.types';
import './page.css';
import { LikeButton } from '@/features/blogs/components/LikeButton';
import CommentList from '@/components/shared/CommentList';
import CommentForm from '@/components/shared/CommentForm';

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80';

export default function BlogPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const postService = usePostService();
  
  const [post, setPost] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Ana postu getir
        const postData = await postService.getPostBySlug(slug);
        if (postData) {
          setPost(postData);

          // İlgili postları getir
          const relatedData = await postService.getPostsByCategory(postData.category as CategoryType);
          setRelatedPosts(relatedData.filter(p => p.id !== postData.id));

          // Görüntülenme sayısını artır
          await postService.incrementViewCount(postData.id);
        } else {
          setError('Post bulunamadı');
          setRelatedPosts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
        console.error('Post yüklenirken hata:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug, postService]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <BlogNotFound />;
  }

  if (!post) return null;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('tr-TR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
            {post.category === 'writing' && 'Yazı'}
            {post.category === 'poem' && 'Şiir'}
            {post.category === 'article' && 'Makale'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
        <p className="text-lg md:text-xl text-gray-600">{post.excerpt}</p>
      </header>

      {post.image && (
        <div className="relative aspect-[16/9] md:aspect-[21/9] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image.url || PLACEHOLDER_IMAGE}
            alt={post.image.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      <div 
        className="prose prose-base md:prose-lg max-w-none mb-12 px-4 md:px-0 prose-blockquote:border-none prose-blockquote:p-0 prose-blockquote:m-0"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex justify-end items-center mb-12">
        <div className="flex items-center gap-4">
          <LikeButton postId={post.id} initialLikes={post.likes} size="lg" />
          <ShareButtons 
            url={typeof window !== 'undefined' ? window.location.href : ''}
            title={post.title}
          />
        </div>
      </div>

      <div className="border-t border-gray-100">
        <RelatedPosts posts={relatedPosts.slice(0, 3)} />
      </div>

      <div className="mt-12 border-t border-gray-100 pt-8">
        <h2 className="text-2xl font-bold mb-6">Yorumlar</h2>
        <div className="mb-8">
          <CommentForm postId={post.id} onCommentAdded={() => {
            // Yorumlar listesini yenile
            const commentListElement = document.getElementById('comments-list');
            if (commentListElement) {
              const event = new Event('refreshComments');
              commentListElement.dispatchEvent(event);
            }
          }} />
        </div>
        <div id="comments-list">
          <CommentList postId={post.id} />
        </div>
      </div>
    </article>
  );
}