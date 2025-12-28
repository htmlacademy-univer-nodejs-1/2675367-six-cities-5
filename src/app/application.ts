import 'reflect-metadata';
import { injectable } from 'inversify';
import { ILogger } from '../core/logger/index.js';

@injectable()
export class Application {
  constructor(private readonly logger: ILogger) {}

  public async init(): Promise<void> {
    this.logger.info('Приложение инициализировано');
  }
}

