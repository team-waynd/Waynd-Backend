import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  GoogleAuthGuard,
  JwtRefreshGuard,
  KakaoAuthGuard,
} from './guards/auth.guard';
import { User } from '../user/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

interface JwtPayload {
  sub: string;
  email: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @ApiOperation({ summary: '구글 로그인' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 AccessToken 과 Refresh Token을 반환합니다.',
  })
  @UseGuards(GoogleAuthGuard)
  async googleAuth(): Promise<void> {}

  @Get('google/redirect')
  @ApiOperation({ summary: '구글 리다이렉트' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 AccessToken 과 Refresh Token을 반환합니다.',
  })
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request,
  ): Promise<ReturnType<AuthService['login']>> {
    const user = req.user as User;
    return this.authService.login(user);
  }

  @Get('kakao')
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 AccessToken 과 Refresh Token을 반환합니다.',
  })
  @UseGuards(KakaoAuthGuard)
  async kakaoAuth(): Promise<void> {}

  @Get('kakao/redirect')
  @ApiOperation({ summary: '카카오 리다이렉션' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 AccessToken 과 Refresh Token을 반환합니다.',
  })
  @UseGuards(KakaoAuthGuard)
  async kakaoAuthRedirect(
    @Req() req: Request,
  ): Promise<ReturnType<AuthService['login']>> {
    const user = req.user as User;
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: '리프레시 토큰' })
  @ApiResponse({
    status: 200,
    description: '성공적으로 AccessToken 과 Refresh Token을 반환합니다.',
  })
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
