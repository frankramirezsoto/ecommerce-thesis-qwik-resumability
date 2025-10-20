import { Product } from '@/types';

const API_BASE = 'https://fakestoreapi.com';

export const api = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products`);
    return res.json();
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    return res.json();
  },

  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE}/products/categories`);
    return res.json();
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products/category/${category}`);
    return res.json();
  },
};
