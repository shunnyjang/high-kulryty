import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Basket } from './basket.entity';
import { Favor } from './favor.entity';

@Entity()
export class User {
  @PrimaryKey({ autoincrement: false })
  id: string;

  @Property()
  password: string;

  @Property()
  name: string;

  @Property()
  profile: string;

  @Property({ nullable: true })
  token: string;

  @ManyToMany({
    entity: () => User,
    inversedBy: (u) => u.follower,
    owner: true,
    pivotTable: 'user_following',
    joinColumn: 'following',
    inverseJoinColumn: 'following',
    hidden: true,
  })
  following = new Collection<User>(this);

  @ManyToMany(() => User, (u) => u.following, { hidden: true })
  follower = new Collection<User>(this);

  @ManyToMany({
    entity: () => Basket,
    pivotEntity: () => Favor,
  })
  likes = new Collection<Basket>(this);

  @Property({ onCreate: () => new Date() })
  date_joined: Date;

  @Property({
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updated_at: Date;

  constructor(id: string, password: string, name: string) {
    this.id = id;
    this.password = password;
    this.name = name;
    this.profile = this.generateProfileEmoji();
  }

  private generateProfileEmoji() {
    const emojis = ['🎃', '🍇', '🍑', '🍠', '🧀', '🥨', '🍖', '🍕', '🧁'];
    return emojis[Math.round(Math.random() * 10) % emojis.length];
  }
}
