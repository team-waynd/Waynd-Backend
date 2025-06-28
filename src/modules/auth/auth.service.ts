import { ForbiddenException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    await this.userService.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.userService.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    return this.login(user);
  }
}
