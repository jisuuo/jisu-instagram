import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { format } from 'light-date';
import * as fs from 'fs';
import { extname } from 'path';
import { User } from '@user/entities/user.entity';
import { Privacy } from '@user/entities/privacy.entity';
import { AuthModule } from '@auth/auth.module';
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Privacy]),
    AuthModule,
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: function (req, file, cb) {
            const dest = `${configService.get('ATTACH_SAVE_PATH')}/${format(new Date(), '{yyyy}{MM}/')}`;

            if (!fs.existsSync(dest)) {
              fs.mkdirSync(dest, {
                recursive: true,
              });
            }
            cb(null, dest);
          },
          filename(req, file, callback) {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('');
            return callback(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
