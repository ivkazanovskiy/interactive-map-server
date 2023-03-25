import { z } from 'zod';

export const validatorResponseSchema = z.object({
  statusCode: z.literal(400),
  message: z.array(z.string()),
  error: z.literal('Bad Request'),
});
