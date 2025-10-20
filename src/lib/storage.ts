import { CartItem, Order, User } from '@/types';

const CART_KEY = 'ecommerce_cart';
const ORDERS_KEY = 'ecommerce_orders';
const USER_KEY = 'ecommerce_user';

export const storage = {
  // Cart
  getCart: (): CartItem[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  },

  saveCart: (cart: CartItem[]): void => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  clearCart: (): void => {
    localStorage.removeItem(CART_KEY);
  },

  // Orders
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  },

  saveOrder: (order: Order): void => {
    const orders = storage.getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  // User
  getUser: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  saveUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },
};
