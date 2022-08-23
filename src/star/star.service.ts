import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { StarUser, User } from 'src/entities';
import { CreateStarDto } from './dto/create-star.dto';

@Injectable()
export class StarService {
  constructor(
    @InjectRepository(StarUser)
    private readonly starRepository: EntityRepository<StarUser>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async registerNewStar(createStarDto: CreateStarDto): Promise<StarUser> {
    const { userId, ...starUserInfo } = createStarDto;
    const user = await this.userRepository.findOne({ id: userId });

    const starUser = this.starRepository.create({
      user,
      ...starUserInfo,
    });
    this.starRepository.persistAndFlush(starUser);
    return starUser;
  }
}
