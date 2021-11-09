import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrder, CreateProduct, Product } from './types';
import { v4 as uuidV4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>
  ) {}

  async createProduct(product: CreateProduct, user: string) {
    const newProduct = await this.productModel.create({
        ...product, user
    });
    return newProduct;
  }

  async getProducts(product?: string, price?: number) {
    const query: { product: any, price: any} = {product: null, price: 0 };
    query.product = product && `/${product}/`;
    query.price = price && { $gte: price}
    const products = await this.productModel.find(query)
    return products;
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException(
        'Product not found',
        `The product with the ID ${id} does not exist`
      );
    }
    return product.toJSON();
  }

  async updateProduct(data: IProduct) {
    const product = await this.getProduct(data._id);
    const updatedProduct = await this.productModel.findOneAndUpdate(product._id, { ...product, ...data })
    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const product = this.getProduct(id);
    await this.productModel.deleteOne({ _id: id })
    return product;
  }

//   createOrder(data: { _id: string; order: CreateOrder }) {
//     let product = this.getProduct(data._id);
//     const createdOrder = product.orders.filter(
//       (order) => order.userId === data.order.userId
//     );
//     if (!createdOrder.length) {
//       product.orders.push(data.order);
//       this.products = this.products.map((prod) =>
//         prod._id === product._id ? product : prod
//       );
//     } else {
//       const orders = product.orders.map((order) =>
//         order.userId === data.order.userId ? data.order : order
//       );
//       product = { ...product, orders };
//       this.products = this.products.map((prod) =>
//         prod._id === product._id ? product : prod
//       );
//     }
//     return product;
//   }
}
