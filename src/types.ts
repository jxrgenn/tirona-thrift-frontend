
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  tags: string[];
  size: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED';
}

export type ViewState = 'LANDING' | 'SHOP' | 'ADMIN' | 'ADMIN_LOGIN';
