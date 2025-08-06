import React from 'react'
// Removed motion import
import { Share2 } from 'lucide-react'
import GenericFavoriteButton from './GenericFavoriteButton'
import GenericLikeButton from './GenericLikeButton'

const GenericFloatingActions = ({ 
  targetId, 
  targetType, 
  shareData = null,
  position = "top-right", // "top-right", "top-left", "bottom-right", "bottom-left"
  showShare = true,
  showFavorite = true,
  showLike = true,
  className = ""
}) => {
  
  const handleShare = async () => {
    if (!shareData) return
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareData.title,
          text: shareData.description,
          url: shareData.url
        })
      } catch (error) {

      }
    } else {
      // Fallback - copy to clipboard
      try {
        await navigator.clipboard.writeText(shareData.url)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.error('Failed to copy link:', error)
      }
    }
  }

  // Position classes
  const positionClasses = {
    "top-right": "absolute top-6 right-6",
    "top-left": "absolute top-6 left-6", 
    "bottom-right": "absolute bottom-6 right-6",
    "bottom-left": "absolute bottom-6 left-6"
  }

  return (
    <div className={`${positionClasses[position]} flex space-x-2 z-10 ${className}`}>
      {/* Favorite Button */}
      {showFavorite && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
        >
          <GenericFavoriteButton 
            targetId={targetId} 
            targetType={targetType} 
            size="small" 
            showCount={false} 
          />
        </motion.div>
      )}

      {/* Like Button */}
      {showLike && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
        >
          <GenericLikeButton 
            targetId={targetId} 
            targetType={targetType} 
            size="small" 
            showCount={false} 
          />
        </motion.div>
      )}

      {/* Share Button */}
      {showShare && shareData && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300"
        >
          <button
            onClick={handleShare}
            className="group relative rounded-full w-8 h-8 p-1.5 bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 border-2 border-purple-400 dark:border-purple-500 shadow-lg shadow-purple-300 dark:shadow-purple-900/50 hover:shadow-xl hover:shadow-purple-400 dark:hover:shadow-purple-800/60 hover:from-purple-600 hover:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 transition-all duration-300 transform hover:scale-110 active:scale-95"
            title="Share"
          >
            <Share2 className="w-4 h-4 text-white drop-shadow-sm transition-all duration-300 group-hover:scale-110" />
          </button>
        </motion.div>
      )}
    </div>
  )
}

export default GenericFloatingActions 