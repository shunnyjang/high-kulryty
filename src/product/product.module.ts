import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Product } from 'src/entities';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [MikroOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
