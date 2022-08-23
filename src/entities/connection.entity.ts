import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class Connection {
  @ManyToOne({
    entity: 'User',
    primary: true,
  })
  follower: User;

  @ManyToOne({
    entity: 'User',
    primary: true,
  })
  followed: User;

  @Property({ onCreate: () => new Date() })
  created_at: Date;
}
