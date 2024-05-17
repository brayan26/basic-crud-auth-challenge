import express from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { hostname } from 'os';
import { registerRoutes } from '../routes';
import { ErrorHandlerResponse } from './ErrorHandleResponse';
import routesSwagger from 'express-list-endpoints';
import morgan from 'morgan';
import Logger from '@context/shared/infrastructure/impl/WinstonLogger';
import container from '@app/dependency-injection';

const logger: Logger = container.get('Shared.Logger');

export class Server {
  private readonly port: number;
  private httpServer?: http.Server;
  public app = express();

  constructor(port: number) {
    this.port = port;
    this.app.use(express.json({ limit: '890mb' }));
    this.app.use(express.urlencoded({ limit: '890mb', extended: true }));
    this.app.use(helmet.xssFilter());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.hidePoweredBy());
    this.app.use(helmet.frameguard({ action: 'deny' }));
    this.app.use(
      morgan('[REQUEST METHOD]: :method - [URL]: :url - [STATUS]: :status - [SIZE]: :res[content-length] - [TIME]: :response-time ms'),
    );

    const router = Router();
    this.app.use(router, ErrorHandlerResponse);
    this.app.use(router);
    registerRoutes(router);
    logger.info(routesSwagger(this.app));
  }

  listen = async (): Promise<void> => {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, () => {
        logger.info(`Server is running at ${hostname}:${this.port}`);
        logger.info('Press CTRL-C to stop');
        resolve();
      });
    });
  };

  getHTTPServer = () => {
    return this.httpServer;
  };

  stop = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  };
}
