// API Configuration - Raliux Backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://raliux-backend.up.railway.app';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  endpoints: {
    auth: {
      login: '/api/auth/login',
      register: '/api/auth/register',
      profile: '/api/auth/profile',
      changePassword: '/api/auth/change-password',
      uploadAvatar: '/api/auth/upload-avatar'
    },
    posts: {
      list: '/api/posts',
      single: (slug) => `/api/posts/${slug}`,
      categories: '/api/categories',
      stats: '/api/stats'
    },
    comments: {
      list: (postId) => `/api/comments/${postId}`,
      create: '/api/comments',
      update: (commentId) => `/api/comments/${commentId}`,
      delete: (commentId) => `/api/comments/${commentId}`
    },
    favorites: {
      list: '/api/favorites',
      check: (postId) => `/api/favorites/check/${postId}`,
      toggle: '/api/favorites/toggle'
    },
    newsletter: '/api/newsletter'
  }
};

export const createApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export default API_CONFIG; 