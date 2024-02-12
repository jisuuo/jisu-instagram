import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './config/swagger.documents';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // api url prefix 설정
  app.setGlobalPrefix('api');

  // Swagger 설정
  const config = new BaseAPIDocument().initializeOptions();
  const documents = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documents);

  const port = configService.get('SERVICE_PORT') || 3000;

  await app.listen(port);
}
bootstrap();
