import dotenv from 'dotenv';
import { configSchema } from './config.schema.js';

dotenv.config();

export type ConfigSchemaType = typeof configSchema;

export const config = configSchema.validate();

