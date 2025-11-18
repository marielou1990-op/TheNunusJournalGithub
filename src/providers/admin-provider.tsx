import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/products';
import { getCurrentCatalog } from '@/lib/products';
import { Order } from '@/types/order';
import { AdminContext } from '@/contexts/admin-context';
import { sendEmail, emailTemplates } from '@/lib/email';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from current catalog (unified source) and keep in sync with localStorage for storefront
  const [products, setProducts] = useState<Product[]>(() => getCurrentCatalog() as Product[]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load data from API on mount
  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const apiProducts = await response.json();
        setProducts(apiProducts);
      }
    } catch (error) {
      console.error('Failed to load products from API:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const apiOrders = await response.json();
        setOrders(apiOrders);
      }
    } catch (error) {
      console.error('Failed to load orders from API:', error);
    }
  };

  const syncCatalog = (list: Product[]) => {
    try {
      localStorage.setItem('catalog_products', JSON.stringify(list));
    } catch {
      // ignore localStorage write failures in MVP
    }
  };

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        const updated = [...products, createdProduct];
        setProducts(updated);
        syncCatalog(updated);
        return createdProduct;
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Fallback to local state
      const product: Product = { ...newProduct, id: Date.now().toString() } as Product;
      const updated = [...products, product];
      setProducts(updated);
      syncCatalog(updated);
      return product;
    }
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

  const addOrder = async (newOrder: Omit<Order, 'id'>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const createdOrder = await response.json();
        setOrders(prev => [...prev, createdOrder]);

        // Send order confirmation email
        try {
          const emailData = emailTemplates.orderConfirmation(createdOrder);
          await sendEmail({
            to: createdOrder.customer_email,
            subject: emailData.subject,
            html: emailData.html
          });
        } catch (emailError) {
          console.error('Failed to send order confirmation email:', emailError);
          // Don't fail the order creation if email fails
        }

        return createdOrder;
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Error adding order:', error);
      // Fallback to local state
      const order: Order = { ...newOrder, id: `ORD-${Date.now()}` } as Order;
      setOrders(prev => [...prev, order]);
      return order;
    }
  };

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId, ...updates }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prev => prev.map(o => (o.id === orderId ? updatedOrder : o)));

        // Send shipping notification if order status changed to shipped
        if (updates.status === 'shipped' && updatedOrder.tracking_number) {
          try {
            const emailData = emailTemplates.orderShipped(updatedOrder);
            await sendEmail({
              to: updatedOrder.customer_email,
              subject: emailData.subject,
              html: emailData.html
            });
          } catch (emailError) {
            console.error('Failed to send shipping notification email:', emailError);
          }
        }

        return updatedOrder;
      } else {
        throw new Error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      // Fallback to local state
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, ...updates } : o)));
    }
  };

  return (
    <AdminContext.Provider value={{ products, orders, isLoading, addProduct, updateProduct, deleteProduct, addOrder, updateOrder }}>
      {children}
    </AdminContext.Provider>
  );
};
