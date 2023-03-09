import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  //app
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(3000),

  // postgresConnection
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  //jwt
  JWT_SECRET: Joi.string().required(),
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  JWT_AT_EXPIRES: Joi.string().default('1day'), // TODO: set 2 mins after correct env deployment
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  JWT_RT_EXPIRES: Joi.string().default('30days'),

  //oauth
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().required(),
});
