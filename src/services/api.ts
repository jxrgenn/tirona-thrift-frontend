import { Product, Order } from '../types';
import { PRODUCTS, MOCK_ORDERS } from '../constants';

// Use Vite env var if available, otherwise default to localhost
// Note: In Vite, env vars must start with VITE_
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5001/api';

// Helper to get auth headers with token
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Helper to handle fetch with fallback to mock data if backend is offline
async function fetchWithFallback<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.warn(`Backend unreachable for ${endpoint}, using mock data.`);
    return fallbackData;
  }
}

export const api = {
  getProducts: async (): Promise<Product[]> => {
    return fetchWithFallback('/products', PRODUCTS);
  },

  createOrder: async (order: Partial<Order>): Promise<Order> => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!res.ok) throw new Error('Failed to create order');
      return await res.json();
    } catch (e) {
      // Mock success for frontend preview
      console.warn("Backend offline, simulating order creation");
      return {
        ...order,
        id: `MOCK-${Date.now()}`,
        status: 'PENDING',
        date: new Date().toISOString()
      } as Order;
    }
  },

  updateProduct: async (product: Product): Promise<Product> => {
    try {
      const res = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error('Unauthorized');
      return await res.json();
    } catch (e) {
      console.error('Failed to update product:', e);
      throw e;
    }
  },

  getOrders: async (): Promise<Order[]> => {
    return fetchWithFallback('/orders', MOCK_ORDERS);
  },

  updateOrder: async (id: string, status: string): Promise<void> => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Unauthorized');
    } catch (e) {
      console.error('Failed to update order:', e);
      throw e;
    }
  }
};