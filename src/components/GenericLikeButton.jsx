import React from 'react'
import { ThumbsUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useGenericLikes, useGenericLikeCount, useGenericToggleLike } from '../hooks/useGeneric'

const GenericLikeButton = ({ 
  targetId, 
  targetType, 
  className = "",
  showCount = true,
  size = "default" // "sm", "default", "large"
}) => {
  const { isAuthenticated } = useAuth()
  
  // Get like status (only if user is logged in)
  const { data: likeStatus } = useGenericLikes(
    targetId, 
    targetType, 
    isAuthenticated
  )
  
  // Get like count (always visible)
  const { data: likeCount } = useGenericLikeCount(targetId, targetType)
  
  // Toggle like mutation
  const toggleLikeMutation = useGenericToggleLike()
  
  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      alert('Please login to like')
      return
    }
    
    try {
      await toggleLikeMutation.mutateAsync({
        targetId,
        targetType
      })
    } catch (error) {
      console.error('Toggle like error:', error)
      alert('Failed to toggle like')
    }
  }
  
  // Size configurations - mavi/neon mavi tasarım
  const sizeConfig = {
    sm: {
      button: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-xs',
      padding: 'p-1.5'
    },
    small: {
      button: 'w-8 h-8',
      icon: 'w-4 h-4', 
      text: 'text-xs',
      padding: 'p-1.5'
    },
    default: {
      button: 'w-10 h-10',
      icon: 'w-5 h-5',
      text: 'text-sm',
      padding: 'p-2'
    },
    large: {
      button: 'w-12 h-12',
      icon: 'w-6 h-6',
      text: 'text-base',
      padding: 'p-2.5'
    }
  }
  
  const config = sizeConfig[size] || sizeConfig.default
  
  const isLiked = likeStatus?.is_liked || false
  const count = likeCount?.count || 0
  const isLoading = toggleLikeMutation.isPending
  
  if (showCount) {
    // Button with count - horizontal layout
    return (
      <button
        onClick={handleToggleLike}
        disabled={isLoading}
        className={`
          group inline-flex items-center gap-2 rounded-xl border-2 transition-all duration-300 transform
          ${config.padding} ${config.text}
          ${isLiked 
            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-400 dark:border-blue-500 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-800/40 dark:hover:to-cyan-800/40 hover:border-blue-500 shadow-lg shadow-blue-200 dark:shadow-blue-900/50 hover:shadow-blue-300 dark:hover:shadow-blue-800/60' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 shadow-md hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/30'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          ${className}
        `}
        title={isLiked ? 'Unlike' : 'Like'}
      >
        <ThumbsUp 
          className={`
            ${config.icon} transition-all duration-300
            ${isLiked ? 'fill-blue-500 text-blue-500 scale-110 drop-shadow-sm' : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-500'}
            ${isLoading ? 'animate-pulse' : 'group-hover:scale-110'}
          `}
        />
        
        <span className={`font-semibold ${config.text} ${isLiked ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
          {count}
        </span>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}
      </button>
    )
  } else {
    // Icon only button - circular
    return (
      <button
        onClick={handleToggleLike}
        disabled={isLoading}
        className={`
          group relative rounded-full border-2 transition-all duration-300 transform
          ${config.button} ${config.padding}
          ${isLiked 
            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600 border-blue-400 dark:border-blue-500 shadow-lg shadow-blue-300 dark:shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-400 dark:hover:shadow-blue-800/60 hover:from-blue-600 hover:to-cyan-600 dark:hover:from-blue-700 dark:hover:to-cyan-700' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/30'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
          ${className}
        `}
        title={isLiked ? 'Unlike' : 'Like'}
      >
        <ThumbsUp 
          className={`
            ${config.icon} transition-all duration-300
            ${isLiked ? 'fill-white text-white drop-shadow-sm' : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-500'}
            ${isLoading ? 'animate-pulse' : 'group-hover:scale-110'}
          `}
        />
        
        {/* Floating count badge */}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-blue-300">
            {count > 99 ? '99+' : count}
          </span>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>
    )
  }
}

export default GenericLikeButton 