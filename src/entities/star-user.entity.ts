import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity()
export class StarUser {
  @PrimaryKey({ autoincrement: true })
  id: string;

  @ManyToOne({
    serializer: (user) => user.id,
    serializedName: 'userName',
  })
  user: User;

  @Property()
  title: string;

  @Property({ onCreate: () => new Date() })
  created_at: Date;
}
