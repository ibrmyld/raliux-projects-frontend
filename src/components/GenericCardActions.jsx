import React from 'react'
// Removed motion import
import { Heart, ThumbsUp, MessageCircle, Share2, Eye, Bookmark } from 'lucide-react'
import GenericFavoriteButton from './GenericFavoriteButton'
import GenericLikeButton from './GenericLikeButton'

const GenericCardActions = ({ 
  targetId, 
  targetType,
  layout = "overlay", // "overlay", "bottom", "side", "corner"
  position = "top-right", // "top-right", "top-left", "bottom-right", "bottom-left"
  showFavorite = true,
  showLike = true,
  showComment = false,
  showShare = false,
  showBookmark = false,
  showStats = true,
  stats = {}, // { likes: 0, comments: 0, views: 0, favorites: 0 }
  onComment = null,
  onShare = null,
  className = "",
  size = "small" // "small", "default", "large"
}) => {

  const handleComment = () => {
    if (onComment) onComment()
  }

  const handleShare = async () => {
    if (onShare) {
      onShare()
    } else {
      // Default share behavior
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.error('Failed to copy link:', error)
      }
    }
  }

  // Layout configurations
  const layoutConfig = {
    overlay: {
      container: "absolute z-10 flex space-x-2",
      button: "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300",
      withStats: false
    },
    bottom: {
      container: "flex items-center justify-between w-full",
      button: "flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
      withStats: true
    },
    side: {
      container: "flex flex-col space-y-2",
      button: "flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors",
      withStats: false
    },
    corner: {
      container: "absolute inset-0 pointer-events-none",
      button: "pointer-events-auto bg-black/60 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-white dark:text-gray-200 text-sm px-3 py-2 flex items-center space-x-1 border border-white/20 dark:border-gray-600/50 hover:bg-black/70 dark:hover:bg-gray-700/90 transition-all duration-300",
      withStats: true
    }
  }

  // Position classes for overlay and corner layouts
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4", 
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  }

  const config = layoutConfig[layout]
  const showStatsInline = config.withStats && showStats

  // Corner layout - special positioning
  if (layout === "corner") {
    return (
      <div className={`${config.container} ${className}`}>
        {/* Favorite - Top Right */}
        {showFavorite && (
          <motion.div 
            className="absolute top-4 right-4"
            whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={config.button}>
              <GenericFavoriteButton 
                targetId={targetId} 
                targetType={targetType} 
                size={size} 
                showCount={false}
              />
            </div>
          </motion.div>
        )}

        {/* Like - Top Left */}
        {showLike && (
          <motion.div 
            className="absolute top-4 left-4"
            whileHover={{ scale: 1.1, rotate: -5, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={config.button}>
              <GenericLikeButton 
                targetId={targetId} 
                targetType={targetType} 
                size={size} 
                showCount={false}
              />
            </div>
          </motion.div>
        )}

        {/* Stats - Bottom */}
        {showStatsInline && (
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {stats.likes > 0 && (
              <motion.div 
                className={config.button}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Heart size={14} />
                </motion.div>
                <span>{stats.likes}</span>
              </motion.div>
            )}
            {stats.comments > 0 && (
              <motion.div 
                className={config.button}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <MessageCircle size={14} />
                </motion.div>
                <span>{stats.comments}</span>
              </motion.div>
            )}
            {stats.views > 0 && (
              <motion.div 
                className={config.button}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.2 }}>
                  <Eye size={14} />
                </motion.div>
                <span>{stats.views}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* Share - Bottom Right */}
        {showShare && (
          <motion.div 
            className="absolute bottom-4 right-4"
            whileHover={{ scale: 1.1, rotate: 10, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <button onClick={handleShare} className={config.button}>
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Share2 size={14} />
              </motion.div>
            </button>
          </motion.div>
        )}
      </div>
    )
  }

  // Other layouts
  const containerClass = layout === "overlay" 
    ? `${config.container} ${positionClasses[position]}`
    : config.container

  return (
    <div className={`${containerClass} ${className}`}>
      {/* Action Buttons */}
      <div className={layout === "bottom" ? "flex items-center space-x-4" : "flex space-x-2"}>
        {showFavorite && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={layout === "overlay" ? config.button : ""}
          >
            <GenericFavoriteButton 
              targetId={targetId} 
              targetType={targetType} 
              size={size} 
              showCount={showStatsInline}
            />
          </motion.div>
        )}

        {showLike && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={layout === "overlay" ? config.button : ""}
          >
            <GenericLikeButton 
              targetId={targetId} 
              targetType={targetType} 
              size={size} 
              showCount={showStatsInline}
            />
          </motion.div>
        )}

        {showComment && (
          <motion.button
            whileHover={{ scale: 1.1, y: -2, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleComment}
            className={`${config.button} group`}
            title="Comments"
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ duration: 0.2 }}>
              <MessageCircle className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-500" />
            </motion.div>
            {showStatsInline && <span className="text-sm">{stats.comments || 0}</span>}
          </motion.button>
        )}

        {showShare && (
          <motion.button
            whileHover={{ scale: 1.1, y: -2, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
            className={`${config.button} group`}
            title="Share"
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <Share2 className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-purple-500" />
            </motion.div>
          </motion.button>
        )}

        {showBookmark && (
          <motion.button
            whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className={`${config.button} group`}
            title="Bookmark"
          >
            <motion.div whileHover={{ scale: 1.2, y: -2 }} transition={{ duration: 0.2 }}>
              <Bookmark className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-yellow-500" />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* Separate Stats (for non-inline layouts) */}
      {!showStatsInline && showStats && layout === "bottom" && (
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          {stats.views > 0 && (
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{stats.views}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default GenericCardActions