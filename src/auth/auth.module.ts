import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@user/user.module';
import { EmailModule } from '@email/email.module';
import { RedisModule } from '@redis/redis.module';
import { AuthController } from '@auth/auth.controller';
import { AuthService } from '@auth/auth.service';
import { GoogleUserStrategy } from '@auth/stratges/google-user.strategy';
import { NaverUserStrategy } from '@auth/stratges/naver-user.strategy';
import { LocalUserStrategy } from '@auth/stratges/local-user.strategy';

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
