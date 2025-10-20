import type { Product } from '@/types';

const API_BASE = 'https://fakestoreapi.com';

export const api = {
  getAllProducts: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },
  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },
  getCategories: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const res = await fetch(`${API_BASE}/products/category/${category}`);
    if (!res.ok) throw new Error('Failed to fetch category products');
    return res.json();
  },
};
