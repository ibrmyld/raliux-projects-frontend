import { useState, useEffect } from 'react';
import { createApiUrl } from '../config/api';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (filterParams = {}) => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      
      if (filterParams.category) params.append('category', filterParams.category);
      if (filterParams.search) params.append('search', filterParams.search);
      if (filterParams.min_price) params.append('min_price', filterParams.min_price);
      if (filterParams.max_price) params.append('max_price', filterParams.max_price);
      if (filterParams.sort_by) params.append('sort_by', filterParams.sort_by);
      if (filterParams.sort_order) params.append('sort_order', filterParams.sort_order);

      const url = createApiUrl(`/api/products?${params.toString()}`);
      
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setError(null);
      } else {
        const errorText = await response.text();

        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
    } catch (err) {

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(createApiUrl('/api/product-categories'));
      
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (err) {
      console.error('Categories fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts(filters);
    fetchCategories();
  }, []);

  const applyFilters = (newFilters) => {
    fetchProducts(newFilters);
  };

  return {
    products,
    categories,
    loading,
    error,
    applyFilters,
    refetch: () => fetchProducts(filters)
  };
}; 