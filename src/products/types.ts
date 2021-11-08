export interface Product {
  _id: string;
  product: string;
  price: number;
  orders: CreateOrder[];
}

export interface CreateProduct {
  product: string;
  price: number;
}

export interface CreateOrder {
  quantity: number;
  userId: number;
}
