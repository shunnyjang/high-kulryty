import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Basket, User, Product, StarUser } from 'src/entities';

@Module({
  imports: [MikroOrmModule.forFeature([Basket, User, Product, StarUser])],
  providers: [BasketService],
  controllers: [BasketController],
})
export class BasketModule {}
