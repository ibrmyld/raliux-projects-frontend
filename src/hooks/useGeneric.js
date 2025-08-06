import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiRequest } from '../services/api'

// Generic Favorites Hook
export const useGenericFavorites = (targetId, targetType, enabled = true) => {
  return useQuery({
    queryKey: ['generic-favorite', targetId, targetType],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/generic/favorites/check?target_id=${targetId}&target_type=${targetType}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic favorites API error, using fallback:', error.message)
        return { is_favorite: false, count: 0 }
      }
    },
    enabled: enabled && !!targetId && !!targetType,
    staleTime: 30000, // 30 seconds
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Favorite Count Hook (no auth required)
export const useGenericFavoriteCount = (targetId, targetType, enabled = true) => {
  return useQuery({
    queryKey: ['generic-favorite-count', targetId, targetType],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/generic/favorites/count?target_id=${targetId}&target_type=${targetType}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic favorite count API error, using fallback:', error.message)
        return { target_id: targetId, target_type: targetType, count: 0 }
      }
    },
    enabled: enabled && !!targetId && !!targetType,
    staleTime: 60000, // 1 minute
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Toggle Favorite Mutation
export const useGenericToggleFavorite = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ targetId, targetType }) => {
      try {
        const response = await apiRequest('/api/generic/favorites/toggle', {
          method: 'POST',
          body: JSON.stringify({
            target_id: targetId,
            target_type: targetType
          })
        })
        return await response.json()
      } catch (error) {
        console.warn('Generic toggle favorite API error:', error.message)
        // Return optimistic update
        const currentData = queryClient.getQueryData(['generic-favorite', targetId, targetType])
        const newFavoriteState = !currentData?.is_favorite
        return {
          is_favorite: newFavoriteState,
          count: (currentData?.count || 0) + (newFavoriteState ? 1 : -1)
        }
      }
    },
    onSuccess: (data, variables) => {
      const { targetId, targetType } = variables
      
      // Update favorite status cache
      queryClient.setQueryData(['generic-favorite', targetId, targetType], {
        is_favorite: data.is_favorite,
        count: data.count
      })
      
      // Update favorite count cache
      queryClient.setQueryData(['generic-favorite-count', targetId, targetType], {
        target_id: targetId,
        target_type: targetType,
        count: data.count
      })
      
      // Invalidate user favorites list
      queryClient.invalidateQueries(['generic-user-favorites'])
    },
    onError: (error) => {
      console.error('Generic toggle favorite error:', error)
    }
  })
}

