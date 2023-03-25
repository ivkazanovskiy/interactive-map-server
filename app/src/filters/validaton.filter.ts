import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorDto } from '../dto/error.dto';
import { ErrorMessage } from '../types/error-messages.enum';
import { validatorResponseSchema } from '../validators/validation.validator';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  private readonly logger = new Logger(ValidationFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const status = exception.getStatus();
    const response = context.getResponse<Response>();
    const exceptionResponse = exception.getResponse();

    const result = validatorResponseSchema.safeParse(exceptionResponse);

    if (result.success) {
      // class-validator errors
      response
        .status(status)
        .json(new ErrorDto({ description: result.data.message }));

      return;
    }

    // internal BadRequestException errors
    response.status(status).json(new ErrorDto({ code: exception.message }));
  }
}
