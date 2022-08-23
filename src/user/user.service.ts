import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { User } from 'src/entities';

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
    try {
      return this.userRepository.findOneOrFail({ id: id });
    } catch (error) {
      throw new UnauthorizedException(`가입하지 않은 회원입니다.`);
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    this.userRepository.persistAndFlush(user);
    return user;
  }

  async setRefreshToken(id: string, hashedRefreshToken: string) {
    this.userRepository.nativeUpdate({ id: id }, { token: hashedRefreshToken });
  }
}
