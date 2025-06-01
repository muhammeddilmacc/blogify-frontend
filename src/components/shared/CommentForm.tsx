import React, { useState } from 'react';
import { CommentService } from '@/services/CommentService';
import { auth } from '@/config/firebase';
import { toast } from 'react-hot-toast';

interface CommentFormProps {
  postId: string;
  onCommentAdded?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const commentService = new CommentService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      toast.error('Yorum yapmak için giriş yapmalısınız');
      return;
    }

    if (!content.trim()) {
      toast.error('Yorum içeriği boş olamaz');
      return;
    }

    setIsSubmitting(true);

    try {
      await commentService.createComment({
        content: content.trim(),
        postId
      });

      setContent('');
      toast.success('Yorumunuz başarıyla eklendi');
      onCommentAdded?.();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Yorum eklenirken bir hata oluştu');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!auth.currentUser) {
    return (
      <div className="text-center p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Yorum yapmak için giriş yapmalısınız</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Yorumunuzu yazın..."
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Yorum Yap'}
        </button>
      </div>
    </form>
  );
};

export default CommentForm; 