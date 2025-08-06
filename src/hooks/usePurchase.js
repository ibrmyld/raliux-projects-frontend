import { useState, useEffect } from 'react';
import { createApiUrl } from '../config/api';

export const usePurchaseStatus = (productId) => {
  const [purchaseStatus, setPurchaseStatus] = useState({
    is_purchased: false,
    can_download: false,
    loading: true,
    error: null
  });

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (!productId) {
        setPurchaseStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setPurchaseStatus(prev => ({ ...prev, loading: false }));
        return;
      }

      try {
        const response = await fetch(createApiUrl(`/api/products/${productId}/purchase-status`), {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setPurchaseStatus({
            is_purchased: data.is_purchased,
            can_download: data.can_download,
            purchase_date: data.purchase_date,
            loading: false,
            error: null
          });
        } else {
          setPurchaseStatus(prev => ({ 
            ...prev, 
            loading: false,
            error: 'Failed to check purchase status'
          }));
        }
      } catch (error) {
        console.error('Purchase status error:', error);
        setPurchaseStatus(prev => ({ 
          ...prev, 
          loading: false,
          error: error.message
        }));
      }
    };

    checkPurchaseStatus();
  }, [productId]);

  return purchaseStatus;
}; 