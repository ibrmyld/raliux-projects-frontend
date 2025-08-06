import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  loading = 'lazy',
  quality = 80,
  placeholder = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    if (!src) return;

    // Create optimized image URLs for different screen sizes
    const createOptimizedUrl = (originalSrc, targetWidth) => {
      // If it's an Unsplash image, optimize it
      if (originalSrc.includes('unsplash.com')) {
        return `${originalSrc}&w=${targetWidth}&q=${quality}&fm=webp&auto=format`;
      }
      
      // For other images, return as is (you can add other optimizations here)
      return originalSrc;
    };

    // Determine optimal width based on viewport
    const getOptimalWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 480) return 480;
      if (screenWidth <= 768) return 768;
      if (screenWidth <= 1024) return 1024;
      return width || 1200;
    };

    const optimalWidth = getOptimalWidth();
    const optimizedSrc = createOptimizedUrl(src, optimalWidth);
    setCurrentSrc(optimizedSrc);

    // Preload image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsError(true);
    img.src = optimizedSrc;

  }, [src, width, quality]);

  // Placeholder component
  const Placeholder = () => (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <svg 
        className="w-8 h-8 text-gray-400 dark:text-gray-500" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
          clipRule="evenodd" 
        />
      </svg>
    </div>
  );

  // Error fallback
  const ErrorFallback = () => (
    <div 
      className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-gray-500 dark:text-gray-400">
        <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <p className="text-sm">Image failed to load</p>
      </div>
    </div>
  );

  if (isError) {
    return <ErrorFallback />;
  }

  if (!isLoaded && placeholder) {
    return <Placeholder />;
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      width={width}
      height={height}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsError(true)}
      {...props}
    />
  );
};

export default OptimizedImage; 