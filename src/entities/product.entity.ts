import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Product {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  name: string;

  @Property()
  category: string;

  @Property()
  price: number;

  @Property({ nullable: true })
  thumbnail: string;

  @Property()
  description: string;

  constructor(name: string, category: string, price: number, thumnail: string) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.thumbnail = thumnail;
  }
}
