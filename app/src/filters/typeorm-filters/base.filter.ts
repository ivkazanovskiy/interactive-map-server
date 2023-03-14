import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';
import { ErrorDto } from '../../dto/error.dto';

@Catch(TypeORMError)
export class BaseTypeORMFilter implements ExceptionFilter {
  private readonly logger = new Logger(BaseTypeORMFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    this.logger.error({ err: exception });

    response.status(500).json(new ErrorDto());
  }
}
