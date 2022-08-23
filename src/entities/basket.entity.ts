import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Product } from './product.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class Basket {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Property()
  thumbnail: string;

  @ManyToMany({
    entity: 'Product',
    hidden: false,
    nullable: true,
  })
  products = new Collection<Product>(this);

  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @ManyToMany({ entity: () => Tag, nullable: true })
  tags = new Collection<Tag>(this);

  constructor(user: User, thumbnail: string) {
    this.user = user;
    this.thumbnail = thumbnail;
  }
}
