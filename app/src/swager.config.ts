import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setVersion('1.0')
  .build();
