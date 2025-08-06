import { createApiUrl } from '../config/api';

// API Base URL - Raliux Backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://raliux-backend.up.railway.app';

// Request caching ve deduplication
const requestCache = new Map();
const pendingRequests = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Auth context'e erişim için global değişken
let authContextRef = null;

// Auth context'i register et
export const registerAuthContext = (authContext) => {
  authContextRef = authContext;
};

// Cache helpers
const getCacheKey = (url, options) => {
  const method = options?.method || 'GET';
  const body = options?.body || '';
  return `${method}:${url}:${body}`;
};

const getCachedResponse = (cacheKey) => {
  const cached = requestCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
};

const setCachedResponse = (cacheKey, data) => {
  requestCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  // Cleanup old cache entries
  if (requestCache.size > 100) {
    const oldest = Array.from(requestCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)[0];
    requestCache.delete(oldest[0]);
  }
};

// Fallback data - backend çalışmazsa kullanılacak
const fallbackData = {
  posts: [
    {
      id: 1,
      title: "Building the Future with AI",
      slug: "building-future-with-ai",
      excerpt: "Exploring how artificial intelligence is reshaping the way we build software and create digital experiences.",
      content: "# Building the Future with AI\n\nArtificial Intelligence is no longer a distant dream—it's here, and it's transforming everything we know about software development.",
      author: "Tech Explorer",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      category: "Technology",
      tags: ["AI", "Development", "Future"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      views: 1250,
      likes: 142,
      commentsCount: 23,
      comments: []
    },
    {
      id: 2,
      title: "Modern Web Development Best Practices",
      slug: "modern-web-development-best-practices",
      excerpt: "Essential practices every web developer should follow in 2024 to build scalable and maintainable applications.",
      content: "# Modern Web Development Best Practices\n\nWeb development has evolved significantly over the past few years. Here are the essential practices you should follow in 2024.",
      author: "Code Master",
      publishedAt: "2024-01-12",
      readTime: "8 min read",
      category: "Web Development",
      tags: ["Best Practices", "Performance", "Security"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      views: 890,
      likes: 89,
      commentsCount: 15,
      comments: []
    }
  ],
  categories: ["All", "Technology", "Web Development", "3D Graphics", "Cybersecurity", "AI & Machine Learning"]
};

// Token'ı almak için yardımcı fonksiyon
const getAuthToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (token) return token;
    // Fallback: user objesi içinde token varsa kullan
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      return userObj.token;
    }
  } catch (e) {
    console.warn('Token access error (storage not available):', e);
  }
  return null;
};

// Token refresh ve retry mekanizması
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

// Optimized fetch function with caching and deduplication
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('/api') 
    ? `${API_BASE_URL}${endpoint}` 
    : `${API_BASE_URL}${endpoint}`;
    
  const method = options.method || 'GET';
  const cacheKey = getCacheKey(url, options);
  
  // Check cache for GET requests
  if (method === 'GET') {
    const cached = getCachedResponse(cacheKey);
    if (cached) {
      return {
        ok: true,
        status: 200,
        statusText: 'OK (Cached)',
        headers: new Headers(),
        json: () => Promise.resolve(cached),
        clone: () => ({ json: () => Promise.resolve(cached) })
      };
    }
    
    // Check for pending identical requests
    if (pendingRequests.has(cacheKey)) {
      return pendingRequests.get(cacheKey);
    }
  }
  
  // Create the actual request
  const requestPromise = performRequest();
  
  // Store pending request for deduplication
  if (method === 'GET') {
    pendingRequests.set(cacheKey, requestPromise);
    // Clean up after request completes
    requestPromise.finally(() => {
      pendingRequests.delete(cacheKey);
    });
  }
  
  async function performRequest() {
    try {
      const token = getAuthToken();
      
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          // Performance headers
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': method === 'GET' ? 'max-age=300' : 'no-cache',
          ...options.headers,
        },
        credentials: 'include',
        // Connection optimization
        keepalive: true,
        ...options,
      };

      const response = await fetch(url, config);
      
      // Handle 401 errors with token refresh
      if (response.status === 401) {
        console.log('🚫 API: 401 Unauthorized detected');
        
        if (!endpoint.includes('/auth/refresh') && token && authContextRef) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              return performRequest();
            });
          }

          isRefreshing = true;

          try {
            const newToken = await authContextRef.refreshToken();
            if (newToken) {
              processQueue(null, newToken);
              return performRequest();
            } else {
              processQueue(new Error('Token refresh failed'), null);
              authContextRef.handle401Error();
              throw new Error('Authentication failed');
            }
          } catch (error) {
            processQueue(error, null);
            authContextRef.handle401Error();
            throw error;
          } finally {
            isRefreshing = false;
          }
        } else {
          if (authContextRef) {
            authContextRef.handle401Error();
          }
          throw new Error('Authentication failed');
        }
      }
      
      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch (e) {
          // JSON parse hatası, varsayılan mesajı kullan
        }
        
        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }
      
      // Cache successful GET responses and return data-ready response
      if (method === 'GET') {
        const responseClone = response.clone();
        const responseData = await responseClone.json();
        setCachedResponse(cacheKey, responseData);
        
        // Return response with pre-parsed data
        return {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          json: () => Promise.resolve(responseData),
          clone: () => ({ json: () => Promise.resolve(responseData) })
        };
      }
      
      return response;
      
    } catch (error) {
      // Network error handling
      if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
        console.warn('Network error - Backend may be offline:', error.message);
        const networkError = new Error('Unable to connect to server. Please check your connection.');
        networkError.isNetworkError = true;
        throw networkError;
      }
      
      // CORS error handling
      if (error.message.includes('CORS') || error.message.includes('Access-Control-Allow-Origin')) {
        console.warn('CORS error detected:', error.message);
        const corsError = new Error('Server connection blocked. Please check server configuration.');
        corsError.isCorsError = true;
        throw corsError;
      }
      
      console.warn('Backend API Error:', error.message);
      throw error;
    }
  }
  
  return requestPromise;
};

