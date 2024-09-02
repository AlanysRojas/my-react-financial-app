import { renderHook, act, waitFor } from '@testing-library/react';
import { useProducts } from '../hooks/useProducts';
import { getProducts } from '../services/productService';
import { Product } from '../types/Product';

jest.mock('../services/productService');

describe('useProducts', () => {
  it('should return products when getProducts succeeds', async () => {
    const mockProducts: Product[] = [
      {
        id: '001',
        name: 'Test Product 1',
        description: 'This is a test product 1',
        logo: 'test-logo-1.png',
        date_release: '2024-11-01',
        date_revision: '2026-09-10',
      },
      {
        id: '002',
        name: 'Test Product 2',
        description: 'This is a test product 2',
        logo: 'test-logo-2.png',
        date_release: '2024-12-01',
        date_revision: '2027-09-10',
      },
      {
        id: '003',
        name: 'Test Product 3',
        description: 'This is a test product 3',
        logo: 'test-logo-3.png',
        date_release: '2024-12-01',
        date_revision: '2028-02-10',
      },
      {
        id: '004',
        name: 'Test Product 4',
        description: 'This is a test product 4',
        logo: 'test-logo-4.png',
        date_release: '2024-12-01',
        date_revision: '2028-02-10',
      },
    ];

    (getProducts as jest.Mock).mockResolvedValueOnce(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it('should set an error when getProducts fails', async () => {
    (getProducts as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Error fetching products');
  });
});
