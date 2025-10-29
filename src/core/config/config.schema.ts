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
      format: 'ipaddress',
      env: 'DB_HOST',
      default: '127.0.0.1'
    }
  },
  security: {
    salt: {
      doc: 'Secret salt for hashing',
      format: String,
      env: 'SALT',
      default: '',
      sensitive: true
    }
  }
});

