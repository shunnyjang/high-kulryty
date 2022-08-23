import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Basket } from './basket.entity';
import { User } from './user.entity';

@Entity()
export class Favor {
  @ManyToOne({
    primary: true,
    entity: 'User',
  })
  user: User;

  @ManyToOne({
    primary: true,
    entity: 'Basket',
  })
  basekt: Basket;

  @Property({ onCreate: () => new Date() })
  creatd_at: Date;
}
