import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class GoogleUserStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    //done(null, profile);
    const { provider, displayName, email, picture } = profile;
    try {
      const user = await this.userService.getUserByEmails(email);
      if (user.provider !== provider) {
        throw new HttpException('Not Matched Provider', HttpStatus.CONFLICT);
      }
      done(null, user);
    } catch (err) {
      if (err.status === 404) {
        // 회원가입 프로세스
        const newUser = await this.userService.createSocialUser({
          email,
          name: displayName,
          profileImg: picture,
          provider,
        });
        done(null, newUser);
      }
    }
  }
}
