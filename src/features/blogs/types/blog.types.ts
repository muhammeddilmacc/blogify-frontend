export type CategoryType = 'writing' | 'poem' | 'article';
export type SortOption = 'date-desc' | 'date-asc' | 'views-desc' | 'views-asc';
export type BlogStatus = 'draft' | 'published' | 'archived';
export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  status: 'published' | 'draft' | 'archived';
  slug: string;
  image?: {
    url: string;
    alt: string;
  };
  views: number;
  shareCount: number;
  totalViewDuration: number;
  lastViewedAt?: Date;
  likes: number;
  likedBy: string[];
  isLiked?: boolean;
}

export interface BlogFormData extends Omit<Blog, 'id' | 'date' | 'author' | 'slug' | 'image' | 'views' | 'shareCount' | 'totalViewDuration' | 'lastViewedAt'> {
  image?: File;
  imagePreview?: string;
}

export interface BlogFilters {
  category: CategoryType | null;
  search: string;
  sortBy: SortOption;
  page: number;
  limit: number;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CategoryLink {
  label: string;
  href: string;
  category: CategoryType;
}

export interface BlogVisit {
  date: string; // yyyy-MM-dd formatında
  time: string; // HH:mm formatında
  duration: number; // dakika cinsinden
}

export interface RawStatistics {
  visits: BlogVisit[];
}

export interface StatisticData {
  id: string;
  title: string;
  value: number;
  icon: string;
  trend: {
    value: number;
    isPositive: boolean;
    text: string;
  };
  color: string;
}

export interface StatisticsState {
  totalVisits: StatisticData;
  averageTime: StatisticData;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface StatisticChartProps {
  title: string;
  data: ChartData[];
  color: string;
  timeRange: TimeRange;
  statisticCard: React.ReactNode;
  onTimeRangeChange: (timeRange: TimeRange) => void;
}

export interface About {
  id?: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
} 