import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  cartId: number | null;
  _id: string;
  items: ShoppingCartItem[];
  orderId: string;
  customer: {};
  totalPrice: number;
}
