import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
      userId: userInfo?.id,
      name: userInfo?.name,
      email: userInfo?.email,
      profileImg: userInfo?.profileImage,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  editMyProfile(
    @Req() req: { user: User },
    @Body() body: { name: string; email: string },
  ) {
    const userId = req.user.id;

    if (!userId) {
      throw new Error('User ID not found in request');
    }

    return this.userService.updateProfile({
      userId,
      name: body.name,
      email: body.email,
    });
  }
}
