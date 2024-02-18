import { forwardRef, Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@user/user.module';
import { AuthModule } from '@auth/auth.module';
import { EmailModule } from '@email/email.module';
import { RedisModule } from '@redis/redis.module';
import { AppConfigModule } from '@root/config/config.module';
import { AppController } from '@root/app.controller';
import { AppService } from '@root/app.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    forwardRef(() => AuthModule),
    EmailModule,
    RedisModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
