import { createContext } from 'react';
import { Product } from '@/lib/products';
import { Order } from '@/types/order';

interface AdminContextType {
  products: Product[];
  orders: Order[];
  isLoading: boolean;
  // Product Management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  // Order Management
  addOrder: (order: Omit<Order, 'id'>) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  // Other admin functions can be added here
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);
