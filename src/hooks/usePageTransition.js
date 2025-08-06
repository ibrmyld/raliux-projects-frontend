import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    
    // Çok kısa loading süresi - sadece görsel feedback için
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 100); // 100ms - çok hızlı

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isTransitioning };
};

export default usePageTransition; 