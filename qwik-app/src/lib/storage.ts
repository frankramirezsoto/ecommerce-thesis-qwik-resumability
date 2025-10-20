import { isServer } from '@builder.io/qwik/build';
import type { CartItem, Order, User } from '@/types';

const CART_KEY = 'ecommerce_cart';
const ORDERS_KEY = 'ecommerce_orders';
const USER_KEY = 'ecommerce_user';

const safeParse = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Failed to parse storage value', error);
    return fallback;
  }
};

export const storage = {
  getCart: (): CartItem[] => {
    if (isServer) return [];
    return safeParse(localStorage.getItem(CART_KEY), []);
  },
  saveCart: (cart: CartItem[]) => {
    if (isServer) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },
  clearCart: () => {
    if (isServer) return;
    localStorage.removeItem(CART_KEY);
  },
  getOrders: (): Order[] => {
    if (isServer) return [];
    return safeParse(localStorage.getItem(ORDERS_KEY), []);
  },
  saveOrder: (order: Order) => {
    if (isServer) return;
    const orders = storage.getOrders();
    orders.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },
  getUser: (): User | null => {
    if (isServer) return null;
    return safeParse(localStorage.getItem(USER_KEY), null);
  },
  saveUser: (user: User) => {
    if (isServer) return;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearUser: () => {
    if (isServer) return;
    localStorage.removeItem(USER_KEY);
  },
};
