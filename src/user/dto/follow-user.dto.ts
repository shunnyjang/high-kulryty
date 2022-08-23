import { User } from 'src/entities';

export class UserFollowDto {
  follower: User;
  followed: User;
}
