export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: number;
  isVeg: boolean;
  isAvailable: boolean;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string[];
  isOpen: boolean;
  menu: MenuItem[];
}

export interface CartItem {
  menuItem: MenuItem;
  shopId: string;
  shopName: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'placed' | 'preparing' | 'ready' | 'delivered';
  totalAmount: number;
  orderType: 'pickup' | 'delivery';
  createdAt: Date;
  estimatedTime: number;
}
