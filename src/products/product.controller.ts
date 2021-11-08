import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProduct, CreateOrder, Product } from './types';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() body: CreateProduct) {
    // validate body
    if (!body.product || typeof body.product !== 'string') {
      return {
        status: 'bad',
        message: 'Product name should be a string and is required',
        ok: false,
      };
    }

    if (!body.price || typeof body.price !== 'number') {
      return {
        status: 'bad',
        message: 'Product price should be a string and is required',
        ok: false,
      };
    }

    body = {
      product: body.product,
      price: body.price,
    };

    return this.productsService.createProduct(body);
  }

  @Post('/order/:id')
  createOrder(@Body() order: CreateOrder, @Param('id') id: string) {
    // validate order
    if (!order.quantity || !order.userId) {
      return {
        status: 'bad',
        message: 'quantity of order should be passed ',
        ok: false,
      };
    }

    if (!id) {
      return {
        status: 'bad',
        message: 'Product id should be a string and is required',
        ok: false,
      };
    }

    const data = {
      _id: id,
      order,
    };

    return this.productsService.createOrder(data);
  }

  @Get()
  getProducts(
    @Query('product') product: string,
    @Query('price') price: number
  ) {
    return this.productsService.getProducts(product, price);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() body: Product) {
    return this.productsService.updateProduct({ _id: id, ...body });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
