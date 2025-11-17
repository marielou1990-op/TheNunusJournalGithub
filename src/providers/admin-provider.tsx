import React, { useState } from 'react';
import { Product } from '@/lib/products';
import { getCurrentCatalog } from '@/lib/products';
import { Order } from '@/types/order';
import { AdminContext } from '@/contexts/admin-context';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from current catalog (unified source) and keep in sync with localStorage for storefront
  const [products, setProducts] = useState<Product[]>(() => getCurrentCatalog() as Product[]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const syncCatalog = (list: Product[]) => {
    try {
      localStorage.setItem('catalog_products', JSON.stringify(list));
    } catch {
      // ignore localStorage write failures in MVP
    }
  };

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = { ...newProduct, id: Date.now().toString() } as Product;
    const updated = [...products, product];
    setProducts(updated);
    syncCatalog(updated);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    const updated = products.map(p => (p.id === id ? { ...p, ...updates } as Product : p));
    setProducts(updated);
    syncCatalog(updated);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    syncCatalog(updated);
  };

  const addOrder = (newOrder: Omit<Order, 'id'>) => {
    const order: Order = { ...newOrder, id: `ORD-${Date.now()}` } as Order;
    setOrders(prev => [...prev, order]);
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, ...updates } : o)));
  };

  return (
    <AdminContext.Provider value={{ products, orders, isLoading, addProduct, updateProduct, deleteProduct, addOrder, updateOrder }}>
      {children}
    </AdminContext.Provider>
  );
};
