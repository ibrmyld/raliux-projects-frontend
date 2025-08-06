import React from 'react'
import { Heart } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useGenericFavorites, useGenericFavoriteCount, useGenericToggleFavorite } from '../hooks/useGeneric'

const GenericFavoriteButton = ({ 
  targetId, 
  targetType, 
  className = "",
  showCount = true,
  size = "default" // "sm", "default", "large"
}) => {
  const { isAuthenticated } = useAuth()
  
  // Get favorite status (only if user is logged in)
  const { data: favoriteStatus } = useGenericFavorites(
    targetId, 
    targetType, 
    isAuthenticated
  )
  
  // Get favorite count (always visible)
  const { data: favoriteCount } = useGenericFavoriteCount(targetId, targetType)
  
  // Toggle favorite mutation
  const toggleFavoriteMutation = useGenericToggleFavorite()
  
  const handleToggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('Please login to add favorites')
      return
    }
    
    try {
      await toggleFavoriteMutation.mutateAsync({
        targetId,
        targetType
      })
    } catch (error) {
      console.error('Toggle favorite error:', error)
      alert('Failed to toggle favorite')
    }
  }
  
  // Size configurations - neon yeşil tasarım
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
  
  const isFavorited = favoriteStatus?.is_favorite || false
  const count = favoriteCount?.count || 0
  const isLoading = toggleFavoriteMutation.isPending
  
  if (showCount) {
    // Button with count - horizontal layout
    return (
      <button
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className={`
          group inline-flex items-center gap-2 rounded-xl border-2 transition-all duration-300 transform
          ${config.padding} ${config.text}
          ${isFavorited 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-green-400 dark:border-green-500 text-green-700 dark:text-green-300 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/40 dark:hover:to-emerald-800/40 hover:border-green-500 shadow-lg shadow-green-200 dark:shadow-green-900/50 hover:shadow-green-300 dark:hover:shadow-green-800/60' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 shadow-md hover:shadow-lg hover:shadow-green-100 dark:hover:shadow-green-900/30'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          ${className}
        `}
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`
            ${config.icon} transition-all duration-300
            ${isFavorited ? 'fill-green-500 text-green-500 scale-110 drop-shadow-sm' : 'text-gray-400 dark:text-gray-500 group-hover:text-green-500'}
            ${isLoading ? 'animate-pulse' : 'group-hover:scale-110'}
          `}
        />
        
        <span className={`font-semibold ${config.text} ${isFavorited ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400'}`}>
          {count}
        </span>
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
        )}
      </button>
    )
  } else {
    // Icon only button - circular
    return (
      <button
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className={`
          group relative rounded-full border-2 transition-all duration-300 transform
          ${config.button} ${config.padding}
          ${isFavorited 
            ? 'bg-gradient-to-br from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600 border-green-400 dark:border-green-500 shadow-lg shadow-green-300 dark:shadow-green-900/50 hover:shadow-xl hover:shadow-green-400 dark:hover:shadow-green-800/60 hover:from-green-600 hover:to-emerald-600 dark:hover:from-green-700 dark:hover:to-emerald-700' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 shadow-md hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg hover:shadow-green-100 dark:hover:shadow-green-900/30'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
          ${className}
        `}
        title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart 
          className={`
            ${config.icon} transition-all duration-300
            ${isFavorited ? 'fill-white text-white drop-shadow-sm' : 'text-gray-400 dark:text-gray-500 group-hover:text-green-500'}
            ${isLoading ? 'animate-pulse' : 'group-hover:scale-110'}
          `}
        />
        
        {/* Floating count badge */}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-green-300">
            {count > 99 ? '99+' : count}
          </span>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </button>
    )
  }
}

export default GenericFavoriteButton 