// Cache management functions
export const clearApiCache = () => {
  requestCache.clear();
  pendingRequests.clear();
  console.log('🧹 API cache cleared');
};

export const invalidateCache = (pattern) => {
  if (typeof pattern === 'string') {
    // Remove entries that match the pattern
    for (const [key] of requestCache.entries()) {
      if (key.includes(pattern)) {
        requestCache.delete(key);
      }
    }
  } else if (Array.isArray(pattern)) {
    // Remove entries that match any pattern in the array
    for (const [key] of requestCache.entries()) {
      if (pattern.some(p => key.includes(p))) {
        requestCache.delete(key);
      }
    }
  }
  console.log(`🗑️ Cache invalidated for pattern: ${pattern}`);
};

// Performance monitoring
export const getCacheStats = () => {
  return {
    cacheSize: requestCache.size,
    pendingRequests: pendingRequests.size,
    hitRate: requestCache.size > 0 ? 'Available' : 'Empty'
  };
};

// Fallback helper function  
const withFallback = async (apiCall, fallbackData) => {
  try {
    const response = await apiCall();
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('API call failed, using fallback data:', error.message);
    
    if (error.isNetworkError || error.isCorsError) {
      console.log('📡 Network issue detected - using cached/fallback data');
      return fallbackData;
    }
    
    throw error;
  }
};

// Favoriler API
export const favoritesApi = {
  // Kullanıcının favori yazılarını getir
  getFavorites: async () => {
    const response = await apiRequest('/api/favorites');
    return await response.json();
  },
  
  // Favori durumunu kontrol et
  checkFavoriteStatus: async (postId) => {
    const response = await apiRequest(`/api/favorites/check/${postId}`);
    return await response.json();
  },
  
  // Favori durumunu değiştir (ekle/çıkar)
  toggleFavorite: async (postId) => {
    try {
      const response = await apiRequest('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post_id: parseInt(postId) }),
      });
      return await response.json();
    } catch (error) {
      console.error('Toggle favorite error:', error);
      throw error;
    }
  },
};

// Blog API
export const blogApi = {
  // Tüm blog yazılarını getir
  getPosts: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.category && params.category !== 'All') {
        queryParams.append('category', params.category);
      }
      if (params.search) {
        queryParams.append('search', params.search);
      }
      
      const endpoint = queryParams.toString() 
        ? `/api/posts?${queryParams.toString()}`
        : '/api/posts';
      
      const response = await apiRequest(endpoint);
      return await response.json();
    } catch (error) {
      console.warn('Using fallback data for posts');
      // Fallback data kullan
      let posts = fallbackData.posts;
      
      if (params.category && params.category !== 'All') {
        posts = posts.filter(post => post.category === params.category);
      }
      
      if (params.search) {
        posts = posts.filter(post =>
          post.title.toLowerCase().includes(params.search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(params.search.toLowerCase())
        );
      }
      
      return posts;
    }
  },
  
  // Tek bir blog yazısını getir
  getPost: async (slug) => {
    try {
      const response = await apiRequest(`/api/posts/${slug}`);
      return await response.json();
    } catch (error) {
      console.warn('Using fallback data for post');
      const post = fallbackData.posts.find(p => p.slug === slug);
      if (!post) throw new Error('Post not found');
      return post;
    }
  },
  
  // Kategorileri getir
  getCategories: async () => {
    try {
      const response = await apiRequest('/api/categories');
      return await response.json();
    } catch (error) {
      console.warn('Using fallback data for categories');
      return { categories: fallbackData.categories };
    }
  },
};

// Yorumlar API
export const commentsApi = {
  // Bir yazının yorumlarını getir
  getComments: async (postId) => {
    const response = await apiRequest(`/api/comments/${postId}`);
    return await response.json();
  },
  
  // Yorum ekle
  addComment: async (commentData) => {
    const response = await apiRequest('/api/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
    return await response.json();
  },
};

// İstatistikler API
export const statsApi = {
  getStats: async () => {
    const response = await apiRequest('/api/stats');
    return await response.json();
  },
};

// Newsletter API
export const newsletterApi = {
  subscribe: async (email) => {
    const response = await apiRequest('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
    return await response.json();
  },
};

// Enhanced API Service Class
class ApiService {
  static async getPosts(category = null, search = null) {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    
    return withFallback(
      () => apiRequest(`/api/posts?${params}`),
      fallbackData.posts.filter(post => {
        if (category && category !== 'All' && post.category !== category) return false;
        if (search && !post.title.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      })
    );
  }

  static async getPost(slug) {
    return withFallback(
      () => apiRequest(`/api/posts/${slug}`),
      fallbackData.posts.find(post => post.slug === slug) || null
    );
  }

  static async getCategories() {
    return withFallback(
      () => apiRequest('/api/categories'),
      { categories: fallbackData.categories }
    );
  }

  static async addComment(postId, comment) {
    // Invalidate related cache after mutation
    setTimeout(() => {
      invalidateCache([`/api/posts/${postId}`, '/api/posts?']);
    }, 100);
    
    return apiRequest(`/api/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(comment),
    });
  }

  static async subscribeNewsletter(email) {
    return apiRequest('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  static async getStats() {
    return withFallback(
      () => apiRequest('/api/stats'),
      { total_posts: fallbackData.posts.length, total_categories: fallbackData.categories.length }
    );
  }
}

export default ApiService; 