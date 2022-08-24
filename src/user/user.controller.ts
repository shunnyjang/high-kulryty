import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/entities';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getUserProfile(@Req() req): Promise<User> {
    return this.userService.getUserProfileById(req.user.id);
  }

  @Get('/follow')
  getFollowingUsers(@Req() req): Promise<any> {
    return this.userService.getFollowingUsers(req.query.userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/follow')
  followUser(@Req() req): Promise<any> {
    return this.userService.followUser(
      req.body.userId,
      req.body.followedUserrId,
    );
  }

  @Delete('/follow')
  unfollowUser(@Req() req): Promise<any> {
    return this.userService.unfollowUser(
      req.body.userId,
      req.body.unfollowedUserId,
    );
  }

  @Patch('/lover')
  updateLoverRank(@Req() req): Promise<User> {
    return this.userService.updateLoverRank(req.body.userId, req.body.rank);
  }
}
