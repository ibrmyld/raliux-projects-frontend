const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://raliux-backend.up.railway.app';

// API URL oluştur
export const createApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

// Safe localStorage access
const getToken = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
  } catch (error) {
    console.warn('localStorage access denied:', error);
  }
  return null;
};

const removeTokens = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  } catch (error) {
    console.warn('localStorage access denied:', error);
  }
};

// API isteği için yardımcı fonksiyon
export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Token varsa Authorization header'ını ekle
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Token süresi dolmuşsa logout yap
    if (response.status === 401) {
      removeTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }

    return response;
  } catch (error) {
    console.error('API isteği hatası:', error);
    throw error;
  }
};

// Kullanıcı bilgilerini getir
export const getCurrentUser = async () => {
  try {
    const response = await apiRequest('/api/auth/me');
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    console.error('Kullanıcı bilgileri alınırken hata:', error);
    return null;
  }
}; 