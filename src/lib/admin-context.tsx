import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/lib/products';

interface AdminContextType {
  products: Product[];
  orders: any[];
  isLoading: boolean;
  // Product Management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  // Order Management
  updateOrderStatus: (orderId: string, status: string) => void;
  // Other admin functions can be added here
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now(), // Simple ID generation for frontend-only implementation
    };
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <AdminContext.Provider value={{
      products,
      orders,
      isLoading,
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};