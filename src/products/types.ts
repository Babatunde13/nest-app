export interface Product {
  _id: string;
  name: string;
  price: number;
  orders: CreateOrder[];
  user: string;
}

export interface CreateProduct {
  name: string;
  price: number;
  user: string;
}

export interface CreateOrder {
  quantity: number;
  userId: string;
}
