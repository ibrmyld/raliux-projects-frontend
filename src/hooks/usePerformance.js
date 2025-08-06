import { useState, useEffect } from 'react';
import { getCacheStats } from '../services/api';

export const usePerformance = () => {
  const [stats, setStats] = useState({
    apiCache: { cacheSize: 0, pendingRequests: 0, hitRate: 'Empty' },
    networkLatency: 0,
    renderTime: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const cacheStats = getCacheStats();
      const performanceEntries = performance.getEntriesByType('navigation');
      const networkLatency = performanceEntries.length > 0 ? performanceEntries[0].responseEnd - performanceEntries[0].requestStart : 0;
      
      setStats({
        apiCache: cacheStats,
        networkLatency: Math.round(networkLatency),
        renderTime: Math.round(performance.now())
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return stats;
};

export default usePerformance; 