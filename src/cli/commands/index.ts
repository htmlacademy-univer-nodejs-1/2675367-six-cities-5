export interface Command {
  getName(): string;
  execute(params: string[]): Promise<void>;
}

export { HelpCommand } from './help.command.js';
export { VersionCommand } from './version.command.js';
export { ImportCommand } from './import.command.js';
