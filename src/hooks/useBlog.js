import { useQuery } from '@tanstack/react-query';
import { blogApi } from '../services/api';

// Query keys
export const blogKeys = {
  all: ['blog'],
  posts: () => [...blogKeys.all, 'posts'],
  post: (slug) => [...blogKeys.all, 'post', slug],
  categories: () => [...blogKeys.all, 'categories'],
};

// Blog yazılarını getir
export const usePosts = (filters = {}) => {
  return useQuery({
    queryKey: [...blogKeys.posts(), filters],
    queryFn: () => blogApi.getPosts(filters),
    staleTime: 0, // Her zaman fresh data al
    cacheTime: 1000 * 60, // 1 dakika cache
    refetchOnMount: true, // Mount'ta her zaman refetch
    refetchOnWindowFocus: false, // Window focus'ta refetch etme
  });
};

// Tek bir blog yazısını getir
export const usePost = (slug) => {
  return useQuery({
    queryKey: blogKeys.post(slug),
    queryFn: () => blogApi.getPost(slug),
    enabled: !!slug, // slug varsa çalıştır
    staleTime: 0, // Her zaman fresh data al
    cacheTime: 1000 * 60, // 1 dakika cache
    refetchOnMount: true,
  });
};

// Kategorileri getir
export const useCategories = () => {
  return useQuery({
    queryKey: blogKeys.categories(),
    queryFn: blogApi.getCategories,
    staleTime: 0, // Her zaman fresh data al
    cacheTime: 1000 * 60 * 5, // 5 dakika cache
    refetchOnMount: true,
  });
}; 