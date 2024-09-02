import { getProducts, createProduct } from './productService';
import axios from 'axios';

jest.mock('axios');

describe('productService', () => {
  const mockProducts = [
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
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProducts', () => {
    it('should fetch and return products successfully', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockProducts),
      });

      const products = await getProducts();
      expect(products).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.any(Object),
      });
    });

    it('should throw an error if the fetch fails', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        statusText: 'Internal Server Error',
      });

      await expect(getProducts()).rejects.toThrow(
        'Failed to fetch products: Internal Server Error'
      );
    });

    it('should throw an error if an exception occurs', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(getProducts()).rejects.toThrow(
        'An error occurred: Network error'
      );
    });
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      axios.post.mockResolvedValue({ data: mockProducts[0] });

      const result = await createProduct(mockProducts[0]);
      expect(result).toEqual(mockProducts[0]);
      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        mockProducts[0],
        {
          headers: expect.any(Object),
        }
      );
    });

    it('should throw an error if the creation fails', async () => {
      axios.post.mockRejectedValue(new Error('Creation failed'));

      await expect(createProduct(mockProducts[1])).rejects.toThrow(
        'Error al crear el producto.'
      );
    });
  });
});
