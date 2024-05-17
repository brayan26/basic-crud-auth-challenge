import 'reflect-metadata';
import { Server } from './Server';
import config from '@app/config';
import Logger from '@context/shared/infrastructure/impl/WinstonLogger';
import container from '@app/dependency-injection';

const logger: Logger = container.get('Shared.Logger');

export class Run {
  server?: Server;

  async start() {
    try {
      this.server = new Server(Number(config.PORT));
      return this.server.listen();
    } catch (error) {
      logger.error(error);
    }
    this.server = new Server(Number(config.PORT));
    return this.server.listen();
  }

  async stop() {
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }
}
