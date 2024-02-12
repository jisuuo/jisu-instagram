import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .addBearerAuth()
      .setTitle('jisu-instagram')
      .setDescription('jisu-instagram portfolio')
      .setVersion('1.0')
      .build();
  }
}
