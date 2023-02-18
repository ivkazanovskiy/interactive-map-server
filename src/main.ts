import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app.module';
import { Config } from './modules/other/config/config.service';
import { swaggerConfig } from './swager.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {
    app: { port, host },
  } = app.get(Config);

  const logger = new Logger('bootstrap');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, host);
  logger.log(`Server is listening on ${host}:${port}`);
}
bootstrap();
