import API_CONFIG from '../config/api.js';

// Connection status
let isOnline = true;
let backendConnected = false;

// Mock data for offline mode
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Gaming Laptop',
    description: 'High-performance gaming laptop with latest GPU and processor. Perfect for gaming and professional work.',
    short_description: 'Latest gaming laptop with RGB keyboard',
    price: 25999.99,
    sale_price: 22999.99,
    currency: 'TRY',
    slug: 'premium-gaming-laptop',
    featured_image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
    gallery_images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600'
    ],
    is_featured: true,
    is_digital: false,
    stock_quantity: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation and premium sound quality.',
    short_description: 'Noise-cancelling wireless headphones',
    price: 899.99,
    sale_price: null,
    currency: 'TRY',
    slug: 'wireless-bluetooth-headphones',
    featured_image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    gallery_images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'
    ],
    is_featured: true,
    is_digital: false,
    stock_quantity: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring, GPS, and long battery life.',
    short_description: 'Advanced smartwatch with health features',
    price: 1299.99,
    sale_price: 999.99,
    currency: 'TRY',
    slug: 'smart-watch-pro',
    featured_image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600',
    gallery_images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600'
    ],
    is_featured: true,
    is_digital: false,
    stock_quantity: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with premium switches and customizable lighting.',
    short_description: 'RGB mechanical keyboard',
    price: 599.99,
    sale_price: null,
    currency: 'TRY',
    slug: 'mechanical-gaming-keyboard',
    featured_image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
    gallery_images: [
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600'
    ],
    is_featured: false,
    is_digital: false,
    stock_quantity: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Ultra-Wide Monitor',
    description: '34-inch ultra-wide monitor with 4K resolution and HDR support.',
    short_description: '34-inch 4K ultra-wide monitor',
    price: 3499.99,
    sale_price: 2999.99,
    currency: 'TRY',
    slug: 'ultra-wide-monitor',
    featured_image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600',
    gallery_images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'
    ],
    is_featured: true,
    is_digital: false,
    stock_quantity: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Gaming Mouse RGB',
    description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
    short_description: 'RGB gaming mouse with high precision',
    price: 299.99,
    sale_price: null,
    currency: 'TRY',
    slug: 'gaming-mouse-rgb',
    featured_image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600',
    gallery_images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=600'
    ],
    is_featured: false,
    is_digital: false,
    stock_quantity: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const MOCK_CATEGORIES = [
  { id: '1', name: 'Gaming', slug: 'gaming', description: 'Gaming equipment and accessories', color: '#3b82f6', icon: '🎮', post_count: 5 },
  { id: '2', name: 'Audio', slug: 'audio', description: 'Headphones and speakers', color: '#8b5cf6', icon: '🎧', post_count: 3 },
  { id: '3', name: 'Monitors', slug: 'monitors', description: 'Computer monitors and displays', color: '#06d6a0', icon: '🖥️', post_count: 2 },
  { id: '4', name: 'Wearables', slug: 'wearables', description: 'Smart watches and fitness trackers', color: '#f59e0b', icon: '⌚', post_count: 1 }
];

// Network detection
function detectNetwork() {
  isOnline = navigator.onLine;
  return isOnline;
}

// Event listeners for network status
window.addEventListener('online', () => {
  isOnline = true;
  console.log('🌐 Network connected - switching to online mode');
});

window.addEventListener('offline', () => {
  isOnline = false;
  console.log('📱 Network disconnected - switching to offline mode');
});

// Helper function for API requests
async function apiRequest(endpoint, options = {}) {
  const baseURL = API_CONFIG.BACKEND_URL;
  const url = `${baseURL}${endpoint}`;
  
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: API_CONFIG.TIMEOUT,
    ...options
  };

  try {
    console.log(`🚀 API Request: ${url}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), defaultOptions.timeout);
    
    const response = await fetch(url, {
      ...defaultOptions,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    backendConnected = true;
    console.log(`✅ API Success: ${endpoint}`);
    return data;
    
  } catch (error) {
    backendConnected = false;
    console.error(`❌ API Error (${endpoint}):`, error.message);
    throw error;
  }
}

// Retry logic for failed requests
async function apiRequestWithRetry(endpoint, options = {}, retryCount = API_CONFIG.RETRY_COUNT) {
  try {
    return await apiRequest(endpoint, options);
  } catch (error) {
    if (retryCount > 0 && isOnline) {
      console.log(`🔄 Retrying API request (${retryCount} attempts left)...`);
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.RETRY_DELAY));
      return apiRequestWithRetry(endpoint, options, retryCount - 1);
    }
    throw error;
  }
}

// API Service
export const apiService = {
  // Connection status
  isOnline: () => detectNetwork(),
  isBackendConnected: () => backendConnected,
  
  // Health check
  async healthCheck() {
    try {
      const response = await apiRequest(API_CONFIG.endpoints.health);
      backendConnected = true;
      return response;
    } catch (error) {
      backendConnected = false;
      throw error;
    }
  },
  
  // Products
  async getProducts(params = {}) {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const endpoint = queryParams 
        ? `${API_CONFIG.endpoints.products}?${queryParams}`
        : API_CONFIG.endpoints.products;
      
      const response = await apiRequestWithRetry(endpoint);
      return response;
      
    } catch (error) {
      console.log('📱 Using offline mode - returning mock products');
      
      // Apply basic filtering to mock data
      let products = [...MOCK_PRODUCTS];
      
      if (params.featured !== undefined) {
        products = products.filter(p => p.is_featured === params.featured);
      }
      
      if (params.search) {
        const search = params.search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(search) || 
          p.description.toLowerCase().includes(search)
        );
      }
      
      // Basic pagination
      const page = parseInt(params.page) || 1;
      const per_page = parseInt(params.per_page) || 12;
      const start = (page - 1) * per_page;
      const paginatedProducts = products.slice(start, start + per_page);
      
      return {
        products: paginatedProducts,
        total: products.length,
        page,
        per_page,
        total_pages: Math.ceil(products.length / per_page)
      };
    }
  },
  
  async getProductBySlug(slug) {
    try {
      const response = await apiRequestWithRetry(API_CONFIG.endpoints.productBySlug(slug));
      return response;
      
    } catch (error) {
      console.log('📱 Using offline mode - returning mock product');
      const product = MOCK_PRODUCTS.find(p => p.slug === slug);
      if (!product) {
        throw new Error('Product not found');
      }
      return product;
    }
  },
  
  // Categories
  async getCategories() {
    try {
      const response = await apiRequestWithRetry(API_CONFIG.endpoints.categories);
      return response;
      
    } catch (error) {
      console.log('📱 Using offline mode - returning mock categories');
      return MOCK_CATEGORIES;
    }
  }
};

// Connection status hooks for React components
export const useConnectionStatus = () => {
  return {
    isOnline: detectNetwork(),
    isBackendConnected: backendConnected
  };
};

export default apiService;
