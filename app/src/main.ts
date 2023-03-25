import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http.filter';
import { BaseTypeORMFilter } from './filters/typeorm-filters/base.filter';
import { TypeORMNotFoundFilter } from './filters/typeorm-filters/not-found.filter';
import { AppModule } from './modules/app.module';
import { Config } from './modules/other/config/config.service';
import { swaggerConfig } from './swager.config';
import * as morgan from 'morgan';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'http://ivkazanovskiy.ru'],
  });

  const {
    app: { port, host, globalPrefix },
  } = app.get(Config);

  const logger = new Logger('bootstrap');

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig(globalPrefix),
  );
  SwaggerModule.setup('/docs', app, document);
  app.use(morgan('tiny'));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new BaseTypeORMFilter(), // 1) all TypeORM errors handler
    new TypeORMNotFoundFilter(), // 2) findOneOrFail handler (only after common handler)
  );
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, host);
  logger.log(`Server is listening on ${host}:${port}`);
}
bootstrap();
