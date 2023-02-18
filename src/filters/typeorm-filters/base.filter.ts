import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class BaseTypeORMFilter implements ExceptionFilter {
  private readonly logger = new Logger(BaseTypeORMFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    this.logger.error({ err: exception });

    const nestError = new InternalServerErrorException();

    response.status(nestError.getStatus()).json(nestError.getResponse());
  }
}
