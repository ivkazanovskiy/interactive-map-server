import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { BaseTypeORMFilter } from './filters/typeorm-filters/base.filter';
import { TypeORMNotFoundFilter } from './filters/typeorm-filters/not-found.filter';
import { AppModule } from './modules/app.module';
import { Config } from './modules/other/config/config.service';
import { swaggerConfig } from './swager.config';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const {
    app: { port, host },
  } = app.get(Config);

  const logger = new Logger('bootstrap');

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(
    new BaseTypeORMFilter(), // 1) all TypeORM errors handler
    new TypeORMNotFoundFilter(), // 2) findOneOrFail handler (only after common handler)
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(port, host);
  logger.log(`Server is listening on ${host}:${port}`);
}
bootstrap();
