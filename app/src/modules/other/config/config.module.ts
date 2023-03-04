import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config-validation.schema';
import { Config } from './config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
  ],
  providers: [Config],
  exports: [Config],
})
export class ConfigModule {}
