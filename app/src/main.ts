import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { BaseTypeORMFilter } from './filters/typeorm-filters/base.filter';
import { TypeORMNotFoundFilter } from './filters/typeorm-filters/not-found.filter';
import { AppModule } from './modules/app.module';
import { Config } from './modules/other/config/config.service';
import { swaggerConfig } from './swager.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://ivkazanovskiy.ru'],
  });

  const {
    app: { port, host },
  } = app.get(Config);

  const logger = new Logger('bootstrap');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new BaseTypeORMFilter(), // 1) all TypeORM errors handler
    new TypeORMNotFoundFilter(), // 2) findOneOrFail handler (only after common handler)
  );

  await app.listen(port, host);
  logger.log(`Server is listening on ${host}:${port}`);
}
bootstrap();
