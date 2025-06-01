export type CategoryType = 'writing' | 'poem' | 'article';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: CategoryType;
  author: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  tags?: string[];
} 