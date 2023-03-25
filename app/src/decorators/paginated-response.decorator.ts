import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

export const ApiPaginatedResponse = (
  dto: any,
): ReturnType<typeof applyDecorators> =>
  applyDecorators(
    ApiExtraModels(dto),
    ApiOkResponse({
      schema: {
        properties: {
          result: {
            type: 'array',
            items: { $ref: getSchemaPath(dto) },
          },
          count: { type: 'number' },
        } as Record<keyof PaginatedResponseDto, SchemaObject>,
      },
    }),
  );
