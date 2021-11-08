import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrder, CreateProduct, Product } from './types';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class ProductsService {
  products: Product[] = [
    {
      _id: '1',
      product: 'Product 1',
      price: 5000,
      orders: [],
    },
    {
      _id: '2',
      product: 'Product 2',
      price: 5000,
      orders: [],
    },
    {
      _id: '3',
      product: 'Product 3',
      price: 5000,
      orders: [],
    },
  ];

  createProduct(product: CreateProduct) {
    const newProduct = {
      ...product,
      orders: [],
      _id: uuidV4(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts(product?: string, price?: number) {
    const res = this.products.filter(
      (p) =>
        p.product.toLowerCase().includes(product.toLowerCase() || '') &&
        p.price > price
    );
    return res;
  }

  getProduct(id: string) {
    const product = this.products.find((p) => p._id === id);
    if (!product) {
      throw new NotFoundException(
        'Product not found',
        `The product with the ID ${id} does not exist`
      );
    }
    return product;
  }

  updateProduct(data: Product) {
    const product = this.getProduct(data._id);
    const updatedProduct = { ...product, ...data };
    this.products = this.products.map((prod) =>
      prod._id === product._id ? updatedProduct : prod
    );
    return updatedProduct;
  }

  deleteProduct(id: string) {
    const product = this.getProduct(id);
    this.products = this.products.filter((prod) => prod._id !== product._id);
    return product;
  }

  createOrder(data: { _id: string; order: CreateOrder }) {
    let product = this.getProduct(data._id);
    const createdOrder = product.orders.filter(
      (order) => order.userId === data.order.userId
    );
    if (!createdOrder.length) {
      product.orders.push(data.order);
      this.products = this.products.map((prod) =>
        prod._id === product._id ? product : prod
      );
    } else {
      const orders = product.orders.map((order) =>
        order.userId === data.order.userId ? data.order : order
      );
      product = { ...product, orders };
      this.products = this.products.map((prod) =>
        prod._id === product._id ? product : prod
      );
    }
    return product;
  }
}
