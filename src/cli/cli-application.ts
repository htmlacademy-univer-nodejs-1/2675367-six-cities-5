import { Command, HelpCommand, VersionCommand, ImportCommand, GenerateCommand } from './commands/index.js';

export class CLIApplication {
  private readonly commandNameToCommand: Map<string, Command> = new Map();

  constructor() {
    this.registerCommands();
  }

  private registerCommands(): void {
    const commands: Command[] = [
      new HelpCommand(),
      new VersionCommand(),
      new ImportCommand(),
      new GenerateCommand()
    ];

    for (const command of commands) {
      this.commandNameToCommand.set(command.getName(), command);
    }
  }

  public async processCommand(argv: string[]): Promise<void> {
    // argv example: [node, script, ...params]
    const [, , commandName, ...params] = argv;

    if (!commandName) {
      const help = this.commandNameToCommand.get('--help');
      if (help) {
        await help.execute([]);
      }
      return;
    }

    const command = this.commandNameToCommand.get(commandName);
    if (!command) {
      const help = this.commandNameToCommand.get('--help');
      if (help) {
        await help.execute([]);
      }
      return;
    }

    await command.execute(params);
  }
}


