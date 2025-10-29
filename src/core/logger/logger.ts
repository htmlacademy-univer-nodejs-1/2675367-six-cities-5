import pino from 'pino';
import { ILogger } from './logger.interface.js';

export class Logger implements ILogger {
  private logger: pino.Logger;

  constructor() {
    const isDevelopment = process.env.NODE_ENV === 'development';

    this.logger = pino({
      level: isDevelopment ? 'debug' : 'info',
      transport: isDevelopment ? {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      } : undefined
    });
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info({ args }, message);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn({ args }, message);
  }

  error(message: string, error?: Error, ...args: unknown[]): void {
    this.logger.error({ err: error, args }, message);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug({ args }, message);
  }
}

