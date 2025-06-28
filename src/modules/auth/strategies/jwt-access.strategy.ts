import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

interface JwtPayload {
  sub: string;
  email: string;
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(JwtStrategy, 'jwt') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET') ?? '',
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
