import chalk from 'chalk';
import { Command } from './index.js';

export class HelpCommand implements Command {
  getName(): string {
    return '--help';
  }

  async execute(): Promise<void> {
    console.log(chalk.blue.bold('Программа для подготовки данных для REST API «Шесть городов».\n'));
    console.log(chalk.yellow('Команды:'));
    console.log('  --version:                    # выводит номер версии');
    console.log('  --help:                       # печатает этот текст');
    console.log('  --import <path>:              # импортирует данные из TSV');
    console.log('  --generate <n> <path> <url>:  # генерирует произвольное количество тестовых данных');
  }
}

