import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './product.controller';
import { productSchema } from './product.model';
import { ProductsService } from './product.service';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'Product',
        schema: productSchema
    }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