// Generic User Favorites Hook
export const useGenericUserFavorites = (targetType = null, enabled = true) => {
  return useQuery({
    queryKey: ['generic-user-favorites', targetType],
    queryFn: async () => {
      try {
        const params = targetType ? `?target_type=${targetType}` : ''
        const response = await apiRequest(`/api/generic/favorites${params}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic user favorites API error, using fallback:', error.message)
        return []
      }
    },
    enabled,
    staleTime: 60000, // 1 minute
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Likes Hook - YENİ SİSTEM
export const useGenericLikes = (targetId, targetType, enabled = true) => {
  return useQuery({
    queryKey: ['generic-like', targetId, targetType],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/generic/likes/check?target_id=${targetId}&target_type=${targetType}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic likes API error, using fallback:', error.message)
        return { is_liked: false, count: 0 }
      }
    },
    enabled: enabled && !!targetId && !!targetType,
    staleTime: 30000, // 30 seconds
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Like Count Hook (no auth required)
export const useGenericLikeCount = (targetId, targetType, enabled = true) => {
  return useQuery({
    queryKey: ['generic-like-count', targetId, targetType],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/generic/likes/count?target_id=${targetId}&target_type=${targetType}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic like count API error, using fallback:', error.message)
        return { target_id: targetId, target_type: targetType, count: 0 }
      }
    },
    enabled: enabled && !!targetId && !!targetType,
    staleTime: 60000, // 1 minute
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Toggle Like Mutation
export const useGenericToggleLike = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ targetId, targetType }) => {
      try {
        const response = await apiRequest('/api/generic/likes/toggle', {
          method: 'POST',
          body: JSON.stringify({
            target_id: targetId,
            target_type: targetType
          })
        })
        return await response.json()
      } catch (error) {
        console.warn('Generic toggle like API error:', error.message)
        // Return optimistic update
        const currentData = queryClient.getQueryData(['generic-like', targetId, targetType])
        const newLikeState = !currentData?.is_liked
        return {
          is_liked: newLikeState,
          count: (currentData?.count || 0) + (newLikeState ? 1 : -1)
        }
      }
    },
    onSuccess: (data, variables) => {
      const { targetId, targetType } = variables
      
      // Update like status cache
      queryClient.setQueryData(['generic-like', targetId, targetType], {
        is_liked: data.is_liked,
        count: data.count
      })
      
      // Update like count cache
      queryClient.setQueryData(['generic-like-count', targetId, targetType], {
        target_id: targetId,
        target_type: targetType,
        count: data.count
      })
      
      // Invalidate user likes list
      queryClient.invalidateQueries(['generic-user-likes'])
    },
    onError: (error) => {
      console.error('Generic toggle like error:', error)
    }
  })
}

// Generic User Likes Hook
export const useGenericUserLikes = (targetType = null, enabled = true) => {
  return useQuery({
    queryKey: ['generic-user-likes', targetType],
    queryFn: async () => {
      try {
        const params = targetType ? `?target_type=${targetType}` : ''
        const response = await apiRequest(`/api/generic/likes${params}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic user likes API error, using fallback:', error.message)
        return []
      }
    },
    enabled,
    staleTime: 60000, // 1 minute
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Comments Hook
export const useGenericComments = (targetId, targetType, enabled = true) => {
  return useQuery({
    queryKey: ['generic-comments', targetId, targetType],
    queryFn: async () => {
      try {
        const response = await apiRequest(`/api/generic/comments?target_id=${targetId}&target_type=${targetType}`)
        return await response.json()
      } catch (error) {
        console.warn('Generic comments API error, using fallback:', error.message)
        return []
      }
    },
    enabled: enabled && !!targetId && !!targetType,
    staleTime: 30000, // 30 seconds
    retry: 1,
    retryDelay: 1000
  })
}

// Generic Create Comment Mutation
export const useGenericCreateComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ targetId, targetType, content }) => {
      try {
        const response = await apiRequest('/api/generic/comments', {
          method: 'POST',
          body: JSON.stringify({
            target_id: targetId,
            target_type: targetType,
            content
          })
        })
        return await response.json()
      } catch (error) {
        console.warn('Generic create comment API error:', error.message)
        throw error
      }
    },
    onSuccess: (data, variables) => {
      const { targetId, targetType } = variables
      
      // Invalidate comments list
      queryClient.invalidateQueries(['generic-comments', targetId, targetType])
    },
    onError: (error) => {
      console.error('Generic create comment error:', error)
    }
  })
}

// Generic Update Comment Mutation
export const useGenericUpdateComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ commentId, content }) => {
      try {
        const response = await apiRequest(`/api/generic/comments/${commentId}`, {
          method: 'PUT',
          body: JSON.stringify({
            content
          })
        })
        return await response.json()
      } catch (error) {
        console.warn('Generic update comment API error:', error.message)
        throw error
      }
    },
    onSuccess: (data) => {
      // Invalidate comments list for this target
      queryClient.invalidateQueries(['generic-comments', data.target_id, data.target_type])
    },
    onError: (error) => {
      console.error('Generic update comment error:', error)
    }
  })
}

// Generic Delete Comment Mutation
export const useGenericDeleteComment = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (commentId) => {
      try {
        const response = await apiRequest(`/api/generic/comments/${commentId}`, {
          method: 'DELETE'
        })
        return await response.json()
      } catch (error) {
        console.warn('Generic delete comment API error:', error.message)
        throw error
      }
    },
    onSuccess: () => {
      // Invalidate all comments queries
      queryClient.invalidateQueries(['generic-comments'])
    },
    onError: (error) => {
      console.error('Generic delete comment error:', error)
    }
  })
} 