import { auth } from '@/config/firebase';

interface Comment {
  id: string;
  content: string;
  postId: string;
  userId: string;
  userEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreateCommentData {
  content: string;
  postId: string;
}

export class CommentService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/comments`;
  }

  async createComment(data: CreateCommentData): Promise<Comment> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Yorum yapmak için giriş yapmalısınız');
    }

    const token = await user.getIdToken();

    const response = await fetch(`${this.baseUrl}/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        content: data.content,
        postId: data.postId,
        userId: user.uid,
        userEmail: user.email
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Yorum oluşturulurken bir hata oluştu');
    }

    return response.json();
  }

  async getCommentsByPostId(postId: string): Promise<Comment[]> {
    const response = await fetch(`${this.baseUrl}/post/${postId}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Yorumlar getirilirken bir hata oluştu');
    }

    return response.json();
  }

  async deleteComment(commentId: string): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Bu işlem için giriş yapmalısınız');
    }

    const token = await user.getIdToken();

    const response = await fetch(`${this.baseUrl}/${commentId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Yorum silinirken bir hata oluştu');
    }
  }

  async updateComment(commentId: string, content: string): Promise<Comment> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Bu işlem için giriş yapmalısınız');
    }

    const token = await user.getIdToken();

    const response = await fetch(`${this.baseUrl}/${commentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Yorum güncellenirken bir hata oluştu');
    }

    return response.json();
  }
} 