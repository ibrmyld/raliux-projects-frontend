import { useEffect } from 'react';

// Google Analytics helper functions
const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Initialize Google Analytics
export const initGA = (measurementId) => {
  if (typeof window === 'undefined') return;
  
  try {
    // Create script tag for Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  } catch (error) {
    console.warn('Analytics initialization failed:', error);
  }
};

// Track page views
export const trackPageView = (path, title) => {
  try {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'GA_MEASUREMENT_ID';
    gtag('config', measurementId, {
      page_path: path,
      page_title: title,
    });
  } catch (error) {
    console.warn('Page view tracking failed:', error);
  }
};

// Track events
export const trackEvent = (action, category, label, value) => {
  try {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } catch (error) {
    console.warn('Event tracking failed:', error);
  }
};

// Track blog post read
export const trackBlogRead = (postTitle, category, readTime) => {
  trackEvent('read_blog_post', 'Blog', postTitle, {
    category: category,
    reading_time: readTime,
  });
};

// Track search
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('search', 'Blog', searchTerm, resultsCount);
};

// Track user engagement
export const trackEngagement = (action, element) => {
  trackEvent(action, 'Engagement', element);
};

// Custom hook for analytics
const useAnalytics = () => {
  useEffect(() => {
    try {
      // Initialize analytics if measurement ID is available
      const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      if (measurementId && measurementId !== 'GA_MEASUREMENT_ID') {
        initGA(measurementId);
      }
    } catch (error) {
      console.warn('Analytics hook initialization failed:', error);
    }
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackBlogRead,
    trackSearch,
    trackEngagement,
  };
};

export default useAnalytics; 