export const ApplicationBindings = {
  Application: Symbol.for('Application'),
  Logger: Symbol.for('Logger'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService')
} as const;
