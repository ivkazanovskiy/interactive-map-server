import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';
import { ErrorDto } from '../../dto/error.dto';

@Catch(EntityNotFoundError)
export class TypeORMNotFoundFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMNotFoundFilter.name);

  catch(exception: TypeORMNotFoundFilter, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    response.status(404).json(new ErrorDto());
  }
}
