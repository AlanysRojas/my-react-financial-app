import { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { Product } from '../types/Product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Error fetching products'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};
