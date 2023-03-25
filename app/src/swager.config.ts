import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const swaggerConfig = (
  globalPrefix = '',
): Omit<OpenAPIObject, 'paths'> =>
  new DocumentBuilder()
    .addBearerAuth(undefined, 'access_token')
    .addBearerAuth(undefined, 'refresh_token')
    .addServer(globalPrefix)
    .setVersion('1.0')
    .build();
