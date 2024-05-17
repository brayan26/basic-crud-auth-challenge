import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '@context/shared/infrastructure/impl/WinstonLogger';
import { verify } from 'jsonwebtoken';
import container from '@app/dependency-injection';

const logger: Logger = container.get('Shared.Logger');

export default class AuthValidator {
  static verify(req: any, res: Response, next: NextFunction) {
    const headers = req.headers;

    if (!headers.authorization) {
      logger.error(`Auth: No authorization header - URL: ${req.url}`)
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: 'No authorization header' })
    }

    verify(headers.authorization, 'secret_key', (err: any, user: any) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          message: 'Authentication Token not valid',
        })
      }
      req.user = user;
      next();
    });
  }
}
