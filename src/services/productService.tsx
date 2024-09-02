import axios from 'axios';
import { Product } from '../types/Product';

const API_URL =
  process.env.REACT_APP_API_URL ||
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

const DEFAULT_HEADERS = {
  authorId: process.env.REACT_APP_AUTHOR_ID || '123456',
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL, {
      headers: DEFAULT_HEADERS,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};

export const createProduct = async (product: Product) => {
  try {
    const response = await axios.post(API_URL, product, {
      headers: DEFAULT_HEADERS,
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el producto.');
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const response = await axios.put(API_URL, product, {
      headers: DEFAULT_HEADERS,
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update product: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while updating the product');
    }
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(API_URL, {
      headers: DEFAULT_HEADERS,
    });

    const products: Product[] = response.data;
    const product = products.find(p => p.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  } catch (error) {
    throw new Error('Error al obtener el producto.');
  }
};
