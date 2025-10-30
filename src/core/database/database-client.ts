import mongoose from 'mongoose';
import { ILogger } from '../logger/index.js';

export class DatabaseClient {
  constructor(private readonly logger: ILogger) {}

  public async connect(uri: string): Promise<void> {
    try {
      this.logger.info('Попытка подключения к базе данных...');
      await mongoose.connect(uri);
      this.logger.info('Соединение с базой данных установлено');
    } catch (error) {
      this.logger.error('Ошибка подключения к базе данных', error as Error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.logger.info('Соединение с базой данных закрыто');
    } catch (error) {
      this.logger.error('Ошибка при закрытии соединения с БД', error as Error);
      throw error;
    }
  }
}

