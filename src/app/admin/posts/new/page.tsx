'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import RichTextEditor from '@/components/RichTextEditor';
import { BlogStatus as PostStatus, CategoryType } from '@/features/blogs/types/blog.types';
import { useNotification } from '@/context/NotificationContext';
import { postService } from '@/services/PostService';
import { motion } from 'framer-motion';
import { FiImage, FiX, FiCheck } from 'react-icons/fi';

interface PostFormData {
  title: string;
  content: string;
  category: CategoryType;
  excerpt: string;
  status: PostStatus;
  image?: File;
  imagePreview?: string;
}

const MAX_TITLE_LENGTH = 100;
const MAX_EXCERPT_LENGTH = 200;

const categoryOptions = [
  { value: 'writing', label: 'Yazı', icon: '📝' },
  { value: 'article', label: 'Makale', icon: '📖' },
  { value: 'poem', label: 'Şiir', icon: '📜' },
];

const statusOptions = [
  { value: 'draft', label: 'Taslak', icon: '📑' },
  { value: 'published', label: 'Yayında', icon: '📇' },
  { value: 'archived', label: 'Arşiv', icon: '🔒' },
];

export default function NewPostPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    category: 'article',
    excerpt: '',
    status: 'draft'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'title' && value.length > MAX_TITLE_LENGTH) return;
    if (name === 'excerpt' && value.length > MAX_EXCERPT_LENGTH) return;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContentChange = (newContent: string) => {
    setFormData(prev => ({
      ...prev,
      content: newContent
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Resim boyutu 5MB\'dan küçük olmalıdır.', 'error');
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: undefined,
      imagePreview: undefined
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showNotification('Başlık alanı zorunludur.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await postService.createPost(formData);
      showNotification('Gönderi başarıyla oluşturuldu!', 'success');
      router.push('/admin/posts');
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : 'Bir hata oluştu',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-screen p-4">
      <div className="max-w-[1400px] mx-auto h-full">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
          <div className="flex-1 bg-white rounded-xl shadow-sm p-4 h-full">
            <RichTextEditor
              content={formData.content}
              onChange={handleContentChange}
            />
          </div>
          <div className="flex-1 bg-white rounded-xl shadow-sm p-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Başlık */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Başlık
                  </label>
                  <span className="text-sm text-gray-400">
                    {formData.title.length}/{MAX_TITLE_LENGTH}
                  </span>
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-lg font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Başlık..."
                />
              </div>

              {/* Özet */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="excerpt" className="text-sm font-medium text-gray-700">
                    Kısa Özet
                  </label>
                  <span className="text-sm text-gray-400">
                    {formData.excerpt.length}/{MAX_EXCERPT_LENGTH}
                  </span>
                </div>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 text-gray-600 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Kısa özet..."
                />
              </div>

              {/* Kategori */}
              <div className="space-y-1">
                <label htmlFor="category" className="text-sm font-medium text-gray-700 block">
                  Kategori
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Durum */}
              <div className="space-y-1">
                <label htmlFor="status" className="text-sm font-medium text-gray-700 block">
                  Durum
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kapak Resmi */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 block">
                  Kapak Resmi
                </label>
                <div className="mt-1">
                  {formData.imagePreview ? (
                    <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                      <Image
                        src={formData.imagePreview}
                        alt="Preview"
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-2 bg-white bg-opacity-90 text-red-500 rounded-lg hover:bg-opacity-100 transition-all"
                      >
                        <FiX size={20} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all group">
                      <div className="space-y-1 text-center">
                        <FiImage className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <div className="text-sm text-gray-600">
                          Resim yüklemek için tıklayın
                        </div>
                      </div>
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Kaydet Butonu */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full flex items-center justify-center space-x-2 px-6 py-3
                  bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white font-medium rounded-xl
                  hover:from-blue-700 hover:to-blue-800
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  disabled:opacity-75 disabled:cursor-not-allowed
                  transition-all duration-200 ease-in-out
                  shadow-lg hover:shadow-xl
                `}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <FiCheck size={20} />
                    <span>Kaydet</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </form>
  );
}