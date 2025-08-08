// API Configuration
export const API_CONFIG = {
  // Backend URL (FastAPI) - Production ve Development URLs
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 
    (import.meta.env.PROD 
      ? 'https://raliux-projects-backend.up.railway.app' 
      : 'http://localhost:8000'),
  
  // Base URL for all API requests
  get baseURL() {
    return this.BACKEND_URL;
  },
  
  // Connection timeout (increased for Railway cold starts)
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  
  // Headers
  defaultHeaders: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Endpoints
  endpoints: {
    // Health check
    health: '/api/public/health',
    
    // Products
    products: '/api/public/products',
    productBySlug: (slug) => `/api/public/products/${slug}`,
    productSearch: '/api/public/products/search',
    
    // Categories
    categories: '/api/public/categories',
    
    // Contact
    contact: '/api/public/contact',
    
    // Newsletter
    newsletter: '/api/public/newsletter',
  }
};

// Environment detection
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

export default API_CONFIG;
