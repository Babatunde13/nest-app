import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import envs from './envs';

@Module({
  imports: [
    ProductsModule,
    AuthModule,
    MongooseModule.forRoot(envs.DATABASE_URI)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
