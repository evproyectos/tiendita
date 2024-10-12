import React, { createContext, useState, ReactNode } from 'react';
import { Product } from '../api/productAPI';

interface CartContextProps {
  cart: Product[];
  addToCart: (product: Product) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
