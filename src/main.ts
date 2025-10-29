import { CLIApplication } from './cli/cli-application.js';

const cli = new CLIApplication();
cli.processCommand(process.argv);
