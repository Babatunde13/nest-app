import { Injectable } from '@nestjs/common';
import { createProduct, Product } from './types';

@Injectable()
export class ProductsService {
  products: Product[] = [
    {
      _id: '1',
      product: 'Product 1',
      price: 5000,
      orders: ['user1'],
    },
    {
      _id: '2',
      product: 'Product 2',
      price: 5000,
      orders: ['user1'],
    },
    {
      _id: '3',
      product: 'Product 3',
      price: 5000,
      orders: ['user2', 'user1'],
    },
  ];

  createProduct(product: createProduct) {
    const newProduct = {
      ...product,
      orders: [],
      _id: 'id1',
    };
    this.products.push(newProduct);
    return product;
  }

  getProducts(product?: string, price?: number) {
    const res = this.products.filter(
      (p) =>
        p.product.toLowerCase().includes((product || '').toLowerCase()) ||
        p.price > (price || 0),
    );
    return res;
  }

  getProduct(id: string) {
    return this.products.find((p) => p._id === id);
  }
}
