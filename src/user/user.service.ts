import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { User } from 'src/entities';
import { UserRank } from './user-rank.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async getUserProfileById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ id: id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.persistAndFlush(user);
    return user;
  }

  async setRefreshToken(id: string, hashedRefreshToken: string) {
    this.userRepository.nativeUpdate({ id: id }, { token: hashedRefreshToken });
  }

  async followUser(followingUserId, followedUserId): Promise<any> {
    const followingUser: User = await this.userRepository.findOne(
      { id: followingUserId },
      { populate: ['following', 'follower'] },
    );
    const followedUser: User = await this.userRepository.findOne({
      id: followedUserId,
    });

    followedUser.follower.add(followingUser);
    await this.userRepository.flush();

    return {
      followers: followingUser.follower,
      following: followingUser.following,
    };
  }

  async unfollowUser(unfollowingUserId: string, unfollowedUserId: string) {
    const unfollowingUser: User = await this.userRepository.findOne(
      { id: unfollowingUserId },
      { populate: ['following', 'follower'] },
    );
    const unfollowedUser: User = await this.userRepository.findOne({
      id: unfollowedUserId,
    });

    unfollowingUser.following.remove(unfollowedUser);
    await this.userRepository.flush();
    return {
      followers: unfollowingUser.follower,
      following: unfollowingUser.following,
    };
  }

  async updateLoverRank(userId: string, rank: UserRank): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    wrap(user).assign({ rank: rank });
    await this.userRepository.flush();
    return user;
  }
}
