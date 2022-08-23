import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import crypto from 'crypto';
import { Basket } from './basket.entity';
import { Connection } from './connection.entity';
import { Favor } from './favor.entity';

@Entity()
export class User {
  @PrimaryKey({ autoincrement: false })
  id: string;

  @Property()
  password: string;

  @Property()
  profile: string;

  @Property()
  token: string;

  @ManyToMany({
    entity: () => User,
    pivotEntity: () => Connection,
  })
  following = new Collection<User>(this);

  @ManyToMany(() => User, (u) => u.following, { hidden: true })
  followed = new Collection<User>(this);

  @ManyToMany({
    entity: () => Basket,
    pivotEntity: () => Favor,
  })
  likes = new Collection<Basket>(this);

  @Property({ onCreate: () => new Date() })
  date_joined: Date;

  @Property({ onUpdate: () => new Date() })
  updated_at: Date;

  constructor(id: string, password: string) {
    this.id = id;
    this.password = crypto.createHmac('sha256', password).digest('hex');
    this.profile = this.generateProfileEmoji();
  }

  private generateProfileEmoji() {
    const emojis = ['🎃', '🍇', '🍑', '🍠', '🧀', '🥨', '🍖', '🍕', '🧁'];
    return emojis[Math.round(Math.random() * 10) % emojis.length];
  }
}
