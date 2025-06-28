import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { GoogleAuthGuard, JwtRefreshGuard } from './guards/auth.guard';
import { User } from '../user/user.entity';

interface JwtPayload {
  sub: string;
  email: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
  ): Promise<ReturnType<AuthService['login']>> {
    const user = req.user as User;
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
  ): Promise<ReturnType<AuthService['refreshToken']>> {
    const user = req.user as JwtPayload;
    const userId = user.sub;
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : null;

    if (!refreshToken) {
      throw new Error('Refresh token is missing in Authorization header');
    }

    return this.authService.refreshToken(userId, refreshToken);
  }
}
