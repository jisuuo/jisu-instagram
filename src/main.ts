import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './config/swagger.documents';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new BaseAPIDocument().initializeOptions();
  const documents = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documents);

  await app.listen(3000);
}
bootstrap();
