import { Profile, Strategy } from 'passport-kakao';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private config: ConfigService,
    private userService: UserService,
  ) {
    super({
      clientID: config.get<string>('KAKAO_CLIENT_ID') ?? '',
      callbackURL: config.get<string>('KAKAO_CALLBACK_URL') ?? '',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ) {
    try {
      const _json = profile._json as {
        kakao_account?: {
          email?: string;
        };
        properties?: {
          profile_image?: string;
        };
      };
      const email =
        profile.emails?.[0]?.value ?? _json.kakao_account?.email ?? '';
      const nickname = profile.username ?? '';
      const profileImage = _json.properties?.profile_image ?? '';

      const kakaoId = profile.id.toString();
      const provider = 'kakao';

      const user: User = await this.userService.findByEmailOrSave(
        email,
        nickname,
        kakaoId,
        provider,
        profileImage,
      );

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
