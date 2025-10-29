import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import chalk from 'chalk';
import { Command } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class VersionCommand implements Command {
  getName(): string {
    return '--version';
  }

  async execute(): Promise<void> {
    try {
      const packageJSONPath = join(__dirname, '../../../package.json');
      const content = JSON.parse(readFileSync(packageJSONPath, 'utf-8'));
      console.log(chalk.blue.bold(content.version));
    } catch (error) {
      console.error(chalk.red('Ошибка при чтении версии'), error);
    }
  }
}

