import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_PORT: Joi.number().required(),
        // Postgres 설정
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        // Multer 설정 [파일 업로드]
        ATTACH_SAVE_PATH: Joi.string().required(),

        JWT_SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
