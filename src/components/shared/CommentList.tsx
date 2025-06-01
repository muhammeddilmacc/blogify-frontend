import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { CommentService } from '@/services/CommentService';
import { auth } from '@/config/firebase';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CommentListProps {
  postId: string;
  onCommentDeleted?: () => void;
}

const CommentList: React.FC<CommentListProps> = ({ postId, onCommentDeleted }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  
  const commentService = useMemo(() => new CommentService(), []);

  const loadComments = useCallback(async () => {
    try {
      const fetchedComments = await commentService.getCommentsByPostId(postId);
      setComments(fetchedComments);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Yorumlar yüklenirken bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [postId, commentService]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleDelete = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
      setComments(comments.filter(comment => comment.id !== commentId));
      toast.success('Yorum başarıyla silindi');
      onCommentDeleted?.();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Yorum silinirken bir hata oluştu';
      toast.error(errorMessage);
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleUpdate = async (commentId: string) => {
    try {
      const updatedComment = await commentService.updateComment(commentId, editContent);
      setComments(comments.map(comment => 
        comment.id === commentId ? updatedComment : comment
      ));
      setEditingCommentId(null);
      toast.success('Yorum başarıyla güncellendi');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Yorum güncellenirken bir hata oluştu';
      toast.error(errorMessage);
    }
  };

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase();
  };

  const getDisplayName = (email: string) => {
    return email.split('@')[0];
  };

  if (loading) {
    return <div className="flex justify-center p-4">Yorumlar yükleniyor...</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center p-4 text-gray-500">Henüz yorum yapılmamış</div>;
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="bg-blue-50 p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                {getInitials(comment.userEmail)}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900">
                    {getDisplayName(comment.userEmail)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(comment.createdAt), 'dd.MM.yyyy HH:mm', { locale: tr })}
                  </div>
                </div>
                {auth.currentUser?.uid === comment.userId && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(comment)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Sil
                    </button>
                  </div>
                )}
              </div>
              {editingCommentId === comment.id ? (
                <div className="mt-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    rows={3}
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setEditingCommentId(null)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 font-medium"
                    >
                      İptal
                    </button>
                    <button
                      onClick={() => handleUpdate(comment.id)}
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                    >
                      Güncelle
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-gray-700">{comment.content}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList; 