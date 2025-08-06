import React from 'react';

const LoadingTransition = ({ isLoading, children }) => {
  if (!isLoading) {
    return children;
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingTransition; 