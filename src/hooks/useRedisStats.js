import { useState, useEffect } from 'react';
import { apiRequest } from '../services/api';

export const useRedisStats = () => {
  const [stats, setStats] = useState({
    redis_available: false,
    cache_type: 'memory',
    fallback_cache_size: 0,
    redis_memory_used: 'N/A',
    redis_connected_clients: 0,
    loading: true,
    error: null
  });

  const fetchStats = async () => {
    try {
      const response = await apiRequest('/api/cache/stats');
      const data = await response.json();
      setStats({
        ...data,
        loading: false,
        error: null
      });
    } catch (error) {
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    }
  };

  const flushCache = async () => {
    try {
      await apiRequest('/api/cache/flush', { method: 'DELETE' });
      await fetchStats(); // Refresh stats after flush
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const invalidatePattern = async (pattern) => {
    try {
      const response = await apiRequest(`/api/cache/pattern/${pattern}`, { 
        method: 'DELETE' 
      });
      const data = await response.json();
      await fetchStats(); // Refresh stats after invalidation
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    refreshStats: fetchStats,
    flushCache,
    invalidatePattern
  };
};

// Cache status component hook
export const useCacheStatus = () => {
  const { stats } = useRedisStats();
  
  const getCacheStatusColor = () => {
    if (stats.loading) return 'gray';
    if (stats.error) return 'red';
    if (stats.redis_available) return 'green';
    return 'yellow';
  };

  const getCacheStatusText = () => {
    if (stats.loading) return 'Loading...';
    if (stats.error) return 'Error';
    if (stats.redis_available) return 'Redis Active';
    return 'Memory Fallback';
  };

  return {
    statusColor: getCacheStatusColor(),
    statusText: getCacheStatusText(),
    isRedisActive: stats.redis_available,
    cacheType: stats.cache_type
  };
};

export default useRedisStats; 