import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  _id: string;
  items: ShoppingCartItem[];
  orderId: string;
  customer: {};
  totalPrice: number;
}
