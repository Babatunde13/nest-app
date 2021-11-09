export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  orders: CreateOrder[];
  user: string;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
}

export interface CreateOrder {
  quantity: number;
  userId: string;
}
