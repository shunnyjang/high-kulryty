import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Basket, Product, StarUser, User } from 'src/entities';
import { CreateBasketDto } from './dto/create-basket.dto';

@Injectable()
export class BasketService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Basket)
    private readonly basketRepository: EntityRepository<Basket>,
    @InjectRepository(Product)
    private readonly productRepository: EntityRepository<Product>,
    @InjectRepository(User)
    private readonly starRepository: EntityRepository<StarUser>,
  ) {}

  async getAllBaskets(): Promise<any> {
    return this.basketRepository.findAll({ populate: ['products', 'user'] });
  }

  async createBasket(createBasketDto: CreateBasketDto): Promise<any> {
    const { userId, thumbnail, productIds } = createBasketDto;

    const user: User = await this.em.findOne(User, { id: userId });
    const basket = new Basket(user, thumbnail);
    for (const productId of productIds) {
      const product = await this.productRepository.findOne({ id: productId });
      basket.products.add(product);
    }
    await this.basketRepository.persistAndFlush(basket);
    return basket;
  }
}
