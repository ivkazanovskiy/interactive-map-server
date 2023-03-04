import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class TypeORMNotFoundFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMNotFoundFilter.name);

  catch(exception: TypeORMNotFoundFilter, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const nestError = new NotFoundException();

    response.status(nestError.getStatus()).json(nestError.getResponse());
  }
}
