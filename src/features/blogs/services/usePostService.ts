import { useMemo } from 'react';
import PostService from '@/services/PostService';

export const usePostService = () => {
  return useMemo(() => new PostService(), []);
}; 