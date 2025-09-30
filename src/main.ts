#!/usr/bin/env node
"use strict";
import { CLIApplication } from './cli/cli-application.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  await cliApplication.processCommand(process.argv);
}

bootstrap();
