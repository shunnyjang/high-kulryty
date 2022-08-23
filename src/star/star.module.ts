import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { StarUser, User } from 'src/entities';
import { UserModule } from 'src/user/user.module';
import { StarController } from './star.controller';
import { StarService } from './star.service';

@Module({
  imports: [MikroOrmModule.forFeature([StarUser, User]), UserModule],
  controllers: [StarController],
  providers: [StarService],
})
export class StarModule {}
