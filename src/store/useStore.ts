import { create } from 'zustand';
import { CartItem, MenuItem, Order, User } from '../types';

interface Store {
  cart: CartItem[];
  user: User | null;
  orders: Order[];
  menuItems: MenuItem[];
  isLoading: boolean;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  addOrder: (order: Order) => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createGuestOrder: (customerInfo: { name: string; phone: string; address: string }) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: number, updates: Partial<MenuItem>) => void;
  removeMenuItem: (id: number) => void;
  getUsers: () => User[];
  updateUser: (userId: string, data: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  resetPassword: (userId: string) => void;
  updateOrderStatus: (orderId: string, newStatus: 'pending' | 'preparing' | 'delivering' | 'delivered') => void;
}

// Simulated user data
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Customer',
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer',
  },
];

export const useStore = create<Store>((set, get) => ({
  cart: [],
  user: null,
  orders: [],
  menuItems: [],
  isLoading: false,

  // Adicionar item ao carrinho
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

  // Remover item do carrinho
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),

  // Atualizar quantidade de item no carrinho
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),

  // Limpar carrinho
  clearCart: () => set({ cart: [] }),

  // Definir usuário
  setUser: (user) => set({ user, isLoading: false }),

  // Definir estado de carregamento
  setLoading: (loading) => set({ isLoading: loading }),

  // Adicionar pedido
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),

  // Fazer login simulando uma API
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
      if (user) {
        set({ user, isLoading: false });
        return true;
      }
      set({ isLoading: false });
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      set({ isLoading: false });
      return false;
    }
  },

  // Registrar novo usuário
  register: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const newUser: User = {
        id: Math.random().toString(),
        name,
        email,
        password,
        role: 'customer',
      };
      MOCK_USERS.push(newUser);
      set({ user: newUser, isLoading: false });
      return true;
    } catch (error) {
      console.error('Erro no registro:', error);
      set({ isLoading: false });
      return false;
    }
  },

  // Logout
  logout: () => {
    set({ user: null, isLoading: false });
  },

  // Criar pedido como visitante
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

  // Atualizar status do pedido
  updateOrderStatus: (orderId, newStatus) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ),
    })),

  // Adicionar item ao cardápio
  addMenuItem: (item) =>
    set((state) => ({ menuItems: [...state.menuItems, item] })),

  // Atualizar item do cardápio
  updateMenuItem: (id, updates) =>
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    })),

  // Remover item do cardápio
  removeMenuItem: (id) =>
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    })),

  // Gerenciar usuários
  getUsers: () => MOCK_USERS,

  updateUser: (userId, data) => {
    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...data };
    }
  },

  deleteUser: (userId) => {
    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      MOCK_USERS.splice(userIndex, 1);
    }
  },

  resetPassword: (userId) => {
    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex].password = 'password123'; // Simulação de redefinição de senha
    }
  },
}));
