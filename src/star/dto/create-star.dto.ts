import { User } from 'src/entities';
import { UserType } from 'src/user/user-type.enum';

export class CreateStarDto {
  userId: string;
  type?: UserType;
  title: string;
}
