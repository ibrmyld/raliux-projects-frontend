import { useGenericUserFavorites, useGenericFavorites, useGenericToggleFavorite, useGenericFavoriteCount } from './useGeneric';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Query keys - backward compatibility için
export const favoriteKeys = {
  all: ['favorites'],
  list: () => [...favoriteKeys.all, 'list'],
  status: (postId) => [...favoriteKeys.all, 'status', postId],
};

// Favoriler listesini getir - generic sistemi kullanarak
export const useFavorites = () => {
  const { isAuthenticated } = useAuth();
  
  const { data: favorites = [], isLoading, error } = useGenericUserFavorites('post', isAuthenticated);
  
  return {
    data: favorites,
    isLoading,
    error: error ? { message: error.message || 'Failed to load favorites' } : null
  };
};

// Bir yazının favori durumunu kontrol et - generic sistemi kullanarak
export const useFavoriteStatus = (postId, type = "post") => {
  const { isAuthenticated } = useAuth();
  
  // Auth varsa favorite status, yoksa sadece count
  const { data: favoriteStatus } = useGenericFavorites(postId, type, isAuthenticated);
  const { data: favoriteCount } = useGenericFavoriteCount(postId, type);
  
  return {
    data: {
      isFavorite: favoriteStatus?.is_favorite || false,
      count: favoriteCount?.count || 0
    },
    isLoading: false,
    error: null
  };
};

// Favori durumunu değiştir - generic sistemi kullanarak
export const useToggleFavorite = () => {
  const { isAuthenticated } = useAuth();
  const toggleMutation = useGenericToggleFavorite();

  return {
    mutateAsync: async ({ id, type = "post" }) => {
      if (!isAuthenticated) {
        throw new Error('You must be logged in to toggle favorites');
      }
      
      try {
        const result = await toggleMutation.mutateAsync({
          targetId: id,
          targetType: type
        });
        
        return {
          isFavorite: result.is_favorite,
          count: result.count
        };
      } catch (error) {
        toast.error(error.message || 'Something went wrong. Please try again.');
        throw error;
      }
    },
    isPending: toggleMutation.isPending
  };
}; 