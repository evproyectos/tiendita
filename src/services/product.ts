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
