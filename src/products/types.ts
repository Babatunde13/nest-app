export interface Product {
  _id: string;
  product: string;
  price: number;
  orders: string[];
}

export interface createProduct {
  product: string;
  price: number;
}
