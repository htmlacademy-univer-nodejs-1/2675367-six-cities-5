import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import chalk from 'chalk';
import { Command } from './index.js';

export class VersionCommand implements Command {
  getName(): string {
    return '--version';
  }

  async execute(): Promise<void> {
    try {
      const packageJsonPath = resolve('./package.json');
      const packageJsonContent = readFileSync(packageJsonPath, 'utf8');
      const { version } = JSON.parse(packageJsonContent);

      console.log(chalk.blue.bold(`Версия приложения: ${version}`));
    } catch (error) {
      console.error(chalk.red('Ошибка при чтении package.json:'), error);
    }
  }
}
