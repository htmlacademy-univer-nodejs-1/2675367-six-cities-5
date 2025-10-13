import chalk from 'chalk';
import { Command } from './index.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  async execute(): Promise<void> {
    console.log(chalk.blue.bold(`
Программа для подготовки данных для REST API сервера.

Пример: cli.js --<command> [--arguments]

Команды:
`));

    console.log(`${chalk.green(' --version:                   ')}# выводит номер версии`);
    console.log(`${chalk.green(' --help:                      ')}# печатает этот текст`);
    console.log(`${chalk.green(' --import <path>:             ')}# импортирует данные из TSV`);
    console.log(`${chalk.green(' --generate <n> <path> <url>  ')}# генерирует произвольное количество тестовых данных`);

    console.log(chalk.yellow('\nПримеры использования:'));
    console.log(chalk.gray('  npm run ts src/main.ts -- --help'));
    console.log(chalk.gray('  npm run ts src/main.ts -- --version'));
    console.log(chalk.gray('  npm run ts src/main.ts -- --import ./mocks/test-data.tsv'));
  }
}
