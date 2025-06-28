import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';

interface UserType {
  sub: string;
  email: string;
}

@Controller('user')
export class UserController {
  userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyProfile(@Req() req: { user: UserType }) {
    return {
      message: '인증된 사용자입니다.',
      user: req.user,
    };
  }
}
