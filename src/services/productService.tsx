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
      headers: {
        authorId: '123456',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al crear el producto.');
  }
};
