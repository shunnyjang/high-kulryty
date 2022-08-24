import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Get('')
  async getAllBaskets(): Promise<any> {
    return this.basketService.getAllBaskets();
  }

  @Post('')
  async createBasket(@Body() createBaseketDto: CreateBasketDto): Promise<any> {
    return this.basketService.createBasket(createBaseketDto);
  }
}
