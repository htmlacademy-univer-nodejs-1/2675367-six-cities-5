#!/usr/bin/env node
import { CLIApplication } from './cli/cli-application.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  await cliApplication.processCommand(process.argv);
}

bootstrap();
