export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
  }
  
  export const getProducts = async (): Promise<Product[]> => {
    const response = await fetch('/api/products');
    return await response.json();
  };
  