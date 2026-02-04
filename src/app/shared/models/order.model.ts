import { CheckoutForm, CartItem } from './index';

export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled';

export interface Order {
  id?: number;
  orderNumber: string;
  customerInfo: CheckoutForm;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderDate: string;
  status: OrderStatus;
  paymentMethod?: 'gcash' | 'maya';
  paymentReference?: string;
}
