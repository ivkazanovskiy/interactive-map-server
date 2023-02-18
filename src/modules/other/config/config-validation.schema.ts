import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  //app
  HOST: Joi.string().default('127.0.0.1'),
  PORT: Joi.number().default(3000),

  // postgresConnection
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
