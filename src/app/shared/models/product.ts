export interface Product {
  productId: number | null;
  _id: string;
  title: string;
  category: string;
  price: number;
  imageUrl: string;
  farm: {
    _id: string;
    name: string;
  };
}
