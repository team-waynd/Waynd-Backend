import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID') ?? '',
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET') ?? '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL') ?? '',
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const { id, name, emails } = profile;
      const providerId = id;
      const email = emails?.[0]?.value ?? '';
      const fullName = `${name?.familyName ?? ''}${name?.givenName ?? ''}`;
      const provider = 'google';
      const profileImage = profile.photos?.[0]?.value ?? '';

      const user: User = await this.userService.findByEmailOrSave(
        email,
        fullName,
        providerId,
        provider,
        profileImage,
      );

      done(null, user);
    } catch (error) {
      console.error('OAuth validate error:', error);
      done(error, false);
    }
  }
}
