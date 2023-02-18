import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { Config } from './modules/other/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {
    app: { port, host },
  } = app.get(Config);

  const logger = new Logger('bootstrap');

  await app.listen(port, host);
  logger.log(`Server is listening on ${host}:${port}`);
}
bootstrap();
