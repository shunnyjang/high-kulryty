import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Basket, User, Product } from 'src/entities';
import { CreateBasketDto } from './dto/create-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: EntityRepository<Basket>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
  ) {}

  // async getAllBaskets(usertype: UserType): Promise<Basket[]> {
  //   return (await this.basketRepository.findAll({ user: { usertype } })).join({
  //     user: {},
  //   });
  // }

  async createBasket(createBasketDto: CreateBasketDto): Promise<any> {
    const { userId, thumbnail, productIds } = createBasketDto;

    const user = await this.userRepository.findOne({ id: userId });
    const basket = new Basket(user, thumbnail);
    for (const productId of productIds) {
      const product = await this.productRepository.findOne({ id: productId });
      basket.products.add(product);
    }
    await this.basketRepository.persistAndFlush(basket);
    return basket;
  }
}
