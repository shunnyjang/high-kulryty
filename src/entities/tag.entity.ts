import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Tag {
  @PrimaryKey({ autoincrement: false })
  name: string;
}
