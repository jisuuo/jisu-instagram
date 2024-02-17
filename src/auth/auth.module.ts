import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalUserStrategy } from './stratges/local-user.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { GoogleUserStrategy } from './stratges/google-user.strategy';
import { NaverUserStrategy } from './stratges/naver-user.strategy';
import { EmailModule } from '../email/email.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({}),
    ConfigModule,
    EmailModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalUserStrategy,
    GoogleUserStrategy,
    NaverUserStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
