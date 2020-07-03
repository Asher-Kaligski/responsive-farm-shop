import { Shipping } from './shipping';
import { ShoppingCartItem } from './shopping-cart-item';

export interface Order {
  _id: string;
  datePlaced: Date;
  shipping: Shipping;
  shoppingCart: {
    _id: string;
    items: ShoppingCartItem[];
    totalPrice: number;
  };
  customer: {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
