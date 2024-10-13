import axios from 'axios';
import { Product } from '../types/Product';

const API_URL = 'https://dummyjson.com/products';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<{ products: Product[] }>(API_URL);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductsPaginated = async (productsPerPage: number, skip: number): Promise<{ products: Product[], total: number }> => {
  try {
    const response = await axios.get<{ products: Product[], total: number }>(API_URL + `?limit=${productsPerPage}&skip=${skip}`);
    return { products: response.data.products, total: response.data.total };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};