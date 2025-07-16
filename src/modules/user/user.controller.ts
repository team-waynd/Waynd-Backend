import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyProfile(@Req() req: { user: User }) {
    const userId = req.user.id;
    const userInfo = await this.userService.findById(userId);
    return {
      name: userInfo?.name,
      email: userInfo?.email,
      profileImg: userInfo?.profileImage,
    };
  }
}
