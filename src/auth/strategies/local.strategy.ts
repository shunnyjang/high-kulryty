import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/entities';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
    });
  }

  async validate(id: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(id, password);
    if (!user)
      throw new UnauthorizedException(
        `존재하지 않는 아이디 또는 잘못된 비밀번호 입니다.`,
      );
    return user;
  }
}
