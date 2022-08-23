import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './payload.interface';
import { CreateUserDto } from './dto';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

const SALT_ROUND = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, password: string): Promise<any> {
    const user = await this.userService.getUserProfileById(id);
    const hashed = await this.getHashedValue(password);

    if (user && password === hashed) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const { password } = createUserDto;
    const hashedPassword = await this.getHashedValue(password);

    try {
      const { password: resultPwd, ...user } =
        await this.userService.createUser({
          ...createUserDto,
          password: hashedPassword,
        });

      await this.setUserRefreshToken(user.id);
      return user;
    } catch (error) {
      if (error?.code == 23505)
        throw new BadRequestException(`이미 가입한 아이디입니다.`);
      throw new BadRequestException(`가입할 수 없습니다.`);
    }
  }

  async login(user: any) {
    const payload: TokenPayload = { id: user.id };
    const accessToken = this.generateAccessToken(payload);
    return {
      access_token: accessToken,
    };
  }

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  private async generateRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  private async getHashedValue(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    return bcrypt.hash(value, salt);
  }

  private async setUserRefreshToken(userId: string): Promise<void> {
    const payload: TokenPayload = { id: userId };
    const token = await this.generateRefreshToken(payload);
    await this.userService.setRefreshToken(userId, token);
  }
}
