import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { UserType } from '../user/user-type.enum';
import { User } from './user.entity';

@Entity()
export class StarUser {
  @PrimaryKey({ autoincrement: true })
  id: string;

  @ManyToOne({
    serializer: (user) => user.id,
    serializedName: 'userId',
  })
  user: User;

  @Property({
    type: 'string',
    default: UserType.USER,
  })
  type: UserType;

  @Property()
  title: string;

  @Property({ onCreate: () => new Date() })
  created_at: Date;
}
