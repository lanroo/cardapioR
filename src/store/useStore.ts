import { create } from 'zustand';
import { CartItem, MenuItem, Order, User } from '../types';

interface Store {
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  addOrder: (order: Order) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createGuestOrder: (customerInfo: { name: string; phone: string; address: string }) => void;
}

// Simulated user data (replace with actual backend integration)
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Customer',
    email: 'customer@example.com',
    role: 'customer',
  },
];

export const useStore = create<Store>((set, get) => ({
  cart: [],
  user: null,
  orders: [],
  
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  setUser: (user) => set({ user }),

  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  login: async (email, password) => {
    // Simulate API call
    const user = MOCK_USERS.find((u) => u.email === email);
    if (user) {
      set({ user });
      return true;
    }
    return false;
  },

  register: async (name, email, password) => {
    // Simulate API call
    const newUser: User = {
      id: Math.random().toString(),
      name,
      email,
      role: 'customer',
    };
    MOCK_USERS.push(newUser);
    set({ user: newUser });
    return true;
  },

  logout: () => {
    set({ user: null });
  },

  createGuestOrder: (customerInfo) => {
    const { cart } = get();
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    const order: Order = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      items: cart,
      status: 'pending',
      total,
      createdAt: new Date(),
      customerInfo,
    };

    set((state) => ({
      orders: [...state.orders, order],
      cart: [],
    }));
  },
}));