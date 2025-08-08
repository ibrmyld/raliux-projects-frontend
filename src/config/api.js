// API Configuration
export const API_CONFIG = {
  // Backend URL (FastAPI)
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'https://raliux-projects-backend.up.railway.app',
  
  // Local fallback URL for development
  LOCAL_BACKEND_URL: 'http://localhost:8000',
  
  // Connection timeout
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  
  // Endpoints
  endpoints: {
    // Health check
    health: '/api/public/health',
    
    // Products
    products: '/api/public/products',
    productBySlug: (slug) => `/api/public/products/${slug}`,
    
    // Categories
    categories: '/api/public/categories',
  }
};

// Environment detection
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

export default API_CONFIG;
