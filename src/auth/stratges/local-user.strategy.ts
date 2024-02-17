import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalUserStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // 이메일 가입자 로컬인 경우 email 필드로 확인
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return await this.authService.findUser({
      email,
      password,
    });
  }
}
