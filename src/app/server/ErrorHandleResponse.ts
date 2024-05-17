import { NextFunction, Response, Request } from 'express';
import { BaseError } from '@context/shared/domain/class/BaseError';
import Logger from '@context/shared/infrastructure/impl/WinstonLogger';
import container from '@app/dependency-injection';

const logger: Logger = container.get('Shared.Logger');
export const ErrorHandlerResponse = (error: Error, req: Request, res: Response, _next: NextFunction): Response => {
  printError(error, req);
  if (error instanceof BaseError) return res.status(error.status).send(error.info);
  return res.status(500).send();
};

const printError = (error: Error, req: Request): void => {
  logger.error(`--------- [REQUEST FAIL]: ${req.originalUrl} 
      --------- [REQUEST HEADERS]: ${JSON.stringify(req.headers)}
      --------- [REQUEST BODY]: ${JSON.stringify(req.body)}
      --------- [REQUEST PARAMS]: ${JSON.stringify(req.params)}
      --------- [REQUEST QUERY]: ${JSON.stringify(req.query)}
      --------- [ERROR STACK]: ${error.stack}
      --------- [ERROR MESSAGE]: ${error.message}
      --------- [ERROR NAME]: ${error.name}`);
};
