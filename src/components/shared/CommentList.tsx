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

  if (loading) {
    return <div className="flex justify-center p-4">Yorumlar yükleniyor...</div>;
  }

  if (comments.length === 0) {
    return <div className="text-center p-4 text-gray-500">Henüz yorum yapılmamış</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <div className="font-medium">{comment.userEmail}</div>
              <div className="text-sm text-gray-500">
                {format(new Date(comment.createdAt), 'd MMMM yyyy HH:mm', { locale: tr })}
              </div>
            </div>
            {auth.currentUser?.uid === comment.userId && (
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(comment)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Sil
                </button>
              </div>
            )}
          </div>
          {editingCommentId === comment.id ? (
            <div className="mt-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="px-3 py-1 text-gray-600 hover:text-gray-800"
                >
                  İptal
                </button>
                <button
                  onClick={() => handleUpdate(comment.id)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Güncelle
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-2">{comment.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList; 