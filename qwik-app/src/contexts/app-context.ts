import { createContextId, useContext, useContextProvider, useStore } from '@builder.io/qwik';
import { useVisibleTask$ } from '@builder.io/qwik';
import { storage } from '@/lib/storage';
import type { CartItem, Product, ToastMessage, User } from '@/types';

interface AppState {
  cart: CartItem[];
  cartOpen: boolean;
  user: User | null;
  toasts: ToastMessage[];
}

export interface AppContextValue {
  state: AppState;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  toggleCart: (open: boolean) => void;
  setUser: (user: User | null) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  clearCart: () => void;
}

export const AppContext = createContextId<AppContextValue>('app-context');

export const useAppProvider = () => {
  const state = useStore<AppState>({
    cart: [],
    cartOpen: false,
    user: null,
    toasts: [],
  });

  const createId = () =>
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 9);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = createId();
    state.toasts = [...state.toasts, { ...toast, id }];
    setTimeout(() => {
      state.toasts = state.toasts.filter((item) => item.id !== id);
    }, 3200);
  };

  const addToCart = (product: Product) => {
    const existing = state.cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
      state.cart = [...state.cart];
    } else {
      state.cart = [...state.cart, { ...product, quantity: 1 }];
    }
    storage.saveCart(state.cart);
    window.dispatchEvent(new Event('cart-changed'));
  };

  const updateQuantity = (id: number, quantity: number) => {
    state.cart = state.cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    storage.saveCart(state.cart);
    window.dispatchEvent(new Event('cart-changed'));
  };

  const removeItem = (id: number) => {
    state.cart = state.cart.filter((item) => item.id !== id);
    storage.saveCart(state.cart);
    window.dispatchEvent(new Event('cart-changed'));
  };

  const toggleCart = (open: boolean) => {
    state.cartOpen = open;
  };

  const setUser = (user: User | null) => {
    state.user = user;
    if (user) {
      storage.saveUser(user);
    } else {
      storage.clearUser();
    }
    window.dispatchEvent(new Event('user-changed'));
  };

  const clearCart = () => {
    state.cart = [];
    storage.clearCart();
    window.dispatchEvent(new Event('cart-changed'));
  };

  useVisibleTask$(() => {
    state.cart = storage.getCart();
    state.user = storage.getUser();

    const handleCartChange = () => {
      state.cart = storage.getCart();
    };

    const handleUserChange = () => {
      state.user = storage.getUser();
    };

    window.addEventListener('cart-changed', handleCartChange);
    window.addEventListener('user-changed', handleUserChange);

    return () => {
      window.removeEventListener('cart-changed', handleCartChange);
      window.removeEventListener('user-changed', handleUserChange);
    };
  });

  useContextProvider(AppContext, {
    state,
    addToCart,
    updateQuantity,
    removeItem,
    toggleCart,
    setUser,
    addToast,
    clearCart,
  });

  return state;
};

export const useAppContext = () => useContext(AppContext);
