export interface MenuItem {
  id: number; 
  name: string;
  price: number;
  category: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'delivering' | 'delivered';
  total: number;
  createdAt: Date;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
  } | null;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  password?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
}