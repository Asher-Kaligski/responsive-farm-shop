import { Product } from './product';

export interface ShoppingCartItem {
  _id: string;
  itemTotalPrice: number;
  quantity: number;
  product: Product;
}
