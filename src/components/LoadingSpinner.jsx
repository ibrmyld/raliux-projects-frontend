import React from 'react';
// Removed motion import

const LoadingSpinner = ({ size = 'medium', text = 'Yükleniyor...', className = '' }) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  const containerClasses = {
    small: 'p-4',
    medium: 'p-8',
    large: 'p-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]} ${className}`}>
      {/* Animated Spinner */}
      <div className="relative">
        {/* Outer Ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-200 dark:border-dark-600 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-4 border-transparent border-t-primary-500 border-r-primary-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Loading Text */}
      {text && (
        <motion.p
          className="mt-4 text-sm text-gray-600 dark:text-gray-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

// Skeleton Loading Component
export const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={`bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 overflow-hidden ${className}`}>
      {/* Image Skeleton */}
      <div className="h-52 md:h-60 bg-gray-200 dark:bg-dark-700 animate-pulse" />
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-4">
        {/* Meta */}
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-16 animate-pulse" />
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-full animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded w-3/4 animate-pulse" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-2/3 animate-pulse" />
        </div>
        
        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-full w-20 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-full w-12 animate-pulse" />
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-dark-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 dark:bg-dark-700 rounded-full animate-pulse" />
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-20 animate-pulse" />
              <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded w-12 animate-pulse" />
            </div>
          </div>
          <div className="h-10 bg-gray-200 dark:bg-dark-700 rounded-xl w-20 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Grid of skeleton cards
export const SkeletonGrid = ({ count = 6, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default LoadingSpinner; 