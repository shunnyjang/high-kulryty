import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Basket } from 'src/entities';
import { UserType } from 'src/user/user-type.enum';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';

@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  // @Get()
  // async getAllBaskets(@Query('type') usertype: UserType): Promise<Basket[]> {
  //   return this.basketService.getAllBaskets(usertype);
  // }

  @Post('')
  async createBasket(@Body() createBaseketDto: CreateBasketDto): Promise<any> {
    return this.basketService.createBasket(createBaseketDto);
  }
}
