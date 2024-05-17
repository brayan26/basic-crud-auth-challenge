import 'dotenv/config';
const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: env('PORT') ?? 3000,
  NODE_ENV: env('NODE_ENV') ?? 'dev',
  AUTH_MOCK_DATA: {
    USER_ID: env('AUTH_USER_ID')!,
    USER_MAIL: env('AUTH_USER_MAIL')!,
    USER_PASS: env('AUTH_USER_PASS')!,
  },
  LOGGER_LEVELS: {
    DEBUG: 'debug',
    ERROR: 'error',
    INFO: 'info',
  },
  CRUD_API: env('CRUD_API') ?? '',
};
