import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth(undefined, 'access_token')
  .addBearerAuth(undefined, 'refresh_token')
  .setVersion('1.0')
  .build();
