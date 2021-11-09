import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetCurrentUserById } from 'src/utils/getUserById.decorator';
import { IProduct } from './product.model';
import { ProductsService } from './product.service';
import { CreateProduct, CreateOrder, Product } from './types';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createProduct(
    @GetCurrentUserById() userId: string,
    @Body() body: CreateProduct
  ) {
    // validate body
    if (!body.name || typeof body.name !== 'string') {
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
      name: body.name,
      price: body.price,
      description: body.description
    };

    return this.productsService.createProduct(body, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/order/:id')
  createOrder(
      @Request() req: any,
      @Body() order: CreateOrder,
      @Param('id') id: string
    ) {
    // validate order
    if (!order.quantity || order.quantity < 0) {
      return {
        status: 'bad',
        message: 'quantity of order should be a valid number and is required.',
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
      order: { ...order, userId: req.user.userId },
    };

    // return this.productsService.createOrder(data);
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

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateProduct(
      @GetCurrentUserById() userId: string,
      @Param('id') id: string,
      @Body() body: IProduct
) {
    return this.productsService.updateProduct({ _id: id, ...body });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteProduct(
      @GetCurrentUserById() userId: string,
      @Param('id') id: string
) {
    return this.productsService.deleteProduct(id);
  }
}
