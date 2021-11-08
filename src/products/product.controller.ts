import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ProductsService } from './product.service';
import { createProduct } from './types';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/')
  createProduct(@Body() body: createProduct) {
    // validate body
    if (!body.product || typeof body.product !== 'string') {
      return {
        status: 'bad',
        message: 'Product name should be a string and is required',
        ok: false,
      };
    }
    body = {
      product: body.product,
      price: body.price,
    };

    if (!body.price || typeof body.price !== 'number') {
      return {
        status: 'bad',
        message: 'Product price should be a string and is required',
        ok: false,
      };
    }
    return this.productsService.createProduct(body);
  }

  @Get('/')
  getProducts(
    @Query('product') product: string,
    @Query('price') price: number
  ) {
    return this.productsService.getProducts(product, price);
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }
}
