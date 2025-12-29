import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

convict.addFormats(convictFormatWithValidator);

export const configSchema = convict({
  env: {
    doc: 'The application environment.',
    format: ['development', 'production', 'test'],
    env: 'NODE_ENV',
    default: 'development'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    env: 'PORT',
    default: 3000
  },
  db: {
    host: {
      doc: 'Database host address',
      format: String,
      env: 'DB_HOST',
      default: '127.0.0.1'
    },
    port: {
      doc: 'Database port',
      format: 'port',
      env: 'DB_PORT',
      default: 27017
    },
    name: {
      doc: 'Database name',
      format: String,
      env: 'DB_NAME',
      default: 'six-cities'
    }
  },
  security: {
    salt: {
      doc: 'Secret salt for hashing',
      format: String,
      env: 'SALT',
      default: '',
      sensitive: true
    },
    jwtSecret: {
      doc: 'Secret for JWT signing',
      format: String,
      env: 'JWT_SECRET',
      default: 'your-secret-key',
      sensitive: true
    }
  }
});

