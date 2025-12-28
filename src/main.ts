
import 'reflect-metadata';
import { Container } from 'inversify';
import { Application } from './app/index.js';
import { Logger } from './core/logger/index.js';
import { ILogger } from './core/logger/index.js';
import { ApplicationBindings } from './core/types/index.js';
import { config } from './core/config/index.js';

async function bootstrap() {
  const container = new Container();

  // Bind Logger
  container.bind<ILogger>(ApplicationBindings.Logger).to(Logger).inSingletonScope();

  // Bind Application
  container.bind<Application>(ApplicationBindings.Application).to(Application).inSingletonScope();

  // Initialize
  const logger = container.get<ILogger>(ApplicationBindings.Logger);
  logger.info(`Порт приложения: ${config.get('port')}`);
  logger.info(`База данных: ${config.get('db.host')}`);

  const application = container.get<Application>(ApplicationBindings.Application);
  await application.init();
}

bootstrap();

