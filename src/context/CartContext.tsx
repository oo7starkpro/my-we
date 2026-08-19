import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, MenuItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, shopId: string, shopName: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  orderType: 'pickup' | 'delivery';
  setOrderType: (type: 'pickup' | 'delivery') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');

  const addToCart = (menuItem: MenuItem, shopId: string, shopName: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.menuItem.id === menuItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { menuItem, shopId, shopName, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.menuItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItem.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        orderType,
        setOrderType,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